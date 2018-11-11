if(process.env.NODE_ENV === 'production')
{
	// In production return production keys
	module.exports = require('./prod')
}
else
{
	//In Development return development keys
	module.exports = require('./dev')
}