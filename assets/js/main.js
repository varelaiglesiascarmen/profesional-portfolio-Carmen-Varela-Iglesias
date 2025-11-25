// components-loader.js

async function loadComponent(targetId, filePath) {
  const container = document.getElementById(targetId);
  if (!container) {
    console.error(`No se encontró el elemento #${targetId}`);
    return;
  }

  try {
    const url = new URL(filePath, window.location.href).href;
    const resp = await fetch(url, { cache: "no-store" });

    if (!resp.ok) {
      throw new Error(`Error ${resp.status} cargando ${filePath}`);
    }

    const html = await resp.text();
    container.innerHTML = html;
  } catch (err) {
    console.error(err);
    container.innerHTML = `<div style="color:red">No se pudo cargar ${filePath}</div>`;
  }
}

window.addEventListener("DOMContentLoaded", () => {
  loadComponent("header", "assets/components/header.html");
  loadComponent("footer", "assets/components/footer.html");
});
