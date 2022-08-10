const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors({optionsSuccessStatus: 200}));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

const path = require("path");

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const userSchema = new mongoose.Schema({
  username: {type: String, required: true},
  log: [{description: String,
  duration: Number,
  date: String,
  _id: false}]
});
const User = mongoose.model("User", userSchema);

app.use("/public", express.static(path.resolve(__dirname, "public")));

app.get("/", (_, res) => res.sendFile(path.resolve(__dirname, "index.html")));

app.get("/api/users/exercises", (_, res) => {
  res.json({error: "No user id specified"});
});

app.post("/api/users/:_id/exercises", (req, res) => {
  User.findOne({_id: req.params._id}).then(data => {
    if(!data) 
    {
      res.json({error: "Could not find a user with ID " + req.params._id});
      return;
    }

    if(req.body.description === "")
    {
      res.json({error: "A description of the exercise is required"});
      return;
    }

    if(req.body.duration === "")
    {
      res.json({error: "The duration of the exercise is required"});
      return;
    }

    if(isNaN(req.body.duration))
    {
      res.json({error: "The duration must be a number"});
      return;
    }

    let date = new Date().toDateString(); 
    if(req.body.date !== "" && req.body.date !== undefined)
    {
      date = new Date(req.body.date).toDateString();
      if(date === "Invalid Date")
      {
        res.json({error: "Invalid date entered"});
        return;
      }
    }

    data.log.push({description: req.body.description,
                              duration: +req.body.duration,
                              date: date});
    data.save();

    res.json({_id: data._id, username: data.username, date: date,
             duration: +req.body.duration, description: req.body.description});
    return;
  }).catch(_ => {
    res.json({error: "Could not find a user with ID " + req.params._id});
  });
});

app.post("/api/users", (req, res) => {
  if(req.body.username === "")
  {
    res.json({error: "Can't have blank username"});
    return;
  }

const doc = new User({username: req.body.username});
doc.save().then(data => {
    res.json({username: data.username, _id: data._id})
    return;
  });
});


app.get("/api/users", (_, res) => {
  const userArray = [];
  User.find().then(data => {
    data.forEach(item => userArray.push({username: item.username,
                                        _id: item._id}));
    res.send(userArray);
    return;
  });
});

app.get("/api/users/:_id/logs", (req, res) => {
  User.findOne({_id: req.params._id}).then(data => {
    if(!data)
    {
      res.json({error: "Could not find a user with ID " + req.params._id});
      return;
    }

    let log = [];

    if(!req.query.to) req.query.to = Date.now();
    if(!req.query.from) req.query.from = -8640000000000000;

    for(let i = 0;i < data.log.length;i++)
    {
      if(new Date(req.query.from).getTime() <= new Date(data.log[i].date).getTime() &&
        new Date(req.query.to).getTime() >= new Date(data.log[i].date).getTime())
          log.push(data.log[i]);
    }

    let limitedLog = log;
    if(req.query.limit)
    {
      limitedLog = [];

      for(let i = 0;i < req.query.limit;i++)
      {
        if(i >= log.length) break;
        limitedLog.push(log[i]);    
      }
    }

    res.json({username: data.username, count: limitedLog.length, _id: data._id,
            log: limitedLog});
    return;
    
  }).catch(_ => {
    res.json({error: "Could not find a user with ID " + req.params._id});
  });
});

app.listen(process.env.PORT || 3000);