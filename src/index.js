import * as fractals from './fractals';
import FractalMap from './fractal_map';

const fractalMap = new FractalMap(
    document.getElementById('canvas'),
    {
      mapWidth: [-2, 1],
      mapHeight: [-1.5, 1.5],
      fractal: fractals.mandelbrot,
    },
);

module.hot.accept();
