const Task = require("../models/Task")
const asyncWrapper = require('../middlewares/async')
const {createCustomError, CustomAPIError} = require("../errors/custom-error")

const getAllTasks = asyncWrapper (async (req, res) => {
    const tasks = await Task.find({})
    res.status(200).json({tasks, amount: tasks.length })
})

const createTask = asyncWrapper (async (req, res) => {
    const task = await Task.create(req.body)
    res.status(201).json({task})
})

const getTask = asyncWrapper (async (req, res, next) => {
    const {id} = req.params
    const task = await Task.findOne({ _id: id})
    if(!task) {
        return next(createCustomError(`No task with id: ${id}`, 404))
    }
    res.status(200).json({message: "fetched_successfully", task})
})

const updateTask = asyncWrapper (async (req, res) => {
    const {id} = req.params
    const task = await Task.findOneAndUpdate({ _id: id}, req.body, {
        new: true,
        runValidators: true
    })
    if(!task) {
        return next(createCustomError(`No task with id: ${id}`, 404))
    }
    res.status(200).json({message: "updated_successfully", task, })
})

const editTask = asyncWrapper (async (req, res) => {
    const {id} = req.params
    const task = await Task.findOneAndUpdate({ _id: id}, req.body, {
        new: true,
        runValidators: true,
        overwrite: true,
    })
    if(!task) {
        return next(createCustomError(`No task with id: ${id}`, 404))
    }
    res.status(200).json({message: "updated_successfully", task, })
})

const deleteTask = asyncWrapper (async  (req, res) => {
    const {id} = req.params
    const task = await Task.findOneAndDelete({ _id: id})
    if(!task) {
        return next(createCustomError(`No task with id: ${id}`, 404))
    }
    res.status(200).json({message: "deleted_successfully", task})
})


module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    editTask,
    deleteTask,
}