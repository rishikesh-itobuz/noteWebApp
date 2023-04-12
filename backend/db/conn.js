const mongoose = require("mongoose");
const {name,password,cluster} =require('../config.js');

 
try {
  
  mongoose.connect (
      `mongodb+srv://${name}:${password}@${cluster}.mongodb.net/notesDataBase?retryWrites=true&w=majority`
    )
    .then(() => {
      console.log("Connection to database successfully");
    });
} catch (err) {
  console.log(err);
}
