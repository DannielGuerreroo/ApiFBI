function mostrarFavoritos() {
    const app = document.getElementById("app");
    app.innerHTML = "";

    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    if (favoritos.length === 0) {
        app.innerHTML = "<p>No tienes personas en favoritos.</p>";
        return;
    }

    const contenedor = document.createElement("section");
    contenedor.classList.add("c-lista");

    contenedor.innerHTML = favoritos
        .map(
            (persona) => `
            <div class="c-lista-cripto">
                <p>${persona.title}</p>
                <img src="${persona.image}" alt="${persona.title}" width="60" height="60">
                <button onclick="mostrarDetalle('${persona.uid}')">Ver Detalle</button>
            </div>
        `
        )
        .join("");

    app.appendChild(contenedor);

    // Agregar el botón "Volver al inicio"
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

    app.appendChild(botonVolver);
}