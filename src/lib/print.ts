// طباعة بالاتجاه المطلوب (أفقي للشهادات، رأسي للأوراق)
export function printPage(orientation: "landscape" | "portrait") {
  const style = document.createElement("style");
  style.textContent = `@page{size:A4 ${orientation};margin:${orientation === "landscape" ? "0" : "10mm"}}`;
  document.head.appendChild(style);
  const cleanup = () => { style.remove(); window.removeEventListener("afterprint", cleanup); };
  window.addEventListener("afterprint", cleanup);
  window.print();
}
