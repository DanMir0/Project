const Plugin = {
  install(Vue) {
    Vue.prototype.$rules = {
      required: (v) => !!v || "Обязательное поле.",
      inn (value) {
        if ((/\d+/).test(value)) {
          return  true
        } else {
          return "Неверный ИНН"
        }
      }
    };
  },
};

export default Plugin;
