// Chat handler with Puter.js, Markdown, MathJax, and syntax highlighting
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
      const response = await puter.ai.chat(msg, {
        model: "gpt-4o-mini",
        systemPrompt: aiMode === "learning"
          ? "You are an expert academic tutor and coding mentor. Use Markdown for clarity, LaTeX for math, and code blocks for programming."
          : "You are a gaming coach AI. Use Markdown lists and code blocks for walkthroughs in a fun, gamer-friendly tone."
      });

      // Render AI reply as Markdown
      const htmlReply = marked.parse(response);
      chat.innerHTML += `<div style="color:#00ff88;">🤖 ${htmlReply}</div>`;

      // Highlight code blocks
      chat.querySelectorAll("pre code").forEach(block => {
        hljs.highlightElement(block);
      });

      // Re-render MathJax for formulas
      if (window.MathJax) {
        MathJax.typesetPromise();
      }

      chat.scrollTop = chat.scrollHeight;
    } catch (err) {
      chat.innerHTML += `<div style="color:red;">⚠️ AI error: ${err.message}</div>`;
    }
  });
}

// Attach handlers for both chat forms
handleChat("learning-form", "learning-input", "learning-chat", "learning");
handleChat("gaming-form", "gaming-input", "gaming-chat", "gaming");
