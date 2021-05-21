<template>
  <v-app v-scroll="activess">
    <v-app-bar id="top" app dense flat>
      <v-container class="offall" fluid>
        <v-row no-gutters>
          <v-col cols="2"
            ><v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
            <v-icon
              class="ml-md-10"
              color="blue lighten-3"
              @click="switchTheme()"
              >mdi-arrow-up-drop-circle-outline</v-icon
            ></v-col
          >
          <v-divider vertical class="blue lighten-3"></v-divider>
          <v-col cools="8" class="d-flex align-center justify-center text-h5">
            <nuxt-link
              exact
              to="/"
              no-prefetch
              style="text-decoration: none"
              :class="
                $vuetify.theme.dark
                  ? 'white--text'
                  : 'grey--text text--darken-1'
              "
              >Работа для вас</nuxt-link
            >
          </v-col>
          <v-divider vertical class="blue lighten-3"></v-divider>
          <v-col cols="2" class="d-flex align-center justify-end">
            <regis />
            <insys />
          </v-col>
        </v-row>
        <v-divider class="blue lighten-3"></v-divider>
      </v-container>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      fixed
      temporary
      style="z-index: 210"
      width="400"
    >
      <v-container fluid style="height: 100%" class="py-6 px-5">
        <v-col style="height: 100%">
          <v-row no-gutters style="height: 12%">
            <v-col cols="7"
              ><v-btn text class="text-capitalize blue--text text--darken-1"
                ><v-icon class="pr-4" size="32">mdi-arrow-right-circle</v-icon
                >Найти вакансию</v-btn
              ></v-col
            >
            <v-col cols="5" class="justify-end d-flex align-start"
              ><v-btn text @click="drawer = false"
                ><v-icon>mdi-close</v-icon></v-btn
              ></v-col
            >
          </v-row>
          <v-row no-gutters style="height: 73%">
            <v-col
              cols="12"
              v-for="(list, n) in lists"
              :key="list.title"
              class="grey--text text--darken-1"
            >
              <v-hover v-slot="{ hover }">
                <v-btn
                  exact
                  text
                  :to="list.link"
                  block
                  x-large
                  style="transition: 0.2s all ease; font-size: 1.6em"
                  :class="
                    hover
                      ? 'black--text black--darken-2'
                      : 'grey--text text--darken-2'
                  "
                  class="d-flex justify-start text-capitalize"
                  :disabled="n > 3"
                >
                  <v-icon class="pr-3" size="32" color="blue lighten-3">{{
                    list.icon
                  }}</v-icon>
                  {{ list.title }}
                </v-btn>
              </v-hover>
            </v-col>
          </v-row>
          <v-row
            no-gutters
            align="end"
            justify="space-around"
            style="height: 15%"
            ><v-btn
              v-for="icon in icons"
              :key="icon"
              small
              color="blue lighten-3"
              icon
            >
              <v-icon size="24px">
                {{ icon }}
              </v-icon>
            </v-btn></v-row
          >
        </v-col>
      </v-container>
    </v-navigation-drawer>
    <v-main class="offall">
      <v-card color="backgr" tile flat height="100%">
        <v-container class="pa-0" fluid>
          <v-row no-gutters>
            <v-col cols="2">
              <v-spacer></v-spacer>
            </v-col>
            <v-col cols="10" lg="8">
              <nuxt />
            </v-col>
            <v-col cols="2" class="d-none d-md-flex"
              ><v-spacer></v-spacer
            ></v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-main>
    <v-footer app absolute color="backgr" height="60" class="mb-0">
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
    <v-btn text href="#top" class="up_button" :class="{ isActive: actives }"
      >Наверх</v-btn
    >
    <div :style="{ height: wins + 'px' }" class="down pl-4 pt-12" @click="back()">
      <v-icon class="mt-n1">mdi-arrow-left</v-icon> Назад
    </div>
  </v-app>
</template>

<script>
import scaleMixin from "../middleware/scaleMixins";
import insys from "../components/os/header/insys";
import regis from "../components/os/header/regis";
export default {
  components: {
    insys,
    regis,
  },
  mixins: [scaleMixin],
  scrollToTop: true,

  data: () => ({
    actives: false,
    drawer: false,
    lists: [
      {
        link: "/",
        icon: "mdi-application",
        title: "Главная",
      },
      {
        link: "/about",
        icon: "mdi-information-outline",
        title: "О нас",
      },
      {
        link: "/Lk",
        icon: "account_circle",
        title: "Кабинет",
      },
      {
        link: "/project",
        icon: "mdi-book-multiple",
        title: "Вакансии",
      },
      {
        link: "/Lk",
        icon: "account_circle",
        title: "Портфолио",
      },
      {
        link: "/project",
        icon: "mdi-book-multiple",
        title: "Вступить",
      },
    ],
    icons: [
      "mdi-facebook",
      "mdi-twitter",
      "mdi-vk",
      "mdi-linkedin",
      "mdi-instagram",
    ],
  }),

  methods: {
    back() {
      this.$nuxt.$router.go(-1);
    },
    activess() {
      if (process.client) {
        if (window.pageYOffset >= document.documentElement.clientHeight - 1) {
          this.actives = true;
        } else {
          this.actives = false;
        }
      }
    },
    switchTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
  },

  computed: {
    admin() {
      if (this.$route.query.admin == "true") {
        return true;
      }
      return false;
    },
    wins() {
      if (process.client) {
        return document.documentElement.clientHeight;
      }
    },
  },
};
</script>

<style>
.v-toolbar__content {
  padding: 0px;
}
.offall {
  padding: 0px;
  margin: 0px;
}
</style>

<style scoped>
div.down {
  position: fixed;
  top: 48px;
  left: 0px;
  width: 10%;
  cursor: pointer;
  transition: linear 0.2s;
}
div.down:hover {
  background-color: rgba(0, 0, 0, 0.2);
  transition: linear 0.2s;
}
.v-btn:before {
  background: rgba(0, 0, 0, 0);
}
.up_button {
  position: fixed;
  bottom: 30px;
  right: 30px;
  opacity: 0;
  transition: opacity 1s;
  z-index: 10;
}
.isActive {
  opacity: 1;
}
</style>