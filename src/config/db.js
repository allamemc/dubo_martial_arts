const mongoose = require("mongoose");

const dbconnect = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://allam:UWr6UQ3tlC6JScP4@pruebaatlas.e362l5o.mongodb.net/dubomartial",
      {}
    );
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = dbconnect;
