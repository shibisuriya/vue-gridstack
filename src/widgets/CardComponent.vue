<template>
    <div>
        <h1>This is a card component</h1>
        <el-dropdown>
            <span class="el-dropdown-link">
                Option<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>Help Text</el-dropdown-item>
                <el-dropdown-item>Remove Widget</el-dropdown-item>
                <el-dropdown-item>Duplicate</el-dropdown-item>
                <el-dropdown-item>Edit</el-dropdown-item>

            </el-dropdown-menu>
        </el-dropdown>
    </div>

</template>

<script>
export default {

}
</script>

<style lang="css" scoped>
</style>