const Plugin = {
  install(Vue) {
    Vue.prototype.$rules = {
      required: (v) => !!v || "Обязательное поле.",

      validationInn(value) {
        if (!/(\d+)/g.test(value) || /[a-zA-Z]/.test(value))
          return "ИНН должен содержать только цифры.";
        if (value.length != 10) return "ИНН должен содержать 10 цифр.";
        else return true;
      },

      validationPhone(value) {
        if (!/(\d+)/g.test(value) || /[a-zA-Z]/.test(value))
          return "Телефон должен содержать только цифры.";
        if (value.length != 18) return "Телефон должен содержать 11 цифр.";
        return true;
      },

      validationName(value) {
        if(value.length < 4) return "Слишком коротко";
        if(/[0-9]/.test(value)) return "Наименование не должно содержать числа.";
        return true;
      },

      validationAdress(value) {
        if(value.length < 7) return "Слишком коротко";
        return true;
      },

      validationMeasuringUnits(value) {
        if(/[0-9]/.test(value)) return "Наименование не должно содержать числа.";
        return true;
      },

      greater(min) {
        return function (value){
          if(value>min) return true
          return `Число должно быть больше ${min}`
        }

      }
    };
  },
};

export default Plugin;
