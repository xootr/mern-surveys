//keys.js -- figure out what env we are running in
if (process.send.NODE_ENV == 'production') {
    // we are in prod
    module.exports = require('./prod');
} else {
    // we are in dev
    module.exports = require('./dev');
}