<template>
    <div class="grid-stack">
        <slot></slot>
    </div>
</template>

<script>
export default {
    methods: {
    },
    data() {
        return {
            collapsed: false
        }
    },
    computed: {
        getAttr() {
            return {
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