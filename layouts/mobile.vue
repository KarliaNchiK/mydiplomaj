<template>
  <v-app>
    <v-app-bar app dense flat :color="$vuetify.theme.dark ? 'rgba(33, 33, 33, 0.8)' : 'rgba(244, 247, 246, 0.8)'">
      <v-dialog v-model="drawer" fullscreen hide-overlay transition="transY">
        <template v-slot:activator="{ on, attrs }">
          <v-app-bar-nav-icon
            class="ml-1"
            v-bind="attrs"
            v-on="on"
            @click="startAnim()"
            color="blue lighten-1"
          ></v-app-bar-nav-icon>
        </template>
        <v-card style="height: 100%;" flat tile>
          <v-card class="pa-2" style="height: 100%;" flat tile>
            <div
              :class="!$vuetify.theme.dark ? 'blackBor' : 'whiteBor'"
              style="height: 100%; "
            >
              <v-container fluid class="offall" style="height: 100%">
                <v-row no-gutters style="height: 100%">
                  <v-col
                    class="d-flex align-start"
                    cols="2"
                    :class="
                      !$vuetify.theme.dark ? 'blackBorRight' : 'whiteBorRight'
                    "
                  >
                    <div
                      :class="!$vuetify.theme.dark ? 'blackBot' : 'whiteBot'"
                      style="width: 100%"
                      class="d-flex justify-center py-1"
                    >
                      <v-icon size="46" color="blue lighten-1"
                        >mdi-compass-rose</v-icon
                      >
                    </div></v-col
                  >
                  <v-col
                    cols="10"
                    class="d-flex justify-end"
                    style="max-height: 55px"
                    :class="!$vuetify.theme.dark ? 'blackBot' : 'whiteBot'"
                    ><v-icon
                      size="46"
                      @click="
                        drawer = false;
                        window = false;
                      "
                      >mdi-close</v-icon
                    ></v-col
                  >
                  <v-col
                    class="d-flex align-end justify-center"
                    cols="2"
                    :class="
                      !$vuetify.theme.dark ? 'blackBorRight' : 'whiteBorRight'
                    "
                    ><div class="d-block">
                      <div v-for="icon in icons" :key="icon" class="py-2">
                        <v-icon size="24" color="blue lighten-1">{{
                          icon
                        }}</v-icon>
                      </div>
                    </div></v-col
                  >
                  <v-col style="padding-bottom: 180px" class="pl-5" cols="10"
                    ><v-list nav dense>
                      <nuxt-link
                        v-for="(list, n) in lists"
                        :key="list.link"
                        :to="list.link"
                        exact
                        no-prefetch
                        style="text-decoration: none"
                      >
                        <v-list-item @click="drawer = false" class="py-7">
                          <v-list-item-title class="grey--text">
                            <v-col style="height: 56px">
                              <transition name="textUp">
                                <v-row
                                  v-if="window == true"
                                  :key="list.title"
                                  no-gutters
                                  >0{{ n + 1 }}.</v-row
                                >
                              </transition>
                              <transition name="textUp">
                                <v-row
                                  v-if="window == true"
                                  :key="n"
                                  :class="
                                    !$vuetify.theme.dark
                                      ? 'textColBl'
                                      : 'textColWh'
                                  "
                                  no-gutters
                                  class="text-h4 font-weight-bold"
                                  >{{ list.title }}</v-row
                                ></transition
                              >
                            </v-col>
                          </v-list-item-title>
                        </v-list-item>
                      </nuxt-link>
                    </v-list></v-col
                  >
                </v-row>
              </v-container>
            </div>
          </v-card>
        </v-card>
      </v-dialog>
      <v-toolbar-title class="blue--text text--darken-1">SkillVard</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-icon class="ml-md-10" color="blue darken-1" @click="switchTheme()"
        >mdi-arrow-up-drop-circle-outline</v-icon
      >
      <v-menu bottom left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="mr-3" color="blue darken-1" dark v-bind="attrs" v-on="on" icon>
            <v-icon size="30">mdi-account-group</v-icon>
          </v-btn>
        </template>

        <v-list elevation="0" tile color="grey lighten-5">
          <v-list-item v-for="icon in icons" :key="icon" link>
            <v-list-item-title
              ><v-icon color="blue lighten-1">{{
                icon
              }}</v-icon></v-list-item-title
            >
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <nuxt />
    <v-footer app class="pa-0">
      <v-col>
        <v-row class="ma-0" style="width: 100%">
          <div v-for="btn in btns" :key="btn.name" style="width: 25%">
            <v-btn
              block
              text
              exact
              :to="btn.link"
              color="blue lighten-1"
              exact-active-class="grey--text text--darken-2"
            >
              <v-col>
                <v-row no-gutters justify="center"
                  ><v-icon style="transition: ease 0.5s all">{{
                    btn.icon
                  }}</v-icon>
                </v-row>
              </v-col>
            </v-btn>
          </div>
        </v-row>
      </v-col>
    </v-footer>
  </v-app>
