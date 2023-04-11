const mongoose = require("mongoose");
const {name,password,cluster} =require('../config.js');

 
try {
  console.log(name);
  mongoose.connect (
      `mongodb+srv://${name}:${password}@${cluster}.mongodb.net/notesDataBase?retryWrites=true&w=majority`
    )
    .then(() => {
      console.log("connection to database successfully");
    });
} catch (err) {
  console.log(err);
}
