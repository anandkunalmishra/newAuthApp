const mongoose = require('mongoose');

// Define user schema
const newUserSchema = new mongoose.Schema({
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  email: {
    type: String,
    unique: true, // ensure email is unique
  },
  password: {
    type: String,
  },
  token: {
    type: String,
  },
});

// Export user model
module.exports = mongoose.model('user', newUserSchema);