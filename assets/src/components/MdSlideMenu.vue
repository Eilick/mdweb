<template>
    <div class="middle">
        <el-menu
            class="el-menu-vertical-demo"
            :collapse="false"
            background-color="#323f49"
            text-color="#fff"
            active-text-color="#e6a23c"
        >
            <el-menu-item index="1" @click="jumpTo('/markdown/create')">
                <i class="el-icon-menu"></i>
                <span slot="title">
                    创建
                </span>
            </el-menu-item>
        </el-menu>
    </div>
</template>
<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 300px;
    min-height: 100%;
}
.middle {
    height: 99%;
    position: fixed;
    overflow-x: scroll;
    border-top: 1px solid #828181;
    z-index: 99;
}
.el-menu--collapse {
    height: 100%;
}
</style>
<script>
export default {
    methods : {
        jumpTo(p) {
            this.$router.push(p)
        }
    }
};
</script>