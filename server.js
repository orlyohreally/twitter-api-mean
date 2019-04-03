require("dotenv").config();
require("./twitter.config");

var params = { screen_name: "orlyohreally" };
client.get("statuses/user_timeline", params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  } else {
    console.log(error);
  }
});
