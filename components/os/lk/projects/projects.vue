<template>
  <v-slide-group v-model="model" class="pa-4" center-active show-arrows>
    <v-slide-item
      v-for="n in myProject.length + 1"
      :key="n"
      v-slot="{ active, toggle }"
    >
      <v-card
        v-if="n <= myProject.length"
        flat
        :color="active ? 'primary' : 'green lighten-1'"
        class="ma-4"
        height="170"
        width="100"
        @click="toggle"
      >
        <v-img :src="avaProj(myProject[n - 1].avatar)">
          <v-row no-gutters>
            <v-col cols="12" class="d-flex align-start justify-end">
              <v-icon @click="delet(myProject[n - 1].idproject)">
                mdi-close</v-icon
              >
            </v-col>
          </v-row>
        </v-img>
      </v-card>
      <new-project v-else />
    </v-slide-item>
  </v-slide-group>
</template>

<script>
import newProject from "./new_add";
export default {
  components: {
    newProject,
  },
  data: () => ({
    model: null,
  }),
  computed: {
    myProject() {
      return this.$store.getters["project/myProject"];
    },
  },
  methods: {
    avaProj(value) {
      try {
        if (value != "") {
          while (value.indexOf("\\") != -1) {
            value = value.replace("\\", "/");
          }
          value = value.replace("uploads/", "");
          return `http://localhost:3000/Whoknowsheknows/${value}`;
        } else {
          return "http://localhost:3000/Whoknowsheknows/default/1.jpeg";
        }
      } catch {
        return "http://localhost:3000/Whoknowsheknows/default/1.jpeg";
      }
    },
    async delet(value) {
      await this.$axios.put("/exitProject", { value: value }).then(() => {
        this.$store.dispatch("project/getmyProject");
      });
    },
  },
};
</script>