const express = require('express');
const path = require('path');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');
const http  = require('http');
const socket = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socket(server).sockets;

dotenv.config({ path: ".env" });

// dev logging
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"))
}

// Cors 
app.use(cors());

// Bodyparser Middleware
app.use(express.json());
require("./middleware/socket")(app,io);

// Port
const PORT = process.env.PORT || 6000;
server.listen(PORT, () => console.warn(`Server started on port ${PORT}`));