if (!process.env.DATABASE_URL) require('dotenv').config({ path: './.env' })
const express = require('express')
const router = express.Router()
const moment = require('moment')

const bcrypt = require('bcrypt')

const salt = process.env.PASS_SALT

const hashIt = (string) => {
  // RETURNS A PROMISE
  return bcrypt.hash(string + salt, 6)
}

const isPasswordValid = (string, hash) => {
  // RETURNS A PROMISE
  return bcrypt.compare(string + salt, hash)
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

    const price = parseInt(product.price)

    const productObject = {
      name: product.name,
      description: product.description,
      price: price || 0,
      image_src: product.src,
      timestamp: moment().format()
    }

    console.log(productObject)

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

// Login
router.post('/login', async (req, res) => {
  try {
    const userAuth = req.body

    const inDatabase = await db('users')
      .select()
      .where({ username: userAuth.username })

    if (inDatabase[0]) {
      const authenticated = await isPasswordValid(
        userAuth.password,
        inDatabase[0].password
      )
      if (authenticated) {
        console.log('Correct Password')
        const sessionKey = await hashIt(userAuth.username)

        const sessionObject = {
          session_id: sessionKey,
          username: userAuth.username,
          expires: moment()
            .add(2, 'hours')
            .format()
        }

        await db('sessions').insert(sessionObject)

        return res.json({ username: userAuth.username, sessionID: sessionKey })
      } else {
        console.log('Incorrect Password')
        throw Error
      }
    } else {
      console.log('Not In Database')
      throw Error
    }
  } catch (error) {
    res.status(401).json({ message: 'Bad credentials' })
  }
})

router.post('/logout', (req, res) => {
  delete req.session.authUser
  res.json({ ok: true })
})

module.exports = router
