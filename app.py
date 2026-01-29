import os
from flask import Flask, render_template, request, jsonify
from openai import OpenAI

app = Flask(__name__)
app.secret_key = os.environ.get("FLASK_SECRET_KEY", "dev-secret")

# Initialize OpenAI client with your API key from environment
client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

# ---------------- ROUTES ----------------
@app.route("/")
def home():
    return render_template("base.html", page="home", page_title="AI 4 ALL")

@app.route("/learning")
def learning():
    return render_template("base.html", page="learning", page_title="Learning & Coding AI")

@app.route("/gaming")
def gaming():
    return render_template("base.html", page="gaming", page_title="Gaming AI")

# ---------------- LEARNING AI CHAT ----------------
@app.route("/api/learning_chat", methods=["POST"])
def learning_chat():
    data = request.json or {}
    user_message = data.get("message", "").strip()
    if not user_message:
        return jsonify({"reply": "Please ask a question."})

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are an expert academic tutor and coding mentor. "
                        "You know every formula in mathematics, physics, chemistry, "
                        "and can explain them step-by-step. "
                        "You solve homework problems with clear reasoning, showing all steps and examples. "
                        "You act as a coding assistant: explain concepts, debug code, and suggest improvements. "
                        "Always teach in a way that helps the student understand, not just give the answer. "
                        "Use simple language for beginners, but provide deeper detail if asked."
                    )
                },
                {"role": "user", "content": user_message}
            ],
            temperature=0.6,
            max_tokens=400
        )
        ai_reply = response.choices[0].message.content
        return jsonify({"reply": ai_reply})
    except Exception as e:
        return jsonify({"reply": "AI error occurred.", "error": str(e)}), 500

# ---------------- GAMING AI CHAT ----------------
@app.route("/api/gaming_chat", methods=["POST"])
def gaming_chat():
    data = request.json or {}
    user_message = data.get("message", "").strip()
    if not user_message:
        return jsonify({"reply": "Please ask about a game."})

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are a gaming coach AI. "
                        "Explain strategies, walkthroughs, and the best ways to play games. "
                        "Give practical tips for improving skills, analyzing play styles, and mastering levels. "
                        "Act like a guide for both casual and competitive players. "
                        "Provide step-by-step strategies, highlight common mistakes, and suggest advanced tactics. "
                        "Keep the tone fun, motivating, and gamer-friendly."
                    )
                },
                {"role": "user", "content": user_message}
            ],
            temperature=0.7,
            max_tokens=400
        )
        ai_reply = response.choices[0].message.content
        return jsonify({"reply": ai_reply})
    except Exception as e:
        return jsonify({"reply": "AI error occurred.", "error": str(e)}), 500

# ---------------- MAIN ----------------
if __name__ == "__main__":
    app.run(debug=True)
