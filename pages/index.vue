<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <catalog-card
        v-for="product in products"
        v-bind:key="product.id"
        :product="product"
      />
    </v-flex>
  </v-layout>
</template>

<script>
import CatalogCard from '~/components/CatalogCard.vue'
const products = [
  {
    id: 1,
    name: 'Large Pie',
    src:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Pumpkin_Pie.jpg/1200px-Pumpkin_Pie.jpg',
    description: "Big Ol' Pumpkin Pie",
    price: 2300
  }
]

export default {
  components: {
    CatalogCard
  },
  data() {
    return {
      products
    }
  }
}
</script>
