from flask import Flask, render_template, request, session, redirect, url_for, Response
import os

app = Flask(__name__)
app.secret_key = os.urandom(32)

# =====================
# main page
# =====================
@app.route('/', methods = ["GET", "POST"])
def main():
    return render_template("base.html")

# =====================
# run app
# =====================
if __name__ == '__main__':
    app.debug = True
    app.run(threaded = True)
