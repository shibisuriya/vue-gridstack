<template>
  <div>
    <div>
      <button @click="
        () => {
          this.$refs['gridstackLayout'].save();
        }
      ">
        Save
      </button>
    </div>
    <div>
      {{ gridData }}
    </div>
    <div>
      <button @click="addSection">Add section</button>
      <button @click="addWidget">add widget</button>
    </div>
    <!-- Modifying the props from within a child component is a bad practice, if you want to get the current state of the grids,
		use @save event. The props passed into the gridstack-layout won't sync automatically (This method is followed in vue-grid-stack). -->
    <gridstack-layout @save="saveGrid" ref="gridstackLayout" :layout="layout" :static="false">
      <gridstack-item v-for="(section, index) in layout" :key="index" :item="section" @removeWidget="removeWidget">
        <gridstack-section v-if="section.hasOwnProperty('section')" @shrink="shrink">
          <gridstack-item v-for="(child, childIndex) in section.section" :item="child" :key="childIndex">
            <!-- Event is not emitted from componentA here...  -->
            <ComponentA v-if="child.component == 'a'" @testEvent="aEvent" />
            <ComponentB v-if="child.component == 'b'" />
            <ComponentC v-if="child.component == 'c'" />
          </gridstack-item>
        </gridstack-section>
        <template v-else>
          <ComponentA v-if="section.component == 'a'" @testEvent="aEvent" />
          <ComponentB v-if="section.component == 'b'" />
          <ComponentC v-if="section.component == 'c'" />
        </template>
      </gridstack-item>
    </gridstack-layout>
  </div>
</template>

<script>
import GridstackLayout from "./components/GridstackLayout.vue";
import GridstackItem from "./components/GridstackItem.vue";
import GridstackSection from "./components/GridstackSection.vue";
import ComponentA from "./widgets/ComponentA.vue";
import ComponentB from "./widgets/ComponentB.vue";
import ComponentC from "./widgets/ComponentC.vue";
// import { httpGetData } from "@/data/httpGetData";
import { serialize } from "@/utils/serialize";
// import { unserialize } from "@/utils/unserialize";

export default {
  components: {
    GridstackLayout,
    GridstackItem,
    GridstackSection,
    ComponentA,
    ComponentB,
    ComponentC,
  },
  methods: {
    addWidget() {
      this.layout.push({ x: 0, y: 0, w: 34, h: 14, component: "a" });
    },
    aEvent() {
      console.log("hello");
    },
    addSection() {
      this.layout.push({
        x: 0,
        y: 14,
        w: 96,
        h: 5,
        maxW: 96,
        minW: 96,
        noResize: true,
        collapsed: false,
        section: [{ x: 0, y: 0, w: 51, h: 16, component: "a" }],
      });
    },
    shrink(el) {
      this.$refs["gridstackLayout"].shrink(el);
    },
    saveGrid(gridData) {
      this.gridData = serialize(gridData);
    },
    removeWidget(el) {
      this.$refs["gridstackLayout"].removeWidget(el);
    },
  },
  mounted() { },
  created() {
    // this.layout = unserialize(httpGetData);
    this.layout = [
      { x: 1, y: 0, w: 37, h: 16, component: "a" },
      {
        x: 0,
        y: 16,
        w: 96,
        h: 22,
        maxW: 96,
        minW: 96,
        noResize: true,
        collapsed: false,
        section: [{ x: 0, y: 0, w: 48, h: 21, component: "c" }],
      },
    ],
    console.log(this.layout);
  },
  data() {
    return {
      layoutCopy: null,
      gridData: null,
      layout: [],
    };
  },
};
</script>

<style lang="css" scoped>
button {
  display: block;
}
</style>
