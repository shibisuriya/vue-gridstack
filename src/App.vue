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
          <CardComponent
            @remove="removeWidget(item.id)"
            :id="item.id"
          ></CardComponent>
        </gridstack-item>
      </gridstack-layout>
    </div>
  </div>
</template>

<script>
import GridstackItem from "./components/GridstackItem.vue";
import GridstackLayout from "./components/GridstackLayout.vue";
import CardComponent from "./widgets/CardComponent.vue";
//import GridstackSection from "./components/GridstackSection.vue";
export default {
  data() {
    return {
      layout: [],
    };
  },
  components: {
    GridstackItem,
    GridstackLayout,
    CardComponent,
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
    },
    addComponent() {
      const widget = {
        id: Date.now() * -1 + "",
        x: 1,
        y: 0,
        w: 39,
        h: 10,
        data: {},
      };
      this.layout.push(widget);
    },
  },
};
</script>

<style lang="css" scoped></style>
