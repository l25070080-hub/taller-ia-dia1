/**
 * Cuidando a Taco: Tamagotchi con IA Básico
 * Sistema de IA que maneja el estado del gato
 * Hambre, Energía y Felicidad
 */

/**
 * Estado inicial de Taco
 */
const estadoInicial = {
    nombre: 'Taco',
    hambre: 50,
    energia: 70,
    felicidad: 60,
    edad: 0,
    ultimaAccion: 'Taco acaba de nacer! 🐱'
};

/**
 * Limita un valor entre min y max
 * @param {number} valor - Valor a limitar
 * @param {number} min - Valor mínimo
 * @param {number} max - Valor máximo
 * @returns {number} Valor limitado
 */
function limitarValor(valor, min = 0, max = 100) {
    return Math.max(min, Math.min(max, valor));
}

/**
 * Genera respuesta de Taco basada en su estado
 * @param {Object} estado - Estado actual de Taco {hambre, energia, felicidad}
 * @returns {string} Respuesta de Taco
 */
function generarRespuestaTaco(estado) {
    const { hambre, energia, felicidad } = estado;

    // HAMBRE CRÍTICA (>70)
    if (hambre > 70) {
        const respuestasHambre = [
            '¡Dame comida ya! 🍖',
            '¡Meow! ¡Estoy muerto de hambre! 😿',
            '¡Ronronea desesperado pidiendo comida! 🐱',
            '¡Mi barriguita está vacía! Dame algo ahora mismo 😭',
            '¡Meoooooow! 🍽️ ¡Necesito comer AHORA!',
            '¡Rrrrr! ¡Tengo tanta hambre que podrría comerme mis bigotes!'
        ];
        return respuestasHambre[Math.floor(Math.random() * respuestasHambre.length)];
    }

    // ENERGÍA CRÍTICA (<30)
    if (energia < 30) {
        const respuestasCansancio = [
            '¡Estoy cansado! Necesito dormir 😴',
            'Zzzzz... *bostezo* Tengo mucho sueño 😪',
            'No aguanto más... debo descansar 🛏️',
            '*ojos cerrados lentamente* Creo que... necesito una siesta 😻',
            '¡Miauuuu! Estoy agotado, déjame descansar 💤',
            '*se tumba en el piso sin fuerzas* No puedo más... 😴'
        ];
        return respuestasCansancio[Math.floor(Math.random() * respuestasCansancio.length)];
    }

    // FELICIDAD ALTA (>80)
    if (felicidad > 80) {
        const respuestasAlegrìa = [
            '¡Estoy muy feliz contigo! 😻😻',
            '*Ronronea intensamente* ¡Eres el mejor! ❤️',
            '¡Meow! *Salta de alegría* ¡Esto es lo mejor! 🎉',
            '*Se restriega contra ti feliz* ¡Te quiero! 🐱❤️',
            '¡Purrrr purrrr! ¡Estoy en el paraíso! 😍',
            '*Cola feliz en el aire* ¡Somos los mejores amigos! 🌟'
        ];
        return respuestasAlegrìa[Math.floor(Math.random() * respuestasAlegrìa.length)];
    }

    // ESTADO NORMAL - RESPUESTAS VARIADAS
    const respuestasNormales = [
        '¡Hola! ¿Qué tal estamos hoy? 😺',
        '*Ronronea tranquilo* Estoy bien 🐱',
        '¿Juguemos un poco? 🎾',
        '*Se estira* Fue una buena siesta 😸',
        '¡Miauuuu! *Maúlla feliz* 😻',
        '*Te observa con curiosidad* ¿Tienes algo para mí? 👀'
    ];

    return respuestasNormales[Math.floor(Math.random() * respuestasNormales.length)];
}

/**
 * Simula que Taco come
 * @param {Object} estado - Estado actual
 * @returns {Object} Nuevo estado
 */
function alimentarTaco(estado) {
    const nuevoEstado = { ...estado };
    nuevoEstado.hambre = limitarValor(nuevoEstado.hambre - 40);
    nuevoEstado.energia = limitarValor(nuevoEstado.energia - 5); // Come te cansa un poco
    nuevoEstado.felicidad = limitarValor(nuevoEstado.felicidad + 10);
    nuevoEstado.ultimaAccion = '¡Ñam ñam! *Come delicioso* 🍖';
    return nuevoEstado;
}

/**
 * Simula que Taco duerme
 * @param {Object} estado - Estado actual
 * @returns {Object} Nuevo estado
 */
