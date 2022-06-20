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
			let attr = {
				"gs-x": this.item.x,
				"gs-y": this.item.y,
				"gs-w": this.item.w,
				"gs-h": this.item.h,
			}
			if (this.item.section) {
				attr['gs-max-w'] = 12
				attr['gs-min-w'] = 12
			}
			return attr;
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
.grid-stack-placeholder {
	border: 10px dashed red;
}

@import '/node_modules/gridstack/dist/gridstack.min.css';
@import '/node_modules/gridstack/dist/gridstack-extra.css';



</style>