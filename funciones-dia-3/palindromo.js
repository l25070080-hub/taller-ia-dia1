// Ejercicio etector de Palindromos
// Objetivo: Crea una logica compleja encapsulada en una funcion
// un ejemplode palindromo es "anilina" o "reconocer", oso
// 1. Cea una funcion llamada esPalindromo que reciba un teto y reotrne true si es palindromo y false si no lo es
/**
 * Comprueba si una cadena es un palíndromo.
 *
 * Comentario explicativo:
 * Esta función normaliza el texto convirtiéndolo a minúsculas y eliminando
 * espacios, signos de puntuación y guiones bajos (usa la expresión regular /[\W_]/g),
 * de forma que solo se comparan los caracteres alfanuméricos. A continuación
 * compara los caracteres desde los extremos hacia el centro para determinar
 * si la cadena resultante es igual al mismo texto leído al revés.
 *
 * @param {string} texto - Cadena a evaluar. Se ignoran mayúsculas, espacios, puntuación y guiones bajos.
 * @returns {boolean} Devuelve true si la cadena es un palíndromo según la normalización descrita; en caso contrario, false.
 *
 * @example
 * // Ejemplo de uso:
 * esPalindromo('Anita lava la tina'); // true
 */
function esPalindromo(texto) {
    // Ignorar mayúsculas y espacios en blanco
    const textoLimpio = texto.toLowerCase().replace(/\s+/g, '');
    const longitud = textoLimpio.length;
    for (let i = 0; i < longitud / 2; i++) {
        if (textoLimpio[i] !== textoLimpio[longitud - 1 - i]) {
            return false;
        }
    }
    return true;
}

// Ejemplos de uso:
console.log(esPalindromo("Anilina")); // true
console.log(esPalindromo("Reconocer")); // true
console.log(esPalindromo("Hola Mundo")); // false
console.log(esPalindromo("A man, a plan, a canal: Panama")); // false (contiene puntuación)
console.log(esPalindromo("No x in Nixon")); // true (solo espacios y mayúsculas ignorados)
