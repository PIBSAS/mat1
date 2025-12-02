// ================= CONFIGURACIÓN =================
let token = localStorage.getItem("github_token");

// Mientras no haya token válido, mostrar prompt
while (!token) {
  token = prompt("Pegá tu token de GitHub con permisos repo:");
}

localStorage.setItem("github_token", token); // guarda para futuras recargas

const owner = "PIBSAS";        
const repo = "mat1";           
const path = "guia/capitulo1.md";  
const branch = "main";         

// Inicializar Octokit
const octokit = new Octokit.Octokit({ auth: token });

// ================= FUNCIONES =================

// Cargar contenido del capítulo desde GitHub
async function cargarContenido() {
  try {
    const response = await octokit.repos.getContent({
      owner,
      repo,
      path,
      ref: branch
    });

    // Decodificar base64 a texto
    const contenido = atob(response.data.content);
    document.getElementById('editor').value = contenido;

    // Guardar SHA actual para actualizar archivo
    window.shaActual = response.data.sha;
  } catch (err) {
    console.error(err);
    alert("Error cargando el capítulo. Revisa la consola.");
  }
}

// Guardar cambios como commit en GitHub
async function guardar() {
  const nuevoContenido = document.getElementById('editor').value;

  try {
    const response = await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path,
      message: "Edición desde panel web",
      content: btoa(unescape(encodeURIComponent(nuevoContenido))),
      sha: window.shaActual,
      branch
    });

    // Actualizar SHA para futuros commits
    window.shaActual = response.data.content.sha;
    alert("Cambios guardados correctamente en GitHub!");
  } catch (err) {
    console.error(err);
    alert("Error al guardar cambios. Revisa la consola.");
  }
}

// ================= INICIALIZACIÓN =================
cargarContenido();

// Asociar botón al guardado
document.getElementById('guardarBtn').onclick = guardar;
