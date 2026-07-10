const { SSMClient } = require("@aws-sdk/client-ssm");

const ssm = new SSMClient({
  region: process.env.AWS_REGION,
});

module.exports = ssm;