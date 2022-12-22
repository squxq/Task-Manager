const router = require('express').Router()

// controllers
const { 
    getTasks, 
    createTask, 
    getSingleTask,
    updateTask,
    deleteTask,    
} = require(`../controllers/controllers.js`) // controllers folder is outside the routes one

// Routing

/*
router.get(`/`, getTasks)
router.post(`/`, createTask)
router.get(`/:id`, getSingleTask)
router.patch(`/:id`, updateTask)
router.delete(`/:id`, deleteTask)
*/

router.route(`/`)
    .get(getTasks)
    .post(createTask)

router.route(`/:id`)
    .get(getSingleTask)
    .patch(updateTask)
    .delete(deleteTask)

// Exports
module.exports = router