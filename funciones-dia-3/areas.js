// cre una funcion para calcular el area de un circulo dado su radio
/**
 * Calcula el área de un círculo dado su radio.
 * 
 * @param {number} radio - El radio del círculo en unidades de medida
 * @returns {number} El área del círculo calculada usando la fórmula: π * r²
 * 
 * @example
 * // Calcula el área de un círculo con radio 5
 * const area = areaCirculo(5);
 * console.log(area); // Output: 78.53981633974483
 */
function areaCirculo(radio) {
    return Math.PI * Math.pow(radio, 2);
}

// crea una funcion para crear el areaa de un rectangulo dado su base y altura
/**
 * Calcula el área de un rectángulo.
 *
 * Esta función devuelve el producto de la base y la altura proporcionadas,
 * representando el área del rectángulo. Los parámetros deben ser valores
 * numéricos (por ejemplo, en unidades como metros). Si se pasan valores no
 * numéricos se devolverá NaN.
 *
 * @param {number} base - Longitud de la base del rectángulo.
 * @param {number} altura - Altura del rectángulo.
 * @returns {number} Área del rectángulo (base * altura).
 */
function areaRectangulo(base, altura) {
    return base * altura;
}   
const areaTriangulo = function(base, altura) {
    return (base * altura) / 2;
}

// vamos a calcular el volumen de un cilindro
// el volumen es area de la base (circulo) por la altura
/**
 * Calcula el volumen de un cilindro.
 * 
 * El volumen se obtiene multiplicando el área de la base circular por la altura del cilindro.
 * Utiliza la función areaCirculo para calcular el área de la base.
 * 
 * @param {number} radio - El radio de la base circular del cilindro, en unidades de medida (ej: cm, m)
 * @param {number} altura - La altura del cilindro, en las mismas unidades que el radio
 * @returns {number} El volumen del cilindro en unidades cúbicas
 * 
 * @example
 * // Calcular el volumen de un cilindro con radio 5 cm y altura 10 cm
 * const volumen = volumenCilindro(5, 10);
 * console.log(volumen); // Resultado: aproximadamente 785.4 cm³
 */
function volumenCilindro(radio, altura) {
    const areaBase = areaCirculo(radio);
    return areaBase * altura;
}

// crea una funcion para calcular una derivada simple de una funcion polimonial de la forma ax^n
/**
 * Calcula la representación en cadena de la derivada de un término polinómico ax^n.
 *
 * @param {number} a - Coeficiente del término original.
 * @param {number} n - Exponente del término original (se espera un entero).
 * @returns {string} Cadena con la derivada en formato "<nuevoCoef>x^<nuevoExponente>".
 *
 * Descripción:
 * Esta función aplica la regla básica de derivación para un monomio:
 * d/dx (a x^n) = (a * n) x^(n - 1).
 * La implementación devuelve siempre una cadena con el nuevo coeficiente y el nuevo exponente.
 *
 * Nota sobre casos especiales:
 * - Si n = 0 (constante), la implementación actual devuelve "0x^-1" porque calcula 0*(x^-1).
 *   Matemáticamente la derivada de una constante es "0" sin variable; si se desea ese comportamiento
 *   hay que ajustar la función para tratar n = 0 como caso especial.
 * - La función no normaliza casos como coeficiente 1 o exponente 0/1 (p. ej. "1x^1" o "5x^0").
 *
 * @example
 * // derivadaPolinomio(3, 4) -> "12x^3"
 * // porque d/dx (3x^4) = 12x^3
 *
 * @example
 * // derivadaPolinomio(5, 1) -> "5x^0"
 * // porque d/dx (5x) = 5 (la implementación devuelve "5x^0")
 */
function derivadaPolinomio(a, n) {
    const nuevoA = a * n;
    const nuevoN = n - 1;
    return `${nuevoA}x^${nuevoN}`;
}  

// creaa una funcion para calcular una integral simple de ua funcion poliminial de la forma ax^n
/**
 * Calcula la integral indefinida de un polinomio de la forma ax^n.
 *
 * @param {number} a - El coeficiente del término del polinomio.
 * @param {number} n - El exponente del término del polinomio.
 * @returns {string} La representación de la integral indefinida del polinomio en forma de cadena.
 *
 * @example
 * // Si se llama a la función con a = 3 y n = 2,
 * // la salida será "1x^3 + C", que representa la integral de 3x^2.
 * integralPolinomio(3, 2); // "1x^3 + C"
 */
function integralPolinomio(a, n) {
    const nuevoA = a / (n + 1);
    const nuevoN = n + 1;
    return `${nuevoA}x^${nuevoN} + C`;
}
