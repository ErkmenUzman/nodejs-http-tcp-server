import { createServer } from 'http';
import { createRequire } from 'module';

const PORT = process.env.PORT;

const users = [
    { id: 1, name: 'Erkmen Uzman' },
    { id: 2, name: 'Egemen Uzman' },
    { id: 3, name: 'Birgül Uzman' },
    { id: 4, name: 'Mustafa Kemal Uzman' }
];

//  Logger middleware
const logger = (req,res,next) => {
    console.log(`${req.method} ${req.url}`);
    next();
}

//  JSON middleware 
const jsonMiddleware = (req,res,next) => {
    res.setHeader('Content-type', 'application/json');
    next();
}

//  Route handler for GET /api/users
const getUsersHandler = (req,res) => {
    res.end(JSON.stringify(users)); // Send JSON data as response
}

//  Route handler for GET /api/users/:id
const getUserByIdHandler = (req,res) => {
    const id = req.url.split('/')[3];
    const user = users.find((user) => user.id === parseInt(id));

    if(user) {
            res.writeHead(200); // Send a 200 OK status
            res.end(JSON.stringify(user)); // Send JSON data as response
        } else {
            // Respond with 404 for other routes
            res.write(JSON.stringify({message: 'User not found'}));            
        }

        res.end();
}

// Not Found Handler
const notFoundHandler = (req,res) => {
    res.statusCode = 404;
    res.write(JSON.stringify({message: 'Route not found'}));
    res.end();
}

const server = createServer((req,res) => {
    logger(req,res, () => {
        jsonMiddleware(req,res, () => {
            if (req.url === '/api/users' && req.method === 'GET') {
                getUsersHandler(req,res);
            } else if (req.url.match(/\/api\/users\/([0-9]+)/) && req.method === 'GET') {
                getUserByIdHandler(req,res);
            } else {
                notFoundHandler(req,res);
            }
        })
    });
    
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});