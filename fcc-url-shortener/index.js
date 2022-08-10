const express = require("express");
const app = express();

const dns = require("node:dns");
const path = require("path");

const bodyParser = require('body-parser');

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const urlSchema = new mongoose.Schema({
  original_url: {type: String, required: true},
  short_url: {type: Number, required: true}
});
const Url = mongoose.model("Url", urlSchema);

const cors = require("cors");
app.use(cors({optionsSuccessStatus: 200}));

app.use(bodyParser.urlencoded({extended: false}));

app.use("/public", express.static(path.resolve(__dirname, "public")));

app.get("/", (_, res) => res.sendFile(path.resolve(__dirname, "index.html")));

app.post("/api/shorturl", (req, res) => {
  let urlString = req.body.url;
  if(urlString.substring(0,7) != "http://"
     && urlString.substring(0,8) != "https://")
  {
      res.json({error: "Invalid URL"});
      return;
  }

  urlString = urlString.replace(/https?:\/\//, "");

  if(!urlString[0])
  {
    res.json({error: "Invalid URL"});
    return;
  }

  if(urlString.indexOf("/") !== -1)
    urlString = urlString.slice(0, urlString.indexOf("/"));

  dns.lookup(urlString, err => {
    if(err && err.code === "ENOTFOUND")
    {
      res.json({error: "Invalid Hostname"})
      return;
    }

    Url.findOne({original_url: req.body.url}).then(data => {
    if(data)
    {
      res.json({original_url: data.original_url, short_url: data.short_url});
      return;
    }

    Url.find().sort({short_url: "desc"}).limit(1).exec((_, data) => {
        let shortUrlNum = 1;

        if(data[0]) shortUrlNum = ++data[0].short_url;

        const doc = new Url({original_url: req.body.url,
                            short_url: shortUrlNum});

        doc.save().then(data => {
                res.json({original_url: data.original_url, short_url: data.short_url});
                return;
          });
      });
    });
  });
});

app.get("/api/shorturl/:short", (req, res) => {
  Url.findOne({short_url: req.params.short}).then(data => {
    if(!data)
    {
      res.json({error: "No short URL found for the given input"});
      return;
    }

    res.redirect(data.original_url);
  }).catch(err => console.log(err));
});

app.listen(process.env.PORT || 3000);