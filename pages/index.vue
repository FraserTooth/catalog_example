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
import axios from 'axios'
import CatalogCard from '~/components/CatalogCard.vue'

export default {
  components: {
    CatalogCard
  },
  data() {
    return {
      products: []
    }
  },
  mounted() {
    axios.get('/api/products').then((response) => {
      if (response) {
        this.products = response.data
      } else {
        this.products = null
      }
    })
  }
}
</script>
