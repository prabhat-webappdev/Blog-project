const mongoose = require('mongoose');


const db = mongoose.connect(process.env.MONGO_URI)

db ? console.log('database connection successful') : console.log('Error in database connctions');
