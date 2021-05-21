<template>
  <v-container fluid class="offall pt-4 px-2" style="height:74%">
    <v-row no-gutters style="height:100%">
      <v-col cols="12">
        <my-friend/>
      </v-col>
      <v-col v-for="(k, n) in concat" :key="n" cols="3">
        <v-row no-gutters justify="center">
          <my-avatar :size="44" :value="k.avatar" :link="k.userLogin"/>
        </v-row>
        <v-row no-gutters justify="center" class="mt-1">
          {{ name(k.fio) }}
        </v-row>
      </v-col>
      <v-col cols="12" class="d-flex align-end justify-end mb-md-10"
        ><search-friend
      /></v-col>
    </v-row>
  </v-container>
</template>


<script>
import searchFriend from "./searchfriend";
import myFriend from "./myfriend";
export default {
  components: {
    searchFriend,
    myFriend
  },
  computed: {
    myFriend() {
      return this.$store.getters["friend/myfriend"];
    },
    waitFriend() {
      return this.$store.getters["friend/waitfriend"];
    },
    concat() {
      return this.myFriend.concat(this.waitFriend);
    },
  },
  methods: {
    name(value) {
      if (value == "" || value == null) {
        return "Имя";
      }
      let a = value.split(" ");
      return a[1];
    },
  },
};
</script>