<template>
    <div class="grid-stack">
        <button @click="shrink">Srink / expand</button>
        <slot></slot>
    </div>
</template>

<script>
import {eventBus} from '../main'
export default {
    methods: {
        shrink(event) {
            this.collapsed = !this.collapsed
            eventBus.$emit('shrink', event.path[3], this.collapsed)

            // console.log(event.path[3])
            // this.collapsed = !this.collapsed
            // this.$emit('shrink', event.path[4] )
        }
    },
    data() {
        return {
            collapsed: false
        }
    },
    computed: {
        getAttr() {
            return {
                collapsed: this.collapsed
            }
        }
    }

}

</script>

<style lang="css">
.grid-stack {
    border: 1px solid red;
}
</style>