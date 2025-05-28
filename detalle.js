let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

// Función para alternar el estado de favorito (adaptada para personas del FBI)
function toggleFavorito(uid, title, image) {
    const esFavorito = favoritos.some(persona => persona.uid === uid);

    if (esFavorito) {
        // Eliminar del array de favoritos
        favoritos = favoritos.filter(p => p.uid !== uid);
        document.getElementById(`corazon-${uid}`).textContent = '🤍';
    } else {
        // Agregar a favoritos
        favoritos.push({
            uid,
            title,
            image
        });
        document.getElementById(`corazon-${uid}`).textContent = '❤️';
    }

    // Guardar favoritos en localStorage
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
}

// Función para actualizar el icono del favorito cuando se carga el detalle
function actualizarIconoFavorito(uid) {
    const corazonIcono = document.getElementById(`corazon-${uid}`);
    if (!corazonIcono) return;

    // Si la persona está en favoritos, mostrar el icono de favorito
    if (favoritos.some(persona => persona.uid === uid)) {
        corazonIcono.textContent = '❤️';
    } else {
        corazonIcono.textContent = '🤍';
    }
}

function mostrarDetalle(uid) {
    // Usamos el proxy solo para desarrollo por el problema de CORS
    fetch(`https://corsproxy.io/?https://api.fbi.gov/wanted/v1/list?uid=${uid}`)
        .then(res => res.json())
        .then(data => {
            const persona = data.items && data.items.length > 0 ? data.items[0] : null;
            if (!persona) {
                document.getElementById("app").innerHTML = `<p>No se encontró información de la persona.</p>`;
                return;
            }
            const imagen = persona.images && persona.images[0] ? persona.images[0].original : '';
            const detalle = `
                <section class="c-detalle">
                    <h2>${persona.title}</h2>
                    <img src="${imagen}" alt="${persona.title}" height="120" width="auto">
                    <p>${persona.description || ''}</p>
                    <p>Sexo: ${persona.sex || 'No especificado'}</p>
                    <p>Nacionalidad: ${persona.nationality || 'No especificada'}</p>
                    <p>Oficinas: ${persona.field_offices ? persona.field_offices.join(', ') : ''}</p>
                    <button id="favorito-btn-${persona.uid}" onclick="toggleFavorito('${persona.uid}', '${persona.title.replace(/'/g, "\\'")}', '${imagen}')">
                        <span id="corazon-${persona.uid}" class="corazon">${favoritos.some(p => p.uid === persona.uid) ? '❤️' : '🤍'}</span> Favorito
                    </button>
                </section>
            `;

            // Mostrar el detalle de la persona en el DOM
            const app = document.getElementById("app");
            app.innerHTML = detalle;

            // Actualizar el icono de favorito
            actualizarIconoFavorito(persona.uid);

            // Llamar a la función para agregar el botón "Volver al inicio"
            volverAlInicio();
        })
        .catch(error => {
            console.error("Error al obtener los detalles de la persona:", error);
            document.getElementById("app").innerHTML = `<p>Error al cargar los detalles de la persona.</p>`;
        });
}

// Función para volver al inicio
function volverAlInicio() {
    const botonVolver = document.createElement("button");
    botonVolver.textContent = "Volver al inicio";
    botonVolver.style.marginTop = "20px";
    botonVolver.style.padding = "10px 20px";
    botonVolver.style.fontSize = "16px";
    botonVolver.style.cursor = "pointer";
    botonVolver.style.backgroundColor = "#007BFF";
    botonVolver.style.color = "white";
    botonVolver.style.border = "none";
    botonVolver.style.borderRadius = "5px";
    botonVolver.addEventListener("click", () => {
        window.location.href = "index.html";
    });

    // Agregar el botón al final del contenedor principal
    const app = document.getElementById("app");
    app.appendChild(botonVolver);
}