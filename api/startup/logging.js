const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');

// winston.handleExceptions(
//   new winston.transports.File({ filename: 'uncaughtExceptions.log' }));

// process.on('unhandledRejection', (ex) => {
//   throw ex;
// });

// winston.add(winston.transports.File, { filename: 'logfile.log' });
// winston.add(winston.transports.MongoDB, { 
//   db: process.env.MONGODB_URI || `mongodb://localhost/${process.env.DATA_BASE_NAME}`,
//   level: 'info',
//   useUnifiedTopology: true
// });

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
    // new winston.transports.MongoDB, { 
    //   db: process.env.MONGODB_URI || `mongodb://localhost/${process.env.DATA_BASE_NAME}`,
    //   level: 'info',
    //   useUnifiedTopology: true
    // }
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}
