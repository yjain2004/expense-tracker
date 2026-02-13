const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors")

//importing routes
const authRoutes = require("./routes/auth.routes")
const entryRoutes = require("./routes/entry.routes")

//default middlewares
require("dotenv").config()
app.use(cors({
    origin: "https://expense-tracker-xi-five-64.vercel.app",
    credentials: true
}));
app.use(express.json())
app.use(cookieParser())


app.use("/api/auth", authRoutes)
app.use("/api/data", entryRoutes)

app.get("/", (req, res) => {
    res.send("Hello world")
})

module.exports = app;