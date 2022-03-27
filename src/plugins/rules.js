const Plugin = {
  install(Vue) {
    Vue.prototype.$rules = {
      required: (v) => !!v || "Обязательное поле.",

      validationInn(value) {
        if (!/(\d+)/g.test(value) || /[a-zA-Z]/.test(value))
          return "ИНН должен содержать только цифры.";
        if (value.length != 10) return "ИНН должен содержать 10 цифр.";
        return true;
      },

      validationPhone(value) {
        if (!/(\d+)/g.test(value) || /[a-zA-Z]/.test(value))
          return "Телефон должен содержать только цифры.";
        if (value.length != 11) return "Телефон должен содержать 11 цифр.";
        return true;
      },
    };
  },
};

export default Plugin;
