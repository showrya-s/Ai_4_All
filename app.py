import os
from flask import Flask, request, jsonify, render_template, session, redirect, url_for
from openai import OpenAI

app = Flask(__name__)
app.secret_key = os.environ.get("FLASK_SECRET_KEY", "dev-secret")

# Initialize OpenAI client with your API key
client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

@app.route("/")
def home():
    return render_template("base.html", page="home")

@app.route("/learning")
def learning():
    return render_template("base.html", page="learning")

@app.route("/gaming")
def gaming():
    return render_template("base.html", page="gaming")

# -------- Learning AI Chat --------
@app.route("/api/learning_chat", methods=["POST"])
def learning_chat():
    data = request.json or {}
    user_message = data.get("message", "")
    if not user_message:
        return jsonify({"reply": "Please ask a question."})

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": (
                "You are a helpful academic tutor and coding assistant. "
                "You know every formula, can solve homework step-by-step, "
                "and explain coding concepts clearly."
            )},
            {"role": "user", "content": user_message}
        ],
        temperature=0.6,
        max_tokens=400
    )
    return jsonify({"reply": response.choices[0].message.content})

# -------- Gaming AI Chat --------
@app.route("/api/gaming_chat", methods=["POST"])
def gaming_chat():
    data = request.json or {}
    user_message = data.get("message", "")
    if not user_message:
        return jsonify({"reply": "Please ask about a game."})

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": (
                "You are a gaming coach AI. "
                "Explain strategies, walkthroughs, and the best ways to play games. "
                "Give practical tips and clear guidance."
            )},
            {"role": "user", "content": user_message}
        ],
        temperature=0.7,
        max_tokens=400
    )
    return jsonify({"reply": response.choices[0].message.content})

if __name__ == "__main__":
    app.run(debug=True)
