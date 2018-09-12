var redis = require("redis");
// var client = redis.createClient("");
var client = redis.createClient(
  '6379',
  '127.0.0.1',
  {}
);


module.exports = function() {
  return function(req, res, next) {
    var sessionId = null;

    if (req.cookies && req.cookies.hasOwnProperty('sessionid')) {
      sessionId = req.cookies.sessionid;
      client.get(sessionId, function (err, djangoSessionData) {
        if (djangoSessionData) {
          var sessionData = new Buffer(djangoSessionData, 'base64').toString();
          var sessionObjString = sessionData.substring(sessionData.indexOf(":") + 1);
          console.log(sessionObjString)
          var sessionObjJSON = JSON.parse(sessionObjString);
          req.djangoSession = sessionObjJSON;
        }
        
      });
    }
    next();
  }
}
