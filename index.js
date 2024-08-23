var express = require('express'),
    cors = require('cors'),
    secure = require('ssl-express-www');
const PORT = process.env.PORT || 8080 || 5000 || 3000
var { color } = require('./lib/color.js')

var mainrouter = require('./routes/main'),
    apirouter = require('./routes/api')

const fs = require('fs');
const path = require('path');
const countFile = path.join(__dirname, 'count.txt');
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
