const {UserRepository} = require("../repositories/index")
// register
const register = async(req, res) => {
    try {
        res.status(200).json({
            message: "Register successfully!",
        })
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
};
// login
const login = async(req, res) =>{
    try {
        res.status(200).json({
            message: "Login successfully!",

        })
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
}
module.exports = {
    register,
    login
}
