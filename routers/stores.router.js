const express = require('express');
const StoresServices = require('../services/store.services.js');

const router = express.Router();
const storeServices = new StoresServices();
// find
router.get('/', async (req, res) => {
  try {
    const stores = await storeServices.findStore();
    res.json(stores)

  } catch (error) {
    res.status(404).json({
      message: error.message
    })

  }

})
// findone
router.get('/:id', async (req, res) => {
  const id = req.params.id
  const store = await storeServices.findoneStore(id)
  res.json(store)


})
//create store
router.post('/:name', async (req, res) => {
  try {
    const body = req.params.name;
    const newStore = await storeServices.createStore(body)
    res.status(201).json(newStore)

  } catch (error) {
    res.status(404).json({
      message: error.message
    })

  }

})

// update store
router.patch('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const body = req.body;
    const store = await storeServices.updateStore(id, body)
    res.json(store)
  } catch (error) {
    next(error);
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const store = await storeServices.deleteStore(id)
    res.json(store)
  } catch (error) {
    res.status(404).json({
      message: error.message
    })

  }

})

module.exports = router;
