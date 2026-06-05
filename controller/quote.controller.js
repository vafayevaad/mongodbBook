const CustomErrorHandler = require("../error/error");
const quoteSchema = require("../schema/quote.schema");

const addQuote = async (req, res, next) => {
  try {
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const { bookId, text, page } = req.body;

    await quoteSchema.create({ bookId, text, page });
    res.status(201).json({ message: 
      "Added new quote" 
    });
  } catch (error) {
    next(error);
  }
};

const updateQuote = async (req, res, next) => {
  try {
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const { id } = req.params;
    const { bookId, text, page } = req.body;

    const quote = await quoteSchema.findById(id);
    if (!quote) throw CustomErrorHandler.NotFound("Quote not found");

    await QuoteSchema.updateOne({ _id: id }, { bookId, text, page });
    res.status(200).json({
      message: "Updated quote",
    });
  } catch (error) {
    next(error);
  }
};

const deleteQuote = async (req, res, next) => {
  try {
    const { id } = req.params;

    const foundedQuote = await quoteSchema.findById(id);
    if (!foundedQuote) {
      return res.status(404).json({
        message: "Quote not found",
      });
    }

    await quoteSchema.findByIdAndDelete({ _id: id });
    res.status(200).json({
      message: "Deleted quote",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addQuote,
  updateQuote,
  deleteQuote,
};
