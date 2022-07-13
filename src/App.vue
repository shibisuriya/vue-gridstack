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
      <gridstack-item v-for="(section, index) in layout" :key="index" :item="section" @duplicate="duplicate">
        <gridstack-section v-if="section.hasOwnProperty('section')">
          <gridstack-item v-for="(child, childIndex) in section.section" :item="child" :key="childIndex">
            <!-- Event is not emitted from componentA here...  -->
            <CardComponent v-if="child.component == 'CardComponent'" />
            <ImageComponent v-if="child.component == 'ImageComponent'" />
            <TextComponent v-if="child.component == 'TextComponent'" />
            <ComponentComponent v-if="child.component == 'ComponentComponent'" />

          </gridstack-item>
        </gridstack-section>
        <template v-else>
          <CardComponent v-if="section.component == 'CardComponent'" />
          <ImageComponent v-if="section.component == 'ImageComponent'" />
          <TextComponent v-if="section.component == 'TextComponent'"  />
          <ComponentComponent v-if="section.component == 'ComponentComponent'" />
        </template>
      </gridstack-item>
    </gridstack-layout>
  </div>
</template>

<script>
import GridstackLayout from "./components/GridstackLayout.vue";
import GridstackItem from "./components/GridstackItem.vue";
import GridstackSection from "./components/GridstackSection.vue";
import TextComponent from "./widgets/TextComponent.vue";
import ComponentComponent from "./widgets/ComponentComponent.vue";
import ImageComponent from "./widgets/ImageComponent.vue";
import CardComponent from "./widgets/CardComponent.vue";
// import { httpGetData } from "@/data/httpGetData";
import { serialize } from "@/utils/serialize";
// import { unserialize } from "@/utils/unserialize";

export default {
  components: {
    GridstackLayout,
    GridstackItem,
    GridstackSection,
    CardComponent,
    ImageComponent,
    ComponentComponent,
    TextComponent,
  },
  methods: {
    addWidget() {
      this.layout.push({ x: 0, y: 0, w: 37, h: 16, component: "a" });
    },
    duplicate(widgetData) {
      console.log(widgetData)
      this.layout.push(widgetData)
    },
    addSection() {
      this.layout.push(
        {
          x: 0,
          y: 0,
          w: 96,
          h: 23,
          maxW: 96,
          minW: 96,
          noResize: true,
          collapsed: false,
          section: [{ x: 0, y: 0, w: 49, h: 17, component: "ComponentComponent" }],
        },
        { x: 0, y: 0, w: 49, h: 17, component: "CardComponent" },
        { x: 0, y: 0, w: 49, h: 17, component: "ImageComponent" },
        { x: 0, y: 0, w: 49, h: 17, component: "TextComponent" }
      );
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
      {
        x: 0,
        y: 0,
        w: 96,
        h: 23,
        maxW: 96,
        minW: 96,
        noResize: true,
        collapsed: false,
        section: [{ x: 0, y: 0, w: 49, h: 17, component: "CardComponent" },],
      },
     
      { x: 0, y: 0, w: 49, h: 17, component: "ImageComponent" },
      { x: 0, y: 0, w: 49, h: 17, component: "TextComponent" },
      { x: 0, y: 0, w: 49, h: 17, component: "ComponentComponent" }
    ]
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
