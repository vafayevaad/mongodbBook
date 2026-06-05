const { Router } = require("express");
const { register, login, verify } = require("../controller/auth.controller");
const authorization = require("../middleware/authorization");

const Authrouter = Router();

Authrouter.post("/register", authorization, register);
Authrouter.post("/login", login);
Authrouter.post("/verify", verify)

module.exports = Authrouter