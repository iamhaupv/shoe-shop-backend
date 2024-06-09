const { AdminRepository } = require("../repositories/index");
// register admin
const registerAdmin = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;
    const user = await AdminRepository.registerAdmin(phoneNumber, password);
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
// login admin
const loginAdmin = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;
    const userLogin = await AdminRepository.loginAdmin(phoneNumber, password);
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
  registerAdmin,
  loginAdmin,
};
