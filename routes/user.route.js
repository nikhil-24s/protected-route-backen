const express = require('express')
const { register, login, profile } = require('../controller/user.controller')
const isAuth = require('../middleware/authUser')
const router = express.Router()

router.post('/register',register)
router.post('/login',login)
router.post('/profile',isAuth,profile)

module.exports = router