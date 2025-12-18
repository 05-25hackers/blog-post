const express = require('express')
const db = require('./config/database.js')
const authRoute = require("./routes/auth.routes.js")

const app = express()
app.use(express.json())


async function start() {
    await db()
    
    app.use("/auth", authRoute)

    app.listen(3000, () => console.log("http://localhost:3000"))
}
start()