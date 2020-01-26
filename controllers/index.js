const express = require('express')
const router = express.Router()
const moment = require('moment')

const bcrypt = require('bcrypt')

const hashIt = (string) => {
  // RETURNS A PROMISE
  return bcrypt.hash(string, 6)
}

const isPasswordValid = (string, hash) => {
  // RETURNS A PROMISE
  return bcrypt.compare(string, hash)
}

// const moment = require('moment')
const db = require('../models/index')

// Get All Products
router.get('/products', async (req, res) => {
  const products = await db('products').select()
  res.json(products)
})

// Get One Product
router.get('/products/:id', async (req, res) => {
  const id = req.params.id
  const products = await db('notes')
    .select()
    .where({ id })
  res.json(products[0])
})

// Add a New Product
router.post('/products', async (req, res) => {
  try {
    const product = req.body

    const productObject = {
      name: product.name,
      description: product.description,
      price: product.price,
      image_src: product.src,
      timestamp: moment().format()
    }

    await db('products').insert(productObject)

    res.json(productObject)
  } catch (error) {
    res.sendStatus(400, error)
  }
})

// Update a Product
router.patch('/products/:id', async (req, res) => {
  try {
    const productInput = req.body
    const id = req.params.id
    await db('products')
      .where({ id })
      .update(productInput)

    const newNote = await db('products')
      .select()
      .where({ id })

    res.json(newNote)
  } catch (error) {
    res.sendStatus(400, error)
  }
})

// Delete a Product
router.delete('/products/:id', async (req, res) => {
  try {
    const id = req.params.id
    const oldProduct = await db('products')
      .select()
      .where({ id })

    await db('products')
      .where({ id })
      .del()

    res.json(oldProduct)
  } catch (error) {
    res.sendStatus(400, error)
  }
})

module.exports = router
