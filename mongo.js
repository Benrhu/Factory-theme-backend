const mongoose = require("mongoose");

const connectionString =
  "mongodb+srv://testuser:Yosoy999@cluster0.elhwnyi.mongodb.net/blispackDB?retryWrites=true&w=majority";

mongoose
  .connect(connectionString)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });

process.on('uncaughtException', error => {
  console.error(error)
  mongoose.disconnect()
})