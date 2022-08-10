const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));

const path = require("path");

app.use("/public", express.static(path.resolve(__dirname, "public")));

app.get("/", (_, res) => res.sendFile(path.resolve(__dirname, "index.html")));

app.get("/api", (_, res) => {
  res.json({unix: Date.now(),
           utc: new Date(Date.now()).toUTCString()})});

app.get("/api/:date", (req, res) => {
  if(!isNaN(+req.params.date))
  {
    res.json({unix: new Date(+req.params.date).getTime(),
             utc: new Date(+req.params.date).toUTCString()})
    return;
  }

  if(new Date(req.params.date).toString() === "Invalid Date")
    res.json({error: "Invalid Date"});
  else 
    res.json({unix: new Date(req.params.date).getTime(),
             utc: new Date(req.params.date).toUTCString()});
  
});

app.listen(process.env.PORT || 3000);