<template>
  <div>
    <h1>Component A</h1>
    <button @click="emitEvent">Click me ninja</button>
  </div>
</template>

<script>
export default {
  methods: {
    emitEvent() {
      this.$emit("testEvent");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
