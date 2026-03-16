import http.server
import socketserver
import os

PORT = 8080
DIRECTORY = "."

class PrettyUrlHandler(http.server.SimpleHTTPRequestHandler):
    """
    A custom handler that serves '.html' files for extension-less URLs.
    For example, a request for '/daily-planner' will serve '/daily-planner.html'.
    """
    def do_GET(self):
        # Get the path from the URL, ignoring any query parameters
        url_path = self.path.split('?')[0]

        # If the path has no file extension and doesn't end in a slash...
        if not os.path.splitext(url_path)[1] and not url_path.endswith('/'):
            # ...check if a corresponding .html file exists.
            file_path = self.translate_path(url_path + '.html')
            if os.path.exists(file_path):
                # If it exists, rewrite the path to include .html
                self.path = url_path + '.html'
        
        # Let the original SimpleHTTPRequestHandler handle the request with the (possibly modified) path
        return http.server.SimpleHTTPRequestHandler.do_GET(self)

os.chdir(DIRECTORY)

with socketserver.TCPServer(("", PORT), PrettyUrlHandler) as httpd:
    print(f"Serving at http://localhost:{PORT}")
    print("This server supports pretty URLs (e.g., /daily-planner will serve /daily-planner.html)")
    print("Press Ctrl+C to stop the server.")
    httpd.serve_forever()