const app = require('express')();
const http = require('http');
const server = http.createServer(app);

let io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

const PORT = 8080;

server.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});

io.on('connection', (socket) => {
    console.log('new client connected');
    
    socket.on('new_message', (data) => {
        io.emit('new_message', data)
    })
});
