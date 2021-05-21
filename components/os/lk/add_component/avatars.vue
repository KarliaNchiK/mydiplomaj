<template>
  <v-menu v-model="showMenu" absolute offset-y>
    <template v-slot:activator="{ on, attrs }">
      <v-avatar size="120" v-on="on" v-bind="attrs">
        <my-avatar
          @click="dialog = true"
          :size="120"
          :value="avatar"
          :push="true"
        />
      </v-avatar>
    </template>
    <v-dialog v-model="dialog" width="900">
      <template v-slot:activator="{ on, attrs }">
        <v-btn depressed v-bind="attrs" v-on="on" class="text-capitalize"
          >Редактировать</v-btn
        >
      </template>
      <form @submit.prevent="save()" enctype="multipart/form-data">
        <v-card class="offall tile pa-4">
          <v-card-title class="headline mb-6"
            >Выбор фотографии профиля</v-card-title
          >
          <v-row no-gutters>
            <v-col
              cols="12"
              class="d-flex justify-space-around"
              v-if="show == false && show1 == false"
            >
              <v-btn text color="blue darken-1" @click="cl()"
                >Загрузка гиф анимации</v-btn
              >
              <v-btn text color="blue darken-1" @click="cl2()"
                >Кроп изображения</v-btn
              >
            </v-col>
            <v-col
              cols="12"
              v-if="show == false && show1 == false"
              class="my-5 d-flex justify-space-around"
            >
              <label for="ava">
                <v-icon size="100">add_photo_alternate</v-icon>
              </label>
              <label for="croppie">
                <v-icon size="100">add_photo_alternate</v-icon>
              </label>
              <v-file-input
                @change="onFileChange"
                id="ava"
                style="display: none"
                accept="image/*"
              ></v-file-input>
              <v-file-input
                @change="croppie"
                id="croppie"
                style="display: none"
                accept="image/*"
              ></v-file-input>
            </v-col>
            <v-col class="my-5" cols="12" v-show="show" align="center"
              ><img :src="image" height="200" />
            </v-col>
            <vue-croppie
              v-if="show1"
              ref="croppieRef"
              :enableOrientation="true"
              :boundary="{ width: 450, height: 450 }"
              :viewport="{ width: 400, height: 400, type: 'square' }"
            ></vue-croppie>
            <v-col
              v-if="show == false && show1 == false"
              cols="12"
              align="center"
              class="my-5"
            >
              Загрузите файл с компьютера
            </v-col>
          </v-row>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="text-capitalize my-7" text @click="dialog = false"
              >Отмена</v-btn
            >
            <v-btn
              class="rounded-xl text-capitalize my-7 mr-7"
              color="blue lighten-1"
              outlined
              @click="save()"
              >Установить как фото профиля</v-btn
            >
          </v-card-actions>
        </v-card>
      </form>
    </v-dialog>
  </v-menu>
</template>

<script>
export default {
  props: ["user"],
  data: () => ({
    show: false,
    show1: false,
    showMenu: false,
    dialog: false,
    image: "",
    e: null,
    path: null,
  }),
  watch: {
    dialog() {
      if (this.dialog == false) {
        this.showMenu = false;
        this.image = "";
        this.show = false;
        this.show1 = false;
      }
    },
  },
  computed: {
    avatar() {
      return this.$auth.$state.user.avatar;
    },
  },
  methods: {
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
        size: { width: 500, height: 500 },
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
      if (this.show1 == true) {
        await this.forms().then((result) => {
          this.e = result;
        });
      }
      var files = this.e;
      let formData = new FormData();
      formData.append("file", files);
      try {
        await this.$axios
          .post("/Lk/ava/" + this.$cookies.get("login"), formData)
          .then((response) => {
            this.path = response.data.path;
          });
        let a = !!this.avatar ? this.avatar.replace("uploads\\", "") : "";
        var data = {
          avatar: this.path,
          oldavatar: a,
        };
        await this.$axios.put("/avatar", data);
        let val = JSON.parse(JSON.stringify(this.$auth.$state.user));
        val.avatar = this.path;
        this.$auth.$storage.setState("user", val);
        this.dialog = false;
      } catch (err) {
        console.log(err);
      }
    },
    cl() {
      if (process.client) {
        document.getElementById("ava").click();
      }
    },
    cl2() {
      if (process.client) {
        document.getElementById("croppie").click();
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

      reader.readAsDataURL(e);
    },

    onFileChange(e) {
      if (e != undefined) {
        this.e = e;
        this.createImage(e);
      }
    },
    createImage(file) {
      var image = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = (e) => {
        vm.image = e.target.result;
      };
      reader.onloadend = function () {
        vm.show = true;
      };
      reader.readAsDataURL(file);
    },
  },
};
</script>

<style>
.offall {
  padding: 0px;
  margin: 0px;
}
</style>