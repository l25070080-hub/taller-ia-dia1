/**
 * API de Dog CEO
 * Galería de perros aleatorios por raza
 * URL: https://dog.ceo/api/
 */

/**
 * Obtiene todas las razas de perros disponibles
 * @returns {Promise<Array>} Promesa que retorna array de razas
 */
function obtenerRazas() {
    return fetch('https://dog.ceo/api/breeds/list/all')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener las razas');
            }
            return response.json();
        })
        .then(data => {
            // Convertir objeto de razas a array
            const razas = Object.keys(data.message);
            console.log('Razas obtenidas:', razas.length);
            return razas;
        })
        .catch(error => {
            console.error('Error en obtenerRazas:', error);
            throw error;
        });
}

/**
 * Obtiene una imagen aleatoria de perro
 * @returns {Promise<string>} Promesa que retorna URL de imagen
 */
function obtenerPerroAleatorio() {
    return fetch('https://dog.ceo/api/breeds/image/random')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener perro aleatorio');
            }
            return response.json();
        })
        .then(data => {
            if (data.status === 'success') {
                return data.message;
            }
            throw new Error('No se pudo obtener la imagen');
        })
        .catch(error => {
            console.error('Error en obtenerPerroAleatorio:', error);
            throw error;
        });
}

/**
 * Obtiene múltiples imágenes aleatorias de perro
 * @param {number} cantidad - Número de imágenes a obtener (máx 50)
 * @returns {Promise<Array>} Promesa que retorna array de URLs
 */
function obtenerPerrosAleatorios(cantidad = 10) {
    // Limitar máximo a 50
    const max = Math.min(cantidad, 50);
    
    // Crear array de promesas
    const promesas = Array.from({ length: max }, () => obtenerPerroAleatorio());
    
    return Promise.all(promesas)
        .then(imagenes => {
            console.log('Perros obtenidos:', imagenes.length);
            return imagenes;
        })
        .catch(error => {
            console.error('Error en obtenerPerrosAleatorios:', error);
            throw error;
        });
}

/**
 * Obtiene imágenes aleatorias de una raza específica
 * @param {string} raza - Nombre de la raza
 * @param {number} cantidad - Número de imágenes (máx 50)
 * @returns {Promise<Array>} Promesa que retorna array de URLs
 */
function obtenerPerrosPorRaza(raza, cantidad = 10) {
    if (!raza || raza.trim().length === 0) {
        return Promise.reject(new Error('Debes especificar una raza'));
    }

    // Convertir raza a formato de API (minúsculas, reemplazar espacios)
    const razaFormato = raza.toLowerCase().replace(/\s+/g, '');
    const max = Math.min(cantidad, 50);

    // Crear array de promesas
    const promesas = Array.from({ length: max }, () =>
        fetch(`https://dog.ceo/api/breed/${razaFormato}/images/random`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Raza "${raza}" no encontrada`);
                }
                return response.json();
            })
            .then(data => {
                if (data.status === 'success') {
                    return data.message;
                }
                throw new Error('No se pudo obtener la imagen');
            })
    );

    return Promise.all(promesas)
        .then(imagenes => {
            console.log(`Imágenes de ${raza} obtenidas:`, imagenes.length);
            return imagenes;
        })
        .catch(error => {
            console.error('Error en obtenerPerrosPorRaza:', error);
            throw error;
        });
}

/**
 * Obtiene una lista de razas formateadas para mostrar
 * @returns {Promise<Array>} Array de razas con formato legible
 */
function obtenerRazasFormato() {
    return obtenerRazas()
        .then(razas => {
            // Convertir a formato legible (capitalizar, reemplazar guiones)
            return razas.map(raza => ({
                id: raza,
                nombre: raza
                    .split('-')
                    .map(parte => parte.charAt(0).toUpperCase() + parte.slice(1))
                    .join(' ')
            }));
        })
        .catch(error => {
            console.error('Error en obtenerRazasFormato:', error);
            throw error;
        });
}
