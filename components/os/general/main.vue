<template>
  <v-container fluid>
    <v-card
      tile
      flat
      width="100%"
      v-for="(company, index) in companys"
      :key="index"
    >
      <v-row no-gutters class="mb-2">
        <v-col cols="1">
          <v-avatar
            size="70"
            @click="$router.push('/company')"
            style="cursor: pointer"
          >
            <v-img :src="company.avatar"></v-img>
          </v-avatar>
        </v-col>
        <v-col cols="11" class="pl-2">
          <v-row no-gutters>
            <v-col cols="9">
              <v-row
                no-gutters
                class="font-weight-medium"
                @click="$router.push('/company')"
                style="cursor: pointer"
              >
                {{ company.title }}
              </v-row>
              <v-row no-gutters> На рынке: {{ company.exp }} </v-row>
              <v-row no-gutters> Отрасль: {{ company.branch }} </v-row>
            </v-col>
            <v-col cols="3">
              <v-row no-gutters justify="end" class="text-h6 pr-2">
                Вакансий: {{ company.vac }}
              </v-row>
              <v-row no-gutters justify="end" class="text-h6 pt-2">
                О компании
                <v-btn
                  icon
                  @click="company.active = !company.active"
                  small
                  class="mt-1"
                  ><v-icon color="blue darken-2"
                    >mdi-arrow-down-thick</v-icon
                  ></v-btn
                >
              </v-row>
            </v-col>
          </v-row>
        </v-col>
        <v-divider inset class="mt-1"></v-divider>
        <v-expand-transition mode="out-in">
          <v-col cols="12" v-if="company.active">
            <v-card flat tile class="px-4 pt-4">
              {{ company.info }}
              <v-divider></v-divider>
            </v-card>
          </v-col>
        </v-expand-transition>
      </v-row>
    </v-card>
  </v-container>
</template>


<script>
export default {
  data: () => ({
    companys: [
      {
        login: "myLogin",
        avatar:
          "https://en.ecosociety.ru/wp-content/uploads/2019/10/081019.jpeg",
        title: "Татнефть",
        exp: "6 лет",
        branch: "Производство",
        vac: 6,
        info: "more info about company",
        active: false,
      },
      {
        login: "myLogin",
        avatar:
          "https://en.ecosociety.ru/wp-content/uploads/2019/10/081019.jpeg",
        title: "Татнефть",
        exp: "6 лет",
        branch: "Производство",
        vac: 6,
        info: "more info about company",
        active: false,
      },
      {
        login: "myLogin",
        avatar:
          "https://en.ecosociety.ru/wp-content/uploads/2019/10/081019.jpeg",
        title: "Татнефть",
        exp: "6 лет",
        branch: "Производство",
        vac: 6,
        info: "more info about company",
        active: false,
      },
      {
        login: "myLogin",
        avatar:
          "https://en.ecosociety.ru/wp-content/uploads/2019/10/081019.jpeg",
        title: "Татнефть",
        exp: "6 лет",
        branch: "Производство",
        vac: 6,
        info: "more info about company",
        active: false,
      },
      {
        login: "myLogin",
        avatar:
          "https://en.ecosociety.ru/wp-content/uploads/2019/10/081019.jpeg",
        title: "Татнефть",
        exp: "6 лет",
        branch: "Производство",
        vac: 6,
        info: "more info about company",
        active: false,
      },
      {
        login: "myLogin",
        avatar:
          "https://en.ecosociety.ru/wp-content/uploads/2019/10/081019.jpeg",
        title: "Татнефть",
        exp: "6 лет",
        branch: "Производство",
        vac: 6,
        info: "more info about company",
        active: false,
      },
      {
        login: "myLogin",
        avatar:
          "https://en.ecosociety.ru/wp-content/uploads/2019/10/081019.jpeg",
        title: "Татнефть",
        exp: "6 лет",
        branch: "Производство",
        vac: 6,
        info: "more info about company",
        active: false,
      },
      {
        login: "myLogin",
        avatar:
          "https://en.ecosociety.ru/wp-content/uploads/2019/10/081019.jpeg",
        title: "Татнефть",
        exp: "6 лет",
        branch: "Производство",
        vac: 6,
        info: "more info about company",
        active: false,
      },
      {
        login: "myLogin",
        avatar:
          "https://en.ecosociety.ru/wp-content/uploads/2019/10/081019.jpeg",
        title: "Татнефть",
        exp: "6 лет",
        branch: "Производство",
        vac: 6,
        info: "more info about company",
        active: false,
      },
      {
        login: "myLogin",
        avatar:
          "https://en.ecosociety.ru/wp-content/uploads/2019/10/081019.jpeg",
        title: "Татнефть",
        exp: "6 лет",
        branch: "Производство",
        vac: 6,
        info: "more info about company",
        active: false,
      },
    ],
  }),
};
</script>