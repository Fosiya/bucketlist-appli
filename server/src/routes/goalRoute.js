const express = require('express');
const { addGoal } = require('../controllers/goalController/addGoal');
const { completeGoal } = require('../controllers/goalController/completeGoal');
const { deleteGoal } = require('../controllers/goalController/deleteGoal');
const { editGoal } = require('../controllers/goalController/editGoal');
const { getGoals } = require('../controllers/goalController/getGoals');
const { uncompleteGoal } = require('../controllers/goalController/uncompleteGoal');
const goalRoute = express.Router();

goalRoute.get('/:id', getGoals);
goalRoute.post('/add', addGoal);
goalRoute.patch('/edit', editGoal);
goalRoute.delete('/delete/:id', deleteGoal);
goalRoute.patch('/complete/:id', completeGoal);
goalRoute.patch('/uncomplete/:id', uncompleteGoal);

exports.goalRoute = goalRoute;