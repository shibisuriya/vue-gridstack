export const httpGetData = {
  dashboardName: "shibi dashboard",
  sections: [
    {
      x: 0,
      y: 0,
      w: 96,
      h: 5,
      maxW: 96,
      minW: 96,
      noResize: true,
      collapsed: true,
      section: [
        {
          i: "22389",
          x: 0,
          y: 19,
          w: 24,
          h: 12,
          widget: {
            widgetSettings: {
              excludeDbFilters: false,
              showHelpText: false,
            },
            layout: {
              width: 24,
              x: 0,
              y: 19,
              position: 5,
              height: 12,
            },
            mLayout: {
              width: null,
              x: null,
              y: null,
              position: null,
              height: null,
            },
            helpText: null,
            header: {
              subtitle: null,
              title: null,
              export: false,
            },
            dataOptions: {
              dataurl: "",
              refresh_interval: 0,
              cardLayout: "energycost_layout_1",
              conditionalFormatting: null,
              name: "dummy",
              customScriptId: null,
              scriptModeInt: 3,
              cardState: null,
              cardDrilldown: {
                default: {
                  actionType: "showTrend",
                },
              },
              cardParams: {
                dateRange: "Current Month",
                multiplier: 0.41,
                reading: {
                  yAggr: "sum",
                },
                title: "test",
              },
            },
            id: 22389,
            type: "card",
          },
          minW: 32,
          minH: 32,
        },
      ],
    },
  ],
  widgets: [
    {
      i: "22389",
      x: 0,
      y: 19,
      w: 24,
      h: 12,
      widget: {
        widgetSettings: {
          excludeDbFilters: false,
          showHelpText: false,
        },
        layout: {
          width: 24,
          x: 0,
          y: 19,
          position: 5,
          height: 12,
        },
        mLayout: {
          width: null,
          x: null,
          y: null,
          position: null,
          height: null,
        },
        helpText: null,
        header: {
          subtitle: null,
          title: null,
          export: false,
        },
        dataOptions: {
          dataurl: "",
          refresh_interval: 0,
          cardLayout: "energycost_layout_1",
          conditionalFormatting: null,
          name: "dummy",
          customScriptId: null,
          scriptModeInt: 3,
          cardState: null,
          cardDrilldown: {
            default: {
              actionType: "showTrend",
            },
          },
          cardParams: {
            dateRange: "Current Month",
            multiplier: 0.41,
            reading: {
              yAggr: "sum",
            },
            title: "test",
          },
        },
        id: 22389,
        type: "card",
      },
      minW: 32,
      minH: 32,
    },
  ],
};
