<template>
  <div class="grid-stack">
    <slot></slot>
  </div>
</template>

<script>
import GridStack from "/node_modules/gridstack/dist/gridstack-h5.js";
import { eventBus } from "../main";
import Vue from "vue";
const MIN_ROW = 15;
const MASTER_GRID_INDEX = 0; // Master grid is the parent (.grid-stack) of all .grid-stack(s), this component supports nested grids.
export default {
  methods: {

    subscribeToAdjustSectionHeight() {
      // This method is used to adjust the height of a gridstack section when we resize / re-arrange
      // the items present inside the gridstack layout.
      const { grid } = this || {}
      grid.forEach((g) => {
        g.on("dragstop drag resize removed", (event) => {
          // This callback also gets called when the props to build the gridstack layout changes,
          // because we destory the gridstack instances when a new widget or section is pushed
          // to the layout array, when we destroy a gridstack instance this callback is called
          console.log(event.type)
          const sections = grid[MASTER_GRID_INDEX]?.engine?.nodes;
          if (!sections)
            return
          sections.forEach((section) => {
            if (section.subGrid) {
              if (section.el.getAttribute("gs-collapsed")) {
                return;
              }
              const subGrid = section.subGrid.engine.nodes;
              const maxHeight = Math.max(...subGrid.map((o) => o.y + o.h));

              if (subGrid.length == 0) {
                grid[MASTER_GRID_INDEX].update(section.el, { h: MIN_ROW + 6 });
              } else {
                grid[MASTER_GRID_INDEX].update(section.el, {
                  h: maxHeight + 6,
                });
              }
              return;
            }
          });
        });
      });
    },
    subscribeToShrink() {
      eventBus.$on("shrink", (el, collapsed) => {
        const { grid } = this || {}
        if (collapsed) {
          grid[MASTER_GRID_INDEX].update(el, { h: 5 });
        } else {
          const sectionsArray = grid[MASTER_GRID_INDEX].getGridItems();
          const index = sectionsArray.indexOf(el);
          const subGridNodes =
            sectionsArray[index].gridstackNode.subGrid.engine.nodes;
          let maxHeight = 15;
          if (subGridNodes.length > 0) {
            maxHeight = Math.max(...subGridNodes.map((o) => o.y + o.h));
          }
          grid[MASTER_GRID_INDEX].update(el, { h: maxHeight + 6 });
        }
      });
    },
    subscribeToRemoveWidget() {
      eventBus.$on("removeWidget", (el) => {
        const { grid } = this || {}
        grid.forEach((g) => g.removeWidget(el));
      });
    },
    subscribeToRemoveSection() {
      eventBus.$on("removeSection", (el) => {
        const { grid } = this || {}
        grid[MASTER_GRID_INDEX].removeWidget(el);
      });

    },
    subscribeToEvents() {
      this.subscribeToAdjustSectionHeight()
      this.subscribeToShrink()
      this.subscribeToRemoveWidget()
      this.subscribeToRemoveSection()
    },
    getCurrentState() {
      const self = this;
      let gridData = this.grid[MASTER_GRID_INDEX].save();

      gridData = gridData.map((item) => {
        if (item.content) {
          // This is a stand alone widget without any section.
          let propItem = self.getDataFromHTML(item.content).item;
          delete propItem.x;
          delete propItem.y;
          delete propItem.w;
          delete propItem.h;
          delete item.content;
          item = { ...item, ...propItem };
        } else if (item.subGrid.children) {
          // This is a section and contains widget inside it.
          if (item.h == 5) {
            item.collapsed = true;
          } else {
            item.collapsed = false;
          }
          item.section = item.subGrid.children.map((child) => {
            let childItem = self.getDataFromHTML(child.content).item;
            delete childItem.x;
            delete childItem.y;
            delete childItem.w;
            delete childItem.h;
            child = { ...child, ...childItem };
            delete child.content;
            return child;
          });
          delete item.subGrid;
        }
        return item;
      });
      return gridData
    },
    save() {
      const gridData = this.getCurrentState() 
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
    static: {
      default: false,
    },
  },
  watch: {
    layout: {
      // the callback will be called immediately after the start of the observation
      immediate: true,
      deep: true,
      handler(newVal, oldVal) {
        if (oldVal == undefined) {
          // This is the first time the prop (layout) is recieved by the component... 
          return;
        }
        const self = this;
        // Each time the prop from the parent component changes this watcher will destroy gs layout,
        // and create a new gs layout.
        self.grid.forEach(g => g.destroy(false)) // if false is passed to destroy() the DOM nodes are not removed, just the gridstack instance is destoried.
        Vue.nextTick(() => {
          const gs = GridStack.initAll({
            disableOneColumnMode: true,
            cellHeight: "15px", // Magic number, best value according to me...
            staticGrid: this.static,
            float: false,
            minRow: MIN_ROW,
            column: 96,
            acceptWidgets: true,
          });
          self.grid = gs;
          self.subscribeToEvents();
        });
      },
    },
  },
  created() {

  },
  mounted() {
    const self = this;
    self.grid = GridStack.initAll({
      cellHeight: "15px", // Magic number, best value according to me...

      disableOneColumnMode: true,
      staticGrid: this.static,
      float: false,
      minRow: MIN_ROW,
      column: 96,
      acceptWidgets: true,
    });
    this.subscribeToEvents();
  },
};
</script>

<style lang="scss">
@use "sass:math";
@import "/node_modules/gridstack/dist/gridstack.min.css";
@import "/node_modules/gridstack/dist/gridstack-extra.css";

.grid-stack>.grid-stack-item {
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
