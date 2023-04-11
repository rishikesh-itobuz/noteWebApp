const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  type: {
    type: String,
    default: "Project"
  },
  heading: {
    type: String,
    required: true,
  },
  discription: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now ,
  },
});

const NotesData = mongoose.model("NotesData", schema);

module.exports = { NotesData };
