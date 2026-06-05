const CustomErrorHandler = require("../error/error")
const authorValidation = require("../validation/author.validation")

module.exports = function (req, res, next) {
  const { error } = authorValidation(req.body)
  if (error) {
    throw CustomErrorHandler.BadRequest(error)
  }
  next()
}