const express = require("express")
const cors = require("cors")
const connectDB = require("./config/db.config")
const authorRouter = require("./router/author.routes")
const booksRouter = require("./router/books.routes")
const Authrouter = require("./router/auth.routes")
const quoteRouter = require("./router/quote.routes")
require("dotenv").config()
const cookieParser = require("cookie-parser")
const path = require("path")
const logger = require("./utils/logger")

const app = express()
const PORT = process.env.PORT || 3000
app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(express.urlencoded({
  extended: true
}))

connectDB()
app.use("uploads", express.static(path.join(__dirname, "uploads/images")))

logger.warn("Warn Logger")
logger.error("Error Logger")
logger.info("Info Logger")
logger.debug("Debug Logger")

// Router
app.use(authorRouter)
app.use(booksRouter)
app.use(Authrouter)
app.use(quoteRouter)

app.listen(PORT, () => {
  console.log("Server is running at: " + PORT);
})