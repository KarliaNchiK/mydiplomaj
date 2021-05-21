<template>
  <div>
    <v-dialog v-model="dialog" max-width="800px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn text dense class="text-capitalize mr-4" v-bind="attrs" v-on="on"
          >Войти</v-btn
        >
      </template>
      <v-card>
        <v-card-title>Вход</v-card-title>
        <v-card-text>
          <v-row no-gutters align="center" justify="center">
            <v-col cols="12"
              ><v-text-field
                outlined
                color="blue darken-1"
                rounded
                class="text-h5"
                placeholder="Логин"
                v-model="login"
              ></v-text-field
            ></v-col>
            <v-col cols="12"
              ><v-text-field
                color="blue darken-1"
                outlined
                rounded
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show ? 'text' : 'password'"
                @click:append="show = !show"
                class="text-h5"
                placeholder="Пароль"
                v-model="password"
              ></v-text-field
            ></v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="insys()" text>Войти</v-btn>
        </v-card-actions>
      </v-card>
      <v-snackbar v-model="snac" :timeout="3000" top color="error">{{
        text
      }}</v-snackbar>
    </v-dialog>
  </div>
</template>

<script>
export default {

  data: () => ({
    dialog: false,
    login: "",
    password: "",
    show: false,
    text: "",
    snac: false,
  }),

  
  methods: {
    async insys() {
      await this.$axios
        .get("/Login/" + this.login + "/" + this.password)
        .then(async (result) => {
          if (result.data.state == 0) {
            this.text = "Просим прощения, ошибка сервера";
          } else if (result.data.state == 1) {
            this.$store.commit("user/set_token", true);
            this.$store.commit(
              "localStorage/set_datePassword",
              result.data.date
            );
            this.dialog = false;
          } else if (result.data.state == 2) {
            this.text = "Неверный пароль";
            this.snac = true;
          } else {
            this.text = "Такого пользователя несуществует";
            this.snac = true;
          }
        });
      if (this.text == "") {
        await this.$store.dispatch("user/getDataUser");
      }
    },
  },
};
</script>