<template>
  <div>
    <component :is="component" />
  </div>
</template>

<script>
export default {
  async fetch({ store, route }) {
   
  },
  async asyncData({ isMobile }) {
    return { component: isMobile ? "mobile" : "os" };
  },
  layout: ({ isMobile }) => (isMobile ? "mobile" : "default"),
  components: {
    os: () => import("~/components/os/card"),
    mobile: () => import("~/components/mobile/card"),
  },
};
</script>
