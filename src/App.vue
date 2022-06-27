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
    <gridstack-layout @save="saveGrid" ref="gridstackLayout" :layout="layout">
      <gridstack-item v-for="(section, index) in layout" :key="index" :item="section" @removeWidget="removeWidget">
        <gridstack-section v-if="section.hasOwnProperty('section')" @shrink="shrink">
          <gridstack-item v-for="(
							child, childIndex
						) in section.section" :item="child" :key="childIndex">
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
        w: 2,
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
  mounted() {
  },
  data() {
    return {
      layoutCopy: null,
      gridData: null,
      layout: [
        {
          "i": "22369",
          "x": 0,
          "y": 0,
          "w": 55,
          "h": 18,
          "widget": {
            "widgetSettings": {
              "excludeDbFilters": false,
              "showHelpText": false
            },
            "layout": {
              "width": 55,
              "x": 0,
              "y": 0,
              "position": 6,
              "height": 18
            },
            "mLayout": {
              "width": null,
              "x": null,
              "y": null,
              "position": null,
              "height": null
            },
            "helpText": null,
            "header": {
              "subtitle": null,
              "title": null,
              "export": false
            },
            "dataOptions": {
              "dataurl": "",
              "refresh_interval": 0,
              "paramsJson": null,
              "name": "dummy",
              "staticKey": "textcard",
              "metaJson": "<p>test</p>"
            },
            "id": 22369,
            "type": "static",
            "widgetVsWorkflowContexts": []
          },
          "minW": 4,
          "minH": 4
        },
        {
          "i": "22370",
          "x": 55,
          "y": 0,
          "w": 40,
          "h": 20,
          "widget": {
            "widgetSettings": {
              "excludeDbFilters": false,
              "showHelpText": false
            },
            "layout": {
              "width": 40,
              "x": 55,
              "y": 0,
              "position": 7,
              "height": 20
            },
            "mLayout": {
              "width": null,
              "x": null,
              "y": null,
              "position": null,
              "height": null
            },
            "helpText": null,
            "header": {
              "subtitle": null,
              "title": null,
              "export": false
            },
            "dataOptions": {
              "dataurl": "",
              "refresh_interval": 0,
              "paramsJson": {
                "photoId": 54596197,
                "url": "/api/v2/files/preview/54596197"
              },
              "name": "dummy",
              "staticKey": "imagecard",
              "metaJson": "{\"photoId\":54596197,\"url\":\"/api/v2/files/preview/54596197\",\"options\":{\"imageMeta\":{\"originalSize\":{\"width\":1920,\"height\":1080},\"scaledSize\":{\"width\":1920,\"height\":1080}},\"areas\":[]}}"
            },
            "id": 22370,
            "type": "static",
            "widgetVsWorkflowContexts": []
          },
          "minW": 4,
          "minH": 4
        },
        {
          "i": "22371",
          "x": 0,
          "y": 20,
          "w": 56,
          "h": 15,
          "widget": {
            "widgetSettings": {
              "excludeDbFilters": false,
              "showHelpText": false
            },
            "layout": {
              "width": 56,
              "x": 0,
              "y": 20,
              "position": 8,
              "height": 15
            },
            "mLayout": {
              "width": null,
              "x": null,
              "y": null,
              "position": null,
              "height": null
            },
            "helpText": null,
            "header": {
              "subtitle": null,
              "title": "Priority",
              "export": false
            },
            "dataOptions": {
              "dataurl": "/dashboard/getData?reportId=null",
              "reportType": 2,
              "refresh_interval": 0,
              "reportId": null,
              "chartTypeInt": null,
              "name": "dummy",
              "newReportId": 5596,
              "reportTemplate": "null",
              "dateFilter": null
            },
            "id": 22371,
            "type": "chart"
          },
          "minW": 32,
          "minH": 24
        },
        {
          "i": "22372",
          "x": 58,
          "y": 20,
          "w": 16,
          "h": 12,
          "widget": {
            "widgetSettings": {
              "excludeDbFilters": false,
              "showHelpText": false
            },
            "layout": {
              "width": 16,
              "x": 58,
              "y": 20,
              "position": 9,
              "height": 12
            },
            "mLayout": {
              "width": null,
              "x": null,
              "y": null,
              "position": null,
              "height": null
            },
            "helpText": null,
            "header": {
              "subtitle": null,
              "title": null,
              "export": false
            },
            "dataOptions": {
              "dataurl": "",
              "refresh_interval": 0,
              "cardLayout": "controlcard_layout_1",
              "conditionalFormatting": null,
              "name": "dummy",
              "customScriptId": null,
              "scriptModeInt": 3,
              "cardState": {
                "styles": {
                  "backgroundColor": "#FFF",
                  "primaryColor": "#110d24",
                  "secondaryTextColor": "#abb0be",
                  "showSecondaryText": false,
                  "secondaryColor": "#1F95DA"
                },
                "canResize": false
              },
              "cardDrilldown": {
                "set-reading-button": {
                  "actionType": "controlAction",
                  "data": {
                    "controlType": "point",
                    "controlPointId": null,
                    "controlGroupId": null,
                    "buttonLabel": "Set"
                  }
                }
              },
              "cardParams": {
                "dateRange": "Today",
                "reading": {
                  "yAggr": "avg"
                },
                "title": "testtest"
              }
            },
            "id": 22372,
            "type": "card"
          },
          "minW": 32,
          "minH": 32
        }
      ]


    };
  },
};
</script>

<style lang="css" scoped>
button {
  display: block;
}
</style>
