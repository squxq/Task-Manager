const Task = require(`../models/task.js`)
const asyncWrapper = require(`../middleware/async.js`)

const { createCustomError } = require(`../errors/custom-error.js`)

// Responses


const getTasks = asyncWrapper (async (req, res) => {
    const tasks = await Task.find({})
    /*
    res.status(200).json({ tasks })
        
    res.status(200).json({ tasks, amount: tasks.length })
    */

    // res.status(200).json({ success: true, data: { tasks, nbHits: tasks.length} })

    res.status(200).json({ tasks })
    // axios has a data property
})

const createTask = asyncWrapper (async (req, res) => {
    const task = await Task.create(req.body)
    res.status(201).json({ task }) // successful post request is 201
})

const getSingleTask = asyncWrapper (async (req, res, next) => {
    const { id: taskID } = req.params
    const task = await Task.findOne({ _id: taskID })

    if (!task) {
        // this is if we hyave the correct syntax for the id, but if it doesnt match we have to deal with it ourselves

        return next(createCustomError(`No task with id: ${ taskID }.`, 404))
    }
    res.status(200).json({ task })
})

const updateTask = asyncWrapper (async (req, res) => {
    const { id: taskID } = req.params //req.params.id
    const { body: data } = req //req.body

    /*
    res.status(200).json({
        id: taskID,
        data,
    })
    */

    const task = await Task.findOneAndUpdate(
    { _id: taskID },
    data, 
    {
        new: true,
        runValidators: true,
    }
    )
    if (!task) {
        return next(createCustomError(`No task with id: ${ taskID }.`, 404))
    }

    res.status(200).json({ task })
})

const deleteTask = async (req, res) => {
    const { id: taskID } = req.params
    const task = await Task.findOneAndDelete({ _id: taskID })

    if (!task) {
        return next(createCustomError(`No task with id: ${ taskID }.`, 404))
    }

    // res.status(200).json({ task })
    // or I can say:
    // res.status(200).send()
    // or we can say:
    res.status(200).json({
        task: null,
        status: `success`,
    })
}

module.exports = {
    getTasks,
    createTask,
    getSingleTask,
    updateTask,
    deleteTask,
}