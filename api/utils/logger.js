let { createLogger, format, transports } = require('winston');

/*let customColors = {
    trace: 'white',
    debug: 'green',
    info: 'green',
    warn: 'yellow',
    crit: 'red',
    fatal: 'red'
};*/
let logLevel = 'trace';

let logger = createLogger({
    /*colors: customColors,*/
    level: logLevel,
    levels: {
        trace: 5,
        debug: 4,
        info: 3,
        warn: 2,
        crit: 1,
        fatal: 0
    },
    format: format.combine(
        format.prettyPrint(),
        format.timestamp({
            format: 'MM-DD-YYYY hh:mm:ss A'
        }),
        format.printf(info => {
            return `${info.timestamp} - ${info.level}: ${info.message}`
        })
    ),
    transports: [
        new transports.Console(),
        new transports.File({
            filename: 'Bookworm-Reviews.log'
        })
    ]
});

/*winston.addColors(customColors);*/


// Extend logger object to properly log 'Error' types
let origLog = logger.log;

logger.log = function(level, msg) {
    /*var objType = Object.prototype.toString.call(msg);*/

    if (msg instanceof Error) {
        var args = Array.prototype.slice.call(arguments);
        args[1] = msg.stack;
        origLog.apply(logger, args);
    } else {
        origLog.apply(logger, arguments)
    }
};

module.exports = logger