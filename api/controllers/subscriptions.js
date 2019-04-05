var mongoose = require("mongoose");
var Subscription = mongoose.model("Subscription");

module.exports.list = function(req, res) {
  Subscription.find().exec(function(err, subscriptions) {
    res.status(200).json(subscriptions);
  });
};

module.exports.create = function(req, res) {
  console.log("create", req.body);
  newSubscription = new Subscription();
  newSubscription.follow = true;
  newSubscription.channel = req.body;
  newSubscription.save();
  res.status(200).json(newSubscription);
};

var ctrlTwitter = require("./twitter-api");
module.exports.timelines = function(req, res) {
  console.log("timelines module");
  new Promise(function(resolve, reject) {
    client.get(
      "statuses/user_timeline",
      { screen_name: "orlyohreally" },
      function(err, timeline, response) {
        console.log("getTimeline");
        return resolve(timeline);
      }
    );
  }).then(function(values) {
    console.log("values", values);
    // console.log(timelines);
    console.log("json");
    res.status(200).json(values);
  });
  //promiseTimeline;
  // var timelines = [];
  // var timelinePromises = [];
  // Subscription.find().exec(function(err, subscriptions) {
  //   subscriptions.forEach(subscription => {
  //     var promiseTimeline = ctrlTwitter.getTimeline(
  //       subscription.channel.screen_name,
  //       function(error, timeline, response) {
  //         console.log(timeline);
  //         timelines.push(timeline);
  //       }
  //     );
  //     timelinePromises.push(promiseTimeline);
  //   });
  //   Promise.all(timelinePromises).then(function(values) {
  //     console.log(values);
  //     // console.log(timelines);
  //     console.log("json");
  //     res.status(200).json(timelines);
  //   });
  // });
};