function dormirTaco(estado) {
    const nuevoEstado = { ...estado };
    nuevoEstado.energia = limitarValor(nuevoEstado.energia + 50);
    nuevoEstado.hambre = limitarValor(nuevoEstado.hambre + 15); // Despierta con hambre
    nuevoEstado.felicidad = limitarValor(nuevoEstado.felicidad + 5);
    nuevoEstado.ultimaAccion = '*Se acurruca y duerme placidamente* 😴 Zzzzz...';
    return nuevoEstado;
}

/**
 * Simula que Taco juega
 * @param {Object} estado - Estado actual
 * @returns {Object} Nuevo estado
 */
function jugarConTaco(estado) {
    const nuevoEstado = { ...estado };
    nuevoEstado.energia = limitarValor(nuevoEstado.energia - 30);
    nuevoEstado.hambre = limitarValor(nuevoEstado.hambre + 20);
    nuevoEstado.felicidad = limitarValor(nuevoEstado.felicidad + 35);
    nuevoEstado.ultimaAccion = '*Juega como loco persiguiendo la bola de lana* 🎾';
    return nuevoEstado;
}

/**
 * Simula que Taco recibe caricias
 * @param {Object} estado - Estado actual
 * @returns {Object} Nuevo estado
 */
function acariciarTaco(estado) {
    const nuevoEstado = { ...estado };
    nuevoEstado.felicidad = limitarValor(nuevoEstado.felicidad + 25);
    nuevoEstado.energia = limitarValor(nuevoEstado.energia - 5);
    nuevoEstado.ultimaAccion = '*Ronronea feliz mientras lo acaricias* 🐱❤️';
    return nuevoEstado;
}

/**
 * Simula el paso del tiempo (envejecimiento)
 * Taco envejece y sus necesidades aumentan
 * @param {Object} estado - Estado actual
 * @returns {Object} Nuevo estado
 */
function envejecerTaco(estado) {
    const nuevoEstado = { ...estado };
    nuevoEstado.edad += 1;
    nuevoEstado.hambre = limitarValor(nuevoEstado.hambre + 5);
    nuevoEstado.energia = limitarValor(nuevoEstado.energia - 8);
    nuevoEstado.felicidad = limitarValor(nuevoEstado.felicidad - 3);
    
    // Si está muy descuidado, pierde felicidad más rápido
    if (nuevoEstado.hambre > 80 || nuevoEstado.energia < 20) {
        nuevoEstado.felicidad = limitarValor(nuevoEstado.felicidad - 10);
    }

    return nuevoEstado;
}

/**
 * Obtiene emoji según el estado de Taco
 * @param {Object} estado - Estado actual
 * @returns {string} Emoji representativo
 */
function obtenerEmojiTaco(estado) {
    const { hambre, energia, felicidad } = estado;

    if (hambre > 70) return '😿'; // Hambriento
    if (energia < 30) return '😴'; // Cansado
    if (felicidad > 80) return '😻'; // Feliz
    if (felicidad < 30) return '😠'; // Molesto
    return '😺'; // Normal
}

/**
 * Obtiene el color del estado de salud general
 * @param {Object} estado - Estado actual
 * @returns {string} Color en formato hex
 */
function obtenerColorSalud(estado) {
    const { hambre, energia, felicidad } = estado;
    const promedio = (100 - hambre + energia + felicidad) / 3;

    if (promedio > 75) return '#4caf50'; // Verde - Excelente
    if (promedio > 50) return '#ff9800'; // Naranja - Bien
    if (promedio > 25) return '#ff5722'; // Rojo oscuro - Mal
    return '#c62828'; // Rojo muy oscuro - Crítico
}

/**
 * Obtiene recomendación de cuidado
 * @param {Object} estado - Estado actual
 * @returns {string} Consejo
 */
function obtenerRecomendacion(estado) {
    const { hambre, energia, felicidad } = estado;

    if (hambre > 70) {
        return '🍖 Taco tiene MUCHA hambre. ¡Aliméntalo ya!';
    }
    if (energia < 30) {
        return '😴 Taco está muy cansado. ¡Déjalo descansar!';
    }
    if (felicidad < 30) {
        return '😠 Taco está triste. ¡Juega con él o acaricialo!';
    }
    if (hambre > 60) {
        return '🍖 Taco empieza a tener hambre';
    }
    if (energia < 50) {
        return '⚡ Taco está algo cansado';
    }
    if (felicidad < 50) {
        return '❤️ Taco podría estar más feliz';
    }
    return '✨ Taco está en perfecto estado! Sigue así!';
}

/**
 * MINIJUEGOS
 * Juegos interactivos para divertir a Taco
 */

/**
 * Juego 1: Caza de ratones
 * Taco debe atrapar ratones (clicks en targets)
 * @returns {Promise<Object>} Resultado con puntuación y recompensas
 */
