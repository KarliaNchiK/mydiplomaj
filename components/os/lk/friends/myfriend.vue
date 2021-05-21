<template>
  <v-dialog v-model="dialog" scrollable max-width="800px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-on="on" v-bind="attrs" text class="mt-n2 mb-2 text-capitalize">
        Список всех друзей
      </v-btn>
    </template>
    <v-card>
      <v-card-title>Люди готовые к сотрудничеству</v-card-title>
      <v-divider></v-divider>
      <v-card-text style="height: 600px" class="px-10">
        <v-text-field
          outlined
          color="blue lighten-1"
          rounded
          class="mt-5"
          label="Введите Имя"
          dense
          v-model="friend"
          hide-details
        ></v-text-field>
        <v-list two-line>
          <v-subheader v-if="myFriend.length != 0"
            >Подтвердившие сотрудничество</v-subheader
          >
          <v-list-item
            v-for="friend in filterMyfriend(friend)"
            :key="friend.fio"
          >
            <v-list-item-avatar>
              <my-avatar
                :size="40"
                :value="friend.avatar"
                :link="friend.userLogin"
              />
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-text="fio(friend.fio)"></v-list-item-title>

              <v-list-item-subtitle
                v-text="about(friend.about)"
              ></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list two-line>
          <v-subheader v-if="waitFriend.length != 0"
            >Ожидание подтверждения</v-subheader
          >
          <v-list-item
            v-for="friend in filterWaitFriend(friend)"
            :key="friend.fio"
          >
            <v-list-item-avatar>
              <my-avatar
                :size="40"
                :value="friend.avatar"
                :link="friend.userLogin"
              />
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-text="fio(friend.fio)"></v-list-item-title>

              <v-list-item-subtitle
                v-text="about(friend.about)"
              ></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>


<script>
import { debounce } from "vue-debounce";
export default {
  data: () => ({
    dialog: false,
    friend: "",
  }),
  computed: {
    myFriend() {
      return JSON.parse(JSON.stringify(this.$store.getters["friend/myfriend"]));
    },
    waitFriend() {
      return JSON.parse(
        JSON.stringify(this.$store.getters["friend/waitfriend"])
      );
    },
  },
  methods: {
    filterMyfriend(query) {
      if (this.myFriend.length != 0) {
        return this.myFriend.filter(function (el) {
          if (el.fio == null || el.fio == "") {
            el.fio = "Неопознанный персонаж";
          }
          return el.fio.toLowerCase().indexOf(query.toLowerCase()) > -1;
        });
      }
      return [];
    },
    filterWaitFriend(query) {
      if (this.waitFriend.length != 0) {
        return this.waitFriend.filter(function (el) {
          if (el.fio == null || el.fio == "") {
            el.fio = "Неопознанный персонаж";
          }
          return el.fio.toLowerCase().indexOf(query.toLowerCase()) > -1;
        });
      }
      return [];
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
  },
};
</script>