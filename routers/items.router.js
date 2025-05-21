const express = require('express');
const ItemsServices = require('../services/item.services.js');

const router = express.Router();
const itemsServices = new ItemsServices();



// find items
router.get('/', async (req, res) => {
  try {
    const items = await itemsServices.findItems();
    res.json(items)
  } catch (error) {
    res.status(404).json({
      message: error.message
    })

  }

})
//findone item
router.get('/:id', async (req, res) => {
  const id = req.params.id
  const item = await itemsServices.findoneItem(id)
  res.json(item)

})

// create item
router.post('/', async (req, res) => {
  try {
    const body = req.body;
    const newItem = await itemsServices.createItem(body);
    res.status(201).json(newItem)
  } catch (error) {
    res.status(404).json({
      message: error.message
    })

  }

})
// update item
router.patch('/:id', async (req, res, next) => {
  try {
    const body = req.body;
    const { id } = req.params;
    const item = await itemsServices.updateItem(id, body)
    res.json(item)
  } catch (error) {
    next(error);
  }

})

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const item = await itemsServices.deleteItem(id)
    res.json(item)
  } catch (error) {
    res.status(404).json({
      message: error.message
    })

  }

})


module.exports = router;
