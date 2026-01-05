const express = require("express");
const db = require("./db");
const User = require("./model/user");
const schedule = require("node-schedule");
require("./cron/reminderCron");
require("dotenv").config();

const app = express();
app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Birthday Reminder App is running");
});

app.post("/users", async (req, res) => {
  const { username, email, dateOfBirth } = req.body;

  try {
    const user = await User.create({
      username,
      email,
      dateOfBirth,
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// connect to mongodb
db.connectToMongodb();

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
