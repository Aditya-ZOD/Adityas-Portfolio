import os
import sqlite3
import logging
import hashlib
import html
from datetime import datetime, timezone
from pathlib import Path
from typing import Dict, Any, Optional
from urllib.parse import quote
from backend.app.schemas.contact import ContactRequest

logger = logging.getLogger("contact_service")

# Data directory for local persistence
DATA_DIR = Path(__file__).resolve().parent.parent / "data"
DB_PATH = DATA_DIR / "messages.db"
INBOX_PATH = DATA_DIR / "INBOX.md"

def get_all_contact_messages():
    """Retrieves all contact inquiries from SQLite ordered latest first."""
    if not DB_PATH.exists():
        return []
    try:
        with sqlite3.connect(DB_PATH) as conn:
            conn.row_factory = sqlite3.Row
            cursor = conn.cursor()
            cursor.execute(
                "SELECT id, name, email, subject, message, delivery_status, created_at FROM contact_messages ORDER BY id DESC"
            )
            rows = cursor.fetchall()
            return [dict(row) for row in rows]
    except Exception as e:
        logger.error(f"Error fetching contact messages: {type(e).__name__}")
        return []

def sync_inbox_markdown():
    """Generates a human-readable INBOX.md file summarizing all transmissions."""
    messages = get_all_contact_messages()
    lines = [
        "# 📬 Transmission Inbox — Aditya's Cosmos",
        "",
        "This file is **automatically updated** whenever someone submits a message through your portfolio contact form.",
        "",
        f"- **Total Received:** {len(messages)}",
        f"- **Last Updated:** {datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M:%S UTC')}",
        "",
        "---",
        ""
    ]
    if not messages:
        lines.append("*No transmissions received yet.*")
    else:
        for msg in messages:
            lines.extend([
                f"### #{msg['id']} • {msg['name']} (`{msg['email']}`)",
                f"- **Time:** {msg['created_at']}",
                f"- **Subject:** `{msg['subject']}`",
                f"- **Status:** `{msg['delivery_status']}`",
                f"- **Direct Reply:** [mailto:{msg['email']}?subject=Re:%20{quote(msg['subject'])}](mailto:{msg['email']}?subject=Re:%20{quote(msg['subject'])})",
                "",
                "**Message:**",
                f"> {msg['message'].replace(chr(10), chr(10) + '> ')}",
                "",
                "---",
                ""
            ])
    try:
        DATA_DIR.mkdir(parents=True, exist_ok=True)
        with open(INBOX_PATH, "w", encoding="utf-8") as f:
            f.write("\n".join(lines))
    except Exception as e:
        logger.error(f"Failed to write INBOX.md: {type(e).__name__}")

