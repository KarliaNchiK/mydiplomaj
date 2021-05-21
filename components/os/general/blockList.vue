<template>
  <v-list three-line class="px-0 py-2">
    <v-list-group>
      <template v-slot:activator>
        <v-list-item class="pl-2">
          <v-list-item-avatar class="mr-1">
            <v-icon color="blue darken-1" size="32">{{ item.icon }}</v-icon>
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
        <v-item-group multiple class="offall" v-model="model">
          <v-row no-gutters>
            <v-col v-for="lis in items" :key="lis.title" cols="6" class="pa-2">
              <v-item v-slot="{ active, toggle }">
                <v-card
                  :class="
                    active
                      ? 'green--text text--lighten-1'
                      : 'blue--text text--darken-1'
                  "
                  class="d-flex align-center justify-center"
                  tile
                  flat
                  outlined
                  height="100%"
                  @click="toggle"
                >
                  {{ lis.title }}
                </v-card>
              </v-item>
            </v-col>
          </v-row>
        </v-item-group>
      </v-list-item>
    </v-list-group>
  </v-list>
</template>

<script>
export default {
  props: ["item", "items", "filter"],
  data: () => ({
    show: false,
  }),
  computed: {
    model: {
      get: function () {
        return this.$store.getters["filtersOne/" + this.filter];
      },
      set: function (value) {
        this.$store.commit("filtersOne/set_arr", {
          filter: this.filter,
          value: value,
        });
      },
    },
  },
};
</script>


<style scoped>
.v-expansion-panel::before {
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0),
    0px 2px 2px 0px rgba(0, 0, 0, 0), 0px 1px 5px 0px rgba(0, 0, 0, 0);
}
.v-application--is-ltr
  .v-list-group--no-action
  > .v-list-group__items
  > .v-list-item {
  padding: 0px;
}
</style>