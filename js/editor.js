// ================= CONFIGURACIÓN =================
import { Octokit } from "https://esm.sh/octokit";

let token = localStorage.getItem("github_token");
while (!token) {
  token = prompt("Pegá tu token de GitHub con permisos repo:");
}
localStorage.setItem("github_token", token);

const octokit = new Octokit({ auth: token });

const owner = "PIBSAS";
const repo = "mat1";
const path = "guia/capitulo1.md";
const branch = "main";

const editor = document.getElementById("editor");
const guardarBtn = document.getElementById("guardarBtn");
let shaActual;

// ================= FUNCIONES =================
async function cargarContenido() {
  try {
    const response = await octokit.rest.repos.getContent({
      owner,
      repo,
      path,
      ref: branch
    });

    const contenido = atob(response.data.content);
    editor.value = contenido;
    shaActual = response.data.sha;
  } catch (err) {
    console.error(err);
    alert("Error cargando el capítulo. Revisa la consola.");
  }
}

async function guardar() {
  const nuevoContenido = editor.value;
  try {
    const response = await octokit.rest.repos.createOrUpdateFileContents({
      owner,
      repo,
      path,
      message: "Edición desde panel web",
      content: btoa(unescape(encodeURIComponent(nuevoContenido))),
      sha: shaActual,
      branch
    });

    shaActual = response.data.content.sha;
    alert("Cambios guardados correctamente en GitHub!");
  } catch (err) {
    console.error(err);
    alert("Error al guardar cambios. Revisa la consola.");
  }
}

// ================= INICIALIZACIÓN =================
cargarContenido();
guardarBtn.onclick = guardar;
