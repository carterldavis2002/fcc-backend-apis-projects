const express = require("express");
const app = express();

const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));

const path = require("path");

app.use("/public", express.static(path.resolve(__dirname, "public")));

app.get("/", (_, res) => res.sendFile(path.resolve(__dirname, "index.html")));

app.get("/api/whoami", (req, res) => {
  res.json({ipaddress: req.ip,
           language: req.header("accept-language"),
           software: req.header("user-agent")})
});

app.listen(process.env.PORT || 3000); 