function juegoCazaRatones() {
    return new Promise(resolve => {
        const duracion = 10; // segundos
        let puntuacion = 0;
        let clicksRequeridos = 0;

        // Simular el juego
        const numRatones = Math.floor(Math.random() * 8) + 5; // 5-12 ratones
        
        resolve({
            nombre: 'Caza de Ratones',
            puntuacion: numRatones,
            maxPuntos: 12,
            recompensas: {
                felicidad: Math.min(40, numRatones * 3),
                energia: -15
            },
            mensaje: `¡Taco cazó ${numRatones} ratones! 🐭🎉`
        });
    });
}

/**
 * Juego 2: Juego de reflejos
 * Taco debe reaccionar rápido a los estímulos
 * @returns {Promise<Object>} Resultado con puntuación
 */
function juegoReflejos() {
    return new Promise(resolve => {
        // Simular puntuación basada en reflejos
        const reflejos = Math.floor(Math.random() * 100) + 20; // 20-120 puntos
        
        resolve({
            nombre: 'Juego de Reflejos',
            puntuacion: Math.min(100, reflejos),
            maxPuntos: 100,
            recompensas: {
                felicidad: Math.min(35, Math.floor(reflejos / 3)),
                energia: -20
            },
            mensaje: `¡Los reflejos de Taco: ${Math.min(100, reflejos)} puntos! ⚡🎮`
        });
    });
}

/**
 * Juego 3: Puzzle de mechas
 * Taco debe encontrar el patrón correcto
 * @returns {Promise<Object>} Resultado con puntuación
 */
function juegoPuzzle() {
    return new Promise(resolve => {
        // Simular resolución de puzzle
        const aciertos = Math.floor(Math.random() * 6) + 1; // 1-6 bloques correctos
        
        resolve({
            nombre: 'Puzzle de Mechas',
            puntuacion: aciertos,
            maxPuntos: 6,
            recompensas: {
                felicidad: aciertos * 5,
                energia: -10
            },
            mensaje: `¡Taco resolvió ${aciertos}/6 patrones! 🧩✨`
        });
    });
}

/**
 * Juego 4: Carreras
 * Taco corre lo más rápido posible
 * @returns {Promise<Object>} Resultado con puntuación
 */
function juegoCarreras() {
    return new Promise(resolve => {
        // Simular velocidad de carrera
        const velocidad = Math.floor(Math.random() * 80) + 40; // 40-120 km/h
        
        resolve({
            nombre: 'Carreras Felinas',
            puntuacion: velocidad,
            maxPuntos: 120,
            recompensas: {
                felicidad: Math.floor(velocidad / 3),
                energia: -30
            },
            mensaje: `¡Taco corrió a ${velocidad} km/h! 🏃💨`
        });
    });
}

/**
 * Juego 5: Pesca
 * Taco intenta pescar peces
 * @returns {Promise<Object>} Resultado con puntuación
 */
function juegoPesca() {
    return new Promise(resolve => {
        // Simular peces capturados
        const peces = Math.floor(Math.random() * 12) + 1; // 1-12 peces
        
        resolve({
            nombre: 'Pesca Felina',
            puntuacion: peces,
            maxPuntos: 12,
            recompensas: {
                felicidad: Math.min(45, peces * 4),
                energia: -25,
                hambre: -15
            },
            mensaje: `¡Taco pescó ${peces} peces! 🎣🐟`
        });
    });
}

/**
 * Selecciona un minijuego al azar
 * @returns {Promise<Object>} Resultado del juego
 */
function jugarMinijuego() {
    const juegos = [
        juegoCazaRatones,
        juegoReflejos,
        juegoPuzzle,
        juegoCarreras,
        juegoPesca
    ];

    const juegoAleatorio = juegos[Math.floor(Math.random() * juegos.length)];
    return juegoAleatorio();
}

/**
 * Aplica las recompensas de un minijuego al estado
 * @param {Object} estado - Estado actual
 * @param {Object} recompensas - Recompensas del juego
 * @returns {Object} Nuevo estado
 */
function aplicarRecompensasMinijuego(estado, recompensas) {
    const nuevoEstado = { ...estado };
    
    if (recompensas.felicidad) {
        nuevoEstado.felicidad = limitarValor(nuevoEstado.felicidad + recompensas.felicidad);
    }
    if (recompensas.energia) {
        nuevoEstado.energia = limitarValor(nuevoEstado.energia + recompensas.energia);
    }
    if (recompensas.hambre) {
        nuevoEstado.hambre = limitarValor(nuevoEstado.hambre + recompensas.hambre);
    }
    
    nuevoEstado.ultimaAccion = '¡Acaba de terminar un minijuego! 🎮';
    return nuevoEstado;
}
