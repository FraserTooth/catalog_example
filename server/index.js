const path = require('path')
const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()
const morgan = require('morgan')
const api = require('../controllers')

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

const start = async () => {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  app.use('/api', express.json(), express.urlencoded({ extended: true }), api)
  app.use(express.static(path.join(__dirname, '../dist')))

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Start Up Morgan
  app.use(morgan('dev'))

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
module.exports = { start }
