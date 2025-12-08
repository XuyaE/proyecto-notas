const agrega = document.getElementById("agrega");
const nota = document.getElementById("nota");
const lista = document.getElementById("lista");

agrega.addEventListener("click", () => {
    const texto = nota.value.trim();
    if (texto !== ""){
        const li = document.createElement("li");
        li.className = "list-group-item d-flex align-items-center justify-content-between";
        li.textContent = texto;

        const elimina = document.createElement("button");
        elimina.textContent = "Eliminar";
        elimina.className = "btn btn-danger";
        elimina.onclick = () => li.remove();

        li.appendChild(elimina);
        lista.appendChild(li);

        nota.value = "";
    }
});