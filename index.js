const express = require("express");
const userRoute = require("./routes/api/userRoute");
const subscriberRoute = require("./routes/api/subscriberRoute");
const scheduleRoute = require("./routes/api/scheduleRoute");
const events = require("./routes/api/events");
const connectDB = require("./config/connectDB");
var cors = require("cors");
const router = require("./routes/api/userRoute");

/*added by nelle*/
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

//connect to db
connectDB();
const port = process.env.PORT;
//const port = 3006;
//userroute
app.use("/api/users", userRoute);
app.use("/api/subscribers", subscriberRoute);
app.use("/api/schedule", scheduleRoute);
app.use("/api/apps/calendar", events);

app.use(express.static("client/build"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

//subscribers route

app.listen(port, () => {
  console.log(`server started on ${port}`);
});
