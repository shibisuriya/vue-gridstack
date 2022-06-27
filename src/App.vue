<template>
  <div>
    <div>
      <button
        @click="
          () => {
            this.$refs['gridstackLayout'].save();
          }
        "
      >
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
    <gridstack-layout @save="saveGrid" ref="gridstackLayout" :layout="layout">
      <gridstack-item
        v-for="(section, index) in layout"
        :key="index"
        :item="section"
        @removeWidget="removeWidget"
      >
        <gridstack-section
          v-if="section.hasOwnProperty('section')"
          @shrink="shrink"
        >
          <gridstack-item
            v-for="(child, childIndex) in section.section"
            :item="child"
            :key="childIndex"
          >
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
      this.layout.push({
        component: "c",
        x: 0,
        y: 0,
        w: 50,
        h: 2,
      });
    },
    aEvent() {
      console.log("hello");
    },
    addSection() {
      this.layout.push({
        section: [
          {
            x: 1,
            y: 2,
            w: 2,
            h: 2,
            component: "a",
          },
        ],
        x: 1,
        y: 2,
        w: 12,
        h: 2,
      });
    },
    shrink(el) {
      this.$refs["gridstackLayout"].shrink(el);
    },
    saveGrid(gridData) {
      this.gridData = gridData;
      console.log(gridData);
    },
    removeWidget(el) {
      this.$refs["gridstackLayout"].removeWidget(el);
    },
  },
  mounted() {},
  data() {
    return {
      layoutCopy: null,
      gridData: null,
      layout: [
        { x: 0, y: 0, w: 50, h: 2, component: "c" },
        {
          x: 0,
          y: 2,
          w: 96,
          h: 3,
          maxW: 96,
          minW: 96,
          noResize: true,
          collapsed: false,
          section: [{ x: 0, y: 0, w: 55, h: 2, component: "a" }],
        },
      ],
    };
  },
};
</script>

<style lang="css" scoped>
button {
  display: block;
}
</style>
