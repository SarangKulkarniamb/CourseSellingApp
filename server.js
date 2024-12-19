// all imports
require('dotenv').config();
const express = require('express')
const mongoose =require('mongoose')
const usersRouter=require("./routes/users")
const coursesRouter=require("./routes/courses")
const adminRouter=require("./routes/admin")
const app = express()
const dbURI = process.env.MONGODB_URI;
// Imp Middlewares
app.use(express.json())


//Route Handler
app.use("/users",usersRouter)
app.use("/courses",coursesRouter)
app.use("/admin",adminRouter)

//Home Route
app.get('/', (req, res) => res.send('Hello World!'))

async function main() {
    await mongoose.connect(dbURI)
    console.log("Connected to Database...")
    app.listen(3000, () => console.log(`App running...`))
}
main()