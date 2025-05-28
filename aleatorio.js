function mostrarAleatorios() {
    const app = document.getElementById("app");
    app.innerHTML = "Aleatorios";

    // Obtener los números de personas almacenados en el localStorage o crear un array vacío
    var misNumeros = JSON.parse(localStorage.getItem("misNumeros")) || [];

    // Obtener las personas desde la API del FBI usando el proxy por CORS
    fetch('https://corsproxy.io/?https://api.fbi.gov/wanted/v1/list?pageSize=100')
        .then(res => res.json())
        .then(data => {
            const totalPersonas = data.items.length;
            let personasAleatorias = '<section class="c-aleatorio c-lista">';

            // Mostrar 4 personas aleatorias
            for (let i = 0; i < 4; i++) {
                let num;
                let repetido;

                // Generar un número aleatorio único
                do {
                    num = Math.floor(Math.random() * totalPersonas);
                    repetido = misNumeros.includes(num);
                } while (repetido);

                // Guardar el número para no repetirlo
                misNumeros.push(num);
                localStorage.setItem("misNumeros", JSON.stringify(misNumeros));

                // Obtener la persona usando el índice
                const persona = data.items[num];
                const imagen = persona.images && persona.images[0] ? persona.images[0].original : '';

                personasAleatorias += `
                <div class="c-lista-cripto c-un_aleatorio">
                    <p>${num + 1}</p>
                    <img src="${imagen}" alt="${persona.title}" width="60" height="60">
                    <p>${persona.title}</p>
                    <p>${persona.field_offices ? persona.field_offices.join(', ') : ''}</p>
                </div>`;
            }

            personasAleatorias += "</section>";
            app.innerHTML = personasAleatorias;

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
                window.location.href = "index.html"; // Redirigir al archivo index.html
            });

            app.appendChild(botonVolver); // Agregar el botón al final del contenido
        })
        .catch(error => {
            console.error("Error al obtener las personas:", error);
            app.innerHTML = "Hubo un error al cargar las personas aleatorias.";
        });
}