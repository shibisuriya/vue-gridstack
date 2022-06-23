<template>
	<div class="grid-stack">
		<slot></slot>
	</div>
</template>

<script>
import GridStack from '/node_modules/gridstack/dist/gridstack-h5.js'
import Vue from 'vue'
const MIN_ROW = 3;
const MASTER_GRID_INDEX = 0; // Master grid is the parent (.grid-stack) of all .grid-stack(s), this component supports nested grids.
export default {
	methods: {
		removeWidget(el) {
			//if(el.getAttribute())
			// this.grid.forEach((g, index) => {
			// 	const isSection = el.getAttribute('class').includes('grid-stack-nested')
			// 	if (isSection) {
			// 		const a = g.getGridItems()
			// 		if (a.includes(el)) {
			// 			index;
			// 			console.log(a)
			// 		}
			// 	}
			// })
			this.grid.forEach(g => g.removeWidget(el))

			// const isSection = el.getAttribute('class').includes('grid-stack-nested')
			// if (isSection) {
			// 	this.grid[MASTER_GRID_INDEX].destroy(el)
			// } else {
			// }
			// //this.grid.forEach(g => g.removeWidget(el))
		},
		save() {
			const self = this
			let gridData = this.grid[MASTER_GRID_INDEX].save()

			gridData = gridData.map(item => {

				if (item.content) {
					// This is a stand alone widget without any section.
					item['content'] = self.getDataFromHTML(item.content)
				} else if (item.subGrid.children) {
					// This is a section and contains widget inside it.
					item.subGrid.children = item.subGrid.children.map(child => {
						child['content'] = self.getDataFromHTML(child.content)
						return child;
					})
				}
				return item;
			})
			this.$emit('save', gridData)

		},
		getDataFromHTML(html) {
			const parser = new DOMParser();
			const doc = parser.parseFromString(html, 'text/html');
			return JSON.parse(doc.getElementById('gridstack-data').innerHTML)
		},
		addItem() {
			const newItemData = {
				x: 0,
				y: 0,
				w: 3,
				h: 4,
				component: 'a',
				id: 'newGridItem'
			};
			this.layout.push(newItemData);
			const self = this
			Vue.nextTick(() => {
				self.grid[MASTER_GRID_INDEX].makeWidget('#newGridItem');
			});

		},
	},
	mounted() {
		const self = this;
		self.grid = GridStack.initAll({
			float: false, cellHeight: '70px', minRow: MIN_ROW, margin: 10, column: 12, acceptWidgets: true
		});
		self.grid.forEach(g => {
			g.on('dropped dragstop drag resize', () => {
				const sections = self.grid[MASTER_GRID_INDEX].engine.nodes
				sections.forEach(section => {
					if (section.subGrid) {
						const subGrid = section.subGrid.engine.nodes;
						const maxHeight = Math.max(...subGrid.map(o => o.y + o.h))

						if (subGrid.length == 0) {
							self.grid[MASTER_GRID_INDEX].update(section.el, { h: 3 })
						} else {
							self.grid[MASTER_GRID_INDEX].update(section.el, { h: maxHeight + 1 })
						}
						return;
					}
				})
			})
		})
	},
};
</script>

<style lang="css">
.grid-stack {
	border: 1px solid red;
}
</style>