var fs = require('fs')
var path = require('path')
const server = require('http').createServer(function (req, res) {
    // cost
    const path = 'video/video.mp4'
    const stat = fs.statSync(path)
    const fileSize = stat.size
    const range = req.headers.range
    if (range) {
        const parts = range.replace(/bytes=/, "").split("-")
        const start = parseInt(parts[0], 10)
        const end = parts[1]
            ? parseInt(parts[1], 10)
            : fileSize - 1
        const chunksize = (end - start) + 1
        const file = fs.createReadStream(path, { start, end })
        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4',
        }
        res.writeHead(206, head);
        file.pipe(res);
    } else {
        const head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
        }
        res.writeHead(200, head)
        fs.createReadStream(path).pipe(res)
    }
})
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