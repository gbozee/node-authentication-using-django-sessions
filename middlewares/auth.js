var django_session = require('./session.js');



function generate_random()
{
    var length = 12;
    var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

String.prototype.hashCode = function(){
  	var hash = 0;
  	if (this.length == 0) return hash;
  	for (i = 0; i < this.length; i++) {
  		char = this.charCodeAt(i);
  		hash = ((hash<<5)-hash)+char;
  		hash = hash & hash; // Convert to 32bit integer
  	}
  	return hash;
}

function generate_hash()
{
    var random_string = generate_random(24);
    return random_string.hashCode();
}

// TODO: Randomize it
var session_id = generate_random();


function anonymous(callback) {
    django_session.setSession(session_id, {}, function(err){
        callback(err, session_id);
    });
}

function login(user_id, callback) {
    django_session.setSession(
        session_id,
        {
            // TODO: Create a real hash
            "_auth_user_hash": generate_hash(),
            "_auth_user_backend": "django.contrib.auth.backends.ModelBackend",
            "_auth_user_id": user_id
        },
        function(err){
            callback(err, session_id);
        }
    );
}

function logout(session_id) {
    django_session.setSession(session_id, {}, function(err){
        callback(err, session_id);
    });
}

module.exports = {
    anonymous: anonymous,
    login: login,
    logout: logout
};
