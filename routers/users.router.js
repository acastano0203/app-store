const express = require('express');
const UsersService = require('../services/user.services.js');

const router = express.Router();
const usersServices = new UsersService();

// find users
router.get('/', (req, res) => {
  try {
    const users = usersServices.findUsers();
    res.json(users)
  } catch (error) {
    res.status(404).json({
      message: error.message
    })

  }

})
// findone user
router.get('/:id', (req, res) => {
  const id = req.params;
  const user = usersServices.findoneUser(id);
  res.json(user)


})
// create user
router.post('/', (req, res) => {
  try {
    const body = req.body;
    const newUser = usersServices.createUser(body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(404).json({
      message: error.message
    })

  }

})
// update user
router.patch('/:id', (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    console.log('body', body, "id", id);
    const user = usersServices.updateUser(id, body)
    res.json(user)
  } catch (error) {
    next(error);

  }

})

router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const user = usersServices.deleteUser(id)
    res.json(user)
  } catch (error) {
    res.status(404).json({
      message: error.message
    })

  }


})

module.exports = router;
