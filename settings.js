const access = require('./access')

const TEST_DB_URI = `mongodb+srv://${access.user}:${access.password}@mycluster-z4ipm.mongodb.net/mini-project-test?retryWrites=true`
const DEV_DB_URI = `mongodb+srv://${access.user}:${access.password}@mycluster-z4ipm.mongodb.net/mini-project-dev?retryWrites=true`
const MOCHA_TEST_TIMEOUT = 5000;

module.exports = {
 DEV_DB_URI,
 TEST_DB_URI,
 MOCHA_TEST_TIMEOUT
}
