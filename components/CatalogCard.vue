<template>
  <v-card>
    <v-card-title class="headline">{{ product.name }}</v-card-title>
    <v-card-text>{{ product.description }}</v-card-text>
    <v-img :src="product.src"></v-img>
    <v-card-text>{{ 'Y' + product.price }}</v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ['product']
}
</script>
