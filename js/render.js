// Cargar y renderizar Markdown
fetch('guia/capitulo1.md')
  .then(r => r.text())
  .then(text => {
    document.getElementById('contenido').innerHTML = marked.parse(text);
    MathJax.typesetPromise();  // Renderiza LaTeX
    generarGrafico();
  });

// Función para generar gráfico interactivo con Plotly
function generarGrafico() {
  const x = [];
  const y = [];
  for(let i=-10; i<=10; i+=0.5){
    x.push(i);
    y.push(i*i + 2*i + 1);  // f(x) = x^2 + 2x + 1
  }

  const trace = {
    x: x,
    y: y,
    type: 'scatter',
    mode: 'lines+markers',
    name: 'f(x)'
  };

  Plotly.newPlot('grafico', [trace], {title: 'Gráfico de f(x) = x^2 + 2x + 1'});
}
