<template>
  <div
    :class="{ 'grid-stack-item': loaded }"
    style="border: 1px solid black"
    :gs-id="id"
    :gs-x="x"
    :gs-y="y"
    :gs-w="w"
    :gs-h="h"
    :gs-min-w="minW"
    :gs-min-h="minH"
    :gs-max-w="maxW"
    :gs-max-h="maxH"
    :gs-no-resize="resize"
    :gs-no-move="move"
    :gs-locked="locked"
  >
    <div :class="{ 'grid-stack-item-content': loaded }">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    x: {
      type: Number,
      required: true,
    },
    y: {
      type: Number,
      required: true,
    },
    w: {
      type: Number,
      required: true,
    },
    h: {
      type: Number,
      required: true,
    },
    minW: {
      type: Number,
      default: 0,
    },
    minH: {
      type: Number,
      default: 0,
    },
    maxW: {
      type: Number,
      default: 0,
    },
    maxH: {
      type: Number,
      default: 0,
    },
    resize: {
      type: Boolean,
      default: false,
    },
    locked: {
      type: Boolean,
      default: false,
    },
    move: {
      type: Boolean,
      default: false,
    },
    resizeHandles: {
      type: String,
      default: null,
    },
    noScroll: {
      // Show scroll on gridItem or not...
      type: Boolean,
      default: false,
    },
  },
  inject: {
    masterLayout: {
      default: null,
    },
    subGridLayout: {
      default: null,
    },
  },
  data() {
    return {
      loaded: false,
    };
  },
  beforeMount() {
    this.id;
    console.log("Created of gridstackItem");
  },
  created() {
    const self = this;
    this.$nextTick(() => {
      self.id;
      self.loaded = true;
      if (self.subGridLayout?.grid) {
        self.subGridLayout.grid.makeWidget(self.$el);
      } else if (self.masterLayout?.grid) {
        self.masterLayout.grid.makeWidget(self.$el);
      }
    });
  },
  beforeDestroy() {
    if (this.subGridLayout.grid) {
      this.subGridLayout.grid.removeWidget(this.$el, true, false);
    } else if (this.masterLayout.grid) {
      this.masterGrid.grid.removeWidget(this.$el, true, false);
    }
  },
};
</script>

<style lang="css" scoped></style>
