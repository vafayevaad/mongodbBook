const { createLogger, format, transports } = require('winston')
const { combine, timestamp, prettyPrint } = format
require("winston-mongodb")

const logger = createLogger({
  format: combine(timestamp(), prettyPrint()),
  transports: [
    new transports.Console(),
    new transports.MongoDB({ db: process.env.MONGO_URI }),
    new transports.File({ filename: "log/mixed.log" })
  ]
})

module.exports = logger