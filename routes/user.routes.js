const express = require('express')
const router = express.Router()
const { registerUser, loginUser  ,logout} = require('../controllers/user.controller')
const passport = require('passport')

router.post('/register', registerUser)
router.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), loginUser)
router.get('/logout', logout)
module.exports = router