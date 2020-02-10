const server = require('http').createServer()
const io = require('socket.io')(server)
const port = 4000
io.on('connection', client => {
    console.log('new client connected')
    client.on('direction', data => {
        console.log(data)
        client.broadcast.emit(data)
    });
    client.on('disconnect', () => {
        console.log('client connected')
    })
})
server.listen(port, () =>
    console.log('listening on :4000')
);