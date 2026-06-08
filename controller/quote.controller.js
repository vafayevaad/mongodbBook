const CustomErrorHandler = require("../error/error");
const quoteSchema = require("../schema/quote.schema");

const addQuote = async (req, res, next) => {
  try {
    const { book_info, text, user_info } = req.body;
    await quoteSchema.create({ book_info, text, user_info });
    res.status(201).json({ message: "Added new quote" });
  } catch (error) {
    next(error);
  }
};

const updateQuote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { book_info, text } = req.body;

    const quote = await quoteSchema.findById(id);
    if (!quote) throw CustomErrorHandler.NotFound("Quote not found");

    await quoteSchema.updateOne({ _id: id }, { book_info, text });
    res.status(200).json({ message: "Updated quote" });
  } catch (error) {
    next(error);
  }
};

const deleteQuote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const foundedQuote = await quoteSchema.findById(id);
    if (!foundedQuote) {
      return res.status(404).json({ message: "Quote not found" });
    }
    await quoteSchema.findByIdAndDelete({ _id: id });
    res.status(200).json({ message: "Deleted quote" });
  } catch (error) {
    next(error);
  }
};

const likeQuote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id

    const quote = await quoteSchema.findById(id);
    if (!quote) throw CustomErrorHandler.NotFound("Quote not found");

    const isLiked = quote.likes.includes(userId)

    if (isLiked) {
      await quoteSchema.updateOne({ _id: id }, { $pull: { likes: userId } })
      res.status(200).json({ message: "Like olib tashlandi" })
    } else {
      await quoteSchema.updateOne({ _id: id }, { $push: { likes: userId } })
      res.status(200).json({ message: "Like qo'shildi" })
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addQuote,
  updateQuote,
  deleteQuote,
  likeQuote
}