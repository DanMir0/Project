<template>
    <v-alert
        v-if="show"
        dense
        color="red lighten-4"
    >
        <v-text-field
            label="Path"
            hide-details
            outlined
            dense
            :value="$route.path"
            single-line
        ></v-text-field>
    </v-alert>
</template>

<script>
export default {
    name: 'DebugPanel',
    data() {
        return {
            show: false
        }
    },
    created() {
        this.show = process.env.NODE_ENV !== 'production'
    }
}
</script>

<style scoped>

</style>
