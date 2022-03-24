const Plugin = {
    install(Vue) {

        this.rootInstance = null


        Vue.prototype.$dialog = {
            alert(message) {
                return Plugin.rootInstance.show({message, color: 'red accent-2'})
            },

            success(message) {
                return Plugin.rootInstance.show({message, color: 'success'})
            },

        }
    }
}

export default Plugin
