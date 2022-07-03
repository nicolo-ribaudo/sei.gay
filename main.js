const params = new URLSearchParams(location.search);

const name = params.get("n");
if (name) {
  document.querySelectorAll("[data-template='name']").forEach(($el) => {
    $el.textContent = ` ${name}`;
  });
}

const flag = params.get("f");
if (flag) {
  document.querySelectorAll("[data-template='flag']").forEach(($el) => {
    $el.textContent = `${flag}`;
    $el.style.fontSize = `clamp(1em, ${15 / flag.length}em, 5em)`;
    try {
      $el.classList.add(`flag-${flag}`);
    } catch {}
  });
}

document.getElementById("envelope").addEventListener("click", () => {
  document.body.classList.toggle("open");
});