</template>


<script>
export default {
  data: () => ({
    lists: [
      {
        link: "/",
        icon: "mdi-cards-diamond-outline",
        title: "Главная",
      },
      {
        link: "/about",
        icon: "mdi-information-outline",
        title: "О создателях",
      },
      {
        link: "/Lk",
        icon: "account_circle",
        title: "Личный кабинет",
      },
      {
        link: "/project",
        icon: "mdi-book-multiple",
        title: "Проекты",
      },
    ],
    icons: [
      "mdi-facebook",
      "mdi-twitter",
      "mdi-vk",
      "mdi-linkedin",
      "mdi-instagram",
    ],
    toogle: 0,
    group: null,
    window: false,
    drawer: false,
    btns: [
      {
        name: "1",
        link: "/",
        icon: "mdi-application",
        text: "Главная",
      },
      {
        name: "2",
        link: "/Lk",
        icon: "mdi-account",
        text: "Кабинет",
      },
      {
        name: "3",
        link: "/project",
        icon: "mdi-book-multiple",
        text: "Проекты",
      },
      {
        name: "4",
        link: "/about",
        icon: "mdi-badge-account",
        text: "О нас",
      },
    ],
  }),
  methods: {
    switchTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
    startAnim() {
      setTimeout(() => {
        this.window = true;
      }, 500);
    },
  },
};
</script>

<style scoped>
.v-btn:before {
  background: rgba(0, 0, 0, 0);
}
.col-2 {
  max-width: 14%;
}
.col-10 {
  flex: 0 0 86%;
  width: 86%;
  max-width: 86%;
}

.textUp-leave-active {
  transition: 0.5s all ease;
}

.textUp-enter-active {
  transition: all 1s cubic-bezier(0.2, 0, 0.3, 1);
  transition-delay: 1s;
}

.textUp-enter,
.textUp-leave-to {
  transform-origin: bottom;
  transform: scaleY(0);
  opacity: 0;
}

.theme--dark.v-list-item:hover::before {
  opacity: 0;
}
.theme--light.v-list-item:hover::before{
  opacity: 0;
}
.theme--light.v-sheet.v-list{
  background-color:rgba(0, 0,0,0)
}
.theme--dark.v-sheet.v-list{
  background-color:rgba(0, 0,0,0)
}
</style>

<style>
:root {
  --main-color: rgba(255, 255, 255, 0.384);
  --main-black: rgba(0, 0, 0, 0.384);
  --color: rgb(255, 255, 255);
}

.blackBor {
  border: 1px solid var(--main-black);
  transition:all 1s ease;
 
}

.whiteBor {
  border: 1px solid var(--main-color);
}

.blackBorRight {
  border-right: 1px solid var(--main-black);
}

.whiteBorRight {
  border-right: 1px solid var(--main-color);
}

.blackBot {
  border-bottom: 1px solid var(--main-black)
}

.whiteBot {
  border-bottom: 1px solid var(--main-color);
}

.textColBl {
  color: black;
}

.textColWh {
  color: var(--color);
}

.transY-enter-active,
.transY-leave-active {
  transition: all 1.5s cubic-bezier(0.2, 0, 0.3, 1);
}
.transY-enter,
.transY-leave-to {
  height: 0px;
}
</style>