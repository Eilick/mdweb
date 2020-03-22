<template>
    <el-row>
        <h2>已删除文档</h2>
        <el-row style="margin-top: 20px;" :gutter="15">
            <template v-for="item in list">
                <el-col :span="6" style="margin-bottom: 10px;">
                    <el-card>
                        <p><router-link :to="{path : '/markdown/detail/' + item.id}" style="text-decoration: none;">{{item.title}}</router-link></p>
                    </el-card>
                </el-col>
            </template>
        </el-row>

    </el-row>
</template>

<script>
    import lodash from "lodash"
    export default {
        data() {
            return {
                list: [],
                fits: "fill",
                fileList: [],
            };
        },
        mounted() {
            document.title = "回收站"
            this.getTrashMdList();
        },
        methods: {
            async getTrashMdList() {
                let res = await this.$api.getMdList("trash");
                this.list = res;
            },
        }
    }
</script>