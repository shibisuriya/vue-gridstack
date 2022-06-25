<template>
  <div class="grid-stack">
    <slot></slot>
  </div>
</template>

<script>
import GridStack from "/node_modules/gridstack/dist/gridstack-h5.js";
import { eventBus } from "../main";
import Vue from "vue";
const MIN_ROW = 3;
const MASTER_GRID_INDEX = 0; // Master grid is the parent (.grid-stack) of all .grid-stack(s), this component supports nested grids.
export default {
  methods: {
    subscribeToEvents() {
      const self = this;
      self.grid.forEach((g) => {
        g.on("dropped dragstop drag resize", () => {
          const sections = self.grid[MASTER_GRID_INDEX].engine.nodes;
          sections.forEach((section) => {
            if (section.subGrid) {
              const subGrid = section.subGrid.engine.nodes;
              const maxHeight = Math.max(...subGrid.map((o) => o.y + o.h));

              if (subGrid.length == 0) {
                self.grid[MASTER_GRID_INDEX].update(section.el, { h: 3 });
              } else {
                self.grid[MASTER_GRID_INDEX].update(section.el, {
                  h: maxHeight + 1,
                });
              }
              return;
            }
          });
        });
      });
      eventBus.$on("shrink", (el, collapsed) => {
        if (collapsed) {
          self.grid[MASTER_GRID_INDEX].update(el, { h: 1 });
        } else {
          self.grid[MASTER_GRID_INDEX].update(el, { h: 8 });
        }
      });
      eventBus.$on("removeWidget", (el) => {
        self.grid.forEach((g) => g.removeWidget(el));
      });
      eventBus.$on("removeSection", (el) => {
        self.grid[MASTER_GRID_INDEX].removeWidget(el);
      });
    },
    save() {
      const self = this;
      let gridData = this.grid[MASTER_GRID_INDEX].save();

      gridData = gridData.map((item) => {
        if (item.content) {
          // This is a stand alone widget without any section.
          item["content"] = self.getDataFromHTML(item.content);
        } else if (item.subGrid.children) {
          // This is a section and contains widget inside it.
          item.subGrid.children = item.subGrid.children.map((child) => {
            child["content"] = self.getDataFromHTML(child.content);
            return child;
          });
        }
        return item;
      });
      this.$emit("save", gridData);
    },
    getDataFromHTML(html) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      return JSON.parse(doc.getElementById("gridstack-data").innerHTML);
    },
  },
  props: {
    layout: {
      required: true,
    },
  },
  watch: {
    layout: {
      // the callback will be called immediately after the start of the observation
      immediate: true,
      deep: true,
      handler(val, oldVal) {
        if (oldVal == undefined) {
          return;
        }
        val;
        oldVal;
        const self = this;

        Vue.nextTick(() => {
          // The next two statements don't make sense, but it makes the entire program work, too bad.
          const el =
            self.grid[MASTER_GRID_INDEX].el.children[
              self.grid[MASTER_GRID_INDEX].el.children.length - 1
            ];
          self.grid[MASTER_GRID_INDEX].makeWidget(el);
          const gs = GridStack.initAll({
            float: false,
            cellHeight: "70px",
            minRow: MIN_ROW,
            margin: 10,
            marginTop: 20,
            column: 12,
            acceptWidgets: true,
          });
          self.grid = gs;
          self.subscribeToEvents();
        });
      },
    },
  },
  created() {},
  mounted() {
    console.log(this.layout);
    const self = this;
    self.grid = GridStack.initAll({
      float: false,
      cellHeight: "70px",
      minRow: MIN_ROW,
      margin: 10,
      marginTop: 20,
      column: 12,
      acceptWidgets: true,
    });
    this.subscribeToEvents();
  },
};
</script>

<style lang="css">
.grid-stack {
  border: 1px solid red;
}
</style>
