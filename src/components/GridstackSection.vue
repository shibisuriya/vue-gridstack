<template>
  <div class="grid-stack">
    <slot></slot>
  </div>
</template>

<script>
// import { eventBus } from "@/main";
import GridStack from "/node_modules/gridstack/dist/gridstack-h5.js";
// import cloneDeep from 'lodash/cloneDeep'
export default {
  data() {
    return {
      subGridObj: null,
    };
  },
  inject: ["masterGridObj", "masterGridOption", "eventBus"],
  mounted() {
    this.subGridObj = GridStack.addGrid(this.$el, this.masterGridOption);
    this._provided.subGridObj = this.subGridObj;
    this.subsribeToSubGridEvents();
  },
  provide() {
    return {
      subGridObj: null,
    };
  },
  methods: {
    subsribeToSubGridEvents() {
      const self = this;
      this.subGridObj.on("change", (event, items) => {
        items.forEach((i) => {
          self.eventBus.$emit('change', i.id)
        });
        console.log("section -> ", event, " -> ", items);
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
