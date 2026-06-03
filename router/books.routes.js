const { Router } = require("express")
const { getAllBooks, getOneBooks, addBooks, updateBooks, deleteBooks, search } = require("../controller/books.controller")
const authmiddleware = require("../middleware/auth.middleware")
const upload = require("../middleware/upload.middleware")

const booksRouter = Router()

booksRouter.get("/get_all_books", getAllBooks)
booksRouter.get("/get_one_books/:id", getOneBooks)
booksRouter.post("/add_books", authmiddleware, upload.single("image"), addBooks)
booksRouter.put("/update_books/:id", authmiddleware, upload.single("image"), updateBooks)
booksRouter.delete("/delete_books/:id", authmiddleware, deleteBooks)
booksRouter.get("/search", search)

module.exports = booksRouter