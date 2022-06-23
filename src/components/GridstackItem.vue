<template>
	<div class="grid-stack-item" v-bind="gridItemAttr">
		<div :class="gridContentClass">
			<div style="display:none" id="grid-data">{{ item }}</div>
			<slot></slot>
		</div>
	</div>
</template>

<script>
export default {
	computed: {
		gridContentClass() {
			return {
				'grid-stack-item-content': true,
				'grid-stack-nested-item': !!this.item.section
			}
		},
		gridItemAttr() {
			let attr = {
				"gs-x": this.item.x,
				"gs-y": this.item.y,
				"gs-w": this.item.w,
				"gs-h": this.item.h,
				"gs-removable": true,
			}
			if (this.id) {
				attr["id"] = this.id
			}
			if (this.item.section) {
				attr['gs-max-w'] = 12
				attr['gs-min-w'] = 12
				// attr['gs-no-resize'] = "true"
			}
			// The id attribute is used while adding a new widget (Grid item).
			// For more information refer gridstack's makeWidget().
			if (this.id) {
				attr['gs-id'] = this.id
			}
			return attr;
		},
	},
	props: {
		item: {
			required: true,
			type: Object,
		},
		id: {
			type: String
		}
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


.grid-stack-nested-item {
	background-color: rgb(203, 123, 123);
}
</style>