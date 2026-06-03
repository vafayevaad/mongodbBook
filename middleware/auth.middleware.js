function authmiddleware(req, res, next) {
  const authhorization = req.headers.authorization
  const jwt = require("jsonwebtoken")
  if (!authhorization) {
    return res.status(401).json({
      message: "Bearer token not found"
    })
  }

  try {
    const bearer = authhorization.split(" ")[0]
    const token = authhorization.split(" ")[1]

    if (bearer !== "Bearer" || !token) {
      return res.status(401).json ({
        message: "Invalid token"
      })
    }
    const decode = jwt.verify(token, process.env.SECRET_KEY)
    req.user = decode
    next()

  } catch (error) {
    return res.status(400).json({message: error.message})
  }
}

module.exports = authmiddleware