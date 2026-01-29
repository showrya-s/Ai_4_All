// Simple chat handling for both Learning and Gaming AI
async function handleChat(formId, inputId, chatId, apiEndpoint) {
  const form = document.getElementById(formId);
  const input = document.getElementById(inputId);
  const chat = document.getElementById(chatId);

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const msg = input.value.trim();
    if (!msg) return;

    chat.innerHTML += `<div style="color:#00f0ff;">🧑 ${msg}</div>`;
    input.value = "";

    try {
      const res = await fetch(apiEndpoint, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ message: msg })
      });
      const data = await res.json();
      chat.innerHTML += `<div style="color:#00ff88;">🤖 ${data.reply}</div>`;
      chat.scrollTop = chat.scrollHeight;
    } catch (err) {
      chat.innerHTML += `<div style="color:red;">⚠️ Error: ${err.message}</div>`;
    }
  });
}

handleChat("learning-form", "learning-input", "learning-chat", "/api/learning_chat");
handleChat("gaming-form", "gaming-input", "gaming-chat", "/api/gaming_chat");
