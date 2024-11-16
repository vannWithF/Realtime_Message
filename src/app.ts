import express  from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'

const app = express()
const PORT: number = 8000
const server = createServer(app)
const io = new Server(server)

io.on('connection', (socket) => {
    console.log('User connected:', socket.id)
})

app.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`)
})