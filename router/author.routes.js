const {Router} = require("express")
const { getAllAuthors, getOneAuthor, addAuthor, updateAuthor, deleteAuthor, search } = require("../controller/author.controller")
const authMiddleware = require("../middleware/auth.middleware")
const upload = require("../middleware/upload.middleware")


const authorRouter = Router()

authorRouter.get("/get_all_authors", getAllAuthors)
authorRouter.get("/get_one_author/:id", getOneAuthor)
authorRouter.post("/add_author", authMiddleware, upload.single("image"), addAuthor)
authorRouter.put("/update_author/:id", authMiddleware, upload.single("image"), updateAuthor)
authorRouter.delete("/delete_author/:id", authMiddleware, deleteAuthor)
authorRouter.get("/search", search)

module.exports = authorRouter