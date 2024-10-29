from flask import Flask, request
from flask_cors import CORS
import matplotlib.pyplot as plt
import io
import base64

# import request

app = Flask(__name__)
CORS(app)


@app.route("/")
def hello_world():
    return "Hello World"


@app.route("/add", methods=["GET"])
def add_numbers():
    # Get the values from the request arguments
    a = request.args.get("a", type=int)
    b = request.args.get("b", type=int)
    p = request.args.get("p", type=int)

    print(f"value of a is {a}")
    print(f"value of b is {b}")
    print(f"value of p is {p}")

    # Ensure 3 numbers are provided
    if a is None or b is None or p is None:
        return "Please provide 3 numbers as query parameters: "

    # Perform addition
    # result = a + b + p
    points = only_get_rat_points(a, b, p)

    # Return the result
    return f"The rational points on this curve with \n a = {a} , b = {b} and over Z({p}) is \n {points}"


@app.route("/plot", methods=["GET"])
def generate_plot():
    # Get the values from the request arguments
    a = request.args.get("a", type=int)
    b = request.args.get("b", type=int)
    p = request.args.get("p", type=int)

    # Ensure 3 numbers are provided
    if a is None or b is None or p is None:
        return "Please provide 3 numbers as query parameters: a, b, and p"

    # Calculate the points on the elliptic curve
    points = only_get_rat_points(a, b, p)

    # Check if points are found
    if not points:
        return "No points found for the given values of a, b, and p."

    # Use the original plot_points function to create the plot
    x_vals, y_vals = zip(*points)

    # Create a scatter plot
    plt.figure(figsize=(5, 5))  # Adjust the figure size as needed
    plt.scatter(
        x_vals, y_vals, color="blue", marker="o"
    )  # Choose color and marker style

    # Adding labels and title
    plt.xlabel("x")
    plt.ylabel("y")
    plt.title("Plot of Points on Elliptic Curve")

    # Display grid
    plt.grid(True)

    # Setting axis limits with some margin
    plt.xlim(min(x_vals) - 1, max(x_vals) + 1)
    plt.ylim(min(y_vals) - 1, max(y_vals) + 1)

    # Convert plot to PNG image and return as base64
    img = io.BytesIO()
    plt.savefig(img, format="png")
    img.seek(0)
    plot_url = base64.b64encode(img.getvalue()).decode()

    return f"<img src='data:image/png;base64,{plot_url}'/>"


############################
def modular_sqrt(a, p):
    """Returns the square root of a modulo p if it exists, using the Tonelli-Shanks algorithm"""
    if a == 0:
        return 0
    if pow(a, (p - 1) // 2, p) == p - 1:
        return None  # a is not a quadratic residue modulo p
    if p % 4 == 3:
        return pow(a, (p + 1) // 4, p)

    # Case p % 4 == 1 (Tonelli-Shanks algorithm)
    # Step 1: Decompose p - 1 on the form q * 2^s with q odd
    s = 0
    q = p - 1
    while q % 2 == 0:
        s += 1
        q //= 2

    # Step 2: Find a non-residue z (i.e., a quadratic non-residue modulo p)
    z = 2
    while pow(z, (p - 1) // 2, p) != p - 1:
        z += 1

    # Step 3: Set initial variables
    m = s
    c = pow(z, q, p)
    t = pow(a, q, p)
    r = pow(a, (q + 1) // 2, p)

    # Step 4: Repeat until t == 1
    while t != 1:
        # Find the smallest i such that t^(2^i) == 1
        i = 0
        temp = t
        while temp != 1:
            temp = pow(temp, 2, p)
            i += 1

        # Update values
        b = pow(c, 2 ** (m - i - 1), p)
        m = i
        c = pow(b, 2, p)
        t = (t * c) % p
        r = (r * b) % p

    return r


def find_rational_points(a, b, p):
    rational_points = []
    for x in range(p):
        rhs = (x**3 + a * x + b) % p
        y = modular_sqrt(rhs, p)
        if y is not None:
            rational_points.append((x, y))
            if y != 0 and p != 2 * y:  # Check for the other root only if it's different
                rational_points.append((x, p - y))
    return rational_points


def only_get_rat_points(a, b, p):
    points = find_rational_points(a, b, p)
    print(points)
    return points


# a = -9
# b = 14
# p = 29
# points = only_get_rat_points(a, b, p)

############################


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
