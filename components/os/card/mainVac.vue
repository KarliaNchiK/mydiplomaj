<template>
  <v-container fluid class="offall px-4 pb-2">
    <template v-for="(vac, index) in vacs"
      ><v-row
        no-gutters
        :key="'vac - ' + index"
        class="mb-2 pt-2"
        @click="$router.push('/company/vac')"
      >
        <v-col cols="4">
          <v-row no-gutters class="text-h5 pb-2">
            {{ vac.title }}
          </v-row>
          <v-row no-gutters> Зарплата: {{ vac.salary }} </v-row>
        </v-col>
        <v-col cols="4" class="d-flex justify-center"> {{ vac.person }} </v-col
        ><v-col cols="4">
          <v-row no-gutters justify="end"
            >Главное требование: {{ vac.demand }}</v-row
          >
          <v-row no-gutters justify="end" class="pt-2"
            ><v-btn
              outlined
              color="blue lighten-2"
              rounded
              small
              class="text-capitalize"
              >Присутпить</v-btn
            ></v-row
          >
        </v-col>
      </v-row>
      <v-divider class="blue lighten-3" :key="index"></v-divider
    ></template>
  </v-container>
</template>


<script>
export default {
  data: () => ({
    vacs: [
      {
        idVac: "myLogin",
        title: "Название вакансии",
        salary: "00 000 - 00 000",
        person: "Кого ожидают на эту должность",
        demand: "Опыт",
      },
      {
        idVac: "myLogin",
        title: "Название вакансии",
        salary: "00 000 - 00 000",
        person: "Кого ожидают на эту должность",
        demand: "Опыт",
      },
      {
        idVac: "myLogin",
        title: "Название вакансии",
        salary: "00 000 - 00 000",
        person: "Кого ожидают на эту должность",
        demand: "Опыт",
      },
      {
        idVac: "myLogin",
        title: "Название вакансии",
        salary: "00 000 - 00 000",
        person: "Кого ожидают на эту должность",
        demand: "Опыт",
      },
      {
        idVac: "myLogin",
        title: "Название вакансии",
        salary: "00 000 - 00 000",
        person: "Кого ожидают на эту должность",
        demand: "Опыт",
      },
      {
        idVac: "myLogin",
        title: "Название вакансии",
        salary: "00 000 - 00 000",
        person: "Кого ожидают на эту должность",
        demand: "Опыт",
      },
    ],
  }),
};
</script>