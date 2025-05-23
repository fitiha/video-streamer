// app.js
require('dotenv').config();
const express = require('express');
const compression = require('compression');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const logger = require('./logger');

app.use(express.json());
app.use(compression());

// Configure CORS with specific origin
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'], // Add your frontend origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // If you use cookies or authentication
  optionsSuccessStatus: 200, // For legacy browsers
}));

// Log CORS requests for debugging
app.use((req, res, next) => {
  logger.info(`CORS: Allowing origin ${req.get('Origin') || 'unknown'}`);
  next();
});

app.use('/uploads/videos', express.static('uploads/videos'));
app.use('/thumbnails', express.static('uploads/thumbnails'));

const morganMiddleware = morgan(
  ':method :url :status :res[content-length] - :response-time ms',
  {
    stream: {
      write: (message) => logger.http(message.trim()),
    },
  }
);
app.use(morganMiddleware);

module.exports = app;