const app = require("./app")
const connectDb = require("./config/db")

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);

})

connectDb();