const BooksSchema = require("../schema/book.schema");
const booksValidation = require("../validation/author.validation");

const getAllBooks = async (req, res) => {
  try {
    const books = await BooksSchema.find().populate("author_info", "-_id -createdAt -updatedAt") 

    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const search = async (req, res) => {
  try {
    const { searchingvalue } = req.query;
    const books = await BooksSchema.find({
      title: { $regex: searchingvalue, $options: "i" }
    });

    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getOneBooks = async (req, res) => {
  try {
    const { id } = req.params;

    const foundedBooks = await BooksSchema.findById(id);

    if (!foundedBooks) {
      return res.status(404).json({
        message: "Books not found",
      });
    }

    res.status(200).json(foundedBooks);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const addBooks = async (req, res) => {
  try {
    const { error } = booksValidation(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const { title, full_name, details, published_year, genres, period, pages, author_info } = req.body;
    const image = req.file ? req.file.filename : null;

    await BooksSchema.create({
      title, full_name, details, published_year, genres, period, pages, author_info, image
    });

    res.status(201).json({ 
      message: "Added new books" 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateBooks = async (req, res) => {
  try {
    const { error } = booksValidation(req.body);
    if (error) {
      return res.status(400).json({ 
        message: error.message 
      });
    }

    const { id } = req.params;
    const { title, full_name, details, published_year, genres, period, pages, author_info } = req.body;
    const image = req.file ? req.file.filename : null;

    const foundedBooks = await BooksSchema.findById(id);
    if (!foundedBooks) {
      return res.status(404).json({ 
        message: "Books not found" 
      });
    }

    await BooksSchema.updateOne({ _id: id }, {
      title, full_name, details, published_year, genres, period, pages, author_info, image
    });

    res.status(200).json({ 
      message: "Updated books" 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteBooks = async (req, res) => {
  try {
    const { id } = req.params;

    const foundedBooks = await BooksSchema.findById(id)

    if (!foundedBooks) {
      return res.status(404).json({
        message: "Books not found",
      });
    }

    await BooksSchema.findByIdAndDelete(id)

    res.status(200).json({
      message: "Deleted books",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getAllBooks,
  getOneBooks,
  addBooks,
  updateBooks,
  deleteBooks,
  search
};