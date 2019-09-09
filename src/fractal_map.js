import * as fractals from './fractals';

const defaultOptions = {
  mapWidth: [-1, 1],
  mapHeight: [-1, 1],
  fractal: fractals.mandelNOT,
};

/**
 * FractalMap maps a fractal function onto a canvas.
 */
export default class FractalMap {
  /**
   * Creates a new fractal map.
   * @param {Element} canvas Canvas element. Fractals will be drawn on this
   * element.
   * @param {Object} [options] Contains mapping options.
   * @param {[Number, Number]} options.mapWidth Fractal map horizontal
   * boundaries.
   * @param {[Number, Number]} options.mapHeight Fractal map vertical
   * boundaries.
   */
  constructor(canvas, options) {
    Object.assign(this, defaultOptions);
    Object.assign(this, options);

    this.canvas = canvas;
    this.canvasWidth = canvas.width;
    this.canvasHeight = canvas.height;

    this.draw();
  }

  /**
   * Updates the fractal boundaries and forces a redraw.
   * @param {[Number, Number]} mapWidth Horizontal boundaries for the
   * fractal map.
   * @param {[Number, Number]} mapHeight Vertical boundaries for the
   * fractal map.
   */
  setBoundaries(mapWidth, mapHeight) {
    this.mapWidth = mapWidth || this.mapWidth;
    this.mapHeight = mapHeight || this.mapHeight;

    // Redraw if boundaries changed
    if (mapWidth || mapHeight) this.draw();
  }

  /**
   * Returns a generator that maps canvas coordinates to fractal coordinate
   * space.
   */
  * pixelMapper() {
    const width = this.mapWidth[1] - this.mapWidth[0];
    const height = this.mapHeight[1] - this.mapHeight[0];
    const dX = width / (this.canvasWidth - 1);
    const dY = height / (this.canvasHeight - 1);
    for (let y=0, curY=this.mapHeight[0]; y < this.canvasHeight; y++, curY+=dY) {
      for (let x=0, curX=this.mapWidth[0]; x < this.canvasWidth; x++, curX+=dX) {
        yield { x: x, y: y, mapX: curX, mapY: curY };
      }
    }
  }

  /**
   * Places a color in a specific pixel in the canvas.
   * @param {Number} x Target pixel X coordinate within the canvas.
   * @param {Number} y Target pixel Y coordinate within the canvas.
   * @param {String} color Target pixel color value.
   */
  drawPixel(x, y, color) {
    if (x < 0 || x >= this.canvasWidth || y < 0 || y >= this.canvasHeight) {
      console.warn('Attempted to draw a pixel out of the canvas.');
      return;
    }
    const ctx = this.canvas.getContext('2d');
    ctx.fillStyle = color;
    ctx.fillRect(x, y, 1, 1);
  }

  /**
   * Draws the fractal onto the canvas for the set boundaries.
   */
  draw() {
    const coordGenerator = this.pixelMapper();
    let coords;
    while (!(coords = coordGenerator.next()).done) {
      const { x, y, mapX, mapY } = coords.value;
      this.drawPixel(x, y, this.fractal(mapX, mapY) ? '#ffffff' : '#000000');
    }
  }
}
