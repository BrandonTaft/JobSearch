const User = require('../models/User')

class UserRepository {

  constructor(model) {
    this.model = model;
  }

  // create a new User
  create() {
    const User = new this.model(newUser);
    return User.save();
  }



  
  findByName(username) {
    return this.model.find({
        username : username
    });
  }
  


  //find User by the id
  findById(id) {
    return this.model.findById(id);
  }

  // delete User
  deleteById(id) {
    return this.model.findByIdAndDelete(id);
  }

  // update all Users
  updateAll() {
    return this.model.updateMany({}, { $set: { done: false } });
  }

  //find User by id and update it
  updateById(id, object) {
    const query = { _id: id };
    return console.log("User Saved", "ID: ", id), this.model.findOneAndUpdate(query, { $set: { saved: true } });
  }

  
  //find User by name and update it
  updateByName(name, object) {
    const query = { name: name };
    return this.model.findOneAndUpdate(query, { $set: { name: object.name, done: object.done, notification: object.notification } });
  }
}

module.exports = new UserRepository(User);