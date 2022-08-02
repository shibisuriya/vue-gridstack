<template>
  <div class="grid-stack">
    <slot></slot>
  </div>
</template>

<script>
import GridStack from "/node_modules/gridstack/dist/gridstack-h5.js";
import Vue from "vue";
import cloneDeep from "lodash/cloneDeep";
export default {
  props: {
    column: {
      type: Number,
      default: 12,
    },
    rowHeight: {
      type: String,
      default: "auto",
    },
    maxRows: {
      type: Number,
      default: 0,
    },
    minRows: {
      type: Number,
      default: 0,
    },
    margin: {
      default: function () {
        return 10;
      },
    },
    resizable: {
      default: function () {
        return { autoHide: true, handles: "se" };
      },
    },
    layout: {
      type: Array,
      required: true,
    },
    static: {
      type: Boolean,
      default: false,
    },
    alwaysShowResizeHandle: {
      type: Boolean,
      default: false,
    },

    float: {
      type: Boolean,
      default: false,
    },
    disableOneColumnMode: {
      type: Boolean,
      default: false,
    },
  },
  save() {},
  data() {
    return {
      masterGridOption: {
        column: this.column,
        cellHeight: this.rowHeight,
        margin: this.margin,
        maxRow: this.maxRows,
        minRow: this.minRows,
        resizable: this.resizable,
        staticGrid: this.static,
        alwaysShowResizeHandle: this.alwaysShowResizeHandle,
        float: this.float,
        disableOneColumnMode: this.disableOneColumnMode,
        acceptWidgets: true,
      },
      eventBus: new Vue(),
      initialLayout: null,
      grid: null,
    };
  },
  provide() {
    return {
      masterLayout: this,
      masterGridOption: this.masterGridOption,
      eventBus: this.eventBus,
    };
  },

  created() {
    const self = this;
    this.$nextTick(() => {
      self.initialLayout = cloneDeep(self.layout);
      self.grid = GridStack.init(self.masterGridOption);
    });
  },
  methods: {
    save() {
      return this.grid.save();
    },
    findIndexUsingId(id) {
      return this.initialLayout.findIndex((i) => i.id == id);
    },
    removeItem(id) {
      //const index = this.findIndexUsingId(id);
      const index = this.grid.engine.nodes.findIndex((n) => n.id == id);
      this.grid.removeWidget(this.grid.engine.nodes[index].el, false, true); // Emit remove event and remove the item from the array.
    },
    subscribeToMasterGridEvents() {
      const self = this;
      this.grid.on("removed", (event, items) => {
        items.forEach((i) => {
          self.eventBus.$emit("removed", i.id);
        });
      });
      this.grid.on("added", (event, items) => {
        items.forEach((i) => {
          const pos = {
            x: i.x,
            y: i.y,
            w: i.w,
            h: i.h,
          };
          self.eventBus.$emit("added", {
            id: i.id,
            pos: pos,
          });
        });
      });
      this.grid.on("change", (event, items) => {
        items.forEach((i, index) => {
          const pos = {
            x: i.x,
            y: i.y,
            w: i.w,
            h: i.h,
          };
          self.eventBus.$emit("change", {
            id: i.id,
            pos: pos,
            update: items.length == index + 1,
          });
        });
      });
    },
    subscribeToEventBusEvents() {
      const self = this;
      this.eventBus.$on("added", ({ id, pos }) => {
        self.initialLayout = cloneDeep(self.layout);
        const index = self.findIndexUsingId(id);
        Object.assign(self.initialLayout[index], pos);
        self.$emit("update:layout", cloneDeep(self.initialLayout));
      });
      this.eventBus.$on("removed", (id) => {
        const index = self.findIndexUsingId(id);
        self.initialLayout.splice(index, 1);
        self.$emit("update:layout", cloneDeep(self.initialLayout));
      });
      this.eventBus.$on("change", ({ id, pos, update = false }) => {
        const index = self.findIndexUsingId(id);
        Object.assign(self.initialLayout[index], pos);
        if (update == true) {
          self.$emit("update:layout", cloneDeep(self.initialLayout));
        }
      });
    },
  },
};
</script>

<style lang="scss">
@use "sass:math";
@import "gridstack/dist/gridstack.min.css";

.grid-stack > .grid-stack-item {
  $gridstack-columns: 96;

  min-width: math.div(100%, $gridstack-columns);

  @for $i from 0 through $gridstack-columns {
    &[gs-w="#{$i}"] {
      width: math.div(100%, $gridstack-columns) * $i;
    }
    &[gs-x="#{$i}"] {
      left: math.div(100%, $gridstack-columns) * $i;
    }
    &[gs-min-w="#{$i}"] {
      min-width: math.div(100%, $gridstack-columns) * $i;
    }
    &[gs-max-w="#{$i}"] {
      max-width: math.div(100%, $gridstack-columns) * $i;
    }
  }
}
.grid-stack {
  border: 1px solid red;
}
</style>
