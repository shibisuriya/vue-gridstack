<template>
	<div>
		<div>
			{{ layout }}
		</div>
		<div>
			<button @click="addItem">Add item</button>
			<button @click="save">Save</button>
			<button @click="resizeElement">Resize Element</button>
		</div>
		<gridstack-layout>
			<gridstack-item v-for="(gridItem, index) in layout" :key="index" :item="gridItem"
				:id="index + '_' + String(index)">
				<gridstack-layout v-if="gridItem.hasOwnProperty('section')">
					<gridstack-item v-for="(innerGridItem, innerIndex) in gridItem.section" :item="innerGridItem"
						:key="innerIndex">
						<ComponentA v-if="innerGridItem.component == 'a'" />
						<ComponentB v-if="innerGridItem.component == 'b'" />
						<ComponentC v-if="innerGridItem.component == 'c'" />
					</gridstack-item>
				</gridstack-layout>
				<template v-else>
					<ComponentA v-if="gridItem.component == 'a'" />
					<ComponentB v-if="gridItem.component == 'b'" />
					<ComponentC v-if="gridItem.component == 'c'" />
				</template>
			</gridstack-item>
		</gridstack-layout>
	</div>
</template>

<script>
import GridstackLayout from "./components/GridstackLayout.vue";
import GridstackItem from "./components/GridstackItem.vue";
import GridStack from '/node_modules/gridstack/dist/gridstack-h5.js'

import Vue from "vue";
import ComponentA from './widgets/ComponentA.vue';
import ComponentB from './widgets/ComponentB.vue'
import ComponentC from './widgets/ComponentC.vue';
const MASTER_GRID_INDEX = 0; // Master grid is the parent (.grid-stack) of all .grid-stack(s), this component supports nested grids.
const MIN_ROW = 3;
export default {
	components: {
		GridstackLayout,
		GridstackItem,

		ComponentA,
		ComponentB,
		ComponentC
	},
	mounted() {
		const self = this;
		self.grid = GridStack.initAll({ float: false, cellHeight: '70px', minRow: MIN_ROW, margin: 10, column: 12, acceptWidgets: true, scroll: false });
		self.grid.forEach(g => {
			g.on('dropped dragstop resize', () => {
				const sections = self.grid[MASTER_GRID_INDEX].engine.nodes
				sections.forEach(section => {
					if (section.subGrid) {
						const subGrid = section.subGrid.engine.nodes;
						console.log('This is a section', ' -> ', Math.max(...subGrid.map(o => o.y + o.h)))
						const maxHeight = Math.max(...subGrid.map(o => o.y + o.h))
						//console.log(section)
						console.log(maxHeight)
						if (subGrid.length == 0) {
							self.grid[MASTER_GRID_INDEX].update(section.el, { h: MIN_ROW })
						} else {
							self.grid[MASTER_GRID_INDEX].update(section.el, { h: maxHeight + 1 })
						}
						return;
					} else {
						console.log('This is not a section')
					}
				})
				// self.grid[MASTER_GRID_INDEX].update(el, { minRow: 5 + 1 })
				// self.grid[MASTER_GRID_INDEX].batchUpdate()
				// self.grid[MASTER_GRID_INDEX].commit()

				//console.log(sections)
				// sections.forEach((section) => {
				// 	//console.log(section)
				// 	// const element = section.el
				// 	const gridItems = section.grid.engine.nodes
				// 	//console.log(Math.max(...gridItems.map(o => o.y + o.h)))
				// 	console.log(gridItems)
				// })
				//console.log(sections)
			})
		})
		// setTimeout(() => {
		// 	//self.grid.forEach(g => g.cellHeight(10))
		// 	self.grid[0].cellHeight(10)
		// }, 5000)
	},
	data() {
		return {
			gridData: null,
			layout: [

				{
					id: 'a',
					x: 1,
					y: 2,
					w: 2,
					h: 2,
					component: 'b'
				},
				{
					section: [{
						id: 'b',
						x: 1,
						y: 2,
						w: 2,
						h: 2,
						component: 'c'
					}],
					id: 'd',
					x: 1,
					y: 2,
					w: 12,
					h: 2,
				},
				{
					section: [{
						id: 'b',
						x: 1,
						y: 2,
						w: 2,
						h: 2,
						component: 'c'
					}],
					id: 'd',
					x: 1,
					y: 2,
					w: 12,
					h: 2,
				},
			],
		};
	},
	methods: {
		save() {
			// this.gridData = this.grid[0].save();
			// console.log(this.gridData)
			this.layout[0].w = 12
		},
		resizeElement() {
			// this.layout[0].x = 'auto'
			// this.layout[0].w = 12;
			this.grid[0].update('#a', { w: 12 })
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
};
</script>

<style lang="css" scoped>
button {
	display: block;
}
</style>