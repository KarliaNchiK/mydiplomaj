<template>
  <div class="pt-3">
    <v-card
      color="grey lighten-1"
      flat
      class="ma-4"
      height="170"
      width="100"
      @click.stop="dialog = true"
    >
      <v-row class="fill-height" align="center" justify="center">
        <v-scale-transition>
          <v-icon color="white" size="48" v-text="'mdi-plus'"></v-icon>
        </v-scale-transition>
      </v-row>
    </v-card>
    <v-dialog v-model="dialog" :max-width="getWidth * 0.35">
      <v-card class="mx-auto" color="backgr">
        <v-container>
          <v-row dense>
            <v-col cols="12">
              <v-card dark color="#385F73" class="pb-4">
                <v-card-title dark class="text-h5 d-flex pb-4">
                  Дайте название своему проекту
                </v-card-title>
                <v-text-field
                  @input="$v.name.$touch()"
                  @blur="$v.name.$touch()"
                  :error-messages="nameErrors"
                  label="Введите название проекта"
                  required
                  counter="20"
                  v-model="name"
                  class="mx-4 text-h5"
                  outlined
                  clearable
                ></v-text-field>
              </v-card>
            </v-col>

            <v-col v-for="(item, i) in items" :key="i" cols="12">
              <v-card :color="item.color" dark @click="startProject(i)">
                <div class="d-flex flex-no-wrap justify-space-between">
                  <div>
                    <v-card-title
                      class="text-h5"
                      v-text="item.title"
                    ></v-card-title>

                    <v-card-subtitle v-text="item.subtitle"></v-card-subtitle>

                    <v-card-actions>
                      <v-btn class="ml-2 mt-5" outlined rounded small>
                        Вперед
                      </v-btn>
                    </v-card-actions>
                  </div>

                  <v-avatar class="ma-3" size="125" tile>
                    <v-img :src="item.src"></v-img>
                  </v-avatar>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, maxLength} from "vuelidate/lib/validators";
export default {
  mixins: [validationMixin],

  validations: {
    name: { required, maxLength: maxLength(20) },
  },
  data: () => ({
    name: "",
    dialog: false,
    items: [
      {
        color: "#1F7087",
        src:
          "https://image.freepik.com/free-photo/bulb-light-idea_207634-502.jpg",
        title: "У меня есть идея",
        subtitle: "Готов начать свой путь",
      },
      {
        color: "#952175",
        src: "https://www.imagetext.ru/pics_max/images_13444.jpg",
        title: "Я ищу свою идею",
        subtitle: "Буду изучать новое и становится лучше",
      },
    ],
  }),
  computed: {
    getWidth() {
      if (process.client) {
        return document.documentElement.clientWidth;
      }
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.maxLength &&
        errors.push("Имя не должно превышать 20 символов");
      !this.$v.name.required && errors.push("Название обязательно");
      return errors;
    },
  },
  methods: {
    startProject(value) {
      if (this.$v.name.$dirty && this.$v.name.required) {
        this.$store.commit("left_block/set_e6", (value+1)%2);
        this.$router.push("/project");
      } else {
        this.$v.$touch();
      }
    },
  },
};
</script>

<style scoped>
.v-text-field__details {
  display: block;
}
</style>