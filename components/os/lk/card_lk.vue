<template>
  <div style="height: 100%">
    <div
      style="position: absolute; z-index: 100; margin-top: -60px"
      class="ml-5"
      v-if="data.title == 'Профиль'"
    >
      <avatar :user="$store.getters['user/image']" />
    </div>

    <v-card
      height="100%"
      outlined
      class="rounded-xl"
      style="
        box-shadow: 1px 1px 3px rgba(110, 110, 110, 0.3);
        border: 1px solid rgba(144, 202, 249, 0.5);
      "
    >
      <div :style="data.title == 'Профиль' ? 'padding-left:150px' : ''">
        <v-card-title class="font-weight-light" style="font-size: 1.7em"
          >{{ data.title }}
          <v-tooltip bottom v-if="data.title != 'Друзья'">
            <template v-slot:activator="{ on, attrs }">
              <v-icon v-bind="attrs" v-on="on" class="ml-3" size="30">{{
                data.icon
              }}</v-icon>
            </template>
            <span>{{ data.tooltip }}</span>
          </v-tooltip>
          <requsets :icon="data.icon" v-else />
        </v-card-title>
        <v-divider
          class="mx-4 mb-4"
          style="border: 1px solid #94c5e7"
        ></v-divider>
      </div>
      <component :is="data.component"></component>
    </v-card>
  </div>
</template>

<script>
import avatar from "./add_component/avatars";
import first from "./add_component/FirstBlock";
import projects from "./projects/projects";
import Contact from "./contact_details/show_contact";
import Allfriend from "./friends/allfriends";
import requsets from "./friends/requsest";
export default {
  props: ["data"],
  components: {
    first,
    projects,
    Contact,
    Allfriend,
    avatar,
    requsets,
  },
};
</script>