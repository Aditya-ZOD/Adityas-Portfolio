import os
import sqlite3
import logging
import hashlib
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

def generate_mailto_url(subject: str, message: str, name: str) -> str:
    """Generates a pre-filled mailto URL as a reliable client fallback."""
    recipient = "adityagupta1624111@gmail.com"
    encoded_sub = quote(f"[Portfolio Contact] {subject}")
    body_text = f"Hi Aditya,\n\n{message}\n\nFrom,\n{name}"
    encoded_body = quote(body_text)
    return f"mailto:{recipient}?subject={encoded_sub}&body={encoded_body}"

def deliver_contact_message(payload: ContactRequest, client_ip: str) -> Dict[str, Any]:
    """
    Delivers a contact message based on configured delivery mechanism.
    Does NOT log email addresses or message bodies.
    Returns delivery confirmation dictionary.
    """
    mode = os.getenv("CONTACT_DELIVERY_MODE", "database").lower().strip()
    mailto_url = generate_mailto_url(payload.subject, payload.message, payload.name)
    now_iso = datetime.now(timezone.utc).isoformat()

    # 1. Mode: Explicitly unconfigured
    if mode == "unconfigured" or mode == "none":
        logger.info(f"Contact attempt received while delivery mode is '{mode}' (msg length: {len(payload.message)})")
        return {
            "success": False,
            "delivery_status": "unconfigured",
            "message": "Automated server-side message delivery is not configured on this instance. Please use the direct mailto link to send your message.",
            "timestamp": now_iso,
            "mailto_fallback": mailto_url
        }

    # 2. Mode: SMTP Email Delivery
    if mode == "smtp":
        smtp_host = os.getenv("SMTP_HOST")
        smtp_user = os.getenv("SMTP_USER")
        smtp_pass = os.getenv("SMTP_PASSWORD")
        smtp_port = int(os.getenv("SMTP_PORT", "587"))

        if not smtp_host or not smtp_user:
            logger.warning("SMTP delivery requested but SMTP_HOST or SMTP_USER is missing.")
            return {
                "success": False,
                "delivery_status": "unconfigured",
                "message": "Email delivery service is missing server configuration. Please reach Aditya directly via email.",
                "timestamp": now_iso,
                "mailto_fallback": mailto_url
            }

        try:
            import smtplib
            from email.mime.text import MIMEText
            from email.mime.multipart import MIMEMultipart

            recipient = os.getenv("CONTACT_RECIPIENT_EMAIL", "adityagupta1624111@gmail.com")
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
                "message": "The email delivery server encountered an error transmitting your message. Please click below to send via your email client.",
                "timestamp": now_iso,
                "mailto_fallback": mailto_url
            }

    # 3. Default Mode: Secure SQLite Persistence
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

        if not msg_id:
            raise RuntimeError("Database insertion failed to produce a valid row ID.")

        # Log safely without PII
        logger.info(f"Contact message accepted and safely stored with ID #{msg_id} (length: {len(payload.message)} chars)")
        sync_inbox_markdown()

        return {
            "success": True,
            "delivery_status": "persisted",
            "message": f"Thank you, {payload.name}. Your message has been received and securely stored for Aditya. He will respond soon.",
            "timestamp": now_iso,
            "mailto_fallback": None
        }
    except Exception as e:
        logger.error(f"Database persistence failed: {type(e).__name__}")
        return {
            "success": False,
            "delivery_status": "failed",
            "message": "Storage error while recording your message. Please reach Aditya directly via email.",
            "timestamp": now_iso,
            "mailto_fallback": mailto_url
        }
