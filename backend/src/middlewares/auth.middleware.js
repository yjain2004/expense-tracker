const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model")

async function authMiddleware(req, res, next) {

    try {

        //fetch token and verify
        const token = req.cookies?.token;

        if (!token) {
            return res.status(400).json({
                message: "Not authorized. please login"
            })
        }


        //fetch user and verify validity
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await userModel.findOne({
            email: decoded.email
        })

        if (!user) {
            return res.status(401).json({
                message: "User not found"
            })
        }

        // attaching valid user to request to that controller can access 
        req.user = user;

        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token. please login again"
        })
    }

}

module.exports = authMiddleware