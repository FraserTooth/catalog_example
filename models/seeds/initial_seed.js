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
}
