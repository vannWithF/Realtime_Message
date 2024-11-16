import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors'

const app = express()
const PORT:number = 8000
const httpServer = createServer();
const api_local = 'localhost:5173'
const api_devtunnel = 'https://h1l3rq2k-5173.asse.devtunnels.ms'
const io = new Server(httpServer, {


    cors: {
        origin: 'https://h1l3rq2k-5173.asse.devtunnels.ms', // Pastikan format URL valid
        credentials: true,               // Izinkan pengiriman cookie atau token
        methods: ['GET', 'POST'],        // Metode HTTP yang diizinkan
        allowedHeaders: ['Content-Type', 'Authorization'], // Header yang diizinkan
    },
});

app.use(cors({ origin: 'https://h1l3rq2k-5173.asse.devtunnels.ms', credentials: true }));


io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('chat message', (msg) => {
        console.log('Message received:', msg);
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

httpServer.listen(PORT, () => {
    console.log('Server running on http://localhost:8000');
});
