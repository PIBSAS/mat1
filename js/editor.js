// Cargar contenido inicial
fetch('guia/capitulo1.md')
  .then(r => r.text())
  .then(text => {
    document.getElementById('editor').value = text;
  });

// Guardar cambios (simulado)
// Para commits reales usar Octokit.js con token o OAuth GitHub
function guardar() {
  const nuevoContenido = document.getElementById('editor').value;
  console.log("Contenido guardado (simulado):");
  console.log(nuevoContenido);
  alert("Cambios guardados (simulado). En producción se haría commit a GitHub aquí.");
}
