<template>
  <v-card>
    <v-card-subtitle>New Catalog Item</v-card-subtitle>

    <v-form ref="form" v-model="valid" :lazy-validation="lazy">
      <v-text-field
        v-model="title"
        :rules="[rules.required, rules.min]"
        label="Title"
        required
      ></v-text-field>

      <v-text-field
        v-model="description"
        :rules="[rules.required, rules.min]"
        label="Description"
        required
      ></v-text-field>

      <v-text-field
        v-model="image_src"
        :rules="[rules.required, rules.min]"
        label="Image Source"
        required
      ></v-text-field>

      <v-text-field
        v-model="price"
        :rules="[rules.required]"
        label="Price"
        required
      ></v-text-field>
    </v-form>
    <v-btn @click="submit">Submit</v-btn>
  </v-card>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      title: '',
      description: '',
      image_src: '',
      price: '',
      rules: {
        required: (value) => !!value || 'Required.',
        min: (v) => v.length >= 8 || 'Min 8 characters'
      }
    }
  },
  methods: {
    submit() {
      const productObject = {
        name: this.title,
        description: this.description,
        price: this.price,
        src: this.image_src
      }

      console.log(productObject)

      axios.post('/api/products', productObject).then((response) => {
        this.$emit('newProduct')
      })
    }
  }
}
</script>
