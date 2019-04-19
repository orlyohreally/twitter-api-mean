var express = require("express");
var router = express.Router();

var ctrlTwitterAPI = require("../controllers/twitter-api");
router.get("/users/search", ctrlTwitterAPI.usersSearch);
router.get("/twitter/webhooks", ctrlTwitterAPI.webhooks);

var ctrlSubscription = require("../controllers/subscriptions");
router.get("/subscriptions/", ctrlSubscription.list);
router.get("/subscriptions/timelines", ctrlSubscription.timelines);
router.post("/subscriptions/create", ctrlSubscription.create);

module.exports = router;
