const sns = require("../config/sns");

const {
  PublishCommand,
} = require("@aws-sdk/client-sns");

async function sendCriticalAlert(alert) {

  if (!alert) {
    return;
  }

  // Send notifications only for HIGH priority alerts
  if (alert.priority !== "HIGH") {
    return;
  }

  try {

    await sns.send(
      new PublishCommand({

        TopicArn: process.env.SNS_TOPIC_ARN,

        Subject: "🚨 Kisan Mitra Critical Alert",

        Message: `
🚨 Kisan Mitra Critical Alert

Crop: ${alert.crop}

Batch: ${alert.batchId}

Priority: ${alert.priority}

Message:
${alert.message}

Recommendation:
${alert.recommendation}

Time:
${new Date(alert.createdAt).toLocaleString()}
        `,

      })
    );

    console.log(
      `SNS notification sent successfully for ${alert.batchId}`
    );

  } catch (error) {

    console.error(
      "Failed to send SNS notification:",
      error.message
    );

  }

}

module.exports = {
  sendCriticalAlert,
};