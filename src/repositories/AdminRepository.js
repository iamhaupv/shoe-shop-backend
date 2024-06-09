const { User } = require("../models/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// register admin
const registerAdmin = async (phoneNumber, password) => {
  try {
    const roles = "admin";
    const updateAt = null;
    const userExist = await User.findOne({ phoneNumber });
    if (userExist) {
      throw new Error("User is exist");
    }
    const hashPassword = await bcrypt.hash(
      password,
      parseInt(process.env.SALT_ROUND)
    );
    const newUser = await User.create({
      phoneNumber,
      password: hashPassword,
      roles,
      updateAt,
    });
    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
// login admin
const loginAdmin = async (phoneNumber, password) => {
  try {
    const userLogin = await User.findOne({ phoneNumber, roles: "admin" });
    if (userLogin) {
      const isMath = await bcrypt.compare(password, userLogin.password);
      if (isMath) {
        const token = jwt.sign({ data: userLogin }, process.env.JWT_SECRET, {
          expiresIn: "10days",
        });
        return { ...userLogin.toObject(), token: token };
      } else {
        throw new Error("Wrong username or password");
      }
    } else {
      throw new Error("Wrong username or password");
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

module.exports = {
  registerAdmin,
  loginAdmin,
};
