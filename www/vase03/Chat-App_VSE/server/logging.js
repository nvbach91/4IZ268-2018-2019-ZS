var env = 'prod'
module.exports = function(set_new_env) {
	if (set_new_env) env = set_new_env
	return function() {
		if (env !== 'test') {
			var msg = ""
			for (i in arguments) {
				msg += arguments[i] + " "
				console.log(msg)				
			}
		}
	}
}