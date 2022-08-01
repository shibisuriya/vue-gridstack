<template>
  <div>
    <h1>{{ id }}</h1>
    <!-- <h1 style="border: 1px solid black;" class="drag-handle"> I am a drag handle</h1> -->
    <!-- <iframe
      width="560"
      height="315"
      src="https://www.youtube.com/embed/Zv11L-ZfrSg?autoplay=1"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe> -->
    <button @click="removeWidget">Remove</button>
  </div>
</template>

<script>
export default {
  props: ["id"],
  methods: {
    removeWidget() {
      this.$emit("remove");
    },
  },
};
</script>

<style lang="css" scoped></style>
