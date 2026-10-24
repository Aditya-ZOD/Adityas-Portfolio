"""
CLI Transmission Inbox Viewer for Aditya's Cosmos.
Run via:
    npm run inbox
or:
    python backend/view_inbox.py
"""
import sys
from pathlib import Path

# Add project root to sys.path
BASE_DIR = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(BASE_DIR))

from backend.app.services.contact_service import get_all_contact_messages, INBOX_PATH, sync_inbox_markdown

def main():
    sync_inbox_markdown()
    messages = get_all_contact_messages()

    print("=" * 70)
    print(" 📬 ADITYA'S COSMOS — TRANSMISSION INBOX")
    print(f" Total Messages: {len(messages)}")
    print(f" Markdown File:  {INBOX_PATH}")
    print("=" * 70)

    if not messages:
        print("\n [!] No transmissions found in database yet.\n")
        return

    for msg in messages:
        print(f"\n📨 [#{msg['id']}] {msg['name']} <{msg['email']}>")
        print(f"   🕒 Received: {msg['created_at']}")
        print(f"   📌 Subject:  {msg['subject']}")
        print(f"   📋 Status:   {msg['delivery_status']}")
        print("   💬 Message:")
        for line in msg['message'].splitlines():
            print(f"      {line}")
        print("-" * 70)

if __name__ == "__main__":
    main()
