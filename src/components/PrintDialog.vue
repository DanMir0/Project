<template>
  <v-dialog
      v-bind="$attrs"
      v-on="$listeners"
      max-width="90%">
    <template v-slot:activator="{ on, attrs }">
      <slot name="activator" v-bind="{on, attrs}">
        <v-btn
            color="secondary"
            dark
            v-bind="attrs"
            v-on="on">
           Печать
            <v-icon right>mdi-printer </v-icon>
        </v-btn>
      </slot>
    </template>
    <v-card>
      <div class="print-preview">
        <div class="print-page">
          <div ref="el" class="print-area">
            <slot></slot>
          </div>
        </div>
      </div>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="print">PRINT
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Printd from "@/common/printd";

export default {
  name: 'PrintDialog',
  data() {
    return {
      printd: null,
    }
  },
  mounted() {

  },
  beforeDestroy() {
    if (this.printd) this.printd.destroy()
  },
  methods: {
    print() {
      if (!this.printd) this.printd = new Printd()
      this.printd.print(this.$refs.el)
    }
  }
}
</script>

<style lang="scss">
.print-preview {
  padding: 2rem;
  height: 75vh;
  overflow: auto;

  .print-page {
    border: 1px #D3D3D3 solid;
    border-radius: 5px;
    background: white;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    width: 210mm;
    min-height: 297mm;
    padding: 10mm;
    margin: 10mm auto;
  }

  .print-area {
    @import "src/styles/print";
  }
}
</style>
