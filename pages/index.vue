<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <CatalogCard
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
      if (Array.isArray(response.data)) {
        this.products = response.data
      } else {
        this.products = []
      }
    })
  }
}
</script>
