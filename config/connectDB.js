const mongoose = require('mongoose');


const db = mongoose.connect(MONGO_URI)

db ? console.log('database connection successful') : console.log('Error in database connctions');
