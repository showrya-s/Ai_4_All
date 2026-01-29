from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("base.html", page="home", page_title="AI 4 ALL")

@app.route("/learning")
def learning():
    return render_template("base.html", page="learning", page_title="Learning & Coding AI")

@app.route("/gaming")
def gaming():
    return render_template("base.html", page="gaming", page_title="Gaming AI")

if __name__ == "__main__":
    app.run(debug=True)
