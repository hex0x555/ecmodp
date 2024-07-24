# print("Hello, World!")

# main.py

from http.server import SimpleHTTPRequestHandler, HTTPServer


class HelloWorldHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == "/":
            self.send_response(200)
            self.send_header("Content-type", "text/plain")
            self.end_headers()
            self.wfile.write(b"Hello World")
        else:
            self.send_error(404, "File not found")


def run(server_class=HTTPServer, handler_class=HelloWorldHandler):
    server_address = ("", 8000)
    httpd = server_class(server_address, handler_class)
    print("Starting httpd server on port 8000...")
    httpd.serve_forever()


if __name__ == "__main__":
    run()
