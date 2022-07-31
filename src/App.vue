<template>
  <div>
    <div>
      <button @click="addComponent">Add component</button>
      <button @click="addSection">Add section</button>
    </div>
    <div>
      {{ layout }}
    </div>
    <div>
      <gridstack-layout
        ref="gridstackLayout"
        :layout.sync="layout"
        :column="96"
        :rowHeight="'15px'"
        :disableOneColumnMode="true"
        :minRows="15"
      >
        <gridstack-item
          v-for="item in layout"
          :key="item.id"
          :x="item.x"
          :y="item.y"
          :h="item.h"
          :w="item.w"
          :id="item.id"
        >
          <section-container v-if="item.hasOwnProperty('children')">
            <gridstack-section>
              <gridstack-item
                v-for="child in item.children"
                :key="child.id"
                :id="child.id"
                :x="child.x"
                :y="child.y"
                :h="child.h"
                :w="child.w"
              >
                <CardComponent @remove="removeWidget(child.id)"></CardComponent>
              </gridstack-item>
            </gridstack-section>
          </section-container>
          <template v-else>
            <CardComponent
              @remove="removeWidget(item.id)"
              :id="item.id"
            ></CardComponent>
          </template>
        </gridstack-item>
      </gridstack-layout>
    </div>
  </div>
</template>

<script>
import GridstackItem from "./components/GridstackItem.vue";
import GridstackLayout from "./components/GridstackLayout.vue";
import CardComponent from "./widgets/CardComponent.vue";
import GridstackSection from "./components/GridstackSection.vue";
import SectionContainer from "./components/SectionContainer.vue";
//import GridstackSection from "./components/GridstackSection.vue";
export default {
  data() {
    return {
      layout: [
        { id: "-1659263211966", x: 31, y: 30, w: 40, h: 10, data: {} },
        { id: "-1659263212116", x: 20, y: 0, w: 40, h: 10, data: {} },
        { id: "-1659263212450", x: 38, y: 10, w: 40, h: 10, data: {} },
        { id: "-1659263212616", x: 20, y: 20, w: 40, h: 10, data: {} },
      ],
    };
  },
  components: {
    GridstackItem,
    GridstackLayout,
    CardComponent,
    GridstackSection,
    SectionContainer,
  },
  methods: {
    addSection() {
      const section = {
        id: Date.now() * -1 + "",
        x: 1,
        y: 1,
        w: 96,
        h: 10,
        section: [
          // {
          //   id: Date.now() * -1 + 1 + "",
          //   x: 1,
          //   y: 1,
          //   w: 40,
          //   h: 3,
          // },
        ],
      };
      this.layout.push(section);
    },
    removeWidget(widgetId) {
      this.$refs["gridstackLayout"].removeItem(widgetId);
      // console.log(widgetId);
      // const index = this.layout.findIndex((w) => w.id == widgetId);
      // this.layout.splice(index, 1);
    },
    addComponent() {
      const widget = {
        id: Date.now() * -1 + "",
        x: 1,
        y: 1,
        w: 40,
        h: 10,
        data: {},
      };
      this.layout.push(widget);
    },
  },
};
</script>

<style lang="css" scoped></style>
