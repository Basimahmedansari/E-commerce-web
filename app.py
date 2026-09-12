#!/usr/bin/env python3
"""
LUXORA - Ultra-Minimalist Python Luxury E-Commerce Server
Built with Python 3 standard library (zero pip dependencies required).
Runs seamlessly with: python3 app.py
"""
import http.server
import socketserver
import json
import os
import urllib.parse
from datetime import datetime

PORT = int(os.environ.get("PORT", os.environ.get("PYTHON_PORT", 8000)))
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PRODUCTS_FILE = os.path.join(BASE_DIR, "products.json")

# In-memory store for orders and sessions
ORDERS = {
    "LUX-89210": {
        "id": "LUX-89210",
        "date": "2026-03-24",
        "status": "In Transit",
        "carrier": "Ferrari Luxury Courier Express",
        "location": "Geneva Customs Hub",
        "items": [{"name": "Chronographe Imperial Dual-Tone", "quantity": 1, "price": 1450}],
        "total": 1450,
        "timeline": [
            {"title": "Order Placed", "time": "March 24, 09:15 AM", "done": True},
            {"title": "Vault Authentication", "time": "March 24, 11:30 AM", "done": True},
            {"title": "Dispatched via Armored Carrier", "time": "March 24, 04:00 PM", "done": True},
            {"title": "Customs Cleared & In Transit", "time": "March 25, 08:45 AM", "done": True},
            {"title": "Out for Signature Delivery", "time": "Expected Tomorrow", "done": False}
        ]
    }
}

def load_products():
    if os.path.exists(PRODUCTS_FILE):
        with open(PRODUCTS_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    return []

class LuxoraHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path

        # API: Get all products (supports both /api/products and /products.json)
        if path in ("/api/products", "/products.json"):
            products = load_products()
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps(products).encode("utf-8"))
            return

        # API: Track order
        if path.startswith("/api/track"):
            params = urllib.parse.parse_qs(parsed.query)
            order_id = params.get("id", [""])[0].upper()
            order = ORDERS.get(order_id)
            self.send_response(200 if order else 404)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            res = {"success": bool(order), "order": order if order else None, "message": "Order found" if order else "Order ID not found"}
            self.wfile.write(json.dumps(res).encode("utf-8"))
            return

        # Serve static assets or root
        if path == "/" or path == "/index.html":
            html_path = os.path.join(BASE_DIR, "templates", "index.html")
            if os.path.exists(html_path):
                with open(html_path, "rb") as f:
                    content = f.read()
                self.send_response(200)
                self.send_header("Content-Type", "text/html; charset=utf-8")
                self.end_headers()
                self.wfile.write(content)
                return

        # Fallback to serving files from public/ or static/
        public_file = os.path.join(BASE_DIR, "public", path.lstrip("/"))
        if os.path.isfile(public_file):
            return self.serve_file(public_file)

        super().do_GET()

    def do_POST(self):
        path = urllib.parse.urlparse(self.path).path
        content_length = int(self.headers.get("Content-Length", 0))
        body = self.rfile.read(content_length).decode("utf-8") if content_length > 0 else "{}"
        try:
            data = json.loads(body)
        except Exception:
            data = {}

        # API: Create order / Checkout
        if path == "/api/checkout":
            import random
            order_num = f"LUX-{random.randint(10000, 99999)}"
            order_data = {
                "id": order_num,
                "date": datetime.now().strftime("%Y-%m-%d"),
                "status": "Authenticated & Queued",
                "customer": data.get("customer", {}),
                "items": data.get("items", []),
                "total": data.get("total", 0),
                "paymentMethod": data.get("paymentMethod", "Credit Card"),
                "timeline": [
                    {"title": "Payment Confirmed", "time": datetime.now().strftime("%b %d, %I:%M %p"), "done": True},
                    {"title": "Vault Quality Inspection", "time": "In Progress", "done": True},
                    {"title": "Dispatch via Armored Courier", "time": "Pending", "done": False},
                    {"title": "Signature Hand-Delivery", "time": "Estimated in 2-3 Business Days", "done": False}
                ]
            }
            ORDERS[order_num] = order_data
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({"success": True, "orderId": order_num, "order": order_data}).encode("utf-8"))
            return

        self.send_response(404)
        self.end_headers()

    def serve_file(self, file_path):
        import mimetypes
        mime_type, _ = mimetypes.guess_type(file_path)
        with open(file_path, "rb") as f:
            data = f.read()
        self.send_response(200)
        self.send_header("Content-Type", mime_type or "application/octet-stream")
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        self.wfile.write(data)

if __name__ == "__main__":
    socketserver.TCPServer.allow_reuse_address = True
    handler = LuxoraHandler
    with socketserver.TCPServer(("0.0.0.0", PORT), handler) as httpd:
        print(f"LUXORA Python Server is running at http://0.0.0.0:{PORT}")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down LUXORA server.")
