const dotenv = require('dotenv');
const mongoose = require('mongoose');

process.on('uncaughtException', (err) => {
  // eslint-disable-next-line no-console
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');

  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.log(err.name, err.message, err.stack);
  } else {
    // eslint-disable-next-line no-console
    console.log(err.name, err.message);
  }

  process.exit(1);
});

dotenv.config({ path: './.env' });
const app = require('./app');

let DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
).replace('<USER>', process.env.DATABASE_USER);

if (process.env.NODE_ENV === 'development') {
  DB = process.env.DATABASE_LOCAL;
}

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    // then((con) => {
    // console.log(con.connection);
    // eslint-disable-next-line no-console
    console.log('DB connection successful!');
  });

// START SERVER
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App running on port ${port}`);
});

// HANDLE UNHANDLED REJECTIONS
process.on('unhandledRejection', (err) => {
  // eslint-disable-next-line no-console
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  // eslint-disable-next-line no-console
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
