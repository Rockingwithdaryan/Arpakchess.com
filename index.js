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
  '.jpeg': 'image/jpeg',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.json': 'application/json',
};

const server = http.createServer((req, res) => {
  // Decode %20 and other encoded characters in URLs
  const decoded = decodeURIComponent(req.url);

  // Default route → index.html
  let requestedPath = decoded === '/' ? '/src/HTML/index.html' : decoded;

  // List of locations to search for the file, in order
  const candidates = [
    path.join(__dirname, requestedPath),              // 1. project root
    path.join(__dirname, 'src/HTML', requestedPath),  // 2. inside src/HTML
  ];

  const ext = path.extname(requestedPath).toLowerCase();
  const contentType = mimeTypes[ext] || 'text/plain';

  // Try each candidate path until one works
  const tryNext = (index) => {
    if (index >= candidates.length) {
      console.log('404 -', requestedPath);
      res.writeHead(404);
      res.end('404 Not Found: ' + requestedPath);
      return;
    }

    fs.readFile(candidates[index], (err, data) => {
      if (err) {
        tryNext(index + 1); // try the next location
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
      }
    });
  };

  tryNext(0);
});

server.listen(PORT, () => {
  console.log('');
  console.log('   ♟  Arpak Chess server is running!');
  console.log('');
  console.log(`   http://localhost:${PORT}`);
  console.log('');
});