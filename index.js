const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const mimeTypes = {
  '.html': 'text/html',
  '.css':  'text/css',
  '.js':   'application/javascript',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.json': 'application/json',
};

const server = http.createServer((req, res) => {
  let requestedPath = req.url === '/' ? '/src/HTML/index.html' : req.url;
  let filePath = path.join(__dirname, requestedPath);

  const ext = path.extname(filePath);
  const contentType = mimeTypes[ext] || 'text/plain';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.log('404 -', filePath);
      res.writeHead(404);
      res.end('404 Not Found: ' + requestedPath);
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log('');
  console.log('   Arpak Chess server is running!');
  console.log('');
  console.log(`   http://localhost:${PORT}`);
  console.log(''); 
});