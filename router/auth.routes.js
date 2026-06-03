const { Router } = require("express");
const { register, login } = require("../controller/auth.controller");

const Authrouter = Router();

Authrouter.post("/register", register);
Authrouter.post("/login", login);

module.exports = Authrouter