const agrega = document.getElementById("agrega");
const nota = document.getElementById("nota");
const lista = document.getElementById("lista");

async function crearNota(texto) {
  const resp = await fetch('http://localhost:3000/notas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ texto })
  });

  return resp.json();
}

async function obtenerNotas() {
  const resp = await fetch('http://localhost:3000/notas');
  return resp.json();
}

async function eliminarNota(id) {
  await fetch(`http://localhost:3000/notas/${id}`, {
    method: 'DELETE'
  });
}

async function renderNotas() {
  const notas = await obtenerNotas();
  const lista = document.getElementById('lista');
  lista.innerHTML = '';

  notas.forEach(nota => {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    li.textContent = nota.texto;

    const btn = document.createElement('button');
    btn.className = 'btn btn-danger btn-sm';
    btn.textContent = 'Eliminar';
    btn.onclick = async () => {
      await eliminarNota(nota.id);
      renderNotas();
    };

    li.appendChild(btn);
    lista.appendChild(li);
  });
}

agrega.addEventListener("click", async () =>{
    const texto = nota.value.trim();
    if(texto !== ""){
        await crearNota(texto);
        nota.value = "";
        renderNotas();
    }
});

window.addEventListener('DOMContentLoaded', renderNotas());