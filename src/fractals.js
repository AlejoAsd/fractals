import complex from 'complex.js';
import Complex from './complex.js';

/**
 * Checks that a complex point c belongs to the Mandelbrot set.
 * A point c belongs to the Mandelbrot set if the following quadratic map
 * f(z) = z^2 + c does not diverge under iteration. The initial value for z
 * must be 0, or else this function will determine if the point c belongs to a
 * Julia set.
 * @param {Number} r Real component of c.
 * @param {Number} i Imaginary component of c.
 * @param {Number} zr Real component of z.
 * @param {Number} zi Imaginary component of z.
 * @param {Number} precision Number of iterations until checking for
 * convergence.
 * @param {Number} bound Convergence bound.
 * @return {boolean} The point belongs to the Mandelbrot set.
 */
export function mandelbrot(r, i, zr=0, zi=0, precision=20, bound=2) {
  let v = new Complex(zr, zi).powTwo().add(r, i);

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
 * Creates a polka dot pattern.
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

/**
 * Draws multiple adjacent spirals.
 * @param {Number} x X coordinate in the map.
 * @param {Number} y Y coordinate in the map.
 * @param {Number} cX X coordinate of the map center.
 * @param {Number} cY Y coordinate of the map center.
 * @param {Number} radius Spiral radius per turn.
 * @param {Number} growthRate Rate at which the wavySpiral thickens.
 * @return {boolean} The point is within the polka dot range.
 */
export function multispiral(x, y, cX=0, cY=0, radius=1, growthRate=0.3) {
  const dX = x - cX;
  const dY = y - cY;
  const dist = Math.hypot(dX, dY);
  let angle = Math.atan2(dY, dX);
  if (angle <= 0) angle += 2 * Math.PI;
  const delta = 0.25;
  const bound = 0.9;
  const v = (dist / (radius * angle / (2 * Math.PI))) % 1;
  return bound - delta <= v && (v <= bound + delta || v <= delta);
}

/**
 * Draws a wavy spiral.
 * @param {Number} x X coordinate in the map.
 * @param {Number} y Y coordinate in the map.
 * @param {Number} cX X coordinate of the map center.
 * @param {Number} cY Y coordinate of the map center.
 * @param {Number} radius Spiral radius per turn.
 * @return {boolean} The point is within the polka dot range.
 */
export function wavySpiral(x, y, cX=0, cY=0, radius=0.1) {
  let angle = Math.atan2(y - cY, x - cX);
  if (angle < 0) angle += 2 * Math.PI;
  const dist = Math.hypot(cX - x, cY - y);
  const a = radius * angle / (2 * Math.PI);
  return a <= dist % radius <= a;
}
