import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import cors from 'cors';

const app = express();
const PORT: number = 8000;

// URL asal yang diizinkan
const api_local = 'http://localhost:5173';
const api_devtunnel = 'https://b7dl5g0n-5173.asse.devtunnels.ms';

// Middleware CORS untuk Express
app.use(cors({ 
    origin: [api_local, api_devtunnel], 
    credentials: true 
}));

// Membuat server HTTP dengan Express
const httpServer = createServer(app);

// Konfigurasi Socket.IO dengan CORS
const io = new Server(httpServer, {
    cors: {
        origin: [api_local, api_devtunnel],
        credentials: true,
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    },
});

// Rute contoh untuk memastikan server HTTP bekerja
app.get('/', (req, res) => {
    res.send('Server is running with Socket.IO');
});

// Event handling untuk Socket.IO
io.on('connection', (socket: Socket) => {
    console.log('User connected:', socket.id);

    // Mendengarkan pesan chat dari client
    socket.on('chat message', (msg: string) => {
        console.log('Message received:', msg);
        io.emit('chat message', msg); // Broadcast pesan ke semua client
    });

    // Event saat client terputus
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

// Menjalankan server HTTP
httpServer.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
