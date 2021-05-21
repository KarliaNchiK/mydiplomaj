<template>
  <structure :title="data.title">
    <template v-slot:middle>
      <p class="my-0">{{ computedDateFormattedMomentjs }}</p>
    </template>
    <template v-slot:action>
      <v-menu
        ref="meny"
        v-model="meny"
        :close-on-content-click="false"
        :return-value.sync="date"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>create</v-icon>
          </v-btn>
        </template>
        <v-date-picker v-model="date" no-title scrollable locale="ru">
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="meny = false">Выход</v-btn>
          <v-btn text color="primary" @click="save()">OK</v-btn>
        </v-date-picker>
      </v-menu>
    </template>
  </structure>
</template>

<script>
import moment from "moment";
import { parseISO } from "date-fns";
import structure from "../../Additional_component/structure";
export default {
  props: ["data", "user"],
  components: {
    structure,
  },
  data: () => ({
    date: "",
    meny: false,
  }),
  created() {
    this.date = this.user;
  },
  computed: {
    computedDateFormattedMomentjs() {
      moment.locale("ru");
      if(this.date == "" || this.date == null){
        return "Укажите дату рождения"
      }
      return parseISO(this.date)
        ? moment(parseISO(this.date)).format("LL")
        : "";
    },
  },
  methods: {
    async save() {
      this.$refs.meny.save(this.date);
      if (this.user != this.date) {
        let value = {
          att: this.data.model,
          value: this.date,
        };
        this.$axios.put("/lkdatauser", value);
        this.$auth.$state.user[this.data.model] = value
      }
    },
  },
};
</script>