
<template>
	<div>
		<div>
			{{ layoutCopy }}
			<button @click="() => { this.$refs['gridstackLayout'].save() }">Save</button>
		</div>
		<gridstack-layout @save="saveGrid" ref="gridstackLayout">
			<gridstack-item v-for="(section, index) in layout" :key="index" :item="section">
				<gridstack-section v-if="section.hasOwnProperty('section')">
					<gridstack-item v-for="(child, childIndex) in section.section" :item="section" :key="childIndex">
						<ComponentA v-if="child.component == 'a'" />
						<ComponentB v-if="child.component == 'b'" />
						<ComponentC v-if="child.component == 'c'" />
					</gridstack-item>
				</gridstack-section>
				<template v-else>
					<ComponentA v-if="section.component == 'a'" />
					<ComponentB v-if="section.component == 'b'" />
					<ComponentC v-if="section.component == 'c'" />
				</template>
			</gridstack-item>
		</gridstack-layout>
	</div>
</template>

<script>
import GridstackLayout from "./components/GridstackLayout.vue";
import GridstackItem from "./components/GridstackItem.vue";
import GridstackSection from './components/GridstackSection.vue'
import ComponentA from './widgets/ComponentA.vue';
import ComponentB from './widgets/ComponentB.vue'
import ComponentC from './widgets/ComponentC.vue';

export default {
	components: {
		GridstackLayout,
		GridstackItem,
		GridstackSection,
		ComponentA,
		ComponentB,
		ComponentC
	},
	methods: {
		saveGrid(gridData) {
			console.log(gridData)
		}
	},
	data() {
		return {
			layoutCopy: null,
			gridData: null,
			layout: [
				{
					x: 1,
					y: 2,
					w: 2,
					h: 2,
					component: 'b',
					description: 'hello'
				},
				{
					section: [{
						x: 1,
						y: 2,
						w: 2,
						h: 2,
						component: 'c'
					}],
					x: 1,
					y: 2,
					w: 12,
					h: 2,
				},
				{
					section: [{
						x: 1,
						y: 2,
						w: 2,
						h: 2,
						component: 'c'
					}],
					x: 1,
					y: 2,
					w: 12,
					h: 2,
				},
			],
		};
	},
};
</script>

<style lang="css" scoped>
button {
	display: block;
}
</style>