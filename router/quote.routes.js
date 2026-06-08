const { Router } = require("express")
const adminChecker = require("../middleware/admin.checker")
const { addQuote, updateQuote, deleteQuote, likeQuote } = require("../controller/quote.controller")
const authmiddleware = require("../middleware/auth.middleware")
const quoteRouter = Router()

quoteRouter.post("/add_quote", addQuote)
quoteRouter.put("/update_quote/:id", adminChecker, updateQuote)
quoteRouter.delete("/delete_quote/:id", adminChecker, deleteQuote)
quoteRouter.post("/like/:id", authmiddleware, likeQuote)


module.exports = quoteRouter