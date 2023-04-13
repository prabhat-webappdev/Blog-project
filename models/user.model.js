const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide name"],
        trim: true
    },
    username: {
        type: String,
        required: [true, 'Please provide Username or Email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please provide Password'],
    }
})
UserSchema.pre('save', async function () {
    if (!this.isModified('password')) { return }
    const salt = await bcrypt.genSalt(12)
    this.password = await bcrypt.hash(this.password, salt)
})
UserSchema.methods.comparePassword = async function (userPassword) {
    const isMath = await bcrypt.compare(userPassword, this.password)
    return isMath;
}
module.exports = mongoose.model('user', UserSchema)