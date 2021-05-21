<template>
  <v-container fluid class="offall pt-1">
    <v-row no-gutters>
      <v-col
        lg="2"
        md="1"
        class="d-none d-md-flex"
        style="transition: 0.5s all"
      >
        <v-spacer></v-spacer>
      </v-col>
      <v-col cols="12" lg="8" md="10" sm="12" style="transition: 0.5s all">
        <v-row no-gutters class="mt-16 pb-6">
          <v-col xl="6" cols="12" class="pr-xl-3">
            <card-lk :data="cardOne" />
          </v-col>
          <v-col xl="3" cols="12" class="pl-xl-3 my-6 my-xl-0"
            ><card-lk :data="cardTwo"> </card-lk>
          </v-col>
          <v-col xl="3" cols="12" class="pl-xl-6"
            ><card-lk :data="cardFriends"> </card-lk>
          </v-col>
        </v-row>
        <v-row class="ma-0">
          <v-col>
            <card-lk :data="cardThree"> </card-lk>
          </v-col>
        </v-row>
      </v-col>
      <v-col
        lg="2"
        md="1"
        class="d-none d-md-flex"
        style="transition: 0.5s all"
      >
        <v-spacer></v-spacer
      ></v-col>
    </v-row>
  </v-container>
</template>

<script>
import cardLk from "./card_lk";
export default {
  components: {
    cardLk,
  },
  data: () => ({
    cardFriends: {
      title: "Друзья",
      icon: "mdi-account-multiple",
      tooltip: "Данные о тех, кто хочет с вами сотрудничать",
      component: "allfriend",
    },
    cardOne: {
      title: "Профиль",
      icon: "account_circle",
      tooltip: "Информация о вашем профиле",
      component: "first",
    },
    cardTwo: {
      title: "Контакты",
      icon: "mdi-phone",
      tooltip: "Информация о том как с вами связаться",
      component: "contact",
    },
    cardThree: {
      title: "Проекты",
      icon: "mdi-book-multiple",
      tooltip: "Ваши проекты",
      component: "projects",
    },
  }),
  computed: {
    height_window() {
      if (process.client) {
        return document.documentElement.clientHeight;
      }
    },
  },
};
</script>