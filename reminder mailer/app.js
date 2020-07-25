const cron = require("node-cron");
const express = require("express");
const schedule = require('node-schedule');
const prompt = require('prompt-sync')();
let nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const expressLayouts = require('express-ejs-layouts');

const app = express();

const db = require('./config/keys').mongoURI;

mongoose.connect(db,{ useNewUrlParser: true ,useUnifiedTopology: true})
  .then(() => {
    console.log('MongoDB Connected');
  })
  .catch(err =>{
    console.log(err);
  });

app.use(expressLayouts);
app.set('view engine', 'ejs');
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "",
      pass: ""
    }
  });


  var customerName = prompt("Please enter your name ", "<name goes here>");
  var mailid = prompt("Please enter your e-mail id ", "<e-mail goes here>");
  var message = prompt("Please enter your reminder ", "<reminder goes here>");
  var year = prompt("Please enter year of your reminder ", "<year goes here>");
  var month = prompt("Please enter month of your reminder in digits ", "<month goes here>");
  var day = prompt("Please enter day of month of your reminder ", "<day goes here>");
  var hour = prompt("Please enter hour of your reminder ", "<hour goes here>");
  var minute = prompt("Please enter minute of your reminder ", "<minute goes here>");
  var ampm = prompt("Please enter 0 for am and 1 for pm", "<ampm goes here>");
  
  var date = new Date(year, month, day, hour, minute, ampm);

if (mailid!= null) {
  var j = schedule.scheduleJob(date, function(){
  console.log("---------------------");
  console.log("Running Cron Job");
  let mailOptions = {
    from: "",
    to: "mailid",
    subject: `REMINDER :)`,
    text: `{$message}`
  };
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      throw error;
    } else {
      console.log("Email successfully sent!");
    }
   
  });
  });
}

const PORT = process.env.PORT || 5000;
  
app.listen(PORT, function(err){ 
  if (err) console.log("Error in server setup") 
  console.log("Server listening on Port", PORT); 
});
