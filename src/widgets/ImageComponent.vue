<template>
  <div>
    <h1>Image component</h1>
    <h1> {{ item }} hello</h1>

    <el-dropdown>
      <span class="el-dropdown-link">
        Option<i class="el-icon-arrow-down el-icon--right"></i>
      </span>

      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>Help Text</el-dropdown-item>
        <el-dropdown-item>Remove Widget</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      required: false,
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
