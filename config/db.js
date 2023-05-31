const mongoose = require("mongoose");

const connectDB = async () => {
  const URL = process.env.MONGO_URI;
  try {
    const conn = await mongoose.connect(URL, {
      // useNewUrlParser: true,
      //   useCreateIndex: true,
      //   useFindAndModify: false,
      // useUnifiedTopology: true,
    });
    console.log(
      "\x1b[36m%s\x1b[0m",
      `MongoDB Connected: ${conn.connection.host}`
    );
  } catch (error) {
    console.log("mongoose connection error", error);
    throw error;
  }
};

module.exports = connectDB;
