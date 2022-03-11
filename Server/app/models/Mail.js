const mongoose = require('mongoose');


// Create collection of Jobs
const Schema = new mongoose.Schema({
  service:{
    type: String
  },
  title: {
    type: String,
  },
  snippet: {
    type: String
  },
  labelIds:{
    type: String
  },
  href:{
    type: String,
  },
  description:{
    type: String
  },
  saved: {
    type: Boolean,
  },
  
});

const Job = mongoose.model('Job', Schema);

module.exports = Job;