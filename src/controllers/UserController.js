const { UserRepository } = require("../repositories/index");
// register
const register = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;
    const user = await UserRepository.register(phoneNumber, password);
    res.status(200).json({
      message: "Register successfully!",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: "User is exist!",
    });
  }
};
// login
const login = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;
    const userLogin = await UserRepository.login(phoneNumber, password);
    res.status(200).json({
      message: "Login successfully!",
      data: userLogin,
    });
    console.log("Login successfully!");
  } catch (error) {
    res.status(500).json({
      message: "Wrong username or password",
    });
  }
};
module.exports = {
  register,
  login,
};
