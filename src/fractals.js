import complex from 'complex.js';
import Complex from './complex.js';

/**
 * Checks that a complex point c belongs to the Mandelbrot set.
 * A point c belongs to the Mandelbrot set if the following quadratic map
 * f(z) = z^2 + c does not diverge under iteration. The initial value for z
 * must be 0, or else this function will determine if the point c belongs to a
 * Julia set.
 * @param {Number} r Real part of c.
 * @param {Number} i Imaginary part of c.
 * @param {Number} z Initial value for z.
 * @param {Number} precision Number of iterations until checking for
 * convergence.
 * @param {Number} bound Convergence bound.
 * @return {boolean} The point belongs to the Mandelbrot set.
 */
export function mandelbrot(r, i, z=0, precision=20, bound=2) {
  let v = new Complex(r, i);

  for (let n=0; n < precision; n++) {
    v = v.powTwo().add(r, i);
  }

  return v.abs() <= bound;
}

/**
 * This was supposed to be the original function to check that a complex point
 * belongs to the Mandelbrot set. However, the `pow` method of complex.js does
 * not exponentiate as expected, leading to this interesting zebra-pattern
 * result.
 * @param {Number} r Real part of c.
 * @param {Number} i Imaginary part of c.
 * @param {Number} z Initial value for z.
 * @param {Number} precision Number of iterations until checking for
 * convergence.
 * @param {Number} bound Convergence bound.
 * @return {boolean} The point belongs to the Mandelbrot set.
 */
export function mandelNOT(r, i, z=0, precision=7, bound=2) {
  let v = complex(r, i);

  for (let i=0; i < precision; i++) {
    v = v.pow(2, 0).add(r, i);
  }

  return v.re <= bound;
}

/**
 * Creates a pattern of polka dots.
 * @param {Number} x X coordinate in the map.
 * @param {Number} y Y coordinate in the map.
 * @param {Number} zoom Zoom on the polka dots.
 * @param {Number} bound Polka dot cutoff.
 * @return {boolean} The point is within the polka dot range.
 */
export function polkaDots(x, y, zoom=10, bound=1) {
  x = Math.sin(x * Math.PI * zoom);
  y = Math.cos(y * Math.PI * zoom);
  return x + y >= bound;
}
