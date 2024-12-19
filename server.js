// all imports
const express = require('express')
const usersRouter=require("./routes/users")
const coursesRouter=require("./routes/courses")
const adminRouter=require("./routes/admin")
const app = express()

// Imp Middlewares
app.use(express.json())


//Route Handler
app.use("/users",usersRouter)
app.use("/courses",coursesRouter)
app.use("/admin",adminRouter)

//Home Route
app.get('/', (req, res) => res.send('Hello World!'))


app.listen(3000, () => console.log(`App running`))