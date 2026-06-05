const { Schema, model } = require("mongoose");

const Quote = new Schema({
  text: {
    type: String,
    required: [true, "Iqtibos matni bo'lishi shart"],
    trim: true,
    minLength: [3, "Iqtibos kamida 3 ta harf bo'lsin"],
    maxLength: [1000, "Iqtibos ko'pi bilan 1000 ta harf bo'lsin"],
  },
  page: {
    type: Number,
    required: false,
    validate: {
      validator: Number.isInteger,
      message: "Sahifa raqami butun son bo'lishi kerak"
    }
  },
  book_info: {
    type: Schema.Types.ObjectId,
    required: [true, "Kitob bo'lishi shart"],
    ref: "Books"
  },
  user_info: {
    type: Schema.Types.ObjectId,
    required: [true, "Foydalanuvchi bo'lishi shart"],
    ref: "User"
  },
}, {
  versionKey: false,
  timestamps: true
})

const QuoteSchema = model("Quote", Quote)
module.exports = QuoteSchema