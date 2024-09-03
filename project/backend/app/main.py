from flask import Flask, request

# import request

app = Flask(__name__)


@app.route("/")
def hello_world():
    return "Hello World"


@app.route("/add", methods=["GET"])
def add_numbers():
    # Get the values from the request arguments
    a = request.args.get("a", type=int)
    b = request.args.get("b", type=int)
    p = request.args.get("p", type=int)

    # Ensure 3 numbers are provided
    if a is None or b is None or p is None:
        return "Please provide 3 numbers as query parameters: ?a=1&b=2"

    # Perform addition
    result = a + b + p

    # Return the result
    return f"The result of {a} + {b} + {p} is {result}"


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
