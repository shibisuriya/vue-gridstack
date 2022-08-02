<template>
  <div class="grid-stack grid-stack-nested">
    <slot></slot>
  </div>
</template>

<script>
import GridStack from "/node_modules/gridstack/dist/gridstack-h5.js";
import cloneDeep from "lodash/cloneDeep";
export default {
  data() {
    return {
      grid: null,
    };
  },
  provide() {
    return {
      subGridLayout: this,
    };
  },
  inject: ["masterGridOption", "eventBus"],
  created() {
    const self = this;
    this.$nextTick(() => {
      const subgridOptions = Object.assign(cloneDeep(self.masterGridOption), {
        acceptWidgets: (el) => {
          let stackElm = el.getElementsByClassName("grid-stack");
          console.log("stackElm: ", stackElm);
          if (stackElm && stackElm.length) {
            return false;
          } else {
            return true;
          }
        },
      });
      self.grid = GridStack.addGrid(self.$el, subgridOptions);
    });
  },
  methods: {
    subsribeToSubGridEvents() {
      const self = this;
      this.grid.on("change", (event, items) => {
        items.forEach((i) => {
          self.eventBus.$emit("change", i.id);
        });
      });
      this.grid.on("added", (event, items) => {
        items.forEach((i) => {
          self.eventBus.$emit("added", i.id);
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.grid-stack-nested {
  border: 1px solid blue;
}
</style>
