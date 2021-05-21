<template>
  <div ref="row" class="hidden-scroll overflow-y-auto" style="height: 195px">
    <v-card tile flat width="100%">
      <v-row
        no-gutters
        style="position: sticky; top: 0; background-color: white"
      >
        <v-col cols="6" class="pt-2">
          <v-card-title class="offall pl-6">Обязанности</v-card-title>
          <v-divider class="blue lighten-4"></v-divider>
        </v-col>
        <v-divider vertical class="blue lighten-4"></v-divider>
        <v-col cols="6" class="pt-2"
          ><v-card-title class="offall pl-6">Требования</v-card-title
          ><v-divider class="blue lighten-4"></v-divider
        ></v-col>
      </v-row>
      <v-row no-gutters>
        <v-col
          v-if="show"
          cols="12"
          class="d-flex align-end justify-center"
          style="position: absolute;"
          :style="{ top: top + 'px' }"
          ><v-icon class="anim" color="blue darken-2"
            >mdi-arrow-down-circle-outline</v-icon
          ></v-col
        >
        <v-col cols="6" class="pt-2">
          <v-card-title
            v-for="item in 17"
            :key="item"
            class="offall text-subtitle-1 pl-6"
            >{{ item }}. Обязанность</v-card-title
          >
        </v-col>
        <v-divider vertical class="green lighten-4"></v-divider>
        <v-col cols="6" class="pt-2"
          ><v-card-title
            v-for="item in 17"
            :key="item"
            class="offall text-subtitle-1 pl-6"
            >{{ item }}. Требование</v-card-title
          ></v-col
        >
      </v-row>
    </v-card>
  </div>
</template>


<script>
export default {
  data: () => ({
    top: 0,
    show: true,
  }),
  methods: {
    sc() {
      this.top = this.$refs.row.clientHeight + this.$refs.row.scrollTop - 40;
      if (
        this.$refs.row.clientHeight + this.$refs.row.scrollTop >=
        this.$refs.row.scrollHeight
      ) {
        this.show = false;
      } else {
        this.show = true;
      }
    },
  },
  mounted() {
    this.sc();
    this.$refs.row.addEventListener("scroll", this.sc);
  },
  beforeDestroy() {
    this.$refs.row.removeEventListener("scroll", this.sc);
  },
};
</script>


<style>
.hidden-scroll::-webkit-scrollbar {
  display: none;
}
</style>

<style scoped>
@keyframes opp {
  0% {
    opacity: 0.7;
    font-size: 30px;
    transform: translateY(0px);
  }
  25% {
    opacity: 0.53;
    font-size: 40px;
    transform: translateY(-20px);
  }
  50% {
    opacity: 0.7;
    font-size: 30px;
    transform: translateY(0px);
  }
  75% {
    opacity: 0.5;
    font-size: 40px;
    transform: translateY(-20px);
  }
  100% {
    opacity: 0.7;
    font-size: 30px;
    transform: translateY(0px);
  }
}
.anim {
  animation: opp 4s infinite ease-in-out;
}
</style>