const tf = require('@tensorflow/tfjs');
const Jimp = require('jimp');
const supabase = require('../supabaseClient');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'secret_key';

let model;

async function loadModel() {
  const modelPath = 'http://localhost:3000/model/model.json';
  model = await tf.loadGraphModel(modelPath);
  console.log('Model loaded');
}

const LABELS = [
  'Daun', 'Kaca', 'Karet', 'Kayu', 'Kertas',
  'Logam', 'Plastik', 'Styrofoam', 'Tekstil', 'sisaMakanan'
];

const CONFIDENCE_THRESHOLD = 0.01; // Lebih rendah agar deteksi muncul
const IOU_THRESHOLD = 0.45; // Threshold untuk NMS

const predictHandler = async (request, h) => {
  try {
    // Ambil user_id dari JWT
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return h.response({ status: 'fail', message: 'Token tidak ditemukan' }).code(401);
    }
    const token = authHeader.split(' ')[1];
    let payload;
    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch {
      return h.response({ status: 'fail', message: 'Token tidak valid' }).code(401);
    }
    const userId = payload.id;

    // Ambil buffer gambar dari payload (form-data key: 'image')
    const imageBuffer = request.payload.image._data || request.payload.image;
    // Baca dan resize gambar pakai Jimp
    const image = await Jimp.read(imageBuffer);
    image.resize(640, 640);
    // Ambil hanya channel RGB (tanpa alpha)
    const { data, width, height } = image.bitmap;
    const rgbData = [];
    for (let i = 0; i < data.length; i += 4) {
      rgbData.push(data[i], data[i + 1], data[i + 2]);
    }
    // Buat tensor [1, 640, 640, 3] dan normalisasi 0-1
    let tensor = tf.tensor4d(rgbData, [1, height, width, 3]);
    tensor = tensor.toFloat().div(tf.scalar(255));
    // Inference
    const predictions = await model.executeAsync(tensor);
    let pred = Array.isArray(predictions) ? predictions[0] : predictions;
    let predArr = pred.squeeze().transpose([1, 0]).arraySync(); // [8400, 14]

    // Logging tambahan untuk debugging
    console.log('Raw prediction tensor shape:', pred.shape);

    // Ambil semua box, score, dan class
    const boxes = [];
    const scores = [];
    const classes = [];
    for (let i = 0; i < predArr.length; i++) {
      const row = predArr[i];
      // Perbaikan: output model [x, y, w, h, ...class_probs]
      const [x, y, w, h, ...classProbs] = row;
      const classIdx = classProbs.indexOf(Math.max(...classProbs));
      const maxClassScore = classProbs[classIdx];
      const score = maxClassScore; // Tidak ada conf/objectness terpisah
      // Logging score untuk debug
      if (i < 10) console.log('Calculated score:', score, 'Max class score:', maxClassScore, 'classIdx:', classIdx);
      if (score >= CONFIDENCE_THRESHOLD) {
        // Skala bbox ke piksel (YOLOv8 biasanya output normalisasi 0-1)
        // Convert bbox dari center x,y,w,h ke [x_min, y_min, x_max, y_max] dalam piksel
        // LOG NILAI x, y, w, h untuk debug
        if (i < 10) console.log('Raw bbox:', {x, y, w, h});
        let x_c = x, y_c = y, w_box = w, h_box = h;
        // Jika semua nilai x, y, w, h < 2, asumsikan output dinormalisasi (0-1), maka kalikan width/height
        if (Math.max(Math.abs(x), Math.abs(y), Math.abs(w), Math.abs(h)) <= 2) {
          x_c = x * width;
          y_c = y * height;
          w_box = w * width;
          h_box = h * height;
        }
        const x_min = Math.max(0, Math.round(x_c - w_box / 2));
        const y_min = Math.max(0, Math.round(y_c - h_box / 2));
        const x_max = Math.min(width, Math.round(x_c + w_box / 2));
        const y_max = Math.min(height, Math.round(y_c + h_box / 2));
        boxes.push([y_min, x_min, y_max, x_max]); // format [ymin, xmin, ymax, xmax] untuk tfjs NMS
        scores.push(score);
        classes.push(classIdx);
      }
    }

    let results = [];
    if (boxes.length > 0) {
      // NMS pakai tfjs
      const boxesTensor = tf.tensor2d(boxes);
      const scoresTensor = tf.tensor1d(scores);
      const nmsIndices = await tf.image.nonMaxSuppressionAsync(
        boxesTensor, scoresTensor, 20, IOU_THRESHOLD, CONFIDENCE_THRESHOLD
      );
      const selectedIdx = await nmsIndices.array();
      for (const idx of selectedIdx) {
        results.push({
          class: LABELS[classes[idx]],
          confidence: scores[idx],
          bbox: [
            Math.round(boxes[idx][1]), // x_min
            Math.round(boxes[idx][0]), // y_min
            Math.round(boxes[idx][3]), // x_max
            Math.round(boxes[idx][2])  // y_max
          ]
        });
      }
      boxesTensor.dispose();
      scoresTensor.dispose();
      nmsIndices.dispose();
    }

    // Ambil hasil deteksi dengan confidence tertinggi
    let bestResult = null;
    let maxScore = -1;
    for (const result of results) {
      if (result.confidence > maxScore) {
        maxScore = result.confidence;
        bestResult = result;
      }
    }
    const detectedClass = bestResult ? bestResult.class : null;

    // Tambahkan 250 poin ke user
    // Ambil poin lama
    const { data: userData, error: userError } = await supabase.from('users').select('points').eq('id', userId).single();
    if (userError) {
      return h.response({ status: 'fail', message: 'Gagal mengambil data user' }).code(500);
    }
    const newPoints = (userData?.points || 0) + 250;
    const { error: updateError } = await supabase.from('users').update({ points: newPoints }).eq('id', userId);
    if (updateError) {
      return h.response({ status: 'fail', message: 'Gagal menambah poin user' }).code(500);
    }

    // Simpan ke history (hanya class dengan score tertinggi)
    await supabase
      .from('history')
      .insert([{
        user_id: userId,
        filename: request.payload.image.hapi?.filename || null,
        detected: detectedClass,
        date: new Date().toISOString().slice(0, 10)
      }]);

    return h.response({
      status: 'success',
      detected: detectedClass,
      points_added: 250,
      current_points: newPoints,
      results
    }).code(200);
  } catch (err) {
    return h.response({ status: 'fail', message: err.message }).code(500);
  }
};

module.exports = { predictHandler, loadModel };
