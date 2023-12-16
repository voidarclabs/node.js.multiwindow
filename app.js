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
var imagenum = 0
function dothething() {
    if (imagenum == 0) {
        imagenum = 1
        return imagenum
    } else {
        imagenum = 0
        return imagenum
    }
}
io.on('connection', (socket) => {
    console.log(socket.id)
    imagenum = dothething()
    img = '/files/' + imagenum + '.html'
    socket.emit('img', img)
})
