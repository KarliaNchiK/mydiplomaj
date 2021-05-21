<template>
  <v-card tile flat width="100%" height="100%" class="d-flex align-center justify-center">
    <v-container fluid class="offall">
      <v-row no-gutters justify="end" align="center" class="pa-2">
        <div class="pr-7">
          Сортировать по:
          <v-menu open-on-hover bottom offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                text
                v-bind="attrs"
                v-on="on"
                class="text-lowercase mt-n1 px-1"
              >
                {{ items[myItem].title }}
              </v-btn>
            </template>

            <v-list>
              <v-list-item-group v-model="myItem">
                <v-list-item
                  v-for="(item, index) in items"
                  :key="index"
                  @click="
                    '';

                  "
                >
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-menu>
        </div>
        <div>
          <v-icon
            class="mt-n1"
            color="blue lighten-2"
            @click="
              '';

            "
          >
            mdi-refresh
          </v-icon>
          Перемешать
        </div>
      </v-row>
      <v-divider class="blue lighten-2"></v-divider>
      <v-row no-gutters align="center" class="pa-2">
        <v-pagination
          v-model="page"
          :length="15"
          :total-visible="7"
        ></v-pagination>
        <v-spacer></v-spacer>
        <div class="pr-7">
          показывать по:
          <v-menu open-on-hover bottom offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn text v-bind="attrs" v-on="on" class="px-0">
                {{ Cols[myCols] }}
              </v-btn>
            </template>

            <v-list>
              <v-list-item-group v-model="myCols">
                <v-list-item
                  v-for="(item, index) in Cols"
                  :key="index"
                  @click="
                    '';

                  "
                >
                  <v-list-item-title>{{ item }}</v-list-item-title>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-menu>
        </div>
        <div>
          <v-icon
            color="blue lighten-2"
            @click="
              '';

            "
            >mdi-crop-landscape</v-icon
          >
          <v-icon
            color="blue lighten-2"
            @click="
              '';

            "
            >mdi-crop-portrait</v-icon
          >
        </div>
      </v-row>
    </v-container>
  </v-card>
</template>


<script>
export default {
  data: () => ({
    items: [
      { title: "Дате публикации вакансии" },
      { title: "Регистрации компании" },
      { title: "Количеству вакансий" },
      { title: "Опыту" },
    ],
    Cols: [10, 16, 30],
    myCols: 0,
    myItem: 0,
    page: 1,
  }),
};
</script>