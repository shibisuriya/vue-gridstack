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
				"data-gs-x": this.item.x,
				"data-gs-y": this.item.y,
				"data-gs-width": this.item.w,
				"data-gs-height": this.item.h,
				"data-gs-id": this.item.id,
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
.grid-stack-item {
	border: 1px solid black;
}
</style>