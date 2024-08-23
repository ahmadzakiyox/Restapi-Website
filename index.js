var express = require('express'),
    cors = require('cors'),
    secure = require('ssl-express-www');
const PORT = process.env.PORT || 8080 || 5000 || 3000
var { color } = require('./lib/color.js')

var mainrouter = require('./routes/main'),
    apirouter = require('./routes/api')

const mongoose = require('mongoose');
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
var app = express()
app.enable('trust proxy');
app.set("json spaces",2)
app.use(cors())
app.use(secure)
app.use(express.static("public"))

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
app.use('/', mainrouter)
app.use('/api', apirouter)

app.listen(PORT, () => {
    console.log(color("Server running on port " + PORT,'green'))
})

module.exports = app
