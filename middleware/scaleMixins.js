
export default {
    computed: {
        chekXl() {
            if (this.$vuetify.breakpoint.name == "xl") {
                return true;
            } else {
                return false;
            }
        },
        chekLg() {
            if (this.$vuetify.breakpoint.name == "lg") {
                return true;
            } else {
                return false;
            }
        },
        chekMd() {
            if (this.$vuetify.breakpoint.name == "md") {
                return true;
            } else {
                return false;
            }
        },
        chekSm() {
            if (this.$vuetify.breakpoint.name == "sm") {
                return true;
            } else {
                return false;
            }
        },
        chekXs() {
            if (this.$vuetify.breakpoint.name == "xs") {
                return true;
            } else {
                return false;
            }
        },
        scrollHeight() {
            var scrollHeight = Math.max(
                document.body.scrollHeight,
                document.documentElement.scrollHeight,
                document.body.offsetHeight,
                document.documentElement.offsetHeight,
                document.body.clientHeight,
                document.documentElement.clientHeight
            );
            return scrollHeight
        }
    }
}