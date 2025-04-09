var express = require('express');
var cors = require('cors');
var multer = require('multer');
require('dotenv').config();

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
app.use(express.urlencoded({ extended: false }));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Configure multer to store uploaded files in the "uploads" folder 
// Not persistent, added /uploads to gitignore 
var upload = multer({ dest: 'uploads/' });

// POST endpoint to handle file uploads
// "upfile" should be the name attribute of your file input in the HTML form
app.post('/api/fileanalyse', upload.single('upfile'), function (req, res) {
  // Check if file was uploaded
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const { originalname, mimetype, size } = req?.file

  // Create a JSON response with the file's original name, type (MIME type), and size in bytes.
  const responseObject = {
    name: originalname, // original file name on user's computer
    type: mimetype,       // file type (MIME)
    size: size            // file size in bytes
  };

  // Return the JSON response
  res.json(responseObject);
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});