<template>
    <component :is="component" />
</template>

<script>
import os from "~/components/os/general/index"
import mobile from "~/components/mobile/general/index"
export default {
  //async fetch({store, axios}){
  //  await store.dispatch("city/getcity")
  //  await store.dispatch("branch/getbranch")
  //},
  async asyncData({ isMobile }) {
    return { component: isMobile ? "mobile" : "os" };
  },
  layout: ({ isMobile }) => (isMobile ? "mobile" : "default"),
  components: {
    os,
    mobile,
  },
  mounted() {
    if (process.client) {
      document.documentElement.scrollTop = 0;
    }
  },
};
</script>
