const express = require('express')
const router = express.Router()
const { homePage, editPage, registerPage, loginPage } = require('../controllers/home.controller')
const checkLogin = require('../middleware/checkLogin')

router.get('/', homePage)
router.get('/update/:id', editPage)
router.get('/register', registerPage)
router.get('/login', loginPage)


module.exports = router