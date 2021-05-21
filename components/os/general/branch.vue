<template>
  <v-card tile flat class="pl-4 pt-4" elevation="8">
    <v-card-title class="headline offall" primary-title>{{
      title
    }}</v-card-title>
    <v-row no-gutters>
      <v-text-field
        v-model="search_item"
        label="Введите название города"
      ></v-text-field>
    </v-row>
    <v-row no-gutters>
      <v-chip
        outlined
        color="blue darken-1"
        label
        v-for="(chip, index) in chips"
        :key="index"
        @click="drop(chip)"
        @click:close="drop(chip)"
        class="ma-2"
        close
        >{{ chip }}</v-chip
      >
    </v-row>
    <v-row
      class="ma-0 hid"
      style="overflow-y: auto; height: 400px; overflow-x: hidden"
      ref="row"
    >
      <v-main class="pa-0">
        <v-row class="ma-0">
          <v-col
            cols="6"
            class="pa-1 px-2"
            v-for="(item, index) in filterItems(search_item)"
            :key="index"
          >
            <v-hover v-slot="{ hover }">
              <v-card
                width="100%"
                height="100%"
                class="pa-1"
                :class="hover ? 'blue--text text--darken-1' : ''"
                style="transition: 0.5s all"
                flat
                @click="add(item)"
                >{{ index + 1 }}. {{ item }}</v-card
              >
            </v-hover>
          </v-col>
        </v-row>
      </v-main>
    </v-row>
  </v-card>
</template>

<script>
export default {
  props: ["title"],

  data: () => ({
    search_item: "",
  }),

  methods: {
    filterItems(query) {
      return this.branch.filter(function (el) {
        return el.toLowerCase().indexOf(query.toLowerCase()) > -1;
      });
    },
    add(value) {
      this.$store.commit("filtersOne/set_filter", {
        value: value,
        filter: "filterbranch",
      });
    },
    drop(value) {
      this.$store.commit("filtersOne/drop_filter", {
        value: value,
        filter: "filterbranch",
      });
    },
  },

  computed: {
    chips() {
      return this.$store.getters["filtersOne/branch"];
    },
    branch() {
      return this.$store.getters["branch/branch"];
    },
  },
};
</script>


