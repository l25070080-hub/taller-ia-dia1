/**
 * Consumo de APIs con Fetch
 * Objetivo: Buscar un Pokémon con PokeAPI y devolver sus datos
 */

/**
 * Obtiene datos de un Pokémon desde PokeAPI
 * @param {string} nombre - Nombre o ID del Pokémon a buscar
 * @returns {Promise<Object>} Promesa que se resuelve con los datos del Pokémon
 * 
 * Ejemplo:
 * obtenerPokemonApi('pikachu')
 *   .then(data => console.log(data))
 *   .catch(error => console.error(error))
 */
function obtenerPokemonApi(nombre) {
    // Validar que el nombre no esté vacío
    if (!nombre || nombre.trim().length === 0) {
        return Promise.reject(new Error('Por favor ingresa un nombre de Pokémon'));
    }

    // Usar fetch para hacer la consulta a la API
    return fetch(`https://pokeapi.co/api/v2/pokemon/${nombre.toLowerCase()}`)
        .then(response => {
            // Verificar si la respuesta es correcta
            if (!response.ok) {
                throw new Error('Pokémon no encontrado');
            }
            // Convertir la respuesta a JSON
            return response.json();
        })
        .then(data => {
            // Procesar y retornar los datos relevantes
            console.log('Pokémon encontrado:', data.name);
            
            // Retornar objeto con información importante
            return {
                nombre: data.name.charAt(0).toUpperCase() + data.name.slice(1),
                id: data.id,
                imagen: data.sprites.other['official-artwork'].front_default || data.sprites.front_default,
                tipos: data.types.map(t => t.type.name),
                altura: (data.height / 10).toFixed(1), // Convertir a metros
                peso: (data.weight / 10).toFixed(1), // Convertir a kg
                experiencia: data.base_experience,
                estadisticas: data.stats.map(stat => ({
                    nombre: stat.stat.name,
                    valor: stat.base_stat
                })),
                habilidades: data.abilities.map(a => a.ability.name)
            };
        })
        .catch(error => {
            console.error('Error al obtener el Pokémon:', error);
            throw error;
        });
}

