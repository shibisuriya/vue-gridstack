<template>
	<div>
		<div>
			<button @click="addItem">Click me nigga</button>
		</div>
		<gridstack-layout>
			<gridstack-item
				v-for="(item, index) in layout"
				:key="index"
				:item="item"
			>
				<h1>Hello</h1>
			</gridstack-item>
		</gridstack-layout>
	</div>
</template>

<script>
import GridstackLayout from "./components/GridstackLayout.vue";
import GridstackItem from "./components/GridstackItem.vue";
export default {
	components: {
		GridstackLayout,
		GridstackItem,
	},
	mounted() {
		const self = this;
		self.grid = window.GridStack.init();
	},
	data() {
		return {
			layout: [
				{
					id: 1,
					x: 0,
					y: 0,
					w: 3,
					h: 4,
				},
				{
					id: 2,
					x: 0,
					y: 0,
					w: 3,
					h: 4,
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

<style lang="css" scoped>
</style>