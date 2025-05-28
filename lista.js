// Función para mostrar la lista de personas buscadas del FBI
function mostrarlista(personas) {
    const seccion = document.createElement("section");
    seccion.classList.add("c-lista");

    const buscador = document.createElement("input");
    buscador.classList.add("c-buscador");
    buscador.type = "text";
    buscador.placeholder = "Buscar personas...";
    buscador.addEventListener("input", (evento) => buscarPersona(evento, personas));

    // Generar la lista inicial
    seccion.innerHTML = generarLista(personas);

    // Agregar elementos al contenedor dinámico
    const contenidoDinamico = document.getElementById("contenido-dinamico");
    contenidoDinamico.innerHTML = ""; // Limpiar contenido previo
    contenidoDinamico.appendChild(buscador);
    contenidoDinamico.appendChild(seccion);
}

function generarLista(personas) {
    let listaHTML = "";
    for (let i = 0; i < personas.length; i++) {
        const persona = personas[i];
        const imagen = persona.images && persona.images[0] ? persona.images[0].original : '';
        listaHTML += `
        <div class="c-lista-cripto" onclick="mostrarDetalle('${persona.uid}')">
            <p>${persona.title}</p>
            <img src="${imagen}" width="auto" height="60" loading="lazy" alt="${persona.title}">
            <p>${persona.field_offices ? persona.field_offices.join(', ') : ''}</p>
        </div>`;
    }

    return listaHTML;
}

function buscarPersona(evento, personas) {
    const texto = evento.target.value.toLowerCase();
    const listaFiltrada = personas.filter((persona) => persona.title.toLowerCase().includes(texto));
    document.querySelector(".c-lista").innerHTML = generarLista(listaFiltrada);
}