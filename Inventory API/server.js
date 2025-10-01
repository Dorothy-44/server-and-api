const http = require('http');
const handleRoutes = require('./routes');

const PORT = 3000;

const server = http.createServer((req, res) => {
  handleRoutes(req, res);
});

server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
