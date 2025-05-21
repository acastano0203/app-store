const express = require('express');
const UsersService = require('../services/user.services.js');

const router = express.Router();
const usersServices = new UsersService();

// find users
router.get('/', async (req, res) => {
  try {
    const users = await usersServices.findUsers();
    res.json(users)
  } catch (error) {
    res.status(404).json({
      message: error.message
    })

  }

})
// findone user
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const user = await usersServices.findoneUser(id);
  res.json(user)
})
// create user
router.post('/', async (req, res) => {
  try {
    const body = req.body;
    const newUser = await usersServices.createUser(body);

    res.status(201).json(newUser);
  } catch (error) {
    res.status(404).json({
      message: error.message
    })

  }

})
// update user
router.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const user = await usersServices.updateUser(id, body)
    res.json(user)
  } catch (error) {
    next(error);

  }

})

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await usersServices.deleteUser(id)
    res.json(user)
  } catch (error) {
    res.status(404).json({
      message: error.message
    })

  }


})

module.exports = router;
