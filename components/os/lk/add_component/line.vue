<template>
  <structure :title="data.title">
    <template v-slot:middle>
      <div v-if="show" :class="data.model != 'about' ? 'text-capitalize' : ''">{{ text }}</div>
      <div v-else>
        <v-text-field
          dense
          :hide-details="data.model == 'about' ? false : true"
          counter="50"
          v-model="item"
          @keypress.enter="save()"
        ></v-text-field>
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
  props: ["data","user"],
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
        if(this.data.model == "about"){
          return "Расскажите кратко о себе";
        }
        return "Укажите ваши данные";
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
