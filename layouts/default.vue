<template>
  <v-app light>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-toolbar-title v-text="title" />
      <v-btn @click.stop="fixed = !fixed" to="/login" router>
        Login
      </v-btn>
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
export default {
  data() {
    return {
      login: false,
      title: 'Catalog Example'
    }
  }
}
</script>
