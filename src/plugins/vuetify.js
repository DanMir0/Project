import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import "@mdi/font/css/materialdesignicons.css"

Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        iconfont: 'mdi',
    },
    theme: {
        options: {
            customProperties: true,
        },
        themes: {
            light: {
                primary: '#9155FD',
                accent: '#0d6efd',
                secondary: '#8A8D93',
                success: '#56CA00',
                info: '#16B1FF',
                warning: '#FFB400',
                error: '#FF4C51',
            },
        },
    },
});
