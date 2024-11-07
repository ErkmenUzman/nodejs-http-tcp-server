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
    if (req.url === '/api/users' && req.method === 'GET') 
    { 
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(200); // Send a 200 OK status
        res.end(JSON.stringify(users)); // Send JSON data as response
    } 

    else if (req.url.match(/\/api\/users\/([0-9]+)/) && req.method === 'GET') 
    {
        const id = req.url.split('/')[3];
        const user = users.find((user) => user.id === parseInt(id));
        res.setHeader('Content-Type', 'application/json');
        if(user) 
        {
            res.writeHead(200); // Send a 200 OK status
            res.end(JSON.stringify(user)); // Send JSON data as response
        } 
        else 
        {
            // Respond with 404 for other routes
            res.write(JSON.stringify({message: 'User not found'}));            
        }
        res.end();
    }
    else
    {
        res.setHeader('Content-type', 'application/json');
        res.statusCode = 404;
        res.write(JSON.stringify({message: 'Route not found'}));
        res.end();
    } 
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});