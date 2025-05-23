// server.js
const app = require('./app');
const logger = require('./logger');
const { MongoManager } = require('./modules/db/mongo');
const { NOTIFY_EVENTS } = require('./modules/queues/constants');
const eventEmitter = require('./event-manager').getInstance();
const http = require('http');
const { Server } = require('socket.io');

const PORT = 4000;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3000', 'http://localhost:5173'], // Match frontend origins
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

io.on('connection', (socket) => {
  logger.info(`Socket.IO: User connected with ID ${socket.id}`);
  socket.on('disconnect', () => {
    logger.info(`Socket.IO: User disconnected with ID ${socket.id}`);
  });
});

const setup = async () => {
  const { setup: setupVideoModule } = await require('./modules/models/video/controller');
  setupVideoModule(app);

  const { setup: setupRoleModule } = await require('./modules/models/role/controller');
  setupRoleModule(app);

  const { listenQueueEvent } = await require('./modules/queues/worker');
  listenQueueEvent(NOTIFY_EVENTS.NOTIFY_VIDEO_HLS_CONVERTED);

  eventEmitter.on(NOTIFY_EVENTS.NOTIFY_VIDEO_HLS_CONVERTED, (data) => {
    logger.info('NOTIFY_EVENTS.NOTIFY_VIDEO_HLS_CONVERTED Event handler', data);
    io.emit('hello', data);
  });
};

server.listen(PORT, async () => {
  logger.info(`Server listening on port ${PORT}`);
  await MongoManager.connect();
  await setup();
  logger.info('Application setup completed');

  // Catch-all route for testing (move to avoid overriding other routes)
  app.get('/test', (req, res) => {
    logger.info(`Test request received at ${new Date()}`);
    logger.info('req.body', req.body);
    res.send(`Test request received at ${new Date()}`);
  });

  logger.info('Application started', new Date().toTimeString());
});