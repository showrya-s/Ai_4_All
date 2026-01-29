// Puter.js integration for Learning & Gaming AI chats
// Make sure you included <script src="https://js.puter.com/puter.js"></script> in base.html

async function handleChat(formId, inputId, chatId, aiMode) {
  const form = document.getElementById(formId);
  const input = document.getElementById(inputId);
  const chat = document.getElementById(chatId);

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const msg = input.value.trim();
    if (!msg) return;

    // Show user message
    chat.innerHTML += `<div style="color:#00f0ff;">🧑 ${msg}</div>`;
    input.value = "";

    try {
      // Call Puter AI directly
      const response = await puter.ai.chat(msg, {
        model: "gpt-4o-mini", // you can also try "gpt-4o" or "codex"
        systemPrompt: aiMode === "learning"
          ? "You are an expert academic tutor and coding mentor. Explain formulas, solve homework step-by-step, and teach coding clearly."
          : "You are a gaming coach AI. Explain strategies, walkthroughs, and tips in a fun, gamer-friendly way."
      });

      chat.innerHTML += `<div style="color:#00ff88;">🤖 ${response}</div>`;
      chat.scrollTop = chat.scrollHeight;
    } catch (err) {
      chat.innerHTML += `<div style="color:red;">⚠️ AI error: ${err.message}</div>`;
    }
  });
}

// Attach handlers for both chat forms
handleChat("learning-form", "learning-input", "learning-chat", "learning");
handleChat("gaming-form", "gaming-input", "gaming-chat", "gaming");
