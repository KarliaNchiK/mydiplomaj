<template>
  <v-dialog v-model="dialog" width="500" scrollable>
    <template v-slot:activator="{ on, attrs }">
      <v-badge :content="requiest.length" bordered overlap>
        <v-icon
          class="ml-3"
          v-bind="attrs"
          v-on="on"
          size="30"
          color="grey darken-1"
          >{{ icon }}</v-icon
        >
      </v-badge>
    </template>

    <v-card>
      <v-card-title class="headline grey lighten-2">
        Заявки на сотрудничество
      </v-card-title>

      <v-card-text style="max-height: 500px">
        <v-list two-line>
          <v-list-item v-for="(friend, n) in requiest" :key="friend.fio">
            <v-list-item-avatar>
              <my-avatar :size="40" :value="friend.avatar"/>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-text="fio(friend.fio)"></v-list-item-title>

              <v-list-item-subtitle
                v-text="about(friend.about)"
              ></v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action class="d-inline-block">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn v-bind="attrs" v-on="on" icon class="mr-4">
                    <v-icon
                      size="32"
                      color="blue darken-1"
                      @click="plus(friend.idUser, 1, n)"
                      >mdi-plus</v-icon
                    >
                  </v-btn>
                </template>
                <span>Добавить</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn v-bind="attrs" v-on="on" icon>
                    <v-icon
                      size="32"
                      color="red darken-1"
                      @click="plus(friend.idUser, -1, n)"
                      >mdi-close</v-icon
                    >
                  </v-btn>
                </template>
                <span>Отклонить</span>
              </v-tooltip>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="dialog = false"> Закрыть </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["icon"],
  data: () => ({
    dialog: false,
    requiest: [],
  }),
  methods: {
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
    async plus(id, end, n) {
      await this.$axios.put("/endrequest", { end: end, id: id }).then(() => {
        this.$store.dispatch("friend/getMyfriend");
      });
      this.requiest.splice(n, 1);
    },
  },
};
</script>