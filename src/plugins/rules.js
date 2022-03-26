const Plugin = {
  install(Vue) {
    Vue.prototype.$rules = {
      required: (v) => !!v || "Обязательное поле.",
    };
  },
};

export default Plugin;
