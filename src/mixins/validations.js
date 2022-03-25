export default {
    data() {
        return {
            validForm: true,
        }
    },
    methods: {
        validate() {
            this.$refs.form.validate()
            return this.validForm
        },
    }
}