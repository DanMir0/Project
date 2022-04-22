const Plugin = {
  install(Vue) {
    Vue.prototype.$rules = {
      required: (v) => !!v || "Обязательное поле.",

      validationPhone(value) {
        if (!/(\d+)/g.test(value) || /[a-zA-Z]/.test(value))
          return "Телефон должен содержать только цифры.";
        if (value.length != 18) return "Телефон должен содержать 11 цифр.";
        return true;
      },

      validationName(value) {
        // if(value.length < 4) return "Слишком коротко";
        if(/[0-9]/.test(value)) return "Наименование не должно содержать числа.";
        return true;
      },
        validatinNumber(value) {
            if (!/(\d+)/g.test(value) || /[a-zA-Z]/.test(value))
                return "Поле должно содержать только цифры.";
            return true
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
