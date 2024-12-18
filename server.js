const express = require('express')
const app = express()

// Imp Middlewares
app.use(express.json())


//Route Handler
const usersRouter=require("./routes/users")
app.use("/users",usersRouter)

const coursesRouter=require("./routes/courses")
app.use("/courses",coursesRouter)


//Home Route
app.get('/', (req, res) => res.send('Hello World!'))


app.listen(3000, () => console.log(`App running`))