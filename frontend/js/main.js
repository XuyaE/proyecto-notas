const agrega = document.getElementById("agrega");
const title = document.getElementById("title");
const nota = document.getElementById("nota");
const lista = document.getElementById("lista");
const editTitulo = document.getElementById('editTitulo');
const editTexto = document.getElementById('editTexto');
const userTitle = document.getElementById('userTitle');
const btnGuardarCambios = document.getElementById('btnGuardarCambios');
const btnLogOut = document.getElementById("btnLogOut");
const modal = new bootstrap.Modal(document.getElementById('modalEditar'));
const token = sessionStorage.getItem('token');

let notaEnEdicion = null;

async function userInfo() {

  const userNombre = await fetch('http://localhost:3000/usuarios/usuario', {
  headers: {Authorization : token}
  });

  const userData = await userNombre.json();

  userTitle.textContent = 'Bienvenido, '+userData.nombre;
}
userInfo();

function manejarExpiracion(resp) {
  if (resp.status === 401) {
    alert("Tu sesión ha expirado");
    sessionStorage.removeItem('token');
    window.location.href = 'login.html';
    return true;
  }
  return false;
}

if (!token){
  alert('Debes iniciar sesión');
  window.location.href = 'login.html';
}

btnGuardarCambios.onclick = async () => {
  const nuevoTitulo = editTitulo.value.trim();
  const nuevoTexto = editTexto.value.trim();

  await actualizarNota(notaEnEdicion, nuevoTexto, nuevoTitulo);
  obtenerNotas();
  modal.hide();
}

async function obtenerNotas() {
  const resp = await fetch('http://localhost:3000/notas',{
    method: 'GET',
    headers: {'Authorization': token}
  });

  if(manejarExpiracion(resp)) return;

  const data = await resp.json();

  const lista = document.getElementById('lista');
  lista.innerHTML = '';

  data.forEach(nota => {
    const li = document.createElement('li');
    const h5 = document.createElement('h5');
    const div = document.createElement('div');
    const p = document.createElement('p');
    const btnEdit = document.createElement('button');
    const btnDelete = document.createElement('button');
    li.className = 'card mb-3';
    h5.className = 'card-header';
    h5.textContent = nota.titulo;
    div.className = 'card-body';
    p.className = 'card-text';
    p.textContent = nota.texto;

    btnEdit.className = 'btn btn-secondary';
    btnEdit.textContent = 'Editar';
    btnEdit.onclick = () => {
      notaEnEdicion = nota.id;

      editTitulo.value = nota.titulo;
      editTexto.value = nota.texto;
      
      modal.show();
    }

    btnDelete.className = 'btn btn-danger ms-2';
    btnDelete.textContent = 'Eliminar';
    btnDelete.onclick = async () => {
      await eliminarNota(nota.id);
      obtenerNotas();
    }

    
    div.appendChild(p);
    div.appendChild(btnEdit);
    div.appendChild(btnDelete);
    li.appendChild(h5);
    li.appendChild(div);
    lista.appendChild(li);
  });
}

async function crearNota(texto, titulo) {
  const resp = await fetch('http://localhost:3000/notas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization' : token },
    body: JSON.stringify({ texto, titulo })
  });

  if(manejarExpiracion(resp)) return;

  return resp.json();
}

async function eliminarNota(id) {
  const resp = await fetch(`http://localhost:3000/notas/${id}`, {
    method: 'DELETE',
    headers: {'Authorization' : token}
  });
  if(manejarExpiracion(resp)) return;
}

async function actualizarNota(id, texto, titulo) {
  const resp = await fetch(`http://localhost:3000/notas/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'Authorization': token },
    body: JSON.stringify({ texto, titulo })
  });
  if(manejarExpiracion(resp)) return;
}

agrega.addEventListener("click", async () =>{
    const texto = nota.value.trim();
    const titulo = title.value.trim();
    if(texto !== "" && titulo !== ""){
        await crearNota(texto, titulo);
        nota.value = "";
        title.value = "";
        obtenerNotas();
    }
});

btnLogOut.addEventListener("click", async () =>{
  sessionStorage.removeItem('token');
  alert("Sesion cerrada correctamente");
  window.location.href = 'login.html';
});

window.addEventListener('DOMContentLoaded', obtenerNotas);