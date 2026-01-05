const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

async function sendReminder(user) {
  await transporter.sendMail({
    from: `"Birthday Bot 🎉" <${process.env.EMAIL}>`,
    to: user.email,
    subject: "Happy Birthday 🎂",
    html: `
      <h2>Happy Birthday ${user.username}! 🎉</h2>
      <p>Wishing you joy, success, and cake 🍰</p>
    `,
  });

  console.log("Email sent to", user.email);
}

module.exports = sendReminder;
