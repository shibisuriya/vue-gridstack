export default function unserialize(layout) {
    let widgets = []
    let sections = []
    layout.forEach(item => {
        if (item.sections) {
            sections.push(item)
        } else {
            widgets.push(item)
        }
    })
    return {
        'dashboardname': 'test',
        sections: sections,
        widgets: widgets
    }
}