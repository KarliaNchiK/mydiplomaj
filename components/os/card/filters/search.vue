<template>
  <v-container fluid class="offall">
    <v-combobox
      v-model="model"
      :search-input.sync="search"
      hide-selected
      :label="label"
      multiple
      clearable
    >
      <template v-slot:selection> </template>
    </v-combobox>
    <v-chip-group column>
      <v-chip
        v-for="(chip, index) in model"
        :key="chip"
        class="my-1"
        @click="drop(index)"
      >
        <v-avatar
          class="accent white--text"
          left
          v-text="chip.slice(0, 1).toUpperCase()"
        ></v-avatar>
        {{ chip }}
      </v-chip>
    </v-chip-group>
  </v-container>
</template>

<script>
export default {
  props: ["filter", "label"],
  data: () => ({
    search: null,
  }),
  methods: {
    drop(value) {
      this.model.splice(value, 1);
    },
  },
  computed: {
    model: {
      get: function () {
        return this.$store.getters["filtersTwo/" + this.filter];
      },
      set: function (value) {
        this.$store.commit("filtersTwo/set_arr", {
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
</style>