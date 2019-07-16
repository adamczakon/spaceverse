const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

const flights = require("./routes/api/flights");
const tourists = require("./routes/api/tourists");
const users = require("./routes/api/users");
const auth = require("./routes/api/auth");

//Bodyparser Middleware
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

//Connect to Mongo
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log(err));

//Use routes
app.use("/api/flights", flights);
app.use("/api/tourists", tourists);
app.use("/api/users", users);
app.use("/api/auth", auth);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
