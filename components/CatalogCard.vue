<template>
  <v-card class="card">
    <v-card-title class="headline">{{ product.name }}</v-card-title>
    <v-card-text>{{ product.description }}</v-card-text>
    <v-img :src="product.image_src" height="300" contain></v-img>
    <v-card-text>{{ '¥' + product.price }}</v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ['product']
}
</script>

<style scoped>
.card {
  padding-top: 10px;
}
</style>
