/**
 * Reloj Digital Interactivo con Alarma
 * Aplicación que muestra la hora actual, fecha y permite configurar una alarma
 */

// Variables globales para almacenar el estado de la alarma y el formato
let alarmTime = null;           // Hora de la alarma configurada (HH:MM)
let alarmActive = false;        // Indica si hay una alarma activa
let format24h = true;           // true = 24h, false = 12h
let alarmSounding = false;      // Indica si la alarma está sonando

/**
 * Array con los nombres de los meses en español
 */
const mesesEspanol = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
];

/**
 * Array con los nombres de los días de la semana en español
 */
const diasEspanol = [
    'domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'
];

/**
 * Obtiene el saludo según la hora del día
 * @returns {string} El saludo apropiado (Buenos días, Buenas tardes, Buenas noches)
 */
function obtenerSaludo() {
    const hora = new Date().getHours();
    
    if (hora >= 5 && hora < 12) {
        return 'Buenos días';
    } else if (hora >= 12 && hora < 18) {
        return 'Buenas tardes';
    } else {
        return 'Buenas noches';
    }
}

/**
 * Formatea un número añadiendo cero a la izquierda si es necesario
 * @param {number} num - El número a formatear
 * @returns {string} El número formateado con dos dígitos (ej: 05, 12, 30)
 */
function formatearDosDigitos(num) {
    return num.toString().padStart(2, '0');
}

/**
 * Obtiene la hora actual en formato HH:MM:SS
 * @returns {string} La hora formateada
 */
function obtenerHoraFormato() {
    const ahora = new Date();
    let horas = ahora.getHours();
    let minutos = ahora.getMinutes();
    let segundos = ahora.getSeconds();
    
    // Convertir a formato 12h si está seleccionado
    let meridiano = '';
    if (!format24h) {
        meridiano = horas >= 12 ? ' PM' : ' AM';
        horas = horas % 12;
        if (horas === 0) horas = 12;
    }
    
    // Formatear con ceros a la izquierda
    return formatearDosDigitos(horas) + ':' + 
           formatearDosDigitos(minutos) + ':' + 
           formatearDosDigitos(segundos) + meridiano;
}

/**
 * Obtiene la fecha actual en español (Día, DD de Mes de YYYY)
 * @returns {string} La fecha formateada en español
 */
function obtenerFechaFormato() {
    const ahora = new Date();
    
    const dia = diasEspanol[ahora.getDay()];
    const fecha = formatearDosDigitos(ahora.getDate());
    const mes = mesesEspanol[ahora.getMonth()];
    const ano = ahora.getFullYear();
    
    // Capitalizar la primera letra del día
    const diaCapitalizado = dia.charAt(0).toUpperCase() + dia.slice(1);
    
    return `${diaCapitalizado}, ${fecha} de ${mes} de ${ano}`;
}

/**
 * Actualiza el display del reloj y fecha
 * Se ejecuta cada segundo mediante setInterval
 */
function actualizarReloj() {
    // Actualizar hora
    document.getElementById('time').textContent = obtenerHoraFormato();
    
    // Actualizar fecha
    document.getElementById('date').textContent = obtenerFechaFormato();
    
    // Actualizar saludo
    document.getElementById('greeting').textContent = obtenerSaludo();
    
    // Verificar si la alarma debe sonar
    if (alarmActive && !alarmSounding) {
        verificarAlarma();
    }
}

/**
 * Verifica si la hora actual coincide con la hora de la alarma
 * Si coincide, activa la alarma
 */
function verificarAlarma() {
    const ahora = new Date();
    const horaActual = formatearDosDigitos(ahora.getHours()) + ':' + 
                       formatearDosDigitos(ahora.getMinutes());
    
    // Comparar la hora actual con la hora de la alarma
    if (horaActual === alarmTime) {
        sonarAlarma();
    }
}

/**
 * Activa la alarma: muestra notificación, reproduce sonido y desactiva la alarma
 */
function sonarAlarma() {
    alarmSounding = true;
    
    // Mostrar notificación visual
    const notificacion = document.getElementById('alarmNotification');
    notificacion.classList.add('show');
    
    // Reproducir sonido usando un beep (para navegadores modernos)
    reproducirSonido();
    
    // Desactivar la alarma automáticamente después de 60 segundos
    setTimeout(function() {
        if (alarmSounding) {
            desactivarAlarma();
        }
    }, 60000); // 60 segundos
}

/**
 * Reproduce un sonido de alarma usando la API de Audio Web
 * Si no funciona, usa un alert como alternativa
 */
