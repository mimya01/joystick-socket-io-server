const server = require('http').createServer()
const io = require('socket.io')(server)
const port = 3000
io.on('connection', client => {
    console.log('new client connected')
    client.on('event', data => {
        console.log(data)
    });
    client.on('disconnect', () => {
        console.log('client connected')
    })
})
server.listen(port, () =>
    console.log('listening on :3000')
);