const express = require("express");
const app = express();

const multer = require("multer");
const upload = multer({dest: "uploads"});

const cors = require("cors");
app.use(cors({optionsSuccessStatus: 200}));

const fs = require('fs');
const path = require("path");

app.use("/public", express.static(path.resolve(__dirname, "public")));

app.get("/", (_, res) => {
  res.sendFile(path.resolve(__dirname, "index.html"));
});

app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  if(req.file !== undefined)
  {
    fs.unlink(req.file.path, () => {});

    res.json({name: req.file.originalname,
            type: req.file.mimetype,
            size: req.file.size})
    }
    else
      res.json({error: "No file was chosen"});
});

app.listen(process.env.PORT || 3000);