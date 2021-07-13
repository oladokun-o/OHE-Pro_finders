const aws = require('aws-sdk');

let herokuConfig = new aws.S3({
  PORT: process.env.PORT,
});

exports.get = function get(env) {
    return herokuConfig[env]
}
