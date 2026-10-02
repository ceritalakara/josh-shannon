const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3000;
const ROOT = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.txt': 'text/plain; charset=utf-8'
};

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url);
  let pathname = decodeURIComponent(parsedUrl.pathname);

  // Default root to /day
  if (pathname === '/' || pathname === '') {
    res.writeHead(302, { Location: '/day' });
    return res.end();
  }

  let filePath = path.join(ROOT, pathname);

  // Check if directory or file exists
  fs.stat(filePath, (err, stats) => {
    if (!err && stats.isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    } else if (err) {
      // Try appending .html or /index.html
      const htmlPath = filePath + '.html';
      const dirIndexPath = path.join(filePath, 'index.html');

      if (fs.existsSync(htmlPath)) {
        filePath = htmlPath;
      } else if (fs.existsSync(dirIndexPath)) {
        filePath = dirIndexPath;
      }
    }

    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        // Fallback to 404
        const notFoundPath = path.join(ROOT, '404.html');
        if (fs.existsSync(notFoundPath)) {
          res.writeHead(404, {
            'Content-Type': 'text/html; charset=utf-8',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
          });
          return res.end(fs.readFileSync(notFoundPath));
        }
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        return res.end('404 Not Found');
      }

      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';

      const headers = {
        'Content-Type': contentType
      };

      headers['Cache-Control'] = 'no-cache, no-store, must-revalidate';
      headers['Pragma'] = 'no-cache';
      headers['Expires'] = '0';

      res.writeHead(200, headers);
      res.end(content);
    });
  });
});

server.listen(PORT, () => {
  console.log(`Wedding Invitation server running at:`);
  console.log(`- Day Invitation:     http://localhost:${PORT}/day`);
  console.log(`- Evening Invitation: http://localhost:${PORT}/evening`);
});
