const Plugin = {
    install(Vue) {
        Vue.prototype.$rules = {
            required: (v) => !!v || 'required'
        }
    }
}

export default Plugin