def init_contact_db():
    """Initializes the SQLite database table for contact inquiries."""
    try:
        DATA_DIR.mkdir(parents=True, exist_ok=True)
        with sqlite3.connect(DB_PATH) as conn:
            cursor = conn.cursor()
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS contact_messages (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    email TEXT NOT NULL,
                    subject TEXT NOT NULL,
                    message TEXT NOT NULL,
                    delivery_status TEXT NOT NULL,
                    created_at TEXT NOT NULL,
                    ip_hash TEXT NOT NULL
                );
            """)
            conn.commit()
        sync_inbox_markdown()
    except Exception as e:
        logger.error(f"Failed to initialize contact database: {type(e).__name__}")

def hash_ip(ip_address: str) -> str:
    """Hashes IP address with a salt for privacy-preserving rate and audit tracking."""
    salt = os.getenv("IP_SALT", "aditya-cosmos-salt")
    return hashlib.sha256(f"{salt}:{ip_address}".encode()).hexdigest()[:16]

def get_contact_receiver_email() -> str:
    """
    Resolves recipient email from environment variables without hardcoding personal email addresses.
    Checks CONTACT_RECEIVER_EMAIL first, then CONTACT_RECIPIENT_EMAIL, then PORTFOLIO_CONTACT_EMAIL.
    """
    return (
        os.getenv("CONTACT_RECEIVER_EMAIL", "").strip()
        or os.getenv("CONTACT_RECIPIENT_EMAIL", "").strip()
        or os.getenv("PORTFOLIO_CONTACT_EMAIL", "").strip()
    )

def get_email_from() -> str:
    """
    Resolves sender email address/domain permitted by provider.
    Checks EMAIL_FROM, then CONTACT_FROM_EMAIL. Defaults to Resend's default verified sandbox domain.
    """
    return (
        os.getenv("EMAIL_FROM", "").strip()
        or os.getenv("CONTACT_FROM_EMAIL", "").strip()
        or "Aditya Portfolio <onboarding@resend.dev>"
    )

def generate_mailto_url(subject: str, message: str, name: str) -> str:
    """Generates a pre-filled mailto URL as a reliable client fallback."""
    recipient = get_contact_receiver_email()
    encoded_sub = quote(f"[Portfolio Contact] {subject}")
    body_text = f"Hi Aditya,\n\n{message}\n\nFrom,\n{name}"
    encoded_body = quote(body_text)
    return f"mailto:{recipient}?subject={encoded_sub}&body={encoded_body}"

def deliver_contact_message(payload: ContactRequest, client_ip: str) -> Dict[str, Any]:
    """
    Delivers a contact message based on configured delivery mechanism.
    Supports Resend transactional email, SMTP, and local SQLite persistence.
    Does NOT log credentials or private message bodies.
    Returns delivery confirmation dictionary.
    """
    mode = os.getenv("CONTACT_DELIVERY_MODE", "").lower().strip()
    resend_api_key = os.getenv("RESEND_API_KEY", "").strip()
    now_iso = datetime.now(timezone.utc).isoformat()
    mailto_url = generate_mailto_url(payload.subject, payload.message, payload.name)

    # 1. Mode: Explicitly unconfigured
    if mode in ("unconfigured", "none"):
        logger.info(f"Contact attempt received while delivery mode is '{mode}' (msg length: {len(payload.message)})")
        return {
            "success": False,
            "delivery_status": "unconfigured",
            "message": "Your message could not be sent. Please try again later or contact me directly.",
            "timestamp": now_iso,
            "mailto_fallback": mailto_url
        }

    # 2. Mode: SMTP Email Delivery
    if mode == "smtp":
        smtp_host = os.getenv("SMTP_HOST")
        smtp_user = os.getenv("SMTP_USER")
        smtp_pass = os.getenv("SMTP_PASSWORD")
        smtp_port = int(os.getenv("SMTP_PORT", "587"))
        recipient = get_contact_receiver_email()

        if not smtp_host or not smtp_user or not recipient:
            logger.warning("SMTP delivery requested but SMTP configuration or recipient email is missing.")
            return {
                "success": False,
                "delivery_status": "unconfigured",
                "message": "Your message could not be sent. Please try again later or contact me directly.",
                "timestamp": now_iso,
                "mailto_fallback": mailto_url
            }

        try:
            import smtplib
            from email.mime.text import MIMEText
            from email.mime.multipart import MIMEMultipart

            msg = MIMEMultipart()
            msg["From"] = os.getenv("SMTP_FROM", smtp_user)
            msg["To"] = recipient
            msg["Subject"] = f"[Portfolio Contact] {payload.subject}"
            msg["Reply-To"] = payload.email

            body = f"Name: {payload.name}\nEmail: {payload.email}\nSubject: {payload.subject}\n\nMessage:\n{payload.message}"
            msg.attach(MIMEText(body, "plain"))

            with smtplib.SMTP(smtp_host, smtp_port, timeout=10.0) as server:
                server.starttls()
                if smtp_pass:
                    server.login(smtp_user, smtp_pass)
                server.send_message(msg)

            logger.info(f"Contact message successfully sent via SMTP (length: {len(payload.message)})")
            return {
                "success": True,
                "delivery_status": "sent",
                "message": f"Thank you, {payload.name}. Your message has been sent directly to Aditya's inbox.",
                "timestamp": now_iso,
                "mailto_fallback": None
            }
        except Exception as e:
            logger.error(f"SMTP delivery failed: {type(e).__name__}")
            return {
                "success": False,
                "delivery_status": "failed",
                "message": "Your message could not be sent. Please try again later or contact me directly.",
                "timestamp": now_iso,
                "mailto_fallback": mailto_url
            }

    # 3. Transactional Delivery via Resend (Active when RESEND_API_KEY is present or CONTACT_DELIVERY_MODE=resend)
    if resend_api_key or mode == "resend":
        if not resend_api_key:
            logger.warning("Resend delivery selected but RESEND_API_KEY is not configured.")
            return {
                "success": False,
                "delivery_status": "unconfigured",
                "message": "Your message could not be sent. Please try again later or contact me directly.",
                "timestamp": now_iso,
                "mailto_fallback": mailto_url
            }

        recipient = get_contact_receiver_email()
        if not recipient:
            logger.warning("Resend delivery requested but CONTACT_RECEIVER_EMAIL is not configured.")
            return {
                "success": False,
                "delivery_status": "unconfigured",
                "message": "Your message could not be sent. Please try again later or contact me directly.",
                "timestamp": now_iso,
                "mailto_fallback": mailto_url
            }

        # Step 3a: Preserve message to SQLite database first
        msg_id = None
        try:
            init_contact_db()
            ip_masked = hash_ip(client_ip)
            with sqlite3.connect(DB_PATH) as conn:
                cursor = conn.cursor()
                cursor.execute(
                    """
                    INSERT INTO contact_messages (name, email, subject, message, delivery_status, created_at, ip_hash)
                    VALUES (?, ?, ?, ?, ?, ?, ?);
                    """,
                    (payload.name, payload.email, payload.subject, payload.message, "persisted", now_iso, ip_masked)
                )
                conn.commit()
                msg_id = cursor.lastrowid
            sync_inbox_markdown()
        except Exception as db_err:
            logger.error(f"Database pre-persistence encountered error: {type(db_err).__name__}")

        # Step 3b: Send notification via Resend
        try:
            import resend
            resend.api_key = resend_api_key

            safe_name = html.escape(payload.name)
            safe_email = html.escape(payload.email)
            safe_subject = html.escape(payload.subject)
            safe_message = html.escape(payload.message).replace("\n", "<br/>")

            html_content = f"""<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Portfolio Contact Inquiry</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0b1120; color: #f8fafc; padding: 24px; margin: 0;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #0f172a; border: 1px solid #1e293b; border-radius: 16px; padding: 32px;">
    <div style="border-bottom: 1px solid #1e293b; padding-bottom: 16px; margin-bottom: 24px;">
      <span style="font-family: monospace; font-size: 11px; text-transform: uppercase; color: #06b6d4; letter-spacing: 1px;">05 // INCOMING TRANSMISSION</span>
      <h1 style="color: #ffffff; font-size: 22px; font-weight: 700; margin: 8px 0 0 0;">New Portfolio Message</h1>
    </div>
    <div style="margin-bottom: 20px;">
      <p style="margin: 6px 0; font-size: 14px; color: #94a3b8;"><strong style="color: #cbd5e1;">From:</strong> {safe_name} &lt;<a href="mailto:{safe_email}" style="color: #38bdf8; text-decoration: none;">{safe_email}</a>&gt;</p>
      <p style="margin: 6px 0; font-size: 14px; color: #94a3b8;"><strong style="color: #cbd5e1;">Subject:</strong> {safe_subject}</p>
      <p style="margin: 6px 0; font-size: 14px; color: #94a3b8;"><strong style="color: #cbd5e1;">Received:</strong> {now_iso}</p>
    </div>
    <div style="background-color: #1e293b; border-left: 4px solid #06b6d4; padding: 18px; border-radius: 8px; margin: 24px 0;">
      <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #f1f5f9; white-space: pre-wrap;">{safe_message}</p>
    </div>
    <div style="border-top: 1px solid #1e293b; padding-top: 18px; margin-top: 24px; font-size: 12px; color: #64748b;">
      <p style="margin: 0;">You can reply directly to this email to respond to <strong style="color: #94a3b8;">{safe_name}</strong> at <a href="mailto:{safe_email}" style="color: #38bdf8; text-decoration: none;">{safe_email}</a>.</p>
    </div>
  </div>
