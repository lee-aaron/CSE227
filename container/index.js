const {
  SCMP_ACT_ALLOW,
  SCMP_ACT_ERRNO,
  NodeSeccomp,
  errors: { EADDRINUSE },
} = require("node-seccomp");
const express = require("express");
const parser = require("body-parser");

const seccomp = NodeSeccomp();

seccomp.init(SCMP_ACT_ALLOW).ruleAdd(SCMP_ACT_ERRNO(EADDRINUSE), "bind").load();

var app = express();

var port = process.env.PORT || 3000;

app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

app.listen(port, function () {
  console.log("Running on port " + port);
});
