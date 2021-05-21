<template>
  <v-container fluid class="offall pb-5 pt-4" v-if="show">
    <v-row v-for="i in label" :key="i.name" no-gutters class="pb-7 px-4">
      <v-col cols="3" class="font-weight-light title_text">{{ i.name }}</v-col>
      <v-col cols="7">
        <div v-if="i.show">{{ i.model }}</div>
        <div v-else>
          <v-row no-gutters>
            <v-col class="mt-n1">
              <v-text-field
                dense
                hide-details
                v-model="i.model"
                @keypress.enter="sw(i)"
              ></v-text-field>
            </v-col>
          </v-row>
        </div>
      </v-col>
      <v-col cols="2" align="end" class="mt-n2">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="d-none d-lg-inline-flex"
              @click="sw(i)"
              icon
              v-bind="attrs"
              v-on="on"
            >
              <v-icon v-if="i.show == true">create</v-icon>
              <v-icon v-else>done</v-icon>
            </v-btn>
          </template>
          <span>Редактировать</span>
        </v-tooltip>
      </v-col>
    </v-row>
    <v-row no-gutters class="px-4 pt-14">
      <v-col cols="10" class="d-flex justify-space-between align-end">
        <v-btn
          v-for="(icon, index) in Social"
          :key="icon.icon"
          small
          icon
          :color="
            Social[index].model != '' ? 'blue lighten-1' : 'grey lighten-1'
          "
          :disabled="Social[index].model == ''"
          :href="go_to(Social[index])"
        >
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon size="32px" v-bind="attrs" v-on="on">
                {{ icon.icon }}
              </v-icon>
            </template>
            <span>Ваша страничка в сети {{ icon.name }}</span>
          </v-tooltip>
        </v-btn>
      </v-col>
      <v-col cols="2" align="end">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="mt-n1"
              @click="show = false"
              icon
              v-bind="attrs"
              v-on="on"
            >
              <v-icon v-if="show == true">create</v-icon>
              <v-icon v-else>done</v-icon>
            </v-btn>
          </template>
          <span>Редактировать</span>
        </v-tooltip>
      </v-col>
    </v-row>
  </v-container>
  <v-container fluid class="offall" v-else>
    <v-row
      v-for="(i, index) in Social"
      :key="i.name"
      no-gutters
      class="pb-5 px-4"
    >
      <v-col cols="6" class="font-weight-light title_text">
        <v-icon size="24px">
          {{ Social[index].icon }}
        </v-icon>
        {{ i.name }}</v-col
      >
      <v-col cols="6" class="px-1 py-0">
        <v-row>
          <v-text-field dense v-model="i.model" class="mb-n10"></v-text-field>
        </v-row>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col align="end"
        ><v-icon class="mr-4" @click="send()">done</v-icon></v-col
      >
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    label: [
      {
        name: "Адрес",
        model: "",
        show: true,
        comp: "adres",
      },
      {
        name: "Номер",
        model: "",
        show: true,
        comp: "phone",
      },
      {
        name: "E-mail",
        model: "",
        show: true,
        comp: "email",
      },
    ],
    Social: [
      {
        name: "Вконтакте",
        icon: "mdi-vk",
        model: "",
        comp: "vk",
      },
      {
        icon: "mdi-instagram",
        name: "Instagram",
        model: "",
        comp: "inst",
      },
      {
        icon: "mdi-facebook",
        name: "Facebook",
        model: "",
        comp: "facebook",
      },
      {
        icon: "mdi-twitter",
        name: "Twitter",
        model: "",
        comp: "twitter",
      },
      {
        icon: "mdi-linkedin",
        name: "Linkedin",
        model: "",
        comp: "linkedin",
      },
    ],
    id: null,
    show: true,
  }),
  created() {
    for (let i = 0; i < this.Social.length; i++) {
      for (let j in this.contact) {
        if (this.Social[i].comp == j) {
          this.Social[i].model = this.contact[j];
        }
      }
    }
    for (let i = 0; i < this.label.length; i++) {
      for (let j in this.contact) {
        if (this.label[i].comp == j) {
          this.label[i].model = !!this.contact[j]
            ? this.contact[j]
            : "Расскажите о себе";
        }
      }
    }
  },
  computed: {
    contact() {
      return JSON.parse(JSON.stringify(this.$auth.$state.user));
    },
  },
  methods: {
    async sw(value) {
      if (value.show == false) {
        let data = {
          attr: value.comp,
          value: value.model,
        };
        await this.$axios.put("/setcontact", data);
      }
      value.show = !value.show;
    },
    go_to(link) {
      if (link.model != null) {
        if (link.name == "Instagram") {
          link.model = link.model.replace("https://www.instagram.com/", "");
          link.model = link.model.replace("@", "");
          link.model = link.model.replace("/", "");
          return "https://www.instagram.com/" + link.model + "/";
        } else if (link.name == "Вконтакте") {
          link.model = link.model.replace("https://vk.com/", "");
          link.model = link.model.replace("/", "");
          return "https://vk.com/" + link.model + "/";
        } else {
          link.model = link.model.replace("http://www.", "");
          link.model = link.model.replace("http://", "");
          link.model = link.model.replace("https://www.", "");
          link.model = link.model.replace("https://", "");
          return "https://www." + link.model + "/";
        }
      }
    },
    async send() {
      for (let i = 0; i < this.Social.length; i++) {
        let data = {
          attr: this.Social[i].comp,
          value: this.Social[i].model,
        };
        await this.$axios.put("/setcontact", data);
      }
      this.show = true;
    },
  },
};
</script>