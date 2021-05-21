<template>
  <div>
    <v-dialog v-model="dialog" max-width="800px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn text dense class="text-capitalize mr-4" v-bind="attrs" v-on="on"
          >Регистрация</v-btn
        >
      </template>
      <v-card>
        <v-card-title class="pb-8 text-h5">Регистрация</v-card-title>
        <v-card-text>
          <v-row no-gutters align="center" justify="center">
            <v-col cols="12"
              ><v-text-field
                outlined
                color="blue darken-1"
                rounded
                class="text-h5"
                placeholder="Номер телефона/Email"
                v-model="contact"
                :error-messages="nameErrorsContact"
                @input="$v.contact.$touch()"
                @blur="$v.contact.$touch()"
              ></v-text-field
            ></v-col>
            <v-col cols="12"
              ><v-text-field
                outlined
                color="blue darken-1"
                rounded
                class="text-h5"
                placeholder="Логин"
                v-model="login"
                :error-messages="nameErrorsLogin"
                @input="$v.login.$touch()"
                @blur="$v.login.$touch()"
              ></v-text-field
            ></v-col>
            <v-col cols="12"
              ><v-text-field
                @input="$v.password.$touch()"
                @blur="$v.password.$touch()"
                :error-messages="nameErrorsPass"
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
            <v-col cols="12">
              <v-text-field
                @input="$v.copypass.$touch()"
                @blur="$v.copypass.$touch()"
                :error-messages="nameErrorsRep"
                outlined
                rounded
                color="blue darken-1"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                @click:append="show1 = !show1"
                class="text-h5"
                placeholder="Повторите пароль"
                v-model="copypass"
              ></v-text-field
            ></v-col>
            <v-col cols="12">
              <v-radio-group v-model="typeUser" row>
                <v-radio label="Соискатель" value="user"></v-radio>
                <v-radio label="Компания" value="company"></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="save()" outlined color="blue lighten-2" class="mb-4">
            <div class="grey--text text--darken-3 text-capitalize">Регистрация</div></v-btn
          >
        </v-card-actions>
      </v-card>
      <v-snackbar
        v-model="snackbar"
        :timeout="3000"
        top
        color="blue lighten-1"
        vertical
        class="mt-16"
        >{{ result }}
        <template v-slot:action="{ attrs }">
          <v-btn
            color="purple darken-1"
            text
            v-bind="attrs"
            @click="snackbar = false"
          >
            Закрыть
          </v-btn>
        </template>
      </v-snackbar>
    </v-dialog>
    <v-snackbar
      v-model="snackbar"
      :timeout="3000"
      top
      color="blue lighten-1"
      vertical
      class="mt-16"
      >{{ result }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="purple darken-1"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Закрыть
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import { required, sameAs, minLength } from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";
import { debounce } from "vue-debounce";
export default {
  mixins: [validationMixin],
  data: () => ({
    typeUser: "user",
    dialog: false,
    contact: "",
    login: "",
    password: "",
    copypass: "",
    result: "",
    snackbar: false,
    show: false,
    show1: false,
    loginReserve: false,
  }),
  watch: {
    login: {
      handler: debounce(async function () {
        if (this.dialog == true) {
          await this.$axios.get("/chekLogin/" + this.login).then((result) => {
            this.loginReserve = result.data;
          });
        }
      }, 1000),
    },
    dialog() {
      this.contact = "";
      this.login = "";
      this.password = "";
      this.copypass = "";
    },
  },
  computed: {
    computedDateFormattedMomentjs() {
      return new Date().toISOString().substr(0, 10);
    },
    nameErrorsContact() {
      const errors = [];
      if (!this.$v.contact.$dirty) return errors;
      !this.$v.contact.required &&
        errors.push("Необходимо ввести данные для восстановления пароля");
      return errors;
    },
    nameErrorsLogin() {
      const errors = [];
      if (!this.$v.login.$dirty) return errors;
      !this.$v.login.required && errors.push("Необходимо ввести Логин");
      this.loginReserve && errors.push("Логин занят");
      return errors;
    },
    nameErrorsPass() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.minLength &&
        errors.push("Минимальная длинна пароля 6 символов");
      !this.$v.password.required && errors.push("Новый пароль обязателен");
      return errors;
    },
    nameErrorsRep() {
      const errors = [];
      if (!this.$v.copypass.$dirty) return errors;
      !this.$v.copypass.sameAsPassword && errors.push("Пароли не совпадают");
      return errors;
    },
    chek() {
      if (
        this.nameErrorsContact.length == 0 &&
        this.nameErrorsLogin.length == 0 &&
        this.nameErrorsPass.length == 0 &&
        this.nameErrorsRep.length == 0
      ) {
        return true;
      }
      return false;
    },
  },
  validations: {
    contact: {
      required,
    },
    login: {
      required,
    },
    password: {
      required,
      minLength: minLength(6),
    },
    copypass: {
      sameAsPassword: sameAs("password"),
    },
  },
  methods: {
    async save() {
      this.$v.$touch();
      if (this.chek) {
        let value = {
          contact: this.contact,
          login: this.login,
          password: this.password,
          date: this.computedDateFormattedMomentjs,
        };

        let id = "";
        await this.$axios.post("/regis", value).then((result) => {
          if (result.data.require != false) {
            id = result.data.require;
          } else {
            this.result = "Возникла какая то ошибка";
            this.snackbar = true;
          }
        });
        if (id != "") {
          await this.$axios.post("/regisDat", { login: id }).then((result) => {
            if (result.data.require == true) {
              this.dialog = false;
              this.result = "Вы успешно зарегистрировались!";
              this.snackbar = true;
            } else {
              this.result = "Возникла какая то ошибка";
              this.snackbar = true;
            }
          });
        }
      }
    },
  },
};
</script>