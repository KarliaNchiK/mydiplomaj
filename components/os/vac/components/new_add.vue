<template>
  <div class="pt-3">
    <v-card
      color="blue darken-2"
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
    <v-dialog v-model="dialog" width="800">
      <v-card tile flat class="pa-4">
        <form @submit.prevent="save()" enctype="multipart/form-data">
          <v-card-title class="pa-0">Прикрепить достижение</v-card-title>
          <v-divider class="my-4 blue"></v-divider>
          <v-card-text class="pa-0">
            <v-row no-gutters>
              <v-col cols="12" class="pb-4 text-body-1">
                Опишите своё достижение
              </v-col>
              <v-col cols="12" class="pb-8">
                <v-text-field
                  label="Тема вашего достижения"
                  v-model="name"
                  dense
                  clearable
                  hide-details
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="pb-4">
                <v-textarea
                  auto-grow
                  rows="2"
                  outlined
                  hide-details
                  label="Описание"
                  counter
                  hint="не более 1000 знаков"
                  v-model="info"
                  clearable
                ></v-textarea>
              </v-col>
            </v-row>
            <v-divider class="my-4 blue"></v-divider>
            <v-row no-gutters>
              <v-col cols="12" class="pb-4 text-body-1">
                Прикрепить изображения
              </v-col>
              <v-col cols="12">
                <v-slide-group v-model="model" show-arrows>
                  <v-slide-item
                    v-for="n in kols"
                    :key="n"
                    v-slot:default="{ toggle, active }"
                  >
                    <v-card
                      outlined
                      class="mx-1"
                      width="100"
                      :height="active ? 200 : 150"
                      @click="toggle"
                      style="transition: 0.5s all"
                    >
                      <v-img
                        :src="image[n]"
                        height="150"
                        :aspect-ratio="16 / 9"
                        position="center center"
                      ></v-img>
                      <v-expand-transition>
                        <div v-if="active" class="text-center">
                          Аватар достижения
                        </div>
                      </v-expand-transition>
                    </v-card>
                  </v-slide-item>
                  <v-slide-item>
                    <label for="achive">
                      <v-card
                        outlined
                        class="mx-1 grey lighten-2 d-flex align-center justify-center"
                        width="100"
                        height="150"
                        style="cursor: pointer"
                      >
                        <v-icon size="50" color="blue lighten-2">
                          mdi-plus
                        </v-icon>
                      </v-card>
                    </label>
                  </v-slide-item>
                </v-slide-group>
              </v-col>
            </v-row>
          </v-card-text>
          <v-file-input
            @change="onFileChange"
            id="achive"
            style="display: none"
            accept="image/*"
          ></v-file-input>
          <v-divider class="my-4 blue"></v-divider>
          <v-card-actions class="py-5 d-flex align-center justify-end">
            <v-btn text @click="dialog = false">Отмена</v-btn>
            <v-btn color="#5B98F1" class="px-9 ml-5" rounded outlined type="submit">
              <div class="black--text">Добавить</div>
            </v-btn>
          </v-card-actions>
        </form>
      </v-card>
    </v-dialog>
  </div>
</template>


<script>
export default {
  data: () => ({
    name: "",
    model: null,
    dialog: false,
    info: "",
    image: [],
    kols: 0,
    e: [],
    id: null,
    path: "",
  }),
  watch: {
    dialog() {
      if (this.dialog == false) {
        this.image = [];
        this.e = [];
        this.kols = 0;
        this.info = "";
        this.name = "";
        this.model = null;
      }
    },
  },
  methods: {
    save() {
      this.dialog = false;
    },
    onFileChange(e) {
      if (e != undefined) {
        this.e.push(e);
        this.createImage(e);
      }
    },
    createImage(file) {
      var reader = new FileReader();
      var vm = this;
      reader.onload = (e) => {
        vm.kols++;
        vm.image[vm.kols] = e.target.result;
      };
      reader.readAsDataURL(file);
    },
  },
};
</script>