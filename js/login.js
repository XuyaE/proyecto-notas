const token = sessionStorage.getItem('token');

async function verificarSesion(){

    if (token) {
        const resp = await fetch('http://localhost:3000/usuarios/usuario',{
            headers: {'Authorization' : token}
        });
        if (resp.ok) window.location.href = 'notas.html';
    }
}
verificarSesion();

document.getElementById("btnIngresa").addEventListener('click', async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch('http://localhost:3000/usuarios/login', {
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