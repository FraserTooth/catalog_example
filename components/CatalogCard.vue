<template>
  <v-card class="card">
    <v-card-title class="headline">{{ product.name }}</v-card-title>
    <v-spacer />
    <v-btn
      v-if="session"
      @click.stop="editProduct = !editProduct"
      class="mx-2"
      fab
      dark
      color="red"
    >
      <v-icon dark>mdi-plus</v-icon>
    </v-btn>
    <v-btn
      v-if="session"
      @click.stop="deleteProduct"
      class="mx-2"
      fab
      dark
      color="blue"
    >
      <v-icon dark>mdi-plus</v-icon>
    </v-btn>
    <v-card-text>{{ product.description }}</v-card-text>
    <v-img :src="product.image_src" height="300" contain></v-img>
    <v-card-text>{{ '¥' + product.price }}</v-card-text>
  </v-card>
</template>

<script>
import axios from 'axios'
export default {
  props: ['product'],
  computed: {
    session() {
      return this.$store.state.session
    }
  },
  methods: {
    deleteProduct() {
      axios.delete(`/api/products/${this.product.id}`).then((response) => {
        this.$emit('refresh')
      })
    }
  }
}
</script>

<style scoped>
.card {
  padding-top: 10px;
}
</style>
