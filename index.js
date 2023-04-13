require('dotenv').config()
const express = require('express');
const app = express()
const path = require('path')

const session = require('express-session')
const passport = require('passport')
const passportLocal = require('./config/passport-Config')

// importing router
const blogRouter = require('./routes/blog.routes');
const homeRouter = require('./routes/home.routes');
const userRouter = require('./routes/user.routes');
const checkLogin = require('./middleware/checkLogin')

app.set('view engine', 'ejs')
app.set("views", path.join(__dirname, "views"));


app.use(express.static('public'))
app.use('/uploads', express.static('uploads'))
app.use(express.json())
app.use(session({
    secret: 'bb5dc8842ca31d4603d6aa11448d1654',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 600000 }
}))
app.use(passport.initialize())
app.use(passport.session())


//seetting up route
app.use('/user', userRouter)
app.use('/', checkLogin, homeRouter)
app.use('/api/v1/blog', checkLogin, blogRouter)

const port = 4545
app.listen(port, () => {
    console.log(`Server is start on port ${port}...`);
})