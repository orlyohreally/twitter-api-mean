var mongoose = require("mongoose");

var subscriptionsSchema = new mongoose.Schema({
  channel: {
    followers_count: String,
    id_str: String,
    name: String,
    profile_image_url: String,
    profile_image_url_https: String,
    screen_name: String
  },
  follow: Boolean
});

mongoose.model("Subscription", subscriptionsSchema);
