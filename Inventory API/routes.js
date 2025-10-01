const { createItem, getAllItems, getItem, updateItem, deleteItem } = require('./controller');

function handleRoutes(req, res) {
  const url = req.url;
  const method = req.method;

  
  let body = '';
  req.on('data', chunk => (body += chunk.toString()));

  req.on('end', () => {
    res.setHeader('Content-Type', 'application/json');

    try {
      if (url === '/items' && method === 'POST') {
        const data = JSON.parse(body);
        if (!data.name || !data.price || !data.size) {
          res.end(JSON.stringify({ success: false, message: 'Missing required fields' }));
          return;
        }
        return res.end(JSON.stringify(createItem(data)));
      }

      if (url === '/items' && method === 'GET') {
        return res.end(JSON.stringify(getAllItems()));
      }

      if (url.startsWith('/items/') && method === 'GET') {
        const id = url.split('/')[2];
        return res.end(JSON.stringify(getItem(id)));
      }

      if (url.startsWith('/items/') && method === 'PUT') {
        const id = url.split('/')[2];
        const data = body ? JSON.parse(body) : {};
        return res.end(JSON.stringify(updateItem(id, data)));
      }

      if (url.startsWith('/items/') && method === 'DELETE') {
        const id = url.split('/')[2];
        return res.end(JSON.stringify(deleteItem(id)));
      }

      res.statusCode = 404;
      res.end(JSON.stringify({ success: false, message: 'Route not found' }));

    } catch (err) {
      res.statusCode = 500;
      res.end(JSON.stringify({ success: false, message: 'Server error', error: err.message }));
    }
  });
}

module.exports = handleRoutes;
