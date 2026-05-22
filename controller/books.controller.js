const BooksSchema = require("../schema/book.schema");


const getAllBooks = async (req, res) => {
  try {
    const books = await BooksSchema.find();

    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const addBooks = async (req, res) => {
  try {
    const { book_name, full_name, bio } =
      req.body;

    await BooksSchema.create({
      book_name,
      full_name,
      bio
    });

    res.status(201).json({
      message: "Added new books",
    });
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

const updateBooks = async (req, res) => {
  try {
    const { id } = req.params;
    const { book_name, full_name, bio } =
      req.body;

    const foundedBooks = await BooksSchema.findById(id);

    if (!foundedBooks) {
      return res.status(404).json({
        message: "Books not found",
      });
    }

    await BooksSchema.updateOne({_id: id}, {
      book_name,
      full_name,
      bio
    });

    res.status(200).json({
      message: "Updated books",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteBooks = async (req, res) => {
  try {
    const { id } = req.params;

    const foundedBooks = await BooksSchema.findById(id);

    if (!foundedBooks) {
      return res.status(404).json({
        message: "Books not found",
      });
    }

    await BooksSchema.findByIdAndDelete({_id: id})

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
  deleteBooks
};
