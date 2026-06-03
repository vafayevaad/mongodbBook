const joi = require("joi")

const Periods = {
  BADIIY: "badiiy",
  ROMAN: "roman",
  HAJVIY: "hajviy",
  ROMANTIKA: "romantika",
  FANTASTIKA: "fantastika",
  DRAMMA: "dramma",
  MELODRAMMA: "melodramma",
  ILMIY: "ilmiy ommabop",
  HUJJATLI: "hujjatli"
}

module.exports = function(data) {
  const schema = joi.object({
    title: joi.string().min(2).max(200).required(),
    full_name: joi.string().min(3).max(100).required(),
    period: joi.string().valid(...Object.values(Periods)).required(),
    pages: joi.number().integer().required(),
    genres: joi.string().min(2).max(100).required(),
    published_year: joi.number().integer().min(1000).required(),
    details: joi.string().min(10).max(2000).required(),
    author_info: joi.string().required(),
  })
  return schema.validate(data)
}