const express = require('express')
const router = express.Router()

// const moment = require('moment')
const db = require('../models/index')

// Get All Notes
router.get('/hello', async (req, res) => {
  const products = await db('products').select()
  res.json(products)
})

module.exports = router
