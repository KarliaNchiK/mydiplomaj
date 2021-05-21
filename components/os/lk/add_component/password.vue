<template>
  <structure :title="data.title">
    <template v-slot:middle>
      <div>Последние изменения: {{ computedDateFormattedMomentjs }}</div>
    </template>
    <template v-slot:action>
      <v-dialog v-model="dialog" persistent :max-width="1100">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>create</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline pl-3 pt-4">Пароль</span>
          </v-card-title>
          <v-card-text>
            <v-container class="mb-n8">
              <v-row no-gutters class="d-flex align-center">
                <v-col cols="3">{{ label[0] }}</v-col>
                <v-col cols="7">
                  <v-text-field
                    :error-messages="nameErrorsLast"
                    @input="
                      $v.lastPass.$touch();
                      er = false;
                    "
                    @blur="$v.lastPass.$touch()"
                    dense
                    outlined
                    class="rounded-xl"
                    background-color="grey lighten-2"
                    v-model="lastPass"
                    :append-icon="show0 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show0 ? 'text' : 'password'"
                    @click:append="show0 = !show0"
                  ></v-text-field>
                </v-col>
                <v-col cols="2">
                  <v-spacer></v-spacer>
                </v-col>
              </v-row>
              <v-row no-gutters class="d-flex align-center">
                <v-col cols="3">{{ label[1] }}</v-col>
                <v-col cols="7">
                  <v-text-field
                    :error-messages="nameErrorsNew"
                    @input="$v.newPass.$touch()"
                    @blur="$v.newPass.$touch()"
                    dense
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show1 ? 'text' : 'password'"
                    @click:append="show1 = !show1"
                    outlined
                    class="rounded-xl my-6"
                    background-color="grey lighten-2"
                    v-model="newPass"
                  ></v-text-field>
                </v-col>
                <v-col cols="2">
                  <v-spacer></v-spacer>
                </v-col>
              </v-row>
              <v-row no-gutters class="d-flex align-center">
                <v-col cols="3">{{ label[2] }}</v-col>
                <v-col cols="7">
                  <v-text-field
                    :error-messages="nameErrorsRepeat"
                    @input="$v.repPass.$touch()"
                    @blur="$v.repPass.$touch()"
                    dense
                    :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show2 ? 'text' : 'password'"
                    @click:append="show2 = !show2"
                    outlined
                    class="rounded-xl"
                    background-color="grey lighten-2"
                    v-model="repPass"
                  ></v-text-field>
                </v-col>
                <v-col cols="2">
                  <v-spacer></v-spacer>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions class="pb-5 pr-16 pt-5">
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="exit()" class="mr-8"
              ><p class="black--text pt-4 text-capitalize">Отмена</p></v-btn
            >
            <v-btn
              color="#5B98F1"
              outlined
              class="rounded-xl px-8"
              @click="save()"
              ><p class="black--text pt-4 text-capitalize">
                Изменить пароль
              </p></v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
  </structure>
</template>

<script>
import moment from "moment";
import { parseISO } from "date-fns";
import structure from "../../Additional_component/structure";
import { required, sameAs, minLength } from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";
export default {
  mixins: [validationMixin],
  props: ["data"],
  components: {
    structure,
  },
  data: () => ({
    dialog: false,
    label: ["Старый пароль", "Новый пароль", "Повторите пароль"],
    show0: false,
    show1: false,
    show2: false,
    lastPass: "",
    newPass: "",
    repPass: "",
    er: false,
    hack: false,
  }),
  computed: {
    computedDateFormattedMomentjs() {
      moment.locale("ru");
      return parseISO(this.$store.getters["localStorage/datePassword"])
        ? moment(
            parseISO(this.$store.getters["localStorage/datePassword"])
          ).format("LL")
        : "";
    },
    nameErrorsLast() {
      const errors = [];
      if (!this.$v.lastPass.$dirty) return errors;
      !this.$v.lastPass.required &&
        errors.push("Обязательно введите старый пароль");
      this.er && errors.push("Неверный пароль");
      this.hack && errors.push("Обнаружена попытка взлома");
      return errors;
    },
    nameErrorsNew() {
      const errors = [];
      if (!this.$v.newPass.$dirty) return errors;
      !this.$v.newPass.minLength &&
        errors.push("Минимальная длинна пароля 6 символов");
      !this.$v.newPass.required && errors.push("Новый пароль обязателен");
      this.hack && errors.push("Обнаружена попытка взлома");
      return errors;
    },
    nameErrorsRepeat() {
      const errors = [];
      if (!this.$v.repPass.$dirty) return errors;
      !this.$v.repPass.sameAsPassword && errors.push("Пароли не совпадают");
      this.hack && errors.push("Обнаружена попытка взлома");
      return errors;
    },
  },
  validations: {
    lastPass: {
      required,
    },
    newPass: {
      required,
      minLength: minLength(6),
    },
    repPass: {
      sameAsPassword: sameAs("newPass"),
    },
  },
  methods: {
    async save() {
      this.$v.$touch();
      let value = {
        oPass: this.lastPass,
        nPass: this.newPass,
        date: new Date().toISOString().substr(0, 10),
      };
      await this.$axios
        .post("/switchPassword", value)
        .then((result) => {
          if (result.data === true) {
            this.dialog = false;
            this.lastPass = "";
            this.newPass = "";
            this.repPass = "";
            this.$v.$reset()
          } else {
            this.er = true;
          }
          if (result.data.messege == "Ошибка безопасности") {
            this.hack = true;
          }
        })
        .catch((result) => {
          console.log(result);
        });
    },
    exit() {
      this.dialog = false;
    },
  },
};
</script>