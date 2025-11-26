/**
 * Analizador de Texto
 * Aplicación que analiza texto en tiempo real y proporciona estadísticas detalladas
 */

// Variables globales para almacenar el estado
let estadisticas = {
    caracteres: 0,
    caracteressinEspacios: 0,
    palabras: 0,
    oraciones: 0,
    tiempoLectura: 0,
    promedioPalabrasOración: 0
};

/**
 * Cuenta el número de caracteres incluyendo espacios
 * @param {string} texto - El texto a analizar
 * @returns {number} Número total de caracteres
 */
function contarCaracteresConEspacios(texto) {
    return texto.length;
}

/**
 * Cuenta el número de caracteres excluyendo espacios
 * @param {string} texto - El texto a analizar
 * @returns {number} Número de caracteres sin espacios
 */
function contarCaracteresSinEspacios(texto) {
    // Elimina todos los espacios en blanco (espacios, tabulaciones, saltos de línea)
    const sinEspacios = texto.replace(/\s/g, '');
    return sinEspacios.length;
}

/**
 * Cuenta el número de palabras en el texto
 * Considera que las palabras están separadas por espacios
 * Maneja múltiples espacios correctamente
 * @param {string} texto - El texto a analizar
 * @returns {number} Número total de palabras
 */
function contarPalabras(texto) {
    // Trim elimina espacios al inicio y final
    const textotrimmed = texto.trim();
    
    // Si el texto está vacío, retorna 0
    if (textotrimmed.length === 0) {
        return 0;
    }
    
    // Divide el texto por espacios en blanco (uno o múltiples)
    // \s+ significa "uno o más espacios en blanco"
    const palabras = textotrimmed.split(/\s+/);
    
    return palabras.length;
}

/**
 * Cuenta el número de oraciones en el texto
 * Una oración termina con: . ! ?
 * @param {string} texto - El texto a analizar
 * @returns {number} Número total de oraciones
 */
function contarOraciones(texto) {
    // Si el texto está vacío, retorna 0
    if (texto.trim().length === 0) {
        return 0;
    }
    
    // Busca puntos finales, signos de interrogación y exclamación
    // [.!?] es una expresión regular que busca cualquiera de estos caracteres
    const oraciones = texto.match(/[.!?]+/g);
    
    // Si no hay oraciones, retorna 0; si las hay, retorna el número
    return oraciones ? oraciones.length : 0;
}

/**
 * Calcula el tiempo estimado de lectura
 * Basado en 200 palabras por minuto (WPM estándar)
 * @param {number} numPalabras - Número de palabras en el texto
 * @returns {number} Tiempo estimado en minutos (redondeado)
 */
function calcularTiempoLectura(numPalabras) {
    const PALABRAS_POR_MINUTO = 200;
    
    // Si no hay palabras, el tiempo es 0
    if (numPalabras === 0) {
        return 0;
    }
    
    // Calcula el tiempo diviendo palabras entre WPM
    const tiempoExacto = numPalabras / PALABRAS_POR_MINUTO;
    
    // Redondea al minuto más cercano, con mínimo de 1 minuto
    return Math.max(1, Math.round(tiempoExacto));
}

/**
 * Calcula el promedio de palabras por oración
 * @param {number} numPalabras - Número total de palabras
 * @param {number} numOraciones - Número total de oraciones
 * @returns {number} Promedio de palabras por oración (con 1 decimal)
 */
function calcularPromedioWordsPerSentence(numPalabras, numOraciones) {
    // Si no hay oraciones, retorna 0
    if (numOraciones === 0) {
        return 0;
    }
    
    // Calcula el promedio
    const promedio = numPalabras / numOraciones;
    
    // Redondea a 1 decimal
    return parseFloat(promedio.toFixed(1));
}

/**
 * Actualiza todas las estadísticas y los elementos visuales
 * Se ejecuta cada vez que el usuario escribe en el textarea
 */
