const mongoose = require('mongoose');


// Create collection of Jobs
const Schema = new mongoose.Schema({
  username:{
    type: String
  },
  password: {
    type: String,
  }
  
});

const User = mongoose.model('User', Schema);

module.exports = User;