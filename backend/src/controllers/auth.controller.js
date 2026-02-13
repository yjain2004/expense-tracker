const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function signup(req, res) {
    const { name, email, password } = req.body;
    const user = await userModel.findOne({
        email
    })


    //checking if email already exists
    if (user) {
        return res.status(400).json({
            message: "Email already exists"
        })
    }

    //hashing password
    const hashedPassword = await bcrypt.hash(password, 10)

    //saving details into database
    await userModel.create({
        name: name,
        email: email,
        password: hashedPassword
    })

    //returning success response
    return res.status(200).json({
        message: "User registered successfully"
    })

}

async function login(req, res) {
    const { email, password } = req.body;

    const user = await userModel.findOne({
        email
    })

    //checking if user exists or not
    if (!user) {
        return res.status(400).json({
            message: "Invalid username or password"
        })
    }

    // checking if password matches or not
    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
        return res.status(400).json({
            message: "Invalid username or password"
        })
    }

    //creating jwt token
    const token = jwt.sign({
        id: user._id,
        email
    }, process.env.JWT_SECRET)

    //setting cookiein browser
    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        samSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: "/"
    })

    //responding success message
    return res.status(200).json({
        message: "User logged in",
        user: {
            id: user._id,
            email: user.email
        }
    })
}

async function logout(req, res) {
    //clearing cookies from browser
    res.clearCookie("token");

    //responging with success
    res.status(200).json({
        message: "User logged out successfully"
    })

}

async function user(req, res) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(400).json({
            message: "Not authenticated"
        })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await userModel.findOne({
        email: decoded.email
    })

    if (!user) {
        return res.status(200).json({
            message: "Not authenticated"
        })
    }

    return res.status(200).json({
        id: user._id,
        name: user.name,
        email: user.email
    })

}

module.exports = {
    signup,
    login,
    logout,
    user
}