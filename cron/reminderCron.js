const User = require("../model/user");
const cron = require("node-cron");
const sendReminder = require("../sendReminder");
// Schedule: 7 AM daily (0 7 * * *)
cron.schedule("0 7 * * *", async () => {

  console.log("running a task every minute");
  //   get today's date
  const today = new Date();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  console.log("Checking for birthdays...", { month, day });
  try {
    const reminders = await User.find({
      $expr: {
        $and: [
          { $eq: [{ $month: "$dateOfBirth" }, month] },
          { $eq: [{ $dayOfMonth: "$dateOfBirth" }, day] },
        ],
      },
    });
    console.log(`Found ${reminders.length} birthdays to celebrate.`);
    for (const reminder of reminders) {
        if (!reminder.sent) {
            try {
                await sendReminder(reminder);
                reminder.sent = true;
                await reminder.save();
            } catch (error) {
                console.error(`Failed to send email to ${reminder.email}:`, error.message);
            }
        }
    }

  } catch (error) {
    console.error("Cron error:", error);
  }
});
