<template>
    <component :is="component" />
</template>

<script>
export default {
  async fetch({store, axios}){
    await store.dispatch("city/getcity")
    await store.dispatch("branch/getbranch")
  },
  async asyncData({ isMobile }) {
    return { component: isMobile ? "mobile" : "os" };
  },
  layout: ({ isMobile }) => (isMobile ? "mobile" : "default"),
  components: {
    os: () => import("~/components/os/general/index"),
    mobile: () => import("~/components/mobile/general/index"),
  },
  mounted() {
    if (process.client) {
      document.documentElement.scrollTop = 0;
    }
  },
};
</script>
