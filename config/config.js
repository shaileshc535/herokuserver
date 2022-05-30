const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    var conn = await mongoose.connect(process.env.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`DB Connection established with ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
