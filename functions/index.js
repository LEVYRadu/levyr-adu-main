const functions = require("firebase-functions");
const admin = require("firebase-admin");
const formData = require("form-data");
const Mailgun = require("mailgun.js");

admin.initializeApp();

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: "api",
  key: "YOUR_MAILGUN_API_KEY", // 🔐 Replace this
});

exports.sendEmailReport = functions.https.onCall(async (data, context) => {
  const { to, subject, html } = data;

  try {
    const result = await mg.messages.create("YOUR_DOMAIN_NAME", {
      from: "LEVYR <hello@YOUR_DOMAIN_NAME>",
      to,
      subject,
      html,
    });

    return { success: true, result };
  } catch (error) {
    console.error("Email sending failed:", error);
    throw new functions.https.HttpsError("internal", "Email failed to send");
  }
});
