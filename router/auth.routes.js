const { Router } = require("express");
const { register, login, verify, logout } = require("../controller/auth.controller");
const authmiddleware = require("../middleware/auth.middleware");
const refreshToken = require("../middleware/refresh-token");

const Authrouter = Router();

Authrouter.post("/register", authmiddleware, register);
Authrouter.post("/login", login);
Authrouter.post("/verify", verify)
Authrouter.get("/refresh", refreshToken)
Authrouter.get("/logout", logout)

module.exports = Authrouter