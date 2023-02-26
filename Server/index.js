const express = require('express')
const mongoose = require("mongoose");
const morgan = require('morgan')
const cors = require('cors')
const dotenv = require('dotenv')
var app = express();

dotenv.config();
// Connecting to database
mongoose.connect(
  "mongodb://localhost:27017/netflix",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) =>
    err ? console.log(err) : console.log(
      "Connected to yourDB-name database")
);

app.listen(process.env.PORT || 5000,function(){
    console.log('Node server running @ http://localhost:5000/')
  });

app.use(morgan("common"))
app.use(cors())
app.use(express.json());
app.use('/', require('./Routes/routers'));