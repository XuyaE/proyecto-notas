const token = sessionStorage.getItem('token');
const API_URL = 'https://proyecto-notas-3h82.onrender.com';

async function verificarSesion(){

    if (token) {
        const resp = await fetch(API_URL+'/usuarios/usuario',{
            headers: {'Authorization' : token}
        });
        if (resp.ok) window.location.href = 'notas.html';
    }
}
verificarSesion();

document.getElementById("btnIngresa").addEventListener('click', async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch(API_URL+'/usuarios/login', {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({email, password})
    });

    const data = await response.json();

    if (response.ok){
    //Guarda token
    sessionStorage.setItem('token', data.token);
    console.log("Se logro ingresar");
    window.location.href = 'notas.html';
    } else {

    alert(data.mensaje || 'Error al iniciar sesión');
    }
});