const express = require("express");
const userRoute = require("./routes/api/userRoute");
const subscriberRoute = require("./routes/api/subscriberRoute");
const scheduleRoute = require("./routes/api/scheduleRoute");
const events = require("./routes/api/events");
const connectDB = require("./config/connectDB");
const profileRoute = require("./routes/api/profileRoute");
var cors = require("cors");

/*added by nelle*/
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

//connect to db
connectDB();
const port = process.env.PORT;
//userroute
app.use("/api/users", userRoute);
app.use("/api/subscribers", subscriberRoute);
app.use("/api/schedule", scheduleRoute);
app.use("/api/apps/calendar", events);
app.use("/api/profile", profileRoute);

//subscribers route

app.listen(port, () => {
  console.log(`server started on ${port}`);
});
