import { createServer } from 'http';

const PORT = process.env.PORT;

const users = [
    { id: 1, name: 'Erkmen Uzman' },
    { id: 2, name: 'Egemen Uzman' },
    { id: 3, name: 'Birgül Uzman' },
    { id: 4, name: 'Mustafa Kemal Uzman' }
];

const server = createServer((req, res) => {
    console.log(`Request URL: ${req.url}, Method: ${req.method}`); // Log incoming requests for debugging

    // Check for the exact route and method
    if (req.url === '/api/users' && req.method === 'GET') { 
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(200); // Send a 200 OK status
        res.end(JSON.stringify(users)); // Send JSON data as response
    } else {
        // Respond with 404 for other routes
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});