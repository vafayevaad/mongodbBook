const { Router } = require("express")
const adminChecker = require("../middleware/admin.checker")
const { addQuote, updateQuote, deleteQuote } = require("../controller/quote.controller")
const quoteRouter = Router()

quoteRouter.post("/add_quote", adminChecker, addQuote)
quoteRouter.put("/update_quote/:id", adminChecker, updateQuote)
quoteRouter.delete("/delete_quote/:id", adminChecker, deleteQuote)

module.exports = quoteRouter