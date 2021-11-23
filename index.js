const app = require('express')();
const http = require('http');
const server = http.createServer(app);

const PORT = process.env.PORT || 8080;

const origin = "https://parallel-txt.herokuapp.com ";
if (PORT == 8080) origin = "http://localhost:3000";

let io = require('socket.io')(server, {
    cors: {
        origin: origin,
        methods: ["GET", "POST"]
    }
});

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