function actualizarEstadisticas() {
    // Obtener el texto del textarea
    const textInput = document.getElementById('textInput');
    const texto = textInput.value;
    
    // Calcular todas las estadísticas
    estadisticas.caracteres = contarCaracteresConEspacios(texto);
    estadisticas.caracteressinEspacios = contarCaracteresSinEspacios(texto);
    estadisticas.palabras = contarPalabras(texto);
    estadisticas.oraciones = contarOraciones(texto);
    estadisticas.tiempoLectura = calcularTiempoLectura(estadisticas.palabras);
    estadisticas.promedioPalabrasOración = calcularPromedioWordsPerSentence(
        estadisticas.palabras,
        estadisticas.oraciones
    );
    
    // Actualizar los elementos visuales
    actualizarVisuales();
}

/**
 * Actualiza los elementos HTML con las nuevas estadísticas
 * Incluye animación de pulso cuando los números cambian
 */
function actualizarVisuales() {
    // Actualizar caracteres con espacios
    actualizarElementoConAnimacion('charactersWithSpaces', estadisticas.caracteres);
    
    // Actualizar caracteres sin espacios
    actualizarElementoConAnimacion('charactersNoSpaces', estadisticas.caracteressinEspacios);
    
    // Actualizar número de palabras
    actualizarElementoConAnimacion('wordCount', estadisticas.palabras);
    
    // Actualizar número de oraciones
    actualizarElementoConAnimacion('sentenceCount', estadisticas.oraciones);
    
    // Actualizar tiempo de lectura
    const tiempoTexto = estadisticas.tiempoLectura === 0 
        ? '0 min' 
        : estadisticas.tiempoLectura + ' min';
    actualizarElementoConAnimacion('readingTime', tiempoTexto);
    
    // Actualizar promedio de palabras por oración
    actualizarElementoConAnimacion('avgWordsPerSentence', estadisticas.promedioPalabrasOración);
}

/**
 * Actualiza el contenido de un elemento y agrega animación de pulso
 * @param {string} elementId - ID del elemento a actualizar
 * @param {*} nuevoValor - El nuevo valor a mostrar
 */
function actualizarElementoConAnimacion(elementId, nuevoValor) {
    const elemento = document.getElementById(elementId);
    
    try {
        // Verificar que el elemento existe
        if (!elemento) {
            console.warn(`Elemento con ID "${elementId}" no encontrado`);
            return;
        }
        
        // Solo agregar animación si el valor ha cambiado
        if (elemento.textContent !== nuevoValor.toString()) {
            // Agregar clase de animación
            elemento.classList.add('pulse');
            
            // Actualizar el contenido
            elemento.textContent = nuevoValor;
            
            // Remover la clase después de la animación (500ms)
            setTimeout(() => {
                elemento.classList.remove('pulse');
            }, 500);
        }
    } catch (error) {
        console.error(`Error al actualizar elemento ${elementId}:`, error);
    }
}

/**
 * Limpia el textarea y reinicia todas las estadísticas
 * Se ejecuta al hacer clic en el botón "Limpiar"
 */
function limpiarTodo() {
    // Limpiar el textarea
    document.getElementById('textInput').value = '';
    
    // Reiniciar todas las estadísticas a 0
    estadisticas = {
        caracteres: 0,
        caracteressinEspacios: 0,
        palabras: 0,
        oraciones: 0,
        tiempoLectura: 0,
        promedioPalabrasOración: 0
    };
    
    // Actualizar la interfaz
    actualizarVisuales();
    
    // Enfocar el textarea para mejor UX
    document.getElementById('textInput').focus();
}

/**
 * Copia las estadísticas al portapapeles
 * Se ejecuta al hacer clic en el botón "Copiar Estadísticas"
 */
