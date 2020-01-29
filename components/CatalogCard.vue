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
      color="blue"
      red
    >
      <v-icon dark>mdi-wrench</v-icon>
    </v-btn>
    <v-btn
      v-if="session"
      @click.stop="deleteProduct"
      class="mx-2"
      fab
      dark
      color="red"
      red
    >
      <v-icon dark>mdi-delete</v-icon>
    </v-btn>

    <v-text-field
      v-if="editProduct"
      v-model="title"
      :rules="[rules.required, rules.min]"
      label="New Title"
      required
    ></v-text-field>

    <v-card-text>{{ product.description }}</v-card-text>
    <v-text-field
      v-if="editProduct"
      v-model="description"
      :rules="[rules.required, rules.min]"
      label="New Description"
      required
    ></v-text-field>

    <v-img :src="product.image_src" height="300" contain></v-img>
    <v-text-field
      v-if="editProduct"
      v-model="image_src"
      :rules="[rules.required, rules.min]"
      label="New Image Source"
      required
    ></v-text-field>

    <v-card-text>{{ '¥' + product.price }}</v-card-text>
    <v-text-field
      v-if="editProduct"
      v-model="price"
      :rules="[rules.required, rules.min]"
      label="New Price"
      required
    ></v-text-field>

    <v-spacer />
    <v-btn v-if="editProduct" @click="updateProduct">Update</v-btn>
  </v-card>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
export default {
  props: ['product'],
  data() {
    return {
      title: this.product.name,
      description: this.product.description,
      image_src: this.product.image_src,
      price: this.product.price,
      editProduct: false,
      rules: {
        required: (value) => !!value || 'Required.',
        min: (v) => v.length >= 8 || 'Min 8 characters'
      }
    }
  },
  computed: {
    session() {
      return this.$store.state.session
    }
  },
  methods: {
    deleteProduct() {
      axios
        .delete(`/api/products/${this.product.id}`, {
          data: {
            session: this.session
          }
        })
        .then((response) => {
          this.$emit('refresh')
        })
    },
    updateProduct() {
      const price = parseInt(this.price) || 0

      const productChanges = {
        name: this.title,
        description: this.description,
        image_src: this.image_src,
        price,
        timestamp: moment().format()
      }

      axios
        .patch(`/api/products/${this.product.id}`, {
          session: this.session,
          product: productChanges
        })
        .then((response) => {
          this.editProduct = false
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
