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
    <v-dialog v-model="dialog" max-width="1000">
      <v-card class="mx-auto">
        <v-window v-model="step">
          <v-window-item :value="1">
            <v-card-text class="pa-4">
              <v-row no-gutters>
                <v-col
                  class="py-4"
                  v-for="(item, i) in items"
                  :key="i"
                  cols="12"
                >
                  <v-card :color="item.color" dark @click="firstStep(i)">
                    <div class="d-flex flex-no-wrap justify-space-between">
                      <div>
                        <v-card-title
                          class="text-h5"
                          v-text="item.title"
                        ></v-card-title>

                        <v-card-subtitle
                          v-text="item.subtitle"
                        ></v-card-subtitle>

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
            </v-card-text>
          </v-window-item>

          <v-window-item :value="2">
            <v-card-text class="pa-4">
              <v-card dark color="#385F73" class="pa-4" flat>
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
              <v-card class="pt-5" width="100%" tile flat>
                <v-row no-gutters>
                  <v-col
                    ccols="12"
                    class="d-flex align-center justify-center py-5"
                  >
                    <label for="croppie"
                      ><v-card-title dark class="text-h5 d-flex pb-4">
                        Добавьте превью вашего проекта
                        <v-icon size="40" class="pl-3" v-if="show1"
                          >add_photo_alternate</v-icon
                        >
                      </v-card-title></label
                    >
                  </v-col>
                  <v-col
                    cols="12"
                    class="d-flex align-center justify-center py-5"
                    ><label for="croppie" v-if="!show1">
                      <v-icon size="100">add_photo_alternate</v-icon>
                    </label>
                    <v-file-input
                      @change="croppie"
                      id="croppie"
                      style="display: none"
                      accept="image/*"
                    ></v-file-input>
                    <vue-croppie
                      v-if="show1"
                      ref="croppieRef"
                      :enableOrientation="true"
                      :mouseWheelZoom="true"
                      :enableResize="false"
                      :boundary="{ width: 300, height: 510 }"
                      :viewport="{ width: 200, height: 340, type: 'square' }"
                    ></vue-croppie>
                  </v-col>
                  <v-col
                    cols="12"
                    class="d-flex align-center justify-center py-2"
                    v-if="show1"
                  >
                    <v-btn color="red" @click="show1 = false">Удалить</v-btn>
                  </v-col>
                  <v-col cols="12" class="d-flex align-center justify-end"
                    ><v-btn color="primary" @click="step--">Назад</v-btn
                    ><v-btn color="primary" class="mx-5" @click="secondStep()"
                      >Далее</v-btn
                    ></v-col
                  >
                </v-row>
              </v-card>
            </v-card-text>
          </v-window-item>

          <v-window-item :value="3">
            <v-card tile flat class="pa-4">
              <v-text-field
                outlined
                color="blue lighten-1"
                class="my-5"
                label="Введите Имя"
                dense
                v-model="friend"
                hide-details
              ></v-text-field>
              <v-list two-line>
                <v-subheader v-if="myFriend.length != 0"
                  >Добавить людей в проект</v-subheader
                >
                <v-list-item
                  v-for="(friend, n) in filterMyfriend(friend)"
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
                    <v-list-item-title
                      v-text="fio(friend.fio)"
                    ></v-list-item-title>

                    <v-list-item-subtitle
                      v-text="about(friend.about)"
                    ></v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-btn icon>
                      <v-icon
                        color="grey lighten-1"
                        @click="plus(friend.idLogin, n)"
                        >mdi-plus</v-icon
                      >
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>
              </v-list>
              <v-row no-gutters>
                <v-col cols="12" class="d-flex align-center justify-end"
                  ><v-btn color="primary" @click="step--">Назад</v-btn
                  ><v-btn color="primary" class="mx-5" @click="step++"
                    >Далее</v-btn
                  ></v-col
                ></v-row
              ></v-card
            >
          </v-window-item>

          <v-window-item :value="4">
            <div class="pa-4 text-center">
              <v-img
                class="mb-4"
                contain
                height="200"
                src="https://avatars.mds.yandex.net/get-zen_doc/1209363/pub_5b92d4d336233e00ad876ee8_5b92e076343d6c00a9f52922/scale_1200"
              ></v-img>
              <h3 class="title font-weight-light mb-2">Добро пожаловать</h3>
              <span class="caption grey--text"
                >Да начнётся интересный путь!</span
              >
              <v-row no-gutters class="py-5">
                <v-col cols="12" class="d-flex align-center justify-center"
                  ><v-btn color="primary" @click="step--">Назад</v-btn
                  ><v-btn color="green" class="ml-5 white--text" @click="save()"
                    >Начать</v-btn
                  ></v-col
                >
              </v-row>
            </div>
          </v-window-item>
        </v-window>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { ca } from "date-fns/locale";
