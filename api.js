async function conexionlista() {
    // Usamos el proxy solo para desarrollo por el problema de CORS
    const res = await fetch('https://corsproxy.io/?https://api.fbi.gov/wanted/v1/list?pageSize=10');
    const data = await res.json();
    console.log('Personas buscadas:', data.items); // Mostrar los datos en la consola
    return data.items; // Retornar solo el array de personas
}

async function General() {
    const personas = await conexionlista(); // Obtener los datos de la API del FBI
    mostrarlista(personas); // Pasar los datos a la función mostrarlista
}