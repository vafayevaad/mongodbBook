const CustomErrorHandler = require("../error/error");
const AuthorSchema = require("../schema/author.schema");
const authorValidation = require("../validation/author.validation");

const getAllAuthors = async (req, res, next) => {
  try {
    const authors = await AuthorSchema.find();

    res.status(200).json(authors);
  } catch (error) {
    next(error)
  }
}

const getOneAuthor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const author = await AuthorSchema.findById(id);
    if (!author) 
      throw CustomErrorHandler.UnAuthorized("Author not found")
    
    res.status(200).json(author);
  } catch (error) {
    next(error);
  }
}

const search = async (req, res, next) => {
  try {
    const { searchingvalue } = req.query
    const authors = await AuthorSchema.find({
      full_name: {$regex: searchingvalue, $options: "i"}
    })

    res.status(200).json(authors);
  } catch (error) {
    next(error)
  }
};

const addAuthor = async (req, res, next) => {
  try {
    const { full_name, birth_year, death_year, bio, period, work, region } = req.body;
    if(!req.file) {
      throw CustomErrorHandler.BadRequest("file bo'lishi shart")
    }
    await AuthorSchema.create({
      full_name, 
      birth_year, 
      death_year, 
      bio, 
      period, 
      work, 
      region,
      picture: "http://localhost:4001/images/"+ req.file.filename
    })
    
    res.status(201).json({ 
      message: "Added new author" 
    });
  } catch (error) {
    next(error);
  }
};

const updateAuthor = async (req, res, next) => {
  try {
    const { error } = authorValidation(req.body);
    if (error) {
      return res.status(400).json({ 
        message: error.message });
    }

    const { id } = req.params;
    const { full_name, birth_year, death_year, bio, period, work, region } = req.body;
    const image = req.file ? req.file.filename : null;  

    const author = await AuthorSchema.findById(id);
    if (!author) throw CustomErrorHandler.UnAuthorized("Author not found");

    await AuthorSchema.updateOne({ _id: id }, { 
      full_name, birth_year, death_year, bio, period, work, region, image 
    });
    res.status(200).json({ 
      message: "Updated author" 
    });
  } catch (error) {
    next(error);
  }
};

const deleteAuthor = async (req, res, next) => {
  try {
    const { id } = req.params;

    const foundedAuthor = await AuthorSchema.findById(id);

    if (!foundedAuthor) {
      return res.status(404).json({
        message: "Author not found",
      });
    }

    await AuthorSchema.findByIdAndDelete({_id: id})

    res.status(404).json({
      message: "Deleted author",
    });
  } catch (error) {
    next(error)
  }
};

module.exports = {
  getAllAuthors,
  getOneAuthor,
  addAuthor,
  updateAuthor,
  deleteAuthor,
  search
}