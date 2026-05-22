const { Schema, model } = require("mongoose");

const Books = new Schema({
  book_name: {
    type: String,
    required: true
  },
  full_name: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    required: true
  },
}, {
  versionKey: false,
  timestamps: true
})

const BooksSchema = model("Books", Books)
module.exports = BooksSchema