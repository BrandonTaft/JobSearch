const Job = require('../models/Job')

class JobRepository {

  constructor(model) {
    this.model = model;
  }

  // create a new Job
  create(title) {
    const newJob = { title, done: false };
    const Job = new this.model(newJob);
    return Job.save();
  }

  // return all Jobs

  findAllGoogle() {
    return this.model.find({'service':'Google'});
  }

  findAllLinkedIn() {
    return this.model.find({'service':'LinkedIn'});
  }

  findSaved() {
    const query = { saved: true };
    return this.model.find({ 'saved': 'true' });
  }

  findByName(username) {
    return this.model.findById(id);
  }


  //find Job by the id
  findById(id) {
    return this.model.findById(id);
  }

  // delete Job
  deleteById(id) {
    return this.model.findByIdAndDelete(id);
  }

  // update all Jobs
  updateAll() {
    return this.model.updateMany({}, { $set: { done: false } });
  }

  //find Job by id and update it
  updateById(id, object) {
    const query = { _id: id };
    return console.log("Job Saved", "ID: ", id), this.model.findOneAndUpdate(query, { $set: { saved: true } });
  }

  
  //find Job by name and update it
  updateByName(name, object) {
    const query = { name: name };
    return this.model.findOneAndUpdate(query, { $set: { name: object.name, done: object.done, notification: object.notification } });
  }
}

module.exports = new JobRepository(Job);