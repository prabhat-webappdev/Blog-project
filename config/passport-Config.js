const passport = require('passport')
const passportLocal = require('passport-local')

const User = require('../models/user.model')

passport.use(new passportLocal(async (username, password, done) => {
    try {
        const user = await User.findOne({ username })
        if (!user) { return done(null, false) }
        if (!await user.comparePassword(password)) { return done(null, false) }
        return done(null, user)
    } catch (error) {
        return done(error, false)
    }
}))

passport.serializeUser((user, done) => {
    return done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id).select('-password')
        return done(null, user)
    } catch (error) {
        return done(error, false)
    }
})

module.exports = passport