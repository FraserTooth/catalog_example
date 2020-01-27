<template>
  <v-card class="dropdown">
    <v-card-title>Login</v-card-title>
    <v-form ref="form" v-model="valid" :lazy-validation="lazy">
      <v-text-field
        v-model="username"
        :counter="10"
        :rules="[rules.required, rules.min]"
        label="Username"
        required
      ></v-text-field>

      <v-text-field
        v-model="password"
        :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="[rules.required, rules.min]"
        :type="showPass ? 'text' : 'password'"
        @click:append="showPass = !showPass"
        name="input-10-2"
        label="Password"
        hint="At least 8 characters"
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
      showPass: false,
      username: '',
      password: '',
      rules: {
        required: (value) => !!value || 'Required.',
        min: (v) => v.length >= 8 || 'Min 8 characters'
      }
    }
  },
  methods: {
    submit() {
      axios
        .post('/api/login', {
          username: this.username,
          password: this.password
        })
        .then((response) => {
          const key = response.data.sessionID
          if (key) {
            this.$emit('passwordSuccess')
            this.$store.commit('updateSession', key)
          }
        })
    }
  }
}
</script>

<style scoped>
.dropdown {
  padding: 10px;
}
</style>
