function mostrarusuario() {
    const app = document.getElementById("app");

    // Establecer el fondo representativo del tema de la API
    document.body.style.margin = "0";
    document.body.style.height = "100vh";
    document.body.style.display = "flex";
    document.body.style.flexDirection = "column";
    document.body.style.justifyContent = "center";
    document.body.style.alignItems = "center";
    document.body.style.backgroundImage = "url('Fondo.png')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";

    // Crear el contenido
    app.innerHTML = `
        <h1 style="text-align: center; margin-bottom: 20px;">api.fbi.gov</h1> <!-- Título centrado -->
        
        <p style="text-align: center;">La API del FBI proporciona acceso a información sobre personas buscadas, casos y más. Puedes consultar la lista de los más buscados, detalles y datos relevantes directamente desde la fuente oficial.</p> <!-- Descripción centrada -->

        <img src="icons/logo.png" alt="Logo FBI" style="width: 200px; height: auto; display: block; margin: 20px auto;"> <!-- Logo centrado -->

        <p style="text-align: center; margin-top: 20px;">Usuario de GitHub: Daniel Guerrero. <br> Versión de la app: V.2.0.0</p> <!-- Usuario y versión centrados -->

        <h1 style="text-align: center;">Daniel Guerrero</h1> <!-- Nombre centrado -->

        <button onclick="window.location.href='index.html'" style="margin-top: 20px; padding: 10px 20px; font-size: 16px; cursor: pointer; background-color: #007BFF; color: white; border: none; border-radius: 5px;">Volver al inicio</button> <!-- Botón para volver al inicio -->
    `;
}