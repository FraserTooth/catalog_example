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

const sessionValid = async (sessionToken) => {
  if (!sessionToken) {
    console.log('No Session Key')
    return false
  }
  try {
    const session = await db('sessions')
      .select()
      .where({ session_id: sessionToken })

    if (session[0] && session[0].session_id === sessionToken) {
      console.log('Token Valid')
      if (moment(session[0].expires) > moment()) {
        console.log('Token Not Expired')
        return true
      }
      console.log('Session Key Expired')
    }
    console.log('Invalid Session Key')
    return false
  } catch (e) {
    console.error(e)
    return false
  }
}

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
    const product = req.body.product
    const session = req.body.session

    if (!session) {
      console.log('No Session Key')
      res.sendStatus(401, { message: 'No Session Key' })
      return
    }

    if (!sessionValid(session)) {
      console.log('Bad Session Key')
      res.sendStatus(401, { message: 'Bad Session Key' })
      return
    }

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
    const productInput = req.body.product
    const session = req.body.session

    if (!session) {
      console.log('No Session Key')
      res.sendStatus(401, { message: 'No Session Key' })
      return
    }

    if (!sessionValid(session)) {
      console.log('Bad Session Key')
      res.sendStatus(401, { message: 'Bad Session Key' })
      return
    }

    const id = req.params.id
    await db('products')
      .where({ id })
      .update(productInput)

    const newNote = await db('products')
      .select()
      .where({ id })

    console.log('Product Updated')

    res.json(newNote)
  } catch (error) {
    res.sendStatus(400, error)
  }
})

// Delete a Product
router.delete('/products/:id', async (req, res) => {
  try {
    const id = req.params.id

    const session = req.body.session

    console.log(req.body)

    if (!session) {
      console.log('No Session Key')
      res.sendStatus(401, { message: 'No Session Key' })
      return
    }

    if (!sessionValid(session)) {
      console.log('Bad Session Key')
      res.sendStatus(401, { message: 'Bad Session Key' })
      return
    }

    const oldProduct = await db('products')
      .select()
      .where({ id })

    await db('products')
      .where({ id })
      .del()

    console.log('Product Deleted')

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
            .format(),
          valid: true
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
    res.status(401).json(error)
  }
})

router.post('/logout', async (req, res) => {
  console.log('Logout Request')
  const session = req.body.session

  if (!session) {
    console.log('No Session Key')
    res.sendStatus(401, { message: 'No Session Key' })
    return
  }

  if (!sessionValid(session)) {
    console.log('Bad Session Key')
    res.sendStatus(401, { message: 'Bad Session Key' })
    return
  }

  await db('sessions')
    .where({ session_id: session })
    .update({ valid: false })
  res.json({ ok: true })
})

module.exports = router
