const Knex = require('knex')
const knexFile = require('../knexfile')

const knex = Knex(knexFile)

module.exports = knex
