from flask import Flask
import request

app = Flask(__name__)


@app.route("/")
def hello_world():
    return "Hello World"


@app.route("/add", methods=["GET"])
def add_numbers():
    # Get the values from the request arguments
    a = request.args.get("num1", type=int)
    b = request.args.get("num2", type=int)
    # p = request.args.get("num2", type=int)

    # Ensure both numbers are provided
    if a is None or b is None:
        return "Please provide both numbers as query parameters: ?num1=1&num2=2"

    # Perform addition
    result = a + b

    # Return the result
    return f"The result of {a} + {b} is {result}"


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
