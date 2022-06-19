<template>
	<div class="grid-stack-item" v-bind="gridItemAttr">
		<div class="grid-stack-item-content">
			<slot></slot>
		</div>
	</div>
</template>

<script>
export default {
	computed: {
		gridItemAttr() {
			return {
				"gs-x": this.item.x,
				"gs-y": this.item.y,
				"gs-w": this.item.w,
				"gs-h": this.item.h,
			};
		},
	},
	props: {
		item: {
			required: true,
			type: Object,
		},
	},
};
</script>

<style lang="css" scoped>

.grid-stack-item-content {
	border: 1px solid black;
}

@import '/node_modules/gridstack/dist/gridstack.min.css';
@import '/node_modules/gridstack/dist/gridstack-extra.css';



</style>