import L from "leaflet";
import "leaflet/dist/leaflet.css";

/**
 * Inisialisasi peta Leaflet pada elemen dengan id tertentu
 * @param {string} elementId - id dari elemen DOM tempat peta akan dirender
 * @param {Object} [options] - Opsi tambahan untuk map
 * @returns {L.Map} instance peta
 */
export function initMap(elementId = "map", options = {}) {
  const map = L.map(elementId, {
    preferCanvas: true,
    zoomControl: true,
    attributionControl: true,
    ...options,
  }).setView([-6.234985, 106.831627], 10);
  setTimeout(() => {
    map.invalidateSize();
  }, 500);
  L.tileLayer(
    "https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=OCxf3aKSk6gkj1aQKlOR",
    {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors & <a href="https://www.maptiler.com/copyright/" target="_blank" rel="noopener">MapTiler</a>',
      tileSize: 512,
      zoomOffset: -1,
      minZoom: 1,
      crossOrigin: true,
    },
  ).addTo(map);
  return map;
}
