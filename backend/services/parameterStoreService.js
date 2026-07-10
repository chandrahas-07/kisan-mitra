const ssm = require("../config/parameterStore");

const {
  GetParameterCommand,
} = require("@aws-sdk/client-ssm");

async function getParameter(name) {

  const response = await ssm.send(
    new GetParameterCommand({
      Name: name,
    })
  );

  return response.Parameter.Value;
}

module.exports = {
  getParameter,
};