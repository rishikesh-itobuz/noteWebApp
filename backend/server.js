const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const conn = require("./db/conn");
const router = require('./routers/route');

const port = 8000;

const app = express();

app.use(express.json());
app.use(cors());
app.use('/',router)


app.listen(port, () => {

  console.log(`Server created successfully ${port}`);
});
