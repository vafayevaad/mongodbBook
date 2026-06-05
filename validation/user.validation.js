const joi = require("joi")

module.exports = function(data) {
  const schema = joi.object({
  email: joi.string().required(),
  username: joi.string().email().required(),
  password: joi.string().required()
  })
  return schema.validate(data)
}