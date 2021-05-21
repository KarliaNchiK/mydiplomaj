import Vue from 'vue'
import Vuetify from 'vuetify'
import colors from 'vuetify/es5/util/colors'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'spinkit/spinkit.css'

Vue.use(Vuetify)
export default new Vuetify({
    customVariables: ['~/assets/variables.scss'],
    theme: {
        dark: false,
        themes: {
            dark: {
                primary: colors.blue.darken2,
                accent: colors.grey.darken3,
                secondary: colors.amber.darken3,
                info: colors.teal.lighten1,
                warning: colors.amber.base,
                error: colors.deepOrange.accent4,
                success: colors.green.accent3,
                backgr: colors.grey.darken4,
                textcolor: colors.green.lighten5,
                cardcolor: "#2f496e",
            },
            light:{
                backgr: colors.grey.lighten4,
                cardcolor: '#94c5e7',
                textcolor:'#0f1b08',
            }
        }
    }
})