<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="12" v-for="comp in label" :key="comp.model" class="py-2">
        <component
          :is="comp.comp"
          :data="comp"
          :user="dataUser[comp.model]"
        ></component>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import lines from "./line";
import birthday from "./birthday";
import gender from "./avtocom";
import password from "./password";
export default {
  components: {
    lines,
    birthday,
    gender,
    password,
  },
  data: () => ({
    label: [
      {
        model: "about",
        title: "О себе",
        comp: "lines",
      },
      {
        model: "fio",
        title: "ФИО",
        comp: "lines",
      },
      {
        model: "birthday",
        title: "День рождения",
        comp: "birthday",
      },
      {
        model: "gender",
        title: "Ваш пол",
        info: ["Мужской", "Женский"],
        comp: "gender",
      },
      {
        model: "password",
        title: "Пароль",
        comp: "password",
      },
    ],
  }),
  computed: {
    dataUser() {
      return this.$auth.$state.user;
    },
  },
};
</script>