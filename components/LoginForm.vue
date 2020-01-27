<template>
  <v-card>
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
        value="wqfasds"
        class="input-group--focused"
        required
      ></v-text-field>
    </v-form>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      showPass: false,
      password: '',
      rules: {
        required: (value) => !!value || 'Required.',
        min: (v) => v.length >= 8 || 'Min 8 characters'
      }
    }
  }
}
</script>

<style scoped>
.dropdown {
  background-color: red;
}
</style>
