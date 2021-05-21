<template>
  <v-container fluid class="offall pt-8">
    <v-row no-gutters>
      <v-col cols="3" class="pr-2">
        <avatar-company />
      </v-col>
      <v-col cols="9" class="pl-2">
        <v-row no-gutters style="height: 60%" class="pb-2">
          <v-card tile flat class="pt-2" width="100%" height="100%">
            <div class="pl-4 pb-2">
              <v-icon color="blue darken-2">mdi-charity</v-icon> Опыт на
              рынке:
              {{ company.exp }}
              <v-icon class="pl-4" color="blue darken-2"
                >mdi-bag-checked</v-icon
              >
              Отрасль:
              {{ company.branch }}
            </div>
            <v-divider class="green lighten-4"></v-divider>
            <div class="pl-4 pt-2">{{ company.info }}</div>
          </v-card>
        </v-row>
        <v-row no-gutters style="height: 40%" class="pt-2">
          <sorts />
        </v-row>
      </v-col>
    </v-row>
    <v-row no-gutters class="mt-4">
      <v-col cols="3" class="pr-2" style="position: sticky; top: 60px">
        <v-card tile width="100%" style="min-height: 500px" class="pt-2">
          <v-list three-line class="pa-0">
            <v-list-group
              v-for="item in filters"
              :key="item.title"
              v-model="item.active"
            >
              <template v-slot:activator>
                <v-list-item class="pl-2">
                  <v-list-item-avatar class="mr-1">
                    <v-icon color="blue darken-3" size="32">{{
                      item.avatar
                    }}</v-icon>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title
                      class="mb-0 mt-n2"
                      v-html="item.title"
                    ></v-list-item-title>
                    <v-list-item-subtitle
                      class="mt-n5"
                      v-html="item.subtitle"
                    ></v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </template>
              <v-list-item>
                <component
                  :is="item.comp"
                  :filter="item.model"
                  :label="item.label"
                  :items="item.items"
                ></component>
              </v-list-item>
            </v-list-group>
          </v-list>
          <v-btn
            block
            color="blue darken-2"
            tile
            elevation="0"
            class="white--text mt-1 text-caption text-lg-body-2"
            @click="clearAll()"
            >Сбросить все фильтры</v-btn
          >
        </v-card>
      </v-col>
      <v-col cols="9" class="pl-2">
        <v-card tile flat height="100%" width="100%">
          <main-vac />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import sorts from "../Addcomponent/sorts";
import mainVac from "./mainVac";
import combo from "./filters/search";
import lists from "./filters/blockList";
import textFiel from "./filters/textFiel";
import avatarCompany from "../Addcomponent/avatars";
export default {
  components: {
    sorts,
    mainVac,
    combo,
    lists,
    avatarCompany,
    textFiel,
  },
  data: () => ({
    company: {
      exp: 6,
      avatar: "",
      branch: "Производство",
      info:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    },
    filters: [
      {
        avatar: "mdi-school",
        title: "Навыки",
        subtitle: "Выберите ваши навыки",
        model: "skills",
        comp: "combo",
        label: "Выберите свои навыки",
        active: false,
      },
      {
        active: false,
        avatar: "mdi-head-check-outline",
        title: "Опыт",
        subtitle: "Укажите ваш опыт",
        model: "exp",
        items: [
          { title: "Студент" },
          { title: "Нет опыта" },
          { title: "0 - 1 года" },
          { title: "1 - 3 года" },
          { title: "3-6 лет" },
          { title: "6+ лет" },
        ],
        comp: "lists",
      },
      {
        active: false,
        avatar: "mdi-briefcase-check-outline",
        title: "Профессия",
        subtitle: "Выберите профессию",
        model: "professional",
        label: "Выберите профессии",
        comp: "combo",
      },
      {
        active: false,
        avatar: "mdi-cash-multiple",
        title: "Зарплата",
        subtitle: "Укажите зарплату",
        model: "salary",
        comp: "textFiel",
      },
    ],
  }),
  methods: {
    clearAll() {
      this.$store.commit("filtersTwo/dropFilters");
    },
  },
};
</script>