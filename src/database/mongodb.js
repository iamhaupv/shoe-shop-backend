const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const connect = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connect successfully!");
    return connection;
  } catch (error) {
    console.log(error)
    throw new Error(error);
  }
};

module.exports = connect;
