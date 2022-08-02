<template>
  <div class="grid-stack grid-stack-nested">
    <slot></slot>
  </div>
</template>

<script>
import GridStack from "/node_modules/gridstack/dist/gridstack-h5.js";
import cloneDeep from "lodash/cloneDeep";
import { findIndicesUsingId } from "../lib/util";

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
  inject: ["masterGridOption", "eventBus", "masterLayout"],
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
      self.subsribeToSubGridEvents();
      this.$nextTick(() => {
        self.grid.float(self.masterLayout.float);
      });
    });
  },
  methods: {
    subsribeToSubGridEvents() {
      const self = this;
      this.grid.on("change", (event, items) => {
        const layout = cloneDeep(self.masterLayout.layout);
        items.forEach((i) => {
          const { w } = findIndicesUsingId(i.id, layout);
          const pos = {
            x: i.x,
            y: i.y,
            w: i.w,
            h: i.h,
          };
          Object.assign(w, pos);
        });
        self.eventBus.$emit("subgridUpdated", layout);
      });
      this.grid.on("added", (event, items) => {
        const layout = cloneDeep(self.masterLayout.layout);
        items.forEach((i) => {
          const { w } = findIndicesUsingId(i.id, layout);

          const pos = {
            x: i.x,
            y: i.y,
            w: i.w,
            h: i.h,
          };
          Object.assign(w, pos);
        });
        self.eventBus.$emit("subgridUpdated", layout);
        // self.$emit("refresh");
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
