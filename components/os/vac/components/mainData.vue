<template>
  <v-card tile width="100%" class="mt-4">
    <v-list two-line>
      <v-list-item
        class="px-0 pt-2"
        v-for="(item, index) in label"
        :key="index"
      >
        <v-list-item-content class="py-0">
          <v-list-item-title class="py-1 pl-10 text-h6">{{
            item.title
          }}</v-list-item-title>
          <v-list-item-subtitle class="pl-10 text-subtitle-1"
            >Информация</v-list-item-subtitle
          >
          <v-divider class="blue darken-2 my-2"></v-divider>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    label: [
      {
        title: "Зарплата",
      },
      {
        title: "Опыт",
      },
      {
        title: "Кого ждут",
      },
      {
        title: "Место работы",
      },
      {
        title: "Тип занятости",
      },
      {
        title: "Оплата",
      },
    ],
  }),
};
</script>