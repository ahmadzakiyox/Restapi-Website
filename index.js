var express = require('express'),
    cors = require('cors'),
    secure = require('ssl-express-www');
const PORT = process.env.PORT || 8080 || 5000 || 3000
var { color } = require('./lib/color.js')

var mainrouter = require('./routes/main'),
    apirouter = require('./routes/api')

const fs = require('fs');
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

app.get('/count', (req, res) => {
    fs.readFile(countFile, 'utf8', (err, data) => {
      if (err) {
        return res.status(500).send('Error reading count file.');
      }
  
      let count = parseInt(data, 10);
      if (isNaN(count)) count = 0;
  
      count += 1;
  
      fs.writeFile(countFile, count.toString(), (err) => {
        if (err) {
          return res.status(500).send('Error updating count file.');
        }
        res.json({ count });
      });
    });
  });
app.use('/', mainrouter)
app.use('/api', apirouter)

app.listen(PORT, () => {
    console.log(color("Server running on port " + PORT,'green'))
})

module.exports = app
