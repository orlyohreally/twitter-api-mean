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
  var timelinePromises = [];
  var timelines = [];
  Subscription.find().exec(function(err, subscriptions) {
    subscriptions.forEach(subscription => {
      timelinePromises.push(
        ctrlTwitter
          .getTimeline(subscription.channel.screen_name)
          .then(function(tweets) {
            return Promise.resolve({
              channel: subscription.channel,
              tweets: tweets
            });
          })
      );
    });

    Promise.all(timelinePromises).then(function(values) {
      res.status(200).json(values);
    });
  });
};
