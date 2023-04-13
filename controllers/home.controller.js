

const homePage = (req, res) => {
    res.render('./blogForm')
}

const editPage = (req, res) => {
    res.render('./editblog')
}
const registerPage = (req, res) => {
    res.render('./register')
}
const loginPage = (req, res) => {
    res.render('./login')
}

module.exports = { homePage, editPage, registerPage ,loginPage}