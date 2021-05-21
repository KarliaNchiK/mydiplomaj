<template>
  <v-dialog v-model="dialog" scrollable max-width="800px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        elevation="0"
        v-bind="attrs"
        v-on="on"
        class="mt-2 text-lowercase white--text"
        color="cardcolor"
        rounded
        ><v-icon>mdi-plus</v-icon>Добавить</v-btn
      >
    </template>
    <v-card>
      <v-card-title>Найти сотрудника</v-card-title>
      <v-divider></v-divider>
      <v-card-text style="height: 600px" class="px-10">
        <v-text-field
          outlined
          color="blue lighten-1"
          rounded
          class="mt-5"
          label="Введите логин"
          dense
          v-model="friend"
          hide-details
        ></v-text-field>
        <v-list two-line v-if="arrayfriend.length != 0">
          <transition-group name="list" mode="out-in">
            <v-list-item v-for="(friend,n) in arrayfriend" :key="friend.userLogin">
              <v-list-item-avatar>
                <my-avatar :size="40" :value="friend.avatar" :link="friend.userLogin" />
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title v-text="fio(friend.fio)"></v-list-item-title>

                <v-list-item-subtitle
                  v-text="about(friend.about)"
                ></v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-btn icon>
                  <v-icon color="grey lighten-1" @click="plus(friend.idUser, n)"
                    >mdi-plus</v-icon
                  >
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </transition-group>
        </v-list>
        <v-row no-gutters v-else>
          <v-col cols="12" class="d-flex justify-center pt-14 text-h5">
            Новые пользователи на подходе
          </v-col>
          <v-col cols="12" class="d-flex justify-center pt-14 text-h5">
            Нужно немного подождать
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-snackbar
      timeout="3000"
      top
      v-model="snac"
      :color="color"
      class="white--text"
      >{{ messege }}
      <v-icon class="pl-16" :color="colorIcon" size="30">{{
        icon
      }}</v-icon></v-snackbar
    >
  </v-dialog>
</template>


<script>
import { debounce } from "vue-debounce";
export default {
  data: () => ({
    friends: [],
    dialog: false,
    friend: "",
    messege: "",
    snac: false,
    color: "",
    colorIcon: "",
    icon: "",
    arrayfriend: [],
  }),
  watch: {
    friend: {
      handler: debounce(async function () {
        if (this.friend == "") {
          this.loadRand();
        } else {
          this.$axios.get("/myfriend/" + this.friend).then((result) => {
            this.friends = result.data;
          });
        }
      }, 1000),
    },
    friends() {
      this.arrayfriend = JSON.parse(
        JSON.stringify(
          this.friends.filter((f) => f.idUser != this.$cookies.get("idUser"))
        )
      );
    },
  },
  created() {
    this.loadRand();
  },
  methods: {
    async loadRand() {
      await this.$axios.get("/randfriend").then((result) => {
        this.friends = result.data;
      });
    },
    fio(value) {
      if (value == "" || value == null) {
        return "Неопознанный персонаж";
      }
      let a = value.split(" ");
      return a[0] + " " + a[1];
    },
    about(value) {
      if (value == "" || value == null) {
        return "Он хранит свои секреты";
      }
      return value;
    },
    plus(value, n) {
      this.$axios.post("/addfriend", { id: value }).then((result) => {
        if (result) {
          this.messege = "Запрос успешно отправлен";
          this.snac = true;
          this.icon = "mdi-check";
          this.color = "green";
          this.colorIcon = "blue lighten-3";
          this.$store.dispatch("friend/getWaitfriend");
          this.arrayfriend.splice(n,1)
        } else {
          this.messege = "Ошибка сервера";
          this.snac = true;
          this.icon = "mdi-close";
          this.color = "red darken-1";
          this.colorIcon = "blue";
        }
      });
    },
  },
};
</script>

<style scoped>
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active до версии 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
</style>