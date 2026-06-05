const {Router} = require("express")
const { getAllAuthors, getOneAuthor, addAuthor, updateAuthor, deleteAuthor, search } = require("../controller/author.controller")

const upload = require("../middleware/upload.middleware")
const authorization = require("../middleware/authorization")
const adminChecker = require("../middleware/admin.checker")
const authmiddleware = require("../middleware/auth.middleware")


const authorRouter = Router()

authorRouter.get("/get_all_authors", authorization, getAllAuthors)
authorRouter.get("/get_one_author/:id", authorization, getOneAuthor)
authorRouter.post("/add_author",adminChecker, authmiddleware, upload.single("image"), addAuthor)
authorRouter.put("/update_author/:id",adminChecker, authmiddleware, upload.single("image"), updateAuthor)
authorRouter.delete("/delete_author/:id",adminChecker, authmiddleware, deleteAuthor)
authorRouter.get("/search", authorization, search)

module.exports = authorRouter