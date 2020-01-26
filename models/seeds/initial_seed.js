const moment = require('moment')

const initialProducts = [
  {
    name: 'Large Pie',
    src:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Pumpkin_Pie.jpg/1200px-Pumpkin_Pie.jpg',
    description: "Big Ol' Pumpkin Pie",
    price: 2300
  }
]

const initialUsers = [
  {
    username: 'demouser',
    password: '$2b$06$8xkKrfzs4IWKYjm5qrldSuTtyRC2AmvWU6zi7TK3ARBAr6HF1NNUu'
  }
]

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('products')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('products').insert(
        initialProducts.map((product) => {
          return {
            name: product.name,
            description: product.description,
            price: product.price,
            image_src: product.src,
            timestamp: moment().format()
          }
        })
      )
    })
    .then(function() {
      return knex('users').del()
    })
    .then(function() {
      // Inserts seed Users
      return initialUsers.map((user) => {
        return {
          username: user.username,
          password: user.password,
          last_logged_in: moment().format()
        }
      })
    })
    .then(function(userData) {
      return knex('users').insert(userData)
    })
}
