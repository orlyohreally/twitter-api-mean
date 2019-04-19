require("dotenv").config();
var http = require("http");
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");

require("./api/models/db");

var routesApi = require("./api/routes/index");

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api", routesApi);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(__dirname + "/dist"));

  app.get("/*", function(req, res) {
    res.sendFile(path.join(__dirname + "/dist/index.html"));
  });
}

var port = process.env.PORT || 3000;
app.set("port", port);
var server = http.createServer(app);
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  console.log("Listening on " + bind);
}

var twitter = require("./api/config/twitter");

twitter.client.post(
  "account_activity/all/dev/webhooks",
  {
    url: "https://localhost/api/twitter/webhooks"
  },
  function(error, users, response) {
    if (!error) {
      console.log(users);
    } else {
      console.log(error);
    }
  }
);