function copiarEstadisticas() {
    try {
        // Generar texto con las estadísticas
        const textoCopiar = `
Estadísticas del Texto:
========================
Caracteres (con espacios): ${estadisticas.caracteres}
Caracteres (sin espacios): ${estadisticas.caracteressinEspacios}
Palabras: ${estadisticas.palabras}
Oraciones: ${estadisticas.oraciones}
Tiempo de lectura: ${estadisticas.tiempoLectura} minuto${estadisticas.tiempoLectura !== 1 ? 's' : ''}
Promedio palabras/oración: ${estadisticas.promedioPalabrasOración}
========================
`;

        // Copiar al portapapeles usando la API Clipboard
        navigator.clipboard.writeText(textoCopiar.trim()).then(function() {
            // Mostrar confirmación
            mostrarConfirmacion();
        }).catch(function(err) {
            // Si falla, intentar método alternativo
            console.error('Error al copiar con Clipboard API:', err);
            copiarAlternativo(textoCopiar);
        });
    } catch (error) {
        console.error('Error al copiar estadísticas:', error);
        alert('Error al copiar las estadísticas');
    }
}

/**
 * Método alternativo para copiar al portapapeles (para navegadores antiguos)
 * @param {string} texto - El texto a copiar
 */
function copiarAlternativo(texto) {
    try {
        // Crear un textarea temporal
        const textarea = document.createElement('textarea');
        textarea.value = texto;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        
        // Seleccionar y copiar
        textarea.select();
        document.execCommand('copy');
        
        // Eliminar el textarea temporal
        document.body.removeChild(textarea);
        
        // Mostrar confirmación
        mostrarConfirmacion();
    } catch (error) {
        console.error('Error al copiar con método alternativo:', error);
        alert('No se pudo copiar las estadísticas');
    }
}

/**
 * Muestra un mensaje de confirmación cuando se copian las estadísticas
 * El mensaje desaparece automáticamente después de 3 segundos
 */
function mostrarConfirmacion() {
    const confirmationMsg = document.getElementById('confirmationMsg');
    
    try {
        // Agregar clase para mostrar el mensaje
        confirmationMsg.classList.add('show');
        
        // Remover la clase después de 3 segundos
        setTimeout(() => {
            confirmationMsg.classList.remove('show');
        }, 3000);
    } catch (error) {
        console.error('Error al mostrar confirmación:', error);
    }
}

/**
 * Inicialización de la aplicación
 * Se ejecuta cuando la página carga
 * Configura los event listeners
 */
document.addEventListener('DOMContentLoaded', function() {
    try {
        // Obtener referencias a los elementos
        const textInput = document.getElementById('textInput');
        const clearBtn = document.getElementById('clearBtn');
        const copyStatsBtn = document.getElementById('copyStatsBtn');
        
        // Verificar que los elementos existen
        if (!textInput || !clearBtn || !copyStatsBtn) {
            console.error('Algunos elementos no fueron encontrados en el HTML');
            return;
        }
        
        // Event listener para actualizar estadísticas en tiempo real
        // Se dispara mientras el usuario escribe
        textInput.addEventListener('input', function() {
            actualizarEstadisticas();
        });
        
        // Event listener para el botón de limpiar
        clearBtn.addEventListener('click', function() {
            limpiarTodo();
        });
        
        // Event listener para el botón de copiar
        copyStatsBtn.addEventListener('click', function() {
            // Validar que hay estadísticas para copiar
            if (estadisticas.caracteres === 0) {
                alert('Por favor escribe algo antes de copiar las estadísticas');
                return;
            }
            copiarEstadisticas();
        });
        
        // Permitir limpiar con Ctrl+A y luego Delete (mejora UX)
        textInput.addEventListener('keydown', function(event) {
            // Si presiona Ctrl+Shift+Delete, limpia el contenido
            if (event.ctrlKey && event.shiftKey && event.code === 'Delete') {
                limpiarTodo();
            }
        });
        
        // Inicializar estadísticas (aunque estén vacías)
        actualizarEstadisticas();
        
        console.log('Analizador de texto inicializado correctamente');
    } catch (error) {
        console.error('Error durante la inicialización:', error);
    }
});
