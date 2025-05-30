const multer = require('multer');
// const multerS3 = require('multer-s3');
// const { S3Client } = require('@aws-sdk/client-s3');

const {
  insert,
  search,
  update,
  updateViewCount,
  deleteById,
  count,
} = require('./service');
const { validate } = require('./request');
const { VIDEO_QUEUE_EVENTS: QUEUE_EVENTS } = require('../../queues/constants');
const { VIDEO_STATUS } = require('../../db/constant');
const { addQueueItem } = require('../../queues/queue');
const {
  getVideoDurationAndResolution,
} = require('../../queues/video-processor');
const logger = require('../../../logger');

const BASE_URL = `/api/videos`;

const setupRoutes = (app) => {
  logger.info(`Setting up routes for ${BASE_URL}`);

  // return empty response with success message for the base route
  app.get(`${BASE_URL}/`, async (req, res) => {
    logger.info(`GET`, req.params);
    const data = await search({});
    res.send({
      status: 'success',
      message: 'OK',
      timestamp: new Date(),
      data,
    });
  });

  app.get(`${BASE_URL}/detail/:id`, async (req, res) => {
    logger.info(`GET`, req.params);
    const video = await updateViewCount(req.params.id);
    if (video instanceof Error) {
      return res.status(400).json(JSON.parse(video.message));
    }
    res.send(video);
  });

  // TODO: Proper searching with paging and ordering
  app.post(`${BASE_URL}/search`, async (req, res) => {
    logger.info('POST search', req.body);
    const result = await search(req.body);
    res.send(result);
  });

  app.post(`${BASE_URL}/count`, async (req, res) => {
    logger.info('POST count', req.body);
    const result = await count(req.body);
    res.send({ count: result });
  });

  // app.post(`${BASE_URL}/create`, async (req, res) => {
  //   console.log('POST create', req.body);
  //   const validationResult = validate(req.body);
  //   if (!validationResult.error) {
  //     const result = await insert(req.body);
  //     if (result instanceof Error) {
  //       res.status(400).json(JSON.parse(result.message));
  //       return;
  //     }
  //     return res.json(result);
  //   }
  //   return res
  //     .status(400)
  //     .json({ status: 'error', message: validationResult.error });
  // });

  app.put(`${BASE_URL}/update/:id`, async (req, res) => {
    const validationResult = validate(req.body);
    if (req.params.id && !validationResult.error) {
      const result = await update({
        _id: req.params.id,
        ...validationResult.value,
      });
      if (result instanceof Error) {
        return res.status(400).json(JSON.parse(result.message));
      }
      return res.json(result);
    }
    return res
      .status(400)
      .json({ status: 'error', message: validationResult.error });
  });

  app.delete(`${BASE_URL}/delete/:id`, async (req, res) => {
    logger.info('DELETE', req.params.id);
    if (req.params.id) {
      const result = await deleteById(req.params.id);
      if (result instanceof Error) {
        res.status(400).json(JSON.parse(result.message));
        return;
      }
      return res.json(result);
    }
    return res.status(400).json({ status: 'error', message: 'Id required' });
  });

  // upload videos handler using multer package routes below.

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/videos');
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + '-' + uniqueSuffix);
    },
  });

  const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'video/mp4' || file.mimetype === 'video/webm') {
      logger.info('file type supported', file);
      cb(null, true);
    } else {
      logger.info('file type not supported', file);
      cb(new multer.MulterError('File type not supported'), false);
    }
  };

  // const s3Client = new S3Client({
  //   endpoint: process.env.ENDPOINT, // Find your endpoint in the control panel, under Settings. Prepend "https://".
  //   forcePathStyle: false, // Configures to use subdomain/virtual calling format.
  //   region: process.env.REGION, // Must be "us-east-1" when creating new Spaces. Otherwise, use the region in your endpoint (e.g. nyc3).
  //   credentials: {
  //     accessKeyId: process.env.ACCESS_KEY, // Access key pair. You can create access key pairs using the control panel or API.
  //     secretAccessKey: process.env.ACCESS_TOKEN, // Secret access key defined through an environment variable.
  //   },
  // });

  // const s3Storage = multerS3({
  //   s3: s3Client, // s3 instance
  //   bucket: process.env.BUCKET_NAME, // change it as per your project requirement
  //   acl: 'private', // storage access type
  //   // metadata: (req, file, cb) => {
  //   //   cb(null, { fieldname: file.fieldname });
  //   // },
  //   // key: (req, file, cb) => {
  //   //   const fileName =
  //   //     Date.now() + '_' + file.fieldname + '_' + file.originalname;
  //   //   cb(null, fileName);
  //   // },
  // });

  const upload = multer({
    // dest: 'uploads/videos',
    fileFilter: fileFilter,
    limits: { fileSize: 50000000 },
    storage: storage,
  }).single('video');

  const uploadProcessor = (req, res, next) => {
    upload(req, res, (err) => {
      if (err) {
        //console.error(err);
        res.status(400).json({ status: 'error', error: err });
        return;
      } else {
        logger.info('upload success', req.file);
        // res.status(200).json({ status: "success", message: "upload success" });
        next();
      }
    });
  };

  app.post(`${BASE_URL}/upload`, uploadProcessor, async (req, res) => {
    try {
      const dbPayload = {
        ...req.body,
        fileName: req.file.filename, // Store the generated filename (e.g., video-1747983521292-499285124)
        originalName: req.file.originalname,
        recordingDate: new Date(),
        videoLink: `/uploads/videos/${req.file.filename}`, // Construct a relative URL for the video
        viewCount: 0,
        duration: 0,
        status: VIDEO_STATUS.PUBLISHED,
      };
      logger.info('dbPayload', { dbPayload });
  
      const result = await insert(dbPayload);
      logger.info('result', result);
  
      res.status(200).json({
        status: 'success',
        message: 'Upload success',
        ...req.file,
        ...result,
        videoLink: dbPayload.videoLink, // Ensure the response includes the video URL
      });
    } catch (error) {
      logger.error(error);
      res.status(500).json({ status: 'error', message: error.message });
    }
  });
};
const setup = (app) => {
  setupRoutes(app);
};

module.exports = { setup };
