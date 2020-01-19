<template>
    <div class="middle">
        <el-menu
            class="el-menu-vertical-demo"
            :collapse="isCollapse"
            background-color="#323f49"
            text-color="#fff"
            active-text-color="#e6a23c"
        >
        <template v-for="idx in 30">
            <el-menu-item :index="idx">
                <i class="el-icon-menu"></i>
                <span slot="title">导航二</span>
            </el-menu-item>
        </template>
        </el-menu>
    </div>
</template>
<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 210px;
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
    name: "slideMenu",
    data() {
        return {
            tables: [],
        };
    },
    methods: {
        async getTableList() {
            let res = await this.$api.getSqlData(this.dbName, "show tables");
            let tableList = [];
            res.forEach(element => {
                let i = Object.keys(element)[0];
                tableList.push(element[i]);
            });
            this.tables = tableList;
        },
    },
    mounted() {
        this.getTableList
    }
};
</script>