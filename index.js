// server.js
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 8080;

// Koneksi ke MongoDB
mongoose.connect('mongodb+srv://murafulan:lelang18@cluster0.qblcl.mongodb.net/visitor-count?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Schema dan Model
const countSchema = new mongoose.Schema({
  count: Number
});

const Count = mongoose.model('Count', countSchema);

// Middleware untuk menyajikan file statis
app.use(express.static('public'));

// Endpoint untuk mendapatkan dan meningkatkan count
app.get('/count', async (req, res) => {
  try {
    let countDoc = await Count.findOne();
    if (!countDoc) {
      countDoc = new Count({ count: 0 });
      await countDoc.save();
    }

    countDoc.count += 1;
    await countDoc.save();

    res.json({ count: countDoc.count });
  } catch (err) {
    res.status(500).send('Error accessing database.');
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
