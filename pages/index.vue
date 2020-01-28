<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-btn
        v-if="session"
        @click.stop="form = !form"
        class="mx-2"
        fab
        dark
        color="indigo"
      >
        <v-icon dark>mdi-plus</v-icon>
      </v-btn>
      <CatalogCardForm v-if="form" @newProduct="newProducts" />
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
import CatalogCardForm from '~/components/CatalogCardForm.vue'

export default {
  components: {
    CatalogCard,
    CatalogCardForm
  },
  data() {
    return {
      form: false,
      products: []
    }
  },
  computed: {
    session() {
      return this.$store.state.session
    }
  },
  mounted() {
    this.getProducts()
  },
  methods: {
    newProducts() {
      this.form = false
      this.getProducts()
    },
    getProducts() {
      axios.get('/api/products').then((response) => {
        if (Array.isArray(response.data)) {
          this.products = response.data
        } else {
          this.products = []
        }
      })
    }
  }
}
</script>
