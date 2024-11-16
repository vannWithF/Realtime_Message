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
const httpServer = (0, http_1.createServer)();
const api_local = 'localhost:5173';
const api_devtunnel = 'https://h1l3rq2k-5173.asse.devtunnels.ms';
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: 'https://h1l3rq2k-5173.asse.devtunnels.ms', // Pastikan format URL valid
        credentials: true, // Izinkan pengiriman cookie atau token
        methods: ['GET', 'POST'], // Metode HTTP yang diizinkan
        allowedHeaders: ['Content-Type', 'Authorization'], // Header yang diizinkan
    },
});
app.use((0, cors_1.default)({ origin: 'https://h1l3rq2k-5173.asse.devtunnels.ms', credentials: true }));
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
