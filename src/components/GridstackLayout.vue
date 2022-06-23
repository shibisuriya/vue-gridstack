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
		save() {
			this.$emit('save', this.grid[MASTER_GRID_INDEX].save())
			this.gridData = this.grid[0].save()
			const stringData = this.gridData[0].subGrid.children[0].content
			var parser = new DOMParser();
			var doc = parser.parseFromString(stringData, 'text/html');
			//const test = document.createElement('<div>helo</div>')
			console.log(doc.getElementById('grid-data'))
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
			//this.layout.push(newItemData);
			const self = this
			Vue.nextTick(() => {
				self.grid[MASTER_GRID_INDEX].makeWidget('#newGridItem');
				// delete self.layout[self.layout.length - 1].id
			});

		},
	},
	mounted() {
		const self = this;
		self.grid = GridStack.initAll({
			float: false, cellHeight: '70px', minRow: MIN_ROW, margin: 10, column: 12, acceptWidgets: true, scroll: false, removeTimeout: 3000
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