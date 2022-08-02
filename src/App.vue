<template>
  <div>
    <!-- <div>
      {{ saveData }}
    </div> -->
    <div>
      <button @click="addComponent">Add component</button>
      <button @click="addSection">Add section</button>
      <!-- <button @click="save">Save</button> -->
      <button @click="saveInCookie">SaveIncookie</button>
    </div>
    <div>
      {{ layout }}
    </div>
    <div>
      <gridstack-layout
        @refresh="refresh"
        ref="gridstackLayout"
        :layout.sync="layout"
        :column="96"
        :rowHeight="'15px'"
        :disableOneColumnMode="true"
        :minRows="15"
        :float="false"
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
                  :id="child.id"
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
      uid: -1,
      layout: [
        // {
        //   id: "-1",
        //   x: 0,
        //   y: 0,
        //   w: 96,
        //   h: 31,
        //   children: [
        //     { id: "-2", x: 50, y: 5, w: 2, h: 12 },
        //     { id: "-4", x: 12, y: 0, w: 40, h: 5 },
        //     { id: "-3", x: 12, y: 0, w: 40, h: 5 },

        //   ],
        // },
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
    refresh() {
      this.saveInCookie();
    },
    saveInCookie() {
      localStorage.setItem("data", JSON.stringify(this.layout));
    },
    // save() {
    //   this.saveData = this.$refs["gridstackLayout"].save();
    // },
    get_uid() {
      return String(this.uid--);
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
        id: this.get_uid(),
        x: 1,
        y: 0,
        w: 39,
        h: 10,
        data: {},
      };
      this.layout.push(widget);
    },
  },
  mounted() {
    this.layout = JSON.parse(localStorage.getItem("data")) || [];
  },
};
</script>

<style lang="css" scoped></style>
