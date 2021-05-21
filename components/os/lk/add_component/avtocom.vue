<template>
  <structure :title="data.title">
    <template v-slot:middle>
      <div v-if="show">{{ text }}</div>
      <div v-else>
        <v-combobox
          v-model="item"
          :items="data.info"
          class="mt-0"
          dense
        ></v-combobox>
      </div>
    </template>
    <template v-slot:action>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn @click="save()" icon v-bind="attrs" v-on="on">
            <v-icon v-if="show == true">create</v-icon>
            <v-icon v-else>done</v-icon>
          </v-btn>
        </template>
        <span>Редактировать</span>
      </v-tooltip>
    </template>
  </structure>
</template>

<script>
import structure from "../../Additional_component/structure";
export default {
  props: ["data", "user"],
  components: {
    structure,
  },
  data: () => ({
    show: true,
    item: "",
  }),
  computed: {
    text() {
      if (this.item == "" || this.item == null) {
        return "Укажите ваш пол";
      }
      return this.item;
    },
  },
  methods: {
    save() {
      if (this.user != this.item) {
        let value = {
          att: this.data.model,
          value: this.item,
        };
        this.$axios.put("/lkdatauser", value);
        this.$auth.$state.user[this.data.model] = value
      }
      this.show = !this.show;
    },
  },
  created() {
    this.item = this.user;
  },
};
</script>

<style scoped>
.v-text-field__details {
  display: none;
}
.v-input--dense > .v-input__control > .v-input__slot {
  margin: 0px;
}
</style>