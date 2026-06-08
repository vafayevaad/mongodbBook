const CustomErrorHandler = require("../error/error")
const jwt = require("jsonwebtoken")

module.exports = function refreshToken (req, res ) {
  try {
    const token = req.cookie.refreshToken
    if (!token) {
      throw CustomErrorHandler.BadRequest("Token not found")
    }
    const decode = jwt.verify(partOfToken, process.env.REFRESH_SEKRET_KEY)
    req.user = decode

    const payload = {
      id: req.user._id,
      email: req.user.email,
      role: req.user.role,
    };

    const access = access_token(payload)
    const refresh = refresh_token(payload)
   
    res.cookie("accssesToken", access, {httpOnly: true, maxAge: 60 * 1000 * 15})
    res.cookie("refreshToken", refresh, {httpOnly: true, maxAge: 60 * 1000 * 60 * 24 * 7})
    res.status(200).json({
      message: "Success"
    })
  } catch (error){
    next(error)
  }
}