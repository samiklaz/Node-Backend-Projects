const express = require("express")
const app = express()
const connectDB = require("./db/connect")
const tasks = require("./routes/tasks")
require('dotenv').config()
const notFound = require("./middlewares/not-found")
const errorHandlerMiddleWare = require("./middlewares/errorHandler")

// middleware
app.use(express.static('./public'))
app.use(express.json())

// routes
app.use("/api/v1/tasks", tasks)

app.use(notFound)
app.use(errorHandlerMiddleWare)

const port = process.env.PORT || 3000

const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`server is listening on port ${port}`))
    } catch(error) {
        console.log(error)
    }
}

start()