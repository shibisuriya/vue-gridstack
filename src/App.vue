<template>
	<div>
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


import ComponentA from './widgets/ComponentA.vue';
import ComponentB from './widgets/ComponentB.vue'
import ComponentC from './widgets/ComponentC.vue';

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
	},
	data() {
		return {
			layout: [
				// {
				// 	x: 0,
				// 	y: 0,
				// 	w: 2,
				// 	h: 2,
				// 	component: 'a'
				// },
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
				// {
				// 	section: [{
				// 		x: 1,
				// 		y: 2,
				// 		w: 2,
				// 		h: 2,
				// 		component: 'c'
				// 	}, {
				// 		x: 0,
				// 		y: 0,
				// 		w: 2,
				// 		h: 2,
				// 		component: 'a'
				// 	}],
				// 	x: 1,
				// 	y: 2,
				// 	w: 12,
				// 	h: 2,
				// },
			],
		};
	},
	methods: {
		addItem() {
			const newItemData = {
				x: 0,
				y: 0,
				w: 3,
				h: 4,
			};
			this.layout.push(newItemData);
			//this.layout.push(newItemData);
		},
	},
};
</script>

<style lang="css" scoped>
</style>