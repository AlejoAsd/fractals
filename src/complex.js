/**
 * Represents a complex number. Provides some basic complex number operations.
 */
export default class Complex {
  /**
   * Returns a new complex number.
   * @param {Number} r Real component.
   * @param {Number} i Imaginary component.
   */
  constructor(r, i) {
    this.r = r;
    this.i = i;
  }

  /**
   * Returns the magnitude of this complex number.
   * @return {Number} Magnitude of this complex number.
   */
  abs() {
    return Math.sqrt(this.r ** 2 + this.i ** 2);
  }

  /**
   * Sums this complex number with another.
   * @param {Number} r Real component of other complex number.
   * @param {Number} i Imaginary component of other complex number.
   * @return {Complex} Complex number containing the sum of the complex numbers.
   */
  add(r, i) {
    return new Complex(this.r + r, this.i + i);
  }

  /**
   * Exponentiate this complex number to a real power of two.
   * @return {Complex} Complex number containing the power of this complex
   * number.
   */
  powTwo() {
    return new Complex(
        this.r ** 2 - this.i ** 2,
        2 * this.r * this.i,
    );
  }
}
