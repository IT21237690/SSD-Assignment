// logger.js
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, colorize } = format;

// Custom log format
const logFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
});

const logger = createLogger({
    level: 'info',
    format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        colorize(),
        logFormat
    ),
    transports: [
        new transports.Console(),  // Log to console
        new transports.File({ filename: 'combined.log' }),  // Log everything to combined.log
        new transports.File({ filename: 'errors.log', level: 'error' })  // Log only errors to errors.log
    ]
});

module.exports = logger;