</body>
</html>"""

            text_content = f"""New Portfolio Contact Inquiry
From: {payload.name} ({payload.email})
Subject: {payload.subject}
Time: {now_iso}

Message:
{payload.message}

---
Reply directly to this email to respond to {payload.email}.
"""

            params = {
                "from": get_email_from(),
                "to": [recipient],
                "reply_to": payload.email,
                "subject": f"[Portfolio] {payload.subject} (from {payload.name})",
                "html": html_content,
                "text": text_content,
            }

            email_response = resend.Emails.send(params)

            message_id = None
            if isinstance(email_response, dict):
                if email_response.get("error") or email_response.get("statusCode", 200) >= 400:
                    raise RuntimeError(f"Resend rejected message: {email_response}")
                message_id = email_response.get("id")
            elif hasattr(email_response, "id"):
                message_id = getattr(email_response, "id")
            elif hasattr(email_response, "get"):
                if email_response.get("error"):
                    raise RuntimeError(f"Resend rejected message: {email_response.get('error')}")
                message_id = email_response.get("id")

            if not message_id:
                raise RuntimeError("Resend provider response did not contain an acceptance message ID.")

            # Update SQLite delivery status to sent
            if msg_id:
                try:
                    with sqlite3.connect(DB_PATH) as conn:
                        conn.execute("UPDATE contact_messages SET delivery_status = 'sent' WHERE id = ?", (msg_id,))
                        conn.commit()
                    sync_inbox_markdown()
                except Exception:
                    pass

            logger.info(f"Contact notification sent via Resend (msg_id: #{msg_id}, provider_id: {message_id})")
            return {
                "success": True,
                "delivery_status": "sent",
                "message": f"Thank you, {payload.name}. Your message has been sent directly to Aditya's inbox.",
                "timestamp": now_iso,
                "mailto_fallback": None,
                "message_id": message_id or (str(msg_id) if msg_id else "delivered")
            }
        except Exception as e:
            logger.error(f"Resend delivery failed: {type(e).__name__} - {str(e)[:100]}")
            if msg_id:
                try:
                    with sqlite3.connect(DB_PATH) as conn:
                        conn.execute("UPDATE contact_messages SET delivery_status = 'email_failed' WHERE id = ?", (msg_id,))
                        conn.commit()
                    sync_inbox_markdown()
                except Exception:
                    pass
            return {
                "success": False,
                "delivery_status": "failed",
                "message": "Your message could not be sent. Please try again later or contact me directly.",
                "timestamp": now_iso,
                "mailto_fallback": mailto_url
            }

    # 4. Fallback Mode: Secure SQLite Persistence (when no email provider credentials are provided)
    # Stored locally for administrative ledger inspection, but reported as unconfigured notification delivery
    try:
        init_contact_db()
        ip_masked = hash_ip(client_ip)

        with sqlite3.connect(DB_PATH) as conn:
            cursor = conn.cursor()
            cursor.execute(
                """
                INSERT INTO contact_messages (name, email, subject, message, delivery_status, created_at, ip_hash)
                VALUES (?, ?, ?, ?, ?, ?, ?);
                """,
                (payload.name, payload.email, payload.subject, payload.message, "persisted_without_notification", now_iso, ip_masked)
            )
            conn.commit()
            msg_id = cursor.lastrowid

        if not msg_id:
            raise RuntimeError("Database insertion failed to produce a valid row ID.")

        logger.info(f"Contact message safely stored in SQLite ledger with ID #{msg_id}, but email provider is offline.")
        sync_inbox_markdown()

        return {
            "success": False,
            "delivery_status": "unconfigured",
            "message": "Your message could not be sent. Please try again later or contact me directly.",
            "timestamp": now_iso,
            "mailto_fallback": mailto_url
        }
    except Exception as e:
        logger.error(f"Database persistence failed: {type(e).__name__}")
        return {
            "success": False,
            "delivery_status": "failed",
            "message": "Your message could not be sent. Please try again later or contact me directly.",
            "timestamp": now_iso,
            "mailto_fallback": mailto_url
        }