function reproducirSonido() {
    try {
        // Crear un contexto de audio
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Crear un oscilador para generar un sonido
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // Configurar la frecuencia del sonido (Hz)
        oscillator.frequency.value = 800;
        
        // Configurar el volumen
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        
        // Reproducir el sonido por 1 segundo
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 1);
        
        // Repetir el sonido 3 veces con pausa entre cada uno
        for (let i = 1; i < 3; i++) {
            const osc = audioContext.createOscillator();
            osc.connect(gainNode);
            osc.frequency.value = 800;
            osc.start(audioContext.currentTime + i * 1.2);
            osc.stop(audioContext.currentTime + i * 1.2 + 1);
        }
    } catch (error) {
        console.log('No se pudo reproducir sonido:', error);
        // Usar alert como alternativa
        alert('¡ALARMA! La hora de la alarma ha llegado');
    }
}

/**
 * Establece la alarma con la hora introducida en el input
 * Valida que la hora sea futura
 */
function establecerAlarma() {
    const inputAlarma = document.getElementById('alarmTime');
    const horaSeleccionada = inputAlarma.value;
    
    // Validar que se ha introducido una hora
    if (!horaSeleccionada) {
        alert('Por favor selecciona una hora');
        return;
    }
    
    // Obtener la hora actual
    const ahora = new Date();
    const horaActual = formatearDosDigitos(ahora.getHours()) + ':' + 
                       formatearDosDigitos(ahora.getMinutes());
    
    // Validar que la hora es futura
    if (horaSeleccionada <= horaActual) {
        alert('Por favor selecciona una hora futura');
        return;
    }
    
    // Establecer la alarma
    alarmTime = horaSeleccionada;
    alarmActive = true;
    alarmSounding = false;
    
    // Actualizar interfaz
    actualizarEstadoAlarma();
    
    // Cambiar estado de botones
    document.getElementById('setAlarmBtn').disabled = true;
    document.getElementById('cancelAlarmBtn').disabled = false;
    
    // Mostrar mensaje de confirmación
    alert(`Alarma configurada para las ${horaSeleccionada}`);
}

/**
 * Cancela la alarma activa
 */
function cancelarAlarma() {
    alarmTime = null;
    alarmActive = false;
    alarmSounding = false;
    
    // Actualizar interfaz
    actualizarEstadoAlarma();
    
    // Cambiar estado de botones
    document.getElementById('setAlarmBtn').disabled = false;
    document.getElementById('cancelAlarmBtn').disabled = true;
    
    // Limpiar el input
    document.getElementById('alarmTime').value = '';
    
    // Mostrar mensaje
    alert('Alarma cancelada');
}

/**
 * Desactiva la alarma que está sonando
 */
function desactivarAlarma() {
    // Ocultar notificación
    const notificacion = document.getElementById('alarmNotification');
    notificacion.classList.remove('show');
    
    // Cancelar la alarma
    cancelarAlarma();
}

/**
 * Actualiza el estado visual de la alarma en la interfaz
 */
function actualizarEstadoAlarma() {
    const statusElement = document.getElementById('alarmStatus');
    
    if (alarmActive && alarmTime) {
        // Mostrar que hay alarma activa
        statusElement.classList.add('active');
        statusElement.querySelector('.status-text').textContent = 
            `Alarma activa: ${alarmTime}`;
    } else {
        // Mostrar que no hay alarma
        statusElement.classList.remove('active');
        statusElement.querySelector('.status-text').textContent = 
            'Sin alarma configurada';
    }
}

/**
 * Cambia entre formato 12h y 24h
 */
function cambiarFormato() {
    format24h = !format24h;
    
    const btnToggle = document.getElementById('modeToggle');
    if (format24h) {
        btnToggle.textContent = 'Cambiar a 12h';
    } else {
        btnToggle.textContent = 'Cambiar a 24h';
    }
    
    // Actualizar el reloj inmediatamente
    actualizarReloj();
}

/**
 * Inicialización de la aplicación
 * Se ejecuta cuando carga la página
 */
document.addEventListener('DOMContentLoaded', function() {
    // Actualizar reloj inmediatamente
    actualizarReloj();
    
    // Actualizar reloj cada segundo
    setInterval(actualizarReloj, 1000);
    
    // Asignar evento al botón de toggle de formato
    document.getElementById('modeToggle').addEventListener('click', cambiarFormato);
    
    // Permitir presionar Enter en el input para establecer alarma
    document.getElementById('alarmTime').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            establecerAlarma();
        }
    });
});
