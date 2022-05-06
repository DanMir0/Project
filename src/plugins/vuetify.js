import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import "@mdi/font/css/materialdesignicons.css"
import ru from 'vuetify/lib/locale/ru'

Vue.use(Vuetify);

export default new Vuetify({
    lang: {
        locales: { ru },
        current: 'ru',
    },
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
