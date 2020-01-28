<template>
  <v-app light>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-toolbar-title v-text="title" />
      <div>
        <v-btn v-if="session == null" @click.stop="login = !login">Login</v-btn>
        <v-btn v-else @click.stop="logout">Logout</v-btn>
      </div>
      <LoginForm
        @passwordSuccess="closeBox"
        v-if="login === true"
        class="loginForm"
      />
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
      title: 'Catalog Example'
    }
  },
  computed: {
    session() {
      return this.$store.state.session
    }
  },
  methods: {
    closeBox() {
      this.login = false
    },
    logout() {
      this.login = false
      this.$store.commit('updateSession', null)
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
