<template>
  <v-container fluid class="offall pt-8">
    <v-row no-gutters>
      <v-col cols="3" class="pr-2" style="min-height: 821px">
        <avatar-company />
        <main-data />
      </v-col>
      <v-col cols="9" class="pl-2" style="min-height: 821px">
        <v-expand-transition mode="out-in">
          <requirements key="def" v-if="!active" />
        </v-expand-transition>
        <v-row
          no-gutters
          style="transition: all 1s; min-height: 610px"
          :class="!active ? 'pt-4' : ''"
        >
          <v-card tile flat width="100%">
            <v-card-title class="text-h3 font-weight-medium"
              >Название Вакансии</v-card-title
            >
            <v-divider class="blue lighten-2"></v-divider>
          </v-card>
          <v-card tile flat width="100%">
            <transition mode="out-in" name="opp" class="d-flex align-stretch">
              <v-card
                key="before"
                v-if="!active"
                tile
                flat
                class="d-flex align-stretch"
                width="100%"
                height="100%"
              >
                <v-row no-gutters>
                  <v-col cols="12" v-for="(item, index) in info" :key="index">
                    <div class="pa-4">
                      <strong class="text-h6">{{ item.title }}</strong
                      ><br />
                      Описание вакансии Lorem ipsum dolor sit amet, consectetur
                      adipiscing elit, sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua. Ut enim ad minim veniam,
                      quis nostrud exercitation ullamco laboris nisi ut aliquip
                      ex ea commodo consequat. Duis aute irure dolor in
                      reprehenderit in voluptate velit esse cillum dolore eu
                      fugiat nulla pariatur.
                    </div>
                    <v-divider class="blue lighten-2"></v-divider>
                  </v-col>
                  <v-col cols="12" class="d-flex align-end justify-end">
                    <v-btn
                      block
                      text
                      height="100%"
                      class="py-5 text-h6"
                      @click="active = !active"
                      ><v-icon size="32" color="blue lighten-2" class="pr-1"
                        >mdi-check-circle-outline</v-icon
                      >Подать заявку</v-btn
                    >
                  </v-col>
                </v-row>
              </v-card>
              <v-card
                v-else
                key="after"
                tile
                flat
                width="100%"
                min-height="100%"
                color="d-flex align-stretch"
                class="pt-4"
              >
                <v-container fluid class="offall">
                  <v-row
                    no-gutters
                    v-for="(item, index) in form"
                    :key="index"
                    class="px-4"
                  >
                    <v-col
                      cols="12"
                      class="text-h6 pb-2"
                      :class="item.comp == 'field' ? ' d-inline-flex' : ''"
                    >
                      {{ item.title
                      }}<v-text-field
                        v-if="item.comp == 'field'"
                        class="py-0 my-0 pl-4"
                        hide-details
                        dense
                      ></v-text-field>
                      <v-textarea
                        class="py-0 my-0"
                        v-else
                        auto-grow
                        rows="1"
                      ></v-textarea>
                    </v-col>
                  </v-row>
                  <v-divider class="blue lighten-2 mt-4"></v-divider>
                  <v-row no-gutters>
                    <v-col cols="12">
                      <v-card-title class="pl-5">
                        Добавить достижение</v-card-title
                      >
                    </v-col>
                    <v-col cols="12"><achive /></v-col>
                  </v-row>
                  <v-divider class="blue lighten-2 mt-4"></v-divider>
                  <v-row no-gutters class="pa-4">
                    <v-card-title class="pl-1 pt-0">
                      Тестовое задание</v-card-title
                    >
                    <v-col cols="10">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Modi sed aliquam porro aperiam vero perferendis a, nisi
                      harum, cupiditate praesentium, aspernatur dolorum! Unde
                      consectetur sed totam natus odio suscipit laborum!
                    </v-col>
                    <v-col cols="2" class="d-flex align-center justify-center">
                      <v-icon color="blue darken-2" size="40">mdi-file</v-icon>
                    </v-col>
                    <v-col cols="12" class="pt-4">
                      <v-btn outlined color="blue lighten-2" rounded
                        >Прикрепить</v-btn
                      >
                    </v-col>
                  </v-row>
                  <v-divider class="blue lighten-2 mt-4"></v-divider>
                  <v-row no-gutters>
                    <v-col cols="12" class="d-flex align-end justify-end">
                      <v-btn
                        block
                        text
                        height="100%"
                        class="py-5 text-h6"
                        @click="active = !active"
                        ><v-icon size="32" color="blue lighten-2" class="pr-1"
                          >mdi-check-circle-outline</v-icon
                        >Подать заявку</v-btn
                      >
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>
            </transition>
          </v-card>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import mainData from "./components/mainData";
import requirements from "./components/requirements";
import avatarCompany from "../Addcomponent/avatars";
import achive from "./components/achive";
export default {
  components: {
    mainData,
    requirements,
    avatarCompany,
    achive,
  },
  data: () => ({
    active: false,
    info: [
      {
        title: "Описание вакансии",
      },
      {
        title: "Что предлагает компания",
      },
      {
        title: "Социальная среда",
      },
    ],
    form: [
      {
        title: "Как вас зовут?",
        model: "name",
        comp: "field",
      },
      {
        title: "Как с вами связаться?",
        model: "contact",
        comp: "field",
      },
      {
        title: "Опишите себя?",
        model: "about",
        comp: "aray",
      },
      {
        title: "Ваши ключевые качества?",
        model: "key",
        comp: "aray",
      },
    ],
  }),
};
</script>

<style scoped>
.opp-enter-active,
.opp-leave-active {
  transition: all 0.5s cubic-bezier(0.2, 0, 0.3, 1);
}
.opp-enter,
.opp-leave-to {
  opacity: 0;
}
</style>