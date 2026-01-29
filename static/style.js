// Improved chat handling for both Learning and Gaming AI
async function handleChat(formId, inputId, chatId, apiEndpoint) {
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
      const res = await fetch(apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg })
      });

      if (!res.ok) {
        // If backend returns error status
        const errText = await res.text();
        chat.innerHTML += `<div style="color:red;">⚠️ Server error: ${errText}</div>`;
        return;
      }

      const data = await res.json();

      // Show AI reply or error
      if (data.reply) {
        chat.innerHTML += `<div style="color:#00ff88;">🤖 ${data.reply}</div>`;
      } else if (data.error) {
        chat.innerHTML += `<div style="color:red;">⚠️ AI error: ${data.error}</div>`;
      } else {
        chat.innerHTML += `<div style="color:red;">⚠️ Unknown response from server</div>`;
      }

      chat.scrollTop = chat.scrollHeight;
    } catch (err) {
      chat.innerHTML += `<div style="color:red;">⚠️ Network error: ${err.message}</div>`;
    }
  });
}

// Attach handlers for both chat forms
handleChat("learning-form", "learning-input", "learning-chat", "/api/learning_chat");
handleChat("gaming-form", "gaming-input", "gaming-chat", "/api/gaming_chat");
