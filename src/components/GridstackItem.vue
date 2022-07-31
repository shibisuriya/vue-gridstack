<template>
  <div
    class="grid-stack-item"
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
    <div class="grid-stack-item-content">
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
  mounted() {
    if (this.subGridObj) {
      this.subGridObj.makeWidget(this.$el);
    } else if (this.masterGridObj) {
      this.masterGridObj.makeWidget(this.$el);
    }
  },
  beforeDestroy() {
    this.masterGridObj.removeWidget(this.$el, true, false);
  },
  inject: {
    masterGridObj: {
      default: null,
    },
    subGridObj: {
      default: null,
    },
  },
};
</script>

<style lang="css" scoped></style>
