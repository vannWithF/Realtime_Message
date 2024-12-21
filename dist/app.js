"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = 8000;
// URL asal yang diizinkan
const api_local = 'http://localhost:5173';
const api_devtunnel = 'https://b7dl5g0n-5173.asse.devtunnels.ms';
// Middleware CORS untuk Express
app.use((0, cors_1.default)({
    origin: [api_local, api_devtunnel],
    credentials: true
}));
// Membuat server HTTP dengan Express
const httpServer = (0, http_1.createServer)(app);
// Konfigurasi Socket.IO dengan CORS
const io = new socket_io_1.Server(httpServer, {
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
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);
    // Mendengarkan pesan chat dari client
    socket.on('chat message', (msg) => {
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
