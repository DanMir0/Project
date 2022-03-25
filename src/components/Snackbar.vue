<template>
  <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      :color="color"
      shaped
      top
  >
    {{ text }}

    <template v-slot:action="{ attrs }">
      <v-btn
          color="primary"
          text
          v-bind="attrs"
          @click="snackbar = false"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import Plugin from '@/plugins/dialog'

export default {
  name: 'Snackbar',
  data() {
    return {
      snackbar: false,
      text: "Сохранено!",
      timeout: 4000,
      color: null
    }
  },
  methods: {
    show({message, color, timeout}) {
      this.text = message
      this.color = color || 'success'
      this.timeout = timeout || 4000
      this.snackbar = true
    },
  },
  beforeMount() {
    Plugin.rootInstance = this;
  }
}
</script>

<style scoped>

</style>