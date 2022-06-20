<template>
	<div>
		<div>
			{{layout}}
		</div>
		<div>
			<button @click="addItem">Add item</button>
			<button @click="save">Save</button>
		</div>
		<gridstack-layout>
			<gridstack-item v-for="(item, index) in layout" :key="index" :item="item">
				<gridstack-layout v-if="item.hasOwnProperty('section')">
					<gridstack-item v-for="(item2, index2) in item.section" :item="item2" :key="index2">
						<ComponentA v-if="item2.component == 'a'" />
						<ComponentB v-if="item2.component == 'b'" />
						<ComponentC v-if="item2.component == 'c'" />
					</gridstack-item>
				</gridstack-layout>
				<template v-else>
					<ComponentA v-if="item.component == 'a'" />
					<ComponentB v-if="item.component == 'b'" />
					<ComponentC v-if="item.component == 'c'" />
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
		self.grid = GridStack.initAll({ float: true, cellHeight: '70px', minRow: 3, margin: 10, column: 11, acceptWidgets: true });
		self.grid.forEach(grid => {
			grid.on('dragstart resize dragend', (event, items) => { console.log(event); items;	 })
		})
	},
	data() {
		return {
			gridData: null,
			layout: [

				{
					id: 1,
					x: 1,
					y: 2,
					w: 2,
					h: 2,
					component: 'b'
				},
				{
					section: [{
						id: 3,
						x: 1,
						y: 2,
						w: 2,
						h: 2,
						component: 'c'
					}, {
						id: 4,
						x: 0,
						y: 0,
						w: 2,
						h: 2,
						component: 'a'
					}],
					id: 2,
					x: 1,
					y: 2,
					w: 12,
					h: 2,
				},
				{
					section: [{
						id: 3,
						x: 1,
						y: 2,
						w: 2,
						h: 2,
						component: 'c'
					}, {
						id: 4,
						x: 0,
						y: 0,
						w: 2,
						h: 2,
						component: 'a'
					}],
					id: 2,
					x: 1,
					y: 2,
					w: 12,
					h: 2,
				}
			],
		};
	},
	methods: {
		save() {
			// this.gridData = this.grid[0].save();
			// console.log(this.gridData)
			this.layout[0].w = 12
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