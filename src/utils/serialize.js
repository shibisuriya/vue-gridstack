export function serialize(layout) {
  let widgets = [];
  let sections = [];
  layout.forEach((item) => {
    if (item.section) {
      sections.push(item);
    } else {
      widgets.push(item);
    }
  });
  return {
    dashboardname: "test",
    sections: sections,
    widgets: widgets,
  };
}
