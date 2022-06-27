<template>
  <div class="grid-stack-item" v-bind="gridItemAttr">
    <div :class="gridContentClass">
      <div style="display: none" id="gridstack-data">{{ getComponent }}</div>
      <button v-if="item.section" class="remove-section" @click="removeSection">Remove Section</button>
      <button v-else @click="removeWidget">Remove Widget</button>

      <button class="shrink-button" v-if="item.section" @click="shrink">
        Shrink
      </button>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { eventBus } from "../main";

export default {
  mounted() {
    if (this.item.section) {
      this.collapsed = this.item.collapsed
    } 
  },
  methods: {
    removeWidget(event) {
      eventBus.$emit("removeWidget", event.path[2]);
    },
    removeSection(event) {
      eventBus.$emit("removeSection", event.path[2]);
    },
    shrink(event) {
      this.collapsed = !this.collapsed;
      eventBus.$emit("shrink", event.path[2], this.collapsed);

      // console.log(event.path[3])
      // this.collapsed = !this.collapsed
      // this.$emit('shrink', event.path[4] )
    },
  },
  data() {
    return {
      collapsed: false,
    };
  },
  computed: {
    gridContentClass() {
      return {
        "grid-stack-item-content": true,
        "grid-stack-nested-item": !!this.item.section,
      };
    },

    getComponent() {
      return {
        // component: this.item.component,
        // otherData:
        //   "... Data which has been passed as props to grid-stack-item ... ",
        item: this.item
      };
    },
    gridItemAttr() {
      let attr = {
        "gs-x": this.item.x,
        "gs-y": this.item.y,
        "gs-w": this.item.w,
        "gs-h": this.item.h,
        "gs-removable": true,
        "gs-min-w": this.item.minW,
        "gs-min-h": this.item.minH
      };
      if (this.item.section) {
        attr["gs-max-w"] = 96;
        attr["gs-min-w"] = 96;
        attr["gs-no-resize"] = "true";
        attr["gs-collapsed"] = this.collapsed;
      }
      // The id attribute is used while adding a new widget (Grid item).
      // For more information refer gridstack's makeWidget().

      return attr;
    },
  },
  props: {
    item: {
      required: true,
      type: Object,
    },
  },
};
</script>

<style lang="css" scoped>
.grid-stack-item-content {
  border: 1px solid black;
}

.grid-stack-placeholder {
  border: 10px dashed red;
}

.grid-stack-nested-item {
  background-color: rgb(203, 123, 123);
  overflow: hidden !important;
}

.shrink-button {
  box-sizing: border-box;
  height: 50px;
  display: block;
  width: 100%;
  background-color: red;
}

.remove-section {
  position: absolute;
  right: 0;
  top: 0;
  height: 50px;
  box-sizing: border-box;
  display: inline;
}
</style>
