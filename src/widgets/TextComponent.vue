<template>
  <div>
    <h1>Text Component</h1>
    <el-dropdown>
      <span class="el-dropdown-link">
        Option<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>Edit Widget</el-dropdown-item>
        <el-dropdown-item>Remove Widget</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

  </div>
</template>

<script>
export default {
  methods: {

  },
};
</script>

<style lang="scss" scoped>
</style>
