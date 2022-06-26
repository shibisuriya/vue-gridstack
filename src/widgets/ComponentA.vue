<template>
  <div>
    <h1>Component A</h1>
    <button @click="emitEvent">Click me ninja</button>
  </div>
</template>

<script>
import { facilioEventBus } from '@/main';
export default {
  methods: {
    emitEvent() {
      facilioEventBus.$emit('testEvent', 'hello')
      // this.$emit("testEvent");
    },
  },
};
</script>

<style lang="scss" scoped></style>
