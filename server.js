const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2'
};

const server = http.createServer((req, res) => {
  // ==================== CORS Headers ====================
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Max-Age', '86400');

  // ==================== Security Headers ====================
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

  // ==================== Service Worker Headers ====================
  if (req.url === '/sw.js' || req.url.endsWith('/sw.js')) {
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.setHeader('Service-Worker-Allowed', '/');
    res.setHeader('Content-Type', 'application/javascript; charset=UTF-8');
  }

  // ==================== Manifest Headers ====================
  if (req.url === '/manifest.json' || req.url.endsWith('/manifest.json')) {
    res.setHeader('Content-Type', 'application/manifest+json; charset=UTF-8');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    // CORS headers extra para manifest
    res.setHeader('Access-Control-Allow-Origin', '*');
  }

  // ==================== HTML Headers ====================
  if (req.url === '/' || req.url.endsWith('.html')) {
    res.setHeader('Cache-Control', 'public, max-age=1800');
    res.setHeader('Content-Type', 'text/html; charset=UTF-8');
  }

  // ==================== Handle OPTIONS ====================
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // ==================== Handle GET/HEAD ====================
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('Method Not Allowed');
    return;
  }

  // ==================== Route to file ====================
  let filePath = req.url === '/' ? '/index.html' : req.url;
  // Remove query string
  filePath = filePath.split('?')[0];
  filePath = path.join(__dirname, filePath);

  // ==================== Security: prevent directory traversal ====================
  const realPath = fs.realpathSync(__dirname);
  const realFilePath = (() => {
    try {
      return fs.realpathSync(filePath);
    } catch (e) {
      return null;
    }
  })();

  if (!realFilePath || !realFilePath.startsWith(realPath)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('Forbidden');
    return;
  }

  // ==================== Serve file ====================
  fs.readFile(filePath, (err, data) => {
    if (err) {
      // Try index.html for SPA routing
      if (err.code === 'ENOENT' && !filePath.includes('.')) {
        fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
          if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' });
            res.end('<h1>404 - Ficheiro não encontrado</h1>');
            return;
          }
          res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
          res.end(data);
        });
      } else if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' });
        res.end('<h1>404 - Ficheiro não encontrado</h1>');
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
      }
    } else {
      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';
      
      // Ensure charset for text files
      let finalContentType = contentType;
      if (contentType.startsWith('text/') || contentType.includes('javascript') || contentType.includes('json')) {
        finalContentType = `${contentType}; charset=UTF-8`;
      }
      
      res.writeHead(200, { 'Content-Type': finalContentType });
      res.end(data);
    }
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`
╔════════════════════════════════════════╗
║   🚀 TrolleyCheck PWA Servidor         ║
╠════════════════════════════════════════╣
║                                        ║
║  📱 URL: http://localhost:${PORT}        ║
║  🔍 Teste: http://localhost:${PORT}/test-pwa.html ║
║  🐛 Debug Firebase: http://localhost:${PORT}/debug-firebase.html ║
║                                        ║
║  ✅ Service Worker: Funcional          ║
║  ✅ CORS: Habilitado                   ║
║  ✅ Manifest: Servido corretamente    ║
║                                        ║
╚════════════════════════════════════════╝
  `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('Servidor encerrado');
  server.close();
});
