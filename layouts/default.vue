<template>
  <v-app light>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-toolbar-title v-text="title" />
      <v-btn @click.stop="login = !login">Login</v-btn>
      <LoginForm v-if="login === true" class="loginForm" />
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>

    <v-footer :fixed="fixed" app>
      <span>&copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<script>
import LoginForm from '~/components/LoginForm.vue'

export default {
  components: {
    LoginForm
  },
  data() {
    return {
      login: false,
      session: null,
      title: 'Catalog Example'
    }
  }
}
</script>

<style scoped>
.loginForm {
  position: absolute;
  top: 100px;
  border: white;
}
</style>
