const { Router } = require("express")
const { getAllBooks, getOneBooks, addBooks, updateBooks, deleteBooks, search } = require("../controller/books.controller")
const booksRouter = Router()

booksRouter.get("/get_all_books", getAllBooks)
booksRouter.get("/get_one_books/:id", getOneBooks)
booksRouter.post("/add_books", addBooks)
booksRouter.put("/update_books/:id", updateBooks)
booksRouter.delete("/delete_books/:id", deleteBooks)
booksRouter.get("/search", search)

module.exports = booksRouter