<template>
  <v-slide-group v-model="model" class="pa-2" center-active show-arrows>
    <v-slide-item
      v-for="n in myProject.length + 1"
      :key="n"
      v-slot="{ active, toggle }"
    >
      <v-card
        v-if="n <= myProject.length"
        flat
        :color="active ? 'primary' : 'blue darken-2'"
        class="ma-4"
        height="170"
        width="100"
        @click="toggle"
      >
        <v-img src="">
          <v-row no-gutters>
            <v-col cols="12" class="d-flex align-start justify-end">
              <v-icon>
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
    myProject: [],
  }),
  methods: {},
};
</script>