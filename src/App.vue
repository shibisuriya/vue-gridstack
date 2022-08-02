<template>
  <div>
    <div>
      {{ saveData }}
    </div>
    <div>
      <button @click="addComponent">Add component</button>
      <button @click="addSection">Add section</button>
      <button @click="save">Save</button>
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
          <section-container v-if="item.children">
            <gridstack-section :item="item">
              <gridstack-item
                v-for="child in item.children"
                :key="child.id"
                :x="child.x"
                :y="child.y"
                :h="child.h"
                :w="child.w"
                :id="child.id"
              >
                <CardComponent
                  @remove="removeWidget(child.id)"
                  :id="item.id"
                ></CardComponent>
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
export default {
  data() {
    return {
      layout: [
        {
          id: "-1659421911939",
          x: 1,
          y: 1,
          w: 96,
          h: 10,
          children: [{ id: "-1659421911938", x: 30, y: 1, w: 40, h: 5 }],
        },
      ],
      saveData: null,
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
    save() {
      this.saveData = this.$refs["gridstackLayout"].save();
    },
    addSection() {
      const section = {
        id: Date.now() * -1 + "",
        x: 1,
        y: 1,
        w: 96,
        h: 10,
        children: [
          {
            id: Date.now() * -1 + 1 + "",
            x: 1,
            y: 1,
            w: 40,
            h: 5,
          },
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
