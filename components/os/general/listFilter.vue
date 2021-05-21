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
            cols="4"
            align="center"
            class="py-2 px-2"
            v-for="(item, index) in city"
            :key="index"
          >
            <v-card
              width="100%"
              height="100%"
              class="d-flex align-center justify-center pa-4"
              outlined
              flat
              style="border: 1px solid rgba(41, 41, 254, 0.3)"
              @click="add(item)"
              >{{ item }}</v-card
            >
          </v-col>
        </v-row>
      </v-main>
    </v-row>
  </v-card>
</template>

<script>
import { debounce } from "vue-debounce";
export default {
  props: ["title"],

  data: () => ({
    search_item: "",
  }),

  methods: {
    add(value) {
      this.$store.commit("filtersOne/set_filter", {
        value: value,
        filter: "filterCity",
      });
    },
    drop(value) {
      this.$store.commit("filtersOne/drop_filter", {
        value: value,
        filter: "filterCity",
      });
    },
    sc() {
      if (
        this.$refs.row.scrollTop ==
        this.$refs.row.scrollHeight - this.$refs.row.clientHeight
      ) {
        this.$store.dispatch("city/getAddcity", this.city.length);
      }
    },
  },

  computed: {
    chips() {
      return this.$store.getters["filtersOne/city"];
    },
    city() {
      return this.$store.getters["city/city"];
    },
  },

  watch: {
    search_item: {
      handler: debounce(function () {
        if (this.search_item != "") {
          this.$store.dispatch("city/getcityFil", this.search_item);
        } else {
          this.$store.dispatch("city/getcity");
        }
      }, 500),
    },
  },

  mounted() {
    this.$refs.row.addEventListener("scroll", this.sc);
  },
  beforeDestroy() {
    this.$refs.row.removeEventListener("scroll", this.sc);
  },
};
</script>


