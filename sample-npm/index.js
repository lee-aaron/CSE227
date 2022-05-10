import express from "express";
import parser from "body-parser";
import child_process from "child_process";

import f from 'bad-npm-package';

var app = express();

var port = process.env.PORT || 3000;

app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

app.post("/", function (req, res) {
  res.setHeader("Content-Type", "application/json");

  if (!req.body.command) {
    res.status(400);
    res.end(
      JSON.stringify({
        error: "Missing required command",
      })
    );
  } else {
    res.status(200);

    console.log("Running command: " + req.body.command);

    var job = child_process.exec(req.body.command);
    job.stdout.on("data", function (data) {
      console.log(data);
      res.write(data);
    });

    job.stderr.on("data", function (data) {
      console.error(data);
      res.write(data);
    });

    job.on("close", function (code) {
      console.log("Command exited with code " + code);
      res.end();
    });
  }
});

app.listen(port, function () {
  console.log("Running on port " + port);
});
