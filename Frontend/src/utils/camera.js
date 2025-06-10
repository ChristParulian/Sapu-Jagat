/**
 * Utils untuk mengakses kamera dan mengambil foto (web).
 * Fungsi ini mengembalikan stream video dan menangkap gambar dari stream.
 */

export async function getCameraStream(constraints = { video: true }) {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    throw new Error('Kamera tidak didukung di browser ini.');
  }
  return await navigator.mediaDevices.getUserMedia(constraints);
}

/**
 * Mengambil foto dari elemen video dan mengembalikan data URL gambar.
 * @param {HTMLVideoElement} videoEl
 * @returns {string} dataURL
 */
export function captureImageFromVideo(videoEl) {
  const canvas = document.createElement('canvas');
  canvas.width = videoEl.videoWidth;
  canvas.height = videoEl.videoHeight;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(videoEl, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL('image/png');
}

/**
 * Mengambil daftar perangkat kamera yang tersedia.
 * @returns {Promise<Array<{deviceId: string, label: string}>>}
 */
export async function getCameraDevices() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
    throw new Error('enumerateDevices tidak didukung di browser ini.');
  }
  const devices = await navigator.mediaDevices.enumerateDevices();
  return devices
    .filter(d => d.kind === 'videoinput')
    .map(d => ({
      deviceId: d.deviceId,
      label: d.label || 'Kamera ' + (d.deviceId.slice(-4))
    }));
}