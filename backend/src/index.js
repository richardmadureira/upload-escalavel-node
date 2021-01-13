const http = require('http');
const socketIo = require('socket.io');
const Routes = require('./routes');


const { start } = require('repl');
const PORT = 3000;

const handler = function(request, response) {
    const defaultRoute = async(request, response) => response.end('Hello');
    const routes = new Routes(io);
    const choosen = routes[request.method.toLowerCase()] || defaultRoute;
    return choosen.apply(routes, [request, response]);
}

const server = http.createServer(handler);
const io = socketIo(server, {
    cors: {
        origin: '*',
        credentials: false
    }
});

io.on('connection', (socket) => console.log('someone connected', socket.id));

/*
const interval = setInterval(() => {
    io.emit('file-uploaded', 5e6)
}, 250);
*/



const startServer = () => {
    const { address, port} = server.address();
    console.log(`App running at http://${address}:${port}`)
}

server.listen(PORT, startServer);