import { validationMixin } from "vuelidate";
import { required, maxLength } from "vuelidate/lib/validators";
export default {
  mixins: [validationMixin],

  validations: {
    name: { required, maxLength: maxLength(20) },
  },
  data: () => ({
    inProject: [],
    name: "",
    path: "",
    dialog: false,
    step: 1,
    e: null,
    show1: false,
    friend: "",
    info: {
      e6: 0,
    },
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
    myFriend: [],
  }),
  created() {
    this.myFriend = JSON.parse(
      JSON.stringify(this.$store.getters["friend/myfriend"])
    );
  },
  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.maxLength &&
        errors.push("Имя не должно превышать 20 символов");
      !this.$v.name.required && errors.push("Название обязательно");
      return errors;
    },
  },
  watch: {
    myFriend() {
      if (this.myFriend.length == 0) {
        this.step++;
      }
    },
  },
  methods: {
    plus(value, n) {
      this.inProject.push(value);
      this.myFriend.splice(n, 1);
    },
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
    firstStep(value) {
      this.step++;
      this.info.e6 = (value + 1) % 2;
    },
    async secondStep() {
      if (this.$v.name.$dirty && this.$v.name.required) {
        if (this.show1 == true) {
          await this.forms().then((result) => {
            this.e = result;
          });
          var files = this.e;
          let formData = new FormData();
          formData.append("file", files);
          try {
            await this.$axios
              .post("/api/projects/" + this.name, formData)
              .then((response) => {
                this.path = response.data.path;
              });
          } catch (err) {
            console.log(err);
          }
        }
        this.step++;
      } else {
        this.$v.$touch();
      }
    },
    startProject(value) {
      if (this.$v.name.$dirty && this.$v.name.required) {
        this.$store.commit("left_block/set_e6", (value + 1) % 2);
        this.$router.push("/project");
      } else {
        this.$v.$touch();
      }
    },
    croppie(e) {
      this.show1 = true;
      var reader = new FileReader();
      reader.onload = (e) => {
        this.$refs.croppieRef.bind({
          url: e.target.result,
        });
      };
      try {
        reader.readAsDataURL(e);
      } catch {
        this.dialog = false;
      }
    },
    async urltoFile(url, filename, mimeType) {
      return fetch(url)
        .then(function (res) {
          return res.arrayBuffer();
        })
        .then(function (buf) {
          return new File([buf], filename, { type: mimeType });
        });
    },

    async forms() {
      let options = {
        size: { width: 200, height: 340 },
        format: "jpeg",
      };
      return new Promise((resolve, reject) => {
        this.$refs.croppieRef.result(options, (output) => {
          this.urltoFile(output, "page.jpeg", "image/jpeg").then(function (
            file
          ) {
            resolve(file);
          });
        });
      });
    },
    async save() {
      if (this.path == "") {
        this.path = "\\default\\1.jpeg";
      }
      let value = {
        stage: this.info.e6,
        nameProject: this.name,
        people: this.inProject,
        avatar: this.path,
      };
      this.inProject.push(this.$cookies.get("idUser"));
      await this.$axios.post("/api/newProject", value);
      await this.$store.dispatch("project/getmyProject");
      this.dialog = false;
    },
  },
};
</script>

<style scoped>
.v-text-field__details {
  display: block;
}
</style>