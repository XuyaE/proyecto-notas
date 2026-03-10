const btnRegistrar = document.getElementById("btnRegistrar");
const API_URL = 'https://proyecto-notas-3h82.onrender.com';

btnRegistrar.addEventListener('click', async (res, req) => {    

    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    const verificar = await fetch(API_URL+"/usuarios/register",{
        method: "POST",
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({nombre, email, password, confirmPassword})
    });

    if(verificar.status == 400){
        const data = await verificar.json();
        alert(data.mensaje);
        return;
    }

    alert("Usuario registrado correctamente.");
    window.location.href = "./login.html";
});