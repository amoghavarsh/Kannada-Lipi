/* Convert Karnataka districts GeoJSON → normalized SVG paths for a hover map.
   Projects lon/lat into a fixed viewBox (equirectangular, fine at this scale). */
const fs = require('fs');
const path = require('path');

const geo = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'ka.geojson.tmp'), 'utf8'));

const W = 1000, H = 1000, PAD = 20;

// Find bounding box across all coordinates.
let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
const eachCoord = (coords, fn) => {
    for (const ring of coords) {
        if (typeof ring[0][0] === 'number') { ring.forEach(fn); }
        else { ring.forEach((r) => r.forEach(fn)); }
    }
};
for (const f of geo.features) {
    const g = f.geometry;
    const polys = g.type === 'Polygon' ? [g.coordinates] : g.coordinates;
    for (const poly of polys) eachCoord(poly, ([x, y]) => {
        if (x < minX) minX = x; if (x > maxX) maxX = x;
        if (y < minY) minY = y; if (y > maxY) maxY = y;
    });
}
const spanX = maxX - minX, spanY = maxY - minY;
const scale = Math.min((W - 2 * PAD) / spanX, (H - 2 * PAD) / spanY);
const offX = (W - spanX * scale) / 2, offY = (H - spanY * scale) / 2;
const px = (x) => (offX + (x - minX) * scale).toFixed(1);
const py = (y) => (offY + (maxY - y) * scale).toFixed(1); // flip Y for screen

const ringToPath = (ring) => 'M' + ring.map(([x, y]) => `${px(x)},${py(y)}`).join('L') + 'Z';

const districts = geo.features.map((f) => {
    const g = f.geometry;
    const polys = g.type === 'Polygon' ? [g.coordinates] : g.coordinates;
    const d = polys.map((poly) => poly.map(ringToPath).join(' ')).join(' ');
    return { name: f.properties.district, d };
});

const body = `/**
 * KannadaLipi - Karnataka district SVG paths (for the interactive hover map).
 *
 * Auto-generated from GeoJSON (source: github.com/udit-001/india-maps-data,
 * district boundaries via Census of India). Projected to a ${W}x${H} viewBox.
 * Keyed by English district name (matches districtStats.js).
 * Regenerate with scripts/buildMapPaths.cjs.
 */

export const MAP_VIEWBOX = "0 0 ${W} ${H}";

export const DISTRICT_PATHS = ${JSON.stringify(districts, null, 0)};
`;

fs.writeFileSync(path.join(__dirname, '..', 'src', 'data', 'karnatakaMap.js'), body);
console.log('Wrote src/data/karnatakaMap.js —', districts.length, 'districts');
