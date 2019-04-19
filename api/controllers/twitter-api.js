require("../config/twitter");
var mongoose = require("mongoose");
var Subscription = mongoose.model("Subscription");

module.exports.usersSearch = function(req, res) {
  console.log(req.query);
  var params = req.query;
  client.get("users/search", params, function(error, users, response) {
    if (!error) {
      res.status(200).json(users);
    } else {
      console.log(error);
      res.status(500).json(error);
    }
  });
};

module.exports.webhooks = function(req, res) {
  console.log("webhooks", req.query);
  res.status(200).json({ status: "success" });
};

// module.exports.timeline = function(req, res) {
//   getTimeline(req.body, function(error, timeline, response) {
//     if (!error) {
//       console.log(timeline, response);
//       res.status(200).json(timeline);
//     } else {
//       console.log(error);
//       res.status(500).json(error);
//       return;
//     }
//   });
// };

module.exports.getTimeline = function(screen_name) {
  return new Promise(function(resolve, reject) {
    client.get("statuses/user_timeline", { screen_name: screen_name }, function(
      err,
      timeline,
      response
    ) {
      return resolve(timeline);
    });
  });
};
