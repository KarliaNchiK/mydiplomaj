<template>
  <v-container fluid class="offall pt-2">
    <v-text-field
      v-for="(fiel, index) in model"
      :key="index"
      v-model="fiel.model"
      label="Минимальная"
      hide-details
      type="number"
      outlined
      @keypress="show = false"
      class="py-2"
    ></v-text-field>
    <div v-if="show" class="green--text text--lighten-2 py-2 px-4">
      Применено
    </div>
  </v-container>
</template>




<script>
import { debounce } from "vue-debounce";
export default {
  props: ["filter"],
  data: () => ({
    show: false,
    model: [
      {
        model: "",
      },
      {
        model: "",
      },
    ],
  }),
  computed: {
    salary() {
      return this.$store.getters["filtersTwo/" + this.filter];
    },
  },
  watch: {
    salary() {
      this.model = JSON.parse(JSON.stringify(this.salary));
      if (this.model[0].model == "" && this.model[1].model == "") {
        this.show = false;
      }
    },
    model: {
      handler: debounce(function () {
        if (
          this.model[0].model != this.salary[0].model ||
          this.model[1].model != this.salary[1].model
        ) {
          this.$store.commit("filtersTwo/set_arr", {
            value: this.model,
            filter: this.filter,
          });
          this.show = true;
        }
      }, 1000),
      deep: true,
    },
  },
};
</script>