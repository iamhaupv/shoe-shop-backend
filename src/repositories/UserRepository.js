const { User, Cart } = require("../models/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// register
const register = async (phoneNumber, password) => {
  try {
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
      updateAt,
    });
    const cart = await Cart.create({
      user: newUser._id,
      products: [],
    });
    newUser.cart = cart._id;
    await newUser.save();
    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
// login
const login = async (phoneNumber, password) => {
  try {
    const userLogin = await User.findOne({ phoneNumber });
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
// check user exist
const checkUserExist = async (phoneNumber) => {
  try {
    const user = await User.findOne({ phoneNumber: phoneNumber });
    return !user;
  } catch (error) {
    throw new Error(error);
  }
};
module.exports = {
  register,
  login,
  checkUserExist,
};
