const express = require('express')
const Controller = require('./../Controllers/authController')

const Route = express.Router();


Route.get('/singup',Controller.singup_get);
Route.post('/singup',Controller.singup_post);
Route.get('/login',Controller.login_get);
Route.post('/login',Controller.login_post);
Route.get('/logout',Controller.logout_get);
module.exports = Route;