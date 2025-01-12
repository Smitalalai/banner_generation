const express = require('express');
const bodyParser = require('body-parser');
const formidable = require('formidable');
const { spawn } = require('child_process');
const path = require('path');

const app = express();
app.use(bodyParser.json());

app.post('/generate-banner', (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).send(err);
    }

    const { text, audience, platform } = fields;
    const brandAssets = files.brandAssets.path;

    const pythonProcess = spawn('python3', ['server/bannerGenerator.py', brandAssets, text, audience, platform]);

    pythonProcess.stdout.on('data', (data) => {
      res.json({ banner: data.toString() });
    });

    pythonProcess.stderr.on('data', (data) => {
      res.status(500).send(data.toString());
    });
  });
});

const PORT = 3001; // Change the port to 3001
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});