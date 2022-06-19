<template>
	<div>
		<gridstack-layout>
			<gridstack-item v-for="(item, index) in layout" :key="index" :item="item">
				<h1>{{index}}</h1>
			</gridstack-item>
		</gridstack-layout>
	</div>
</template>

<script>
import GridstackLayout from "./components/GridstackLayout.vue";
import GridstackItem from "./components/GridstackItem.vue";
import GridStack from '/node_modules/gridstack/dist/gridstack-h5.js'
export default {
	components: {
		GridstackLayout,
		GridstackItem,
	},
	mounted() {
		const self = this;
		self.grid = GridStack.init({ float: true, cellHeight: '70px', minRow: 3, margin: 10, column: 11});
	},
	data() {
		return {
			layout: [
				{
					id: 1,
					x: 0,
					y: 0,
					w: 2,
					h: 2,
				},
				{
					id: 2,
					x: 1,
					y: 2,
					w: 2,
					h: 2,
				},
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

<style lang="scss" scoped>
</style>