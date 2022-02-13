const mongoose = require('mongoose');


// Create collection of Jobs
const Schema = new mongoose.Schema({
  title: {
    type: String,
  },
  done: {
    type: Boolean,
  },
  
});

const Job = mongoose.model('Job', Schema);

module.exports = Job;