var express = require("express");
var cors = require("cors");
require("dotenv").config();
var multer = require("multer");
var app = express();
var upload = multer({ dest: "uploads/" });

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});
// {"name":"hacking_adwords.pdf","type":"application/pdf","size":1693493}
app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  console.log(req.file);
  const { originalname, mimetype, size } = req.file;
  res.send({ name: originalname, type: mimetype, size });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
