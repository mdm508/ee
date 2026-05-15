document.addEventListener("click", (event) => {
  const button = event.target.closest(".cloze-reveal");

  if (!button || button.dataset.revealed === "true") {
    return;
  }

  button.textContent = button.dataset.answer;
  button.dataset.revealed = "true";
});
