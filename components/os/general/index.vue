<template>
  <v-container fluid class="offall pt-8">
    <v-row no-gutters>
      <v-col cols="3" class="pr-2">
        <v-card
          tile
          class="text-h4 pa-4 d-flex align-center justify-center"
          height="100%"
          >Фильтры</v-card
        >
      </v-col>
      <v-col cols="9" class="pl-2">
        <sorts />
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="3" class="pr-2 pt-4">
        <v-row
          no-gutters
          style="min-height: 710px; position: sticky; top: 60px"
        >
          <v-card tile>
            <v-card flat tile height="100%">
              <v-list three-line class="pa-0">
                <template v-for="(item, index) in filters">
                  <v-menu
                    offset-x
                    open-on-hover
                    :close-on-content-click="false"
                    :key="index"
                    v-if="index != 2"
                    max-width="49.6%"
                    nudge-right="16"
                    tile
                    elevation="0"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-list-item
                        v-bind="attrs"
                        v-on="on"
                        @click="
                          '';

                        "
                        :key="item.title"
                        class="px-6 pt-3 pb-1"
                      >
                        <v-list-item-avatar class="mr-1">
                          <v-icon color="blue darken-1" size="32">{{
                            item.icon
                          }}</v-icon>
                        </v-list-item-avatar>

                        <v-list-item-content>
                          <v-list-item-title
                            class="mb-0 mt-n2"
                            v-html="item.title"
                          ></v-list-item-title>
                          <v-list-item-subtitle
                            class="mt-n5"
                            v-html="item.subtitle"
                          ></v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-action v-if="item.filters">
                          <v-btn icon class="mt-1" @click="clear(item.name)">
                            <v-icon>mdi-close</v-icon>
                          </v-btn>
                        </v-list-item-action>
                      </v-list-item>
                    </template>
                    <component
                      :is="item.component"
                      :title="item.subtitle"
                    ></component>
                  </v-menu>
                  <list-exp
                    v-else
                    :key="index"
                    :item="item"
                    :items="exp"
                    :filter="'exp'"
                  />
                </template>
                <v-btn
                  block
                  color="blue darken-1"
                  tile
                  elevation="0"
                  class="white--text mt-1 text-caption text-lg-body-2"
                  @click="clearAll()"
                  >Сбросить все фильтры</v-btn
                >
              </v-list>
            </v-card>
          </v-card>
        </v-row>
      </v-col>
      <v-col cols="9" class="pl-2 pt-4">
        <v-row no-gutters class="mb-4" v-if="show == -1">
          <v-card tile flat width="100%" class="px-4 py-4">
            <v-text-field
              label="Введите название компании"
              clear-icon="mdi-close-circle"
              clearable
              outlined
              hide-details
              ><template v-slot:prepend>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-icon v-on="on"> mdi-help-circle-outline </v-icon>
                  </template>
                  Поле для поиска компании
                </v-tooltip></template
              ></v-text-field
            >
          </v-card>
        </v-row>
        <v-row no-gutters>
          <v-card tile flat height="100%" width="100%">
            <transition name="opp" mode="out-in">
              <v-container key="default" fluid class="offall">
                <main-content />
              </v-container>
            </transition>
          </v-card>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import listFilter from "./listFilter";
import listBranch from "./branch";
import listExp from "./blockList";
import mainContent from "./main";
import sorts from "../Addcomponent/sorts";
export default {
  components: {
    listFilter,
    listBranch,
    listExp,
    mainContent,
    sorts,
  },

  data: () => ({
    filters: [
      {
        name: "filterCity",
        icon: "mdi-map-marker-check",
        title: "Город",
        subtitle: "Выберете город",
        component: "list-filter",
        filters: false,
      },
      {
        name: "filterbranch",
        icon: "mdi-briefcase-search",
        title: "Отрасль",
        subtitle: "Выберете отрасль",
        component: "list-branch",
        filters: false,
      },
      {
        name: "exp",
        icon: "mdi-head-check-outline",
        title: "Опыт",
        subtitle: "Укажите опыт компании",
      },
    ],
    exp: [
      { title: "0 - 1 года", active: false },
      { title: "1 - 3 года", active: false },
      { title: "3-6 лет", active: false },
      { title: "6+ лет", active: false },
    ],
    show: -1,
  }),

  methods: {
    clear(value) {
      this.$store.commit("filtersOne/drop_allFilter", { filter: value });
    },
    clearAll() {
      this.$store.commit("filtersOne/dropFilters");
    },
  },

  computed: {
    city() {
      return !!this.$store.getters["filtersOne/city"].length;
    },
    branch() {
      return !!this.$store.getters["filtersOne/branch"].length;
    },
  },

  watch: {
    city() {
      this.filters[0].filters = this.city;
    },
    branch() {
      this.filters[1].filters = this.branch;
    },
  },

  created() {
    this.filters[0].filters = this.city;
    this.filters[1].filters = this.branch;
  },
};
</script>


<style>
.v-pagination__item {
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0),
    0px 2px 2px 0px rgba(0, 0, 0, 0), 0px 1px 5px 0px rgba(0, 0, 0, 0);
  margin: 0;
  height: 25px;
  min-width: 25px;
}
.v-pagination__navigation {
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0),
    0px 2px 2px 0px rgba(0, 0, 0, 0), 0px 1px 5px 0px rgba(0, 0, 0, 0);
  margin: 0;
  height: 25px;
  min-width: 25px;
}
</style>

<style scoped>
.opp-enter-active,
.opp-leave-active {
  transition: all 0.2s cubic-bezier(0.2, 0, 0.3, 1);
}
.opp-enter,
.opp-leave-to {
  opacity: 0;
}
</style>