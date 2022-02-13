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
  
    findAll() {
      return this.model.find();
    }
  
    
  
    //find Reminder by the id
    findById(id) {
      return this.model.findById(id);
    }
  
      // delete Reminder
    deleteById(id) {
      return this.model.findByIdAndDelete(id);
    }
  
  // update all Reminders
  updateAll() {
    return this.model.updateMany({}, { $set: {done: false} });
  }
  
    //find Reminder by id and update it
    updateById(id, object) {
      const query = { _id: id };
      return console.log("this it",object.notification) , this.model.findOneAndUpdate(query, { $set: { name: object.name, done: object.done, notification: object.notification } });
    }
  
    //find Reminder by id and update priority
    setPriority(id, object) {
      const query = { _id: id };
      return this.model.findOneAndUpdate(query, { $set: { priority:  object.priority} });
    }
  
    //find Reminder by name and update it
    updateByName(name, object) {
      const query = { name: name };
      return this.model.findOneAndUpdate(query, { $set: { name: object.name, done: object.done, notification: object.notification} });
    }
  }
  
  module.exports = new JobRepository(Job);