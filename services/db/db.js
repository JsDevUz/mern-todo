const mongoose = require("mongoose");

function connectDb() {
  mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("MongoDb connected"))
    .catch((e) => { 
      console.log(e);
      process.exit(1);
    });
}

module.exports = { connectDb };
