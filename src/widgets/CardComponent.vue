<template>
  <div>
    <h1>{{ id }}</h1>
    <button @click="removeWidget">Remove</button>
  </div>
</template>

<script>
export default {
  props: ["id"],
  methods: {
    removeWidget() {
      this.$emit('remove')
    }
  }
};
</script>

<style lang="css" scoped></style>
