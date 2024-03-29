const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const cookieParser = require('cookie-parser');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const viewRouter = require('./routes/viewRoutes');
const bookingRouter = require('./routes/bookingRoutes');

const app = express();

// SETUP Template engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// 1) GLOBAL MIDDLEWARES

// Serving static files
app.use(express.static(`${__dirname}/public`));

// Set security HTTP headers
const scriptSources = [
  "'self'",
  'http:',
  'https:',
  'blob:',
  "'unsafe-inline'",
  "'unsafe-eval'",
];
const styleSources = [
  "'self'",
  'http:',
  'https:',
  "'unsafe-inline'",
  "'unsafe-eval'",
];
const fontSources = [
  "'self'",
  'http:',
  'https:',
  "'unsafe-inline'",
  "'unsafe-eval'",
];
const connectSources = [
  "'self'",
  'http:',
  'https:',
  'ws:',
  "'unsafe-inline'",
  "'unsafe-eval'",
];
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'", 'data:', 'blob:', 'http:', 'https:'],
      scriptSrc: scriptSources,
      scriptSrcElem: scriptSources,
      styleSrc: styleSources,
      fontSrc: fontSources,
      connectSrc: connectSources,
    },
  })
);
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());
// app.use(express.json()); // add body of request to req object

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
// whitelist allows properties to be passed in as arrays. all others not allowed
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  })
);

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  // console.log(req.cookies);
  next();
});

// MOUNT ROUTER on each ROUTE
app.use('/', viewRouter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/bookings', bookingRouter);

app.all('*', (req, res, next) => {
  if (req.originalUrl === `/bundle.js.map`) {
    next();
  } else {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  }
});

app.use(globalErrorHandler);

module.exports = app;
