"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
const PORT = 8000;
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server);
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);
});
app.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`);
});
