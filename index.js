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

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
})

server.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});

io.on('connection', (socket) => {
    socket.emit('connection', null);
    
    socket.on('send-message', message => {
        io.emit('message', message);
    });
});
