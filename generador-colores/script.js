/**
 * Generador de Colores Aleatorios
 * Aplicación interactiva que genera colores hexadecimales aleatorios
 */

/**
 * Genera un color hexadecimal aleatorio en formato #RRGGBB
 * @returns {string} Un color hexadecimal aleatorio (ej: #3A7F9E)
 */
function generarColorAleatorio() {
    // Genera 3 números aleatorios entre 0 y 255
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    
    // Convierte cada número a hexadecimal y los concatena
    // padStart asegura que tenga 2 dígitos (ej: 05 en lugar de 5)
    const hexColor = '#' + 
                     r.toString(16).padStart(2, '0').toUpperCase() +
                     g.toString(16).padStart(2, '0').toUpperCase() +
                     b.toString(16).padStart(2, '0').toUpperCase();
    
    return hexColor;
}

/**
 * Genera un nuevo color, actualiza el fondo del div y el código mostrado
 * Se ejecuta al hacer clic en el botón "Generar Color"
 */
function generarColor() {
    // Genera el nuevo color
    const nuevoColor = generarColorAleatorio();
    
    // Actualiza el fondo del div con el nuevo color
    const colorDisplay = document.getElementById('colorDisplay');
    colorDisplay.style.backgroundColor = nuevoColor;
    
    // Actualiza el texto que muestra el código hexadecimal
    const colorCode = document.getElementById('colorCode');
    colorCode.textContent = nuevoColor;
}

/**
 * Copia el código hexadecimal del color actual al portapapeles
 * Muestra una confirmación visual cuando se completa la copia
 */
function copiarAlPortapapeles() {
    // Obtiene el código del color
    const colorCode = document.getElementById('colorCode');
    const codigo = colorCode.textContent;
    
    // Copia el código al portapapeles usando la API Clipboard
    navigator.clipboard.writeText(codigo).then(function() {
        // Muestra el mensaje de confirmación
        mostrarConfirmacion();
    }).catch(function(err) {
        // Método alternativo si falla la API Clipboard
        console.error('Error al copiar:', err);
        copiarAlternativo(codigo);
    });
}

/**
 * Método alternativo para copiar al portapapeles (para navegadores antiguos)
 * @param {string} texto - El texto a copiar
 */
function copiarAlternativo(texto) {
    // Crea un elemento temporal de texto
    const textarea = document.createElement('textarea');
    textarea.value = texto;
    document.body.appendChild(textarea);
    
    // Selecciona y copia el texto
    textarea.select();
    document.execCommand('copy');
    
    // Elimina el elemento temporal
    document.body.removeChild(textarea);
    
    // Muestra la confirmación
    mostrarConfirmacion();
}

/**
 * Muestra un mensaje de confirmación visual cuando se copia el código
 * El mensaje desaparece automáticamente después de 2 segundos
 */
function mostrarConfirmacion() {
    const confirmationMsg = document.getElementById('confirmationMsg');
    
    // Agrega la clase 'show' para mostrar el mensaje
    confirmationMsg.classList.add('show');
    
    // Elimina la clase después de 2 segundos para ocultar el mensaje
    setTimeout(function() {
        confirmationMsg.classList.remove('show');
    }, 2000);
}

/**
 * Inicialización de la aplicación
 * Se ejecuta cuando la página carga
 */
document.addEventListener('DOMContentLoaded', function() {
    // Genera un color inicial al cargar la página
    generarColor();
});
