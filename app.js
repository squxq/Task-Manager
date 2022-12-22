
// one route - /hello
// port 3000

// globals
const express = require(`express`)
const app = express()
// router
const router = require(`./routes/routes.js`)
// mongoose
const connectDB = require(`./db/connect`)
// secret variables
require(`dotenv`).config()

// middleware
// static assets
app.use(express.static(`./public`))
// parse from data
app.use(express.urlencoded({ extended: false }))
// parse json
app.use(express.json())


// /api/v1/tasks - ONLY NEED ONE !!!!
app.use(`/api/v1/tasks`, router)

// getting the tasks - GET that gets the items
// create a new task - POST request that creates the tasks
// delete a task - DELETE request that deletes the task
// edit a task - PUT request that updates the task
// when we edit we open a new page, with a unique task - GET request to get a spcific task

// the routes and their functions
/*
app.get(`/api/v1/tasks`)        - get all the tasks
app.post(`/api/v1/tasks`)       - create a new task
app.get(`/api/v1/tasks/:id`)    - get a single task
app.patch(`/api/v1/tasks/:id`)    - update task
app.delete(`/api/v1/tasks/:id`)    - delete task
*/
// /api/v1 is a convention 
// /v1 is to account for updates - so that i can work the same project without getting the whole functionality down
// /tasks/:id is a convention

// not found
const notFound = require(`./middleware/not-found.js`)

app.use(`*`, notFound)


// error handler
const errorHandlerMiddleware = require(`./middleware/error-handler.js`)

app.use(errorHandlerMiddleware)


// port
const port = process.env.PORT || 3000

// listen
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}...`);
        })
    } catch (error) {
        console.log(error);
    }
}

start()

// put is for replacing the existing content
// patch is for parcial update

// with "put" we replace the item, the properties that we dont pass will eventually be removed
// with patch we just update the properties that we are passing