// 🖱 Ejercicio: DOM (Document Object Model)

// 1. Seleccionar elementos
// Pídele a la IA: "¿Cómo selecciono un elemento por su ID en JavaScript?"
// Selecciona el botón 'btnCambiarColor' y la 'miCaja'.

var btnCambiarColor = document.getElementById('btnCambiarColor');
var btnCambiarTexto = document.getElementById('btnCambiarTexto');
var miCaja = document.getElementById('miCaja'); 


// 2. Escuchar eventos (Clicks)
// Pídele a la IA: "¿Cómo hago que pase algo cuando hago click en un botón?"
var btn = document.getElementById('btnCambiarColor');
btn.addEventListener('click', function (evento) {
  console.log('Se hizo click');
  document.getElementById('miCaja').style.backgroundColor = 'red';
});


// 3. Modificar elementos
// Cuando den click en 'Cambiar Color', cambia el color de fondo de la caja a rojo.
// Pídele a la IA: "¿Cómo cambio el estilo background-color de un elemento con JS?"


// Reto:
// Haz que el botón 'Cambiar Texto' cambie lo que dice dentro de la caja por "¡Hola DOM!".

// -------- Calculadora básica --------
// Seleccionamos los elementos de la calculadora (están en index.html)
var inputNum1 = document.getElementById('num1');
var inputNum2 = document.getElementById('num2');
var btnSumar = document.getElementById('btnSumar');
var btnRestar = document.getElementById('btnRestar');
var btnMultiplicar = document.getElementById('btnMultiplicar');
var btnDividir = document.getElementById('btnDividir');
var spanResultado = document.getElementById('resultado');

// Convierte a número y valida
function toNumber(valor) {
  var n = Number(valor);
  if (isNaN(n)) {
    throw new Error('Valor no numérico: ' + valor);
  }
  return n;
}

// Realiza la operación correspondiente y muestra el resultado
function operar(op) {
  try {
    var a = toNumber(inputNum1.value);
    var b = toNumber(inputNum2.value);
    var res;
    if (op === 'sum') res = a + b;
    else if (op === 'sub') res = a - b;
    else if (op === 'mul') res = a * b;
    else if (op === 'div') {
      if (b === 0) throw new Error('División por cero');
      res = a / b;
    }
    if (spanResultado) spanResultado.textContent = String(res);
  } catch (err) {
    if (spanResultado) spanResultado.textContent = 'Error: ' + err.message;
  }
}

// Añadimos los manejadores si los botones existen
if (btnSumar) btnSumar.addEventListener('click', function() { operar('sum'); });
if (btnRestar) btnRestar.addEventListener('click', function() { operar('sub'); });
if (btnMultiplicar) btnMultiplicar.addEventListener('click', function() { operar('mul'); });
if (btnDividir) btnDividir.addEventListener('click', function() { operar('div'); });
