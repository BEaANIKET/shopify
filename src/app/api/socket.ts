import { Server } from 'socket.io'

const SocketHandler = (req, res) => {
    console.log("hello I am here ")
    if (res.socket.server.io) {
        console.log('Socket is already running')
    } else {
        console.log('Socket is initializing')
        const io = new Server(res.socket.server)
        res.socket.server.io = io

        io.on('connection', socket => {
            socket.on('input-change', msg => {
                socket.broadcast.emit('update-input', msg)
            })
        })
    }
    res.end()
}