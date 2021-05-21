<template>
  <v-app>
    <v-container fluid class="ma-0 pa-0">
      <v-card :height="height_window" class="d-flex align-center">
        <v-col class="pa-0">
          <v-row align="center" justify="center" class="ma-0">
            <h1 v-if="error.statusCode === 404">{{ pageNotFound }}</h1>
            <h1 v-else>{{ otherError }}</h1>
          </v-row>
          <v-row align="center" justify="center" class="ma-0">
            <nuxt-link to="/">На главную</nuxt-link>
          </v-row>
        </v-col>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
export default {
  layout: "empty",
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: "404 Not Found",
      otherError: "An error occurred",
    };
  },
  computed:{
    height_window(){
      if (process.client) {
        return document.documentElement.clientHeight;
      }
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
    return {
      title,
    };
  },
};
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
