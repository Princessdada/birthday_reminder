const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendReminder = async (reminder) => {
  try {
    const info = await transporter.sendMail({
      from: `"Birthday Reminder" <${process.env.EMAIL}>`,
      to: reminder.email,
      subject: "Happy Birthday 🎂",
      html: `
        <div style="font-family: Arial, sans-serif; text-align: center;">
            <h2>Happy Birthday ${reminder.username}! 🎉</h2>
            <p>Wishing you a fantastic day filled with joy, success, and lots of cake! 🍰</p>
            <p>Best wishes,</p>
            <p>Your Birthday Fairy</p>
        </div>
      `,
    });
    console.log(
      "🔔 Email sent to:",
      reminder.email,
      "Message ID:",
      info.messageId
    );
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

module.exports = sendReminder;
