const { start } = require('./server')
const db = require('./models/index')

console.log('Running Migration Files')
db.migrate.latest().then(() => {
  console.log('Running Seed Files')
  db.seed.run().then(() => {
    start()
  })
})
