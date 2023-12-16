const express = require('express');
const socketio = require('socket.io');
const path = require('path');
const { get } = require('https');

const app = express();

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  

app.use(express.static(path.resolve(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '/'));
});

const server = app.listen(900, () => {
    console.log('Server running!')
});

const io = socketio(server)
var mainwincounter = 0
var imagenum = 0
function dothething() {
    if (mainwincounter == 0) {
        mainwincounter = 1
        imagenum = 0
        return imagenum
    } else {
        imagenum = 1
        return imagenum
    }
}
var connectioncount = 0
io.on('connection', (socket) => {
    socket.on('index', () => {
        connectioncount ++
        console.log(connectioncount)
        imagenum = dothething()
        img = '/files/' + imagenum + '.html'
        socket.emit('img', img)
    })
    console.log(socket.id)
    socket.on('window2', () => {
        io.sockets.emit('createwindow', 'index.html')
    })
    socket.on('disconnect', () => {
        connectioncount --
        if (connectioncount < 0) {
            connectioncount = 0
        }
        if (connectioncount > 0) {} else {
            mainwincounter = 0
        }
        console.log('disconnected')
    })
})
