"""Generates the lead-magnet: a branded 'Systems Audit Checklist' PDF.
Run: python scripts/generate-checklist.py  ->  public/resources/systems-audit-checklist.pdf
"""
import os
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor
from reportlab.pdfgen import canvas

INK = HexColor("#0B0F0D")
CREAM = HexColor("#F4EFE6")
GOLD = HexColor("#B8842F")        # slightly deeper gold for contrast on cream
MUTED = HexColor("#5C6F52")       # olive
GREY = HexColor("#4a4a44")

W, H = A4
MARGIN = 20 * mm

SECTIONS = [
    ("Website & online presence", [
        "Your website clearly says what you do within 5 seconds.",
        "It loads fast on mobile and turns visitors into enquiries.",
        "You own the domain, hosting, and all accounts.",
    ]),
    ("Tools & systems", [
        "Your website, CRM, and invoicing share data automatically.",
        "You're not re-keying the same information between apps.",
        "You're not paying for software your team doesn't use.",
    ]),
    ("Leads & follow-up", [
        "Every enquiry (web, WhatsApp, social) lands in one place.",
        "Follow-ups happen automatically, not just when someone remembers.",
        "You can see your whole sales pipeline at a glance.",
    ]),
    ("Data & ownership", [
        "Your customer data lives in one source of truth.",
        "You can export everything and you control all access.",
        "Reporting takes clicks, not hours of copy-paste.",
    ]),
    ("Automation & AI", [
        "Repetitive admin is automated where it safely can be.",
        "You know which tasks are worth automating and which aren't.",
        "Your systems scale with growth instead of breaking under it.",
    ]),
]


def draw():
    out = os.path.join(os.path.dirname(__file__), "..", "public", "resources",
                       "systems-audit-checklist.pdf")
    os.makedirs(os.path.dirname(out), exist_ok=True)
    c = canvas.Canvas(out, pagesize=A4, pageCompression=1)
    c.setTitle("The Systems Audit Checklist - Xerxes Duane")
    c.setAuthor("Xerxes Duane")

    # Background
    c.setFillColor(CREAM)
    c.rect(0, 0, W, H, fill=1, stroke=0)
    # Top gold bar
    c.setFillColor(GOLD)
    c.rect(0, H - 8 * mm, W, 8 * mm, fill=1, stroke=0)

    y = H - 28 * mm
    c.setFillColor(GOLD)
    c.setFont("Helvetica-Bold", 9)
    c.drawString(MARGIN, y, "THRESHOLD WORKS")
    y -= 12 * mm
    c.setFillColor(INK)
    c.setFont("Times-Bold", 30)
    c.drawString(MARGIN, y, "The Systems Audit Checklist")
    y -= 9 * mm
    c.setFillColor(GREY)
    c.setFont("Helvetica", 11)
    c.drawString(MARGIN, y, "15 quick checks to find where your business is leaking time, money, and leads.")
    y -= 14 * mm

    box = 3.6 * mm
    for title, items in SECTIONS:
        c.setFillColor(GOLD)
        c.setFont("Helvetica-Bold", 12)
        c.drawString(MARGIN, y, title.upper())
        y -= 7.5 * mm
        c.setFont("Helvetica", 11)
        for item in items:
            c.setStrokeColor(GREY)
            c.setLineWidth(0.8)
            c.rect(MARGIN, y - box + 1.2 * mm, box, box, fill=0, stroke=1)
            c.setFillColor(INK)
            c.drawString(MARGIN + box + 4 * mm, y, item)
            y -= 7 * mm
        y -= 4 * mm

    # Footer CTA band
    band_h = 22 * mm
    c.setFillColor(INK)
    c.rect(0, 0, W, band_h, fill=1, stroke=0)
    c.setFillColor(CREAM)
    c.setFont("Times-Bold", 13)
    c.drawString(MARGIN, band_h - 9 * mm, "Ticked fewer than you'd like? That's exactly what we fix.")
    c.setFillColor(GOLD)
    c.setFont("Helvetica-Bold", 10.5)
    c.drawString(MARGIN, band_h - 15.5 * mm,
                 "Book your free 60-minute systems audit  -  xerxesduane.com")

    c.showPage()
    c.save()
    size = os.path.getsize(out)
    print(f"Wrote {out} ({round(size/1024,1)} KB)")


if __name__ == "__main__":
    draw()
