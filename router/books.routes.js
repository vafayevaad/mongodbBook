const { Router } = require("express")
const { getAllBooks, getOneBooks, addBooks, updateBooks, deleteBooks, search } = require("../controller/books.controller")
const upload = require("../middleware/upload.middleware")
const adminChecker = require("../middleware/admin.checker")
const authorization = require("../middleware/authorization")
const authmiddleware = require("../middleware/auth.middleware")

const booksRouter = Router()

booksRouter.get("/get_all_books", authorization, getAllBooks)
booksRouter.get("/get_one_books/:id", authorization, getOneBooks)
booksRouter.post("/add_books", adminChecker, authmiddleware, upload.single("image"), addBooks)
booksRouter.put("/update_books/:id", adminChecker, authmiddleware, upload.single("image"), updateBooks)
booksRouter.delete("/delete_books/:id", adminChecker, authmiddleware, deleteBooks)
booksRouter.get("/search", authorization, search)

module.exports = booksRouter