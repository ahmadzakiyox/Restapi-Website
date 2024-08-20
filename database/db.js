var __path = process.cwd(),
    mongoose = require('mongoose'),
    { color } = require(__path + '/lib/color.js');

// Connection URL
var url = 'mongodb+srv://murafulan:lelang18@cluster0.qblcl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
try {
    if(url === 'mongodb+srv://murafulan:lelang18@cluster0.qblcl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0') {
        throw console.log(color('Cek konfigurasi database, var url belum diisi dengan benar', 'red'));
    }
} catch (e) {
    return;
}

// Connect to MongoDB
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log(color('Connected correctly to server, Murafulan', 'green'));
}).catch((e) => {
    console.log(color('Error: ' + e + '\n\nGagal connect ke database, \ncek konfigurasi database apakah Connection URL sudah benar', 'red'));
});

module.exports = db
