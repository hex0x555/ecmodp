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
    #result = a + b + p
    points = only_get_rat_points(a, b, p)

    # Return the result
    return f"The result of {a} + {b} mod {p} is {points}"

############################
def modular_sqrt(a, p):
    """ Returns the square root of a modulo p if it exists, using the Tonelli-Shanks algorithm """
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
        rhs = (x**3 + a*x + b) % p
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

#a = -9
#b = 14
#p = 29
#points = only_get_rat_points(a, b, p)

############################


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
