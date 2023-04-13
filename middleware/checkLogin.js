

module.exports = checkLogin = (req, res, next) => {
    const user = req.user
    
    if (req.url !== '/login' && req.url !== '/register') {
        if (!user) { return res.redirect('/login') }
        next()
        return
    }
    if (user) { return res.redirect('/') }
    next()
}