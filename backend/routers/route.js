const express = require('express');
const router = express.Router();
const { NotesData } = require("../models/model");

router.post("/note", (req, res) => {
    const note = new NotesData(req.body);
    try {
      note.save().then((data) => {
        res.status(200).send({
          message:"Note added Successfully",
          data
        });
     
      });
    } catch (err) {
      res.status(400).send({
        data:null,
        message:"Note cant be added",
        err
      });
    }
  });
  
  router.get("/note", (req, res) => {
    try {
      NotesData.find({}).then((data) => {
        res.status(200).send({
          message:"created successfully",
          data
        });
        
      });
    } catch (err) {
      res.status(400).send({
        data:null,
        message:"Note cant be created",
        err
      });
    }
  });
  
  router.put("/note/:id", (req, res) => {
    try {
  
      NotesData.findByIdAndUpdate({ _id: req.params.id }, { heading: req.body.heading, discription: req.body.discription },{ new: true }
      ).then((data) => {
        res.status(200).send({
          message:"Updated successfully",
          data
        });
       
      });
    } catch (err) {
      res.status(400).send({
        data:null,
        message:"Note cant be Updated",
        err
      });
    }
  });
  
  router.delete("/note/:id", (req, res) => {
    try {
      NotesData.findByIdAndRemove({ _id: req.params.id }, { new: true }).then(
        (data) => {
          res.status(200).send({
             message:"Deleted Successfully",
             data
          });
        }
      );
    } catch (err) {
      res.status(400).send({
        data:null,
        message:"Note cant be deleted",
        err
      });
    }
  });

module.exports = router;