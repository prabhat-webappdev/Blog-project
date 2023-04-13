const User = require('../models/user.model')

const registerUser = async (req, res) => {
    try {
        const { name, username, password } = req.body
        if (!name || !username || !password) {
            return res.status(400).json({ success: false, msg: "Please eenter valid details" })
        }
        const user = await User.create({ name, username, password })
        res.status(200).json({ success: true })
    } catch (error) {
        res.status(500).json({ success: false, msg: error })
    }
}
const loginUser = async (req, res) => {
    res.status(200).json({ success: true })
}
const logout = async (req, res) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        // res.json({ success: true, msg: "Logged out" })
        res.redirect('/login')
    });
}

module.exports = { registerUser, loginUser, logout }