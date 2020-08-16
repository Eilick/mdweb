<template>
    <div class="middle">
        <el-menu :default-active="$route.path" class="el-menu-vertical-demo" background-color="#333333"
            text-color="#fff" active-text-color="#4c9fff">
            <template v-for="(item, i) in list">
                <el-menu-item :index="i + ''" @click="clickMenu(item)">
                    <i class="el-icon-menu"></i>
                    <span slot="title"> {{item}} </span>
                </el-menu-item>
            </template>
        </el-menu>

    </div>
</template>
<style scoped>
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 100%;
    }

    .middle {
        height: calc(100% - 60px);
        position: fixed;
        overflow-x: hidden;
        border-top: 1px solid #828181;
        z-index: 99
    }
</style>

<style>
    .el-menu-item-group__title {
        padding: 0 0 7px 20px !important;
    }
</style>

<script>

    export default {
        name: "slideMenu",
        data() {
            return {
                list: [],
                defaultOpens: ['0', '1']
            };
        },
        methods: {
            setMenu(l) {
                this.$set(this, "list" , l)
                this.$forceUpdate()
            },
            clickMenu(c) {
                this.$router.push({
                    path: '/markdown/list',
                    query: {
                        classify: c
                    }
                })
            }
        }
    };
</script>