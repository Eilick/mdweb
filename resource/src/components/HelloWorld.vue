<template>
    <div class="hello">
        <el-divider
            >当前数据库：法拉第
            <el-button round size="mini">打开新数据库</el-button></el-divider
        >
        <el-row :gutter="40">
            <el-col :span="7">
                <el-card style="background: rgb(244, 244, 245);">
                    <div v-for="(t, i) in tables" :key="i">
                        {{ t.tables_in_faraday }}
                    </div>
                </el-card>
            </el-col>
            <el-col :span="17">
                <el-row style="margin:20px 0;" class="tag-group">
                    <el-card style="height:100px;overflow:scroll">
                        <template v-for="(s, i) in sqlList">
                            <p v-if="s != ''" :key="i">
                                {{ s }}
                            </p>
                        </template>
                    </el-card>
                </el-row>
                <el-row>
                    <el-input
                        type="textarea"
                        :rows="4"
                        placeholder="请输入内容"
                        v-model="sql"
                        :autosize="{ minRows: 4, maxRows: 20 }"
                        @keyup.enter="getSqlData"
                    >
                    </el-input>
                </el-row>

                <el-row style="margin:20px 0;">
                    <el-button type="primary" @click="getSqlData"
                        >执行</el-button
                    >
                </el-row>
                <el-row :gutter="10">
                    <template v-for="(row, i) in tableData">
                        <el-card :key="i" style="margin-bottom:10px">
                            <el-form
                                :label-position="'right'"
                                label-width="250px"
                            >
                                <template v-for="(val, key, j) in row">
                                    <el-form-item :key="j" style="margin:0px;">
                                        <div slot="label">
                                            <strong
                                                style="font-size:17px;color:red;"
                                                >{{ key }}:</strong
                                            >
                                        </div>
                                        <span class="lg-p">{{ val }}</span>
                                    </el-form-item>
                                </template>
                            </el-form>
                        </el-card>
                    </template>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: "HelloWorld",
    props: {
        msg: String
    },
    data() {
        return {
            sql: "select * from faraday_exp_zone",
            sqlList: [],
            tableData: [],
            database: [],
            tables: []
        };
    },
    mounted() {
        this.getTables();
    },
    methods: {
        async getTables() {
            let res = await this.$api.getSqlData("show tables");
            this.tables = res;
        },
        async getSqlData() {
            this.sqlList.push(this.sql);
            let res = await this.$api.getSqlData(this.sql);

            this.tableData = res;
        }
    }
};
</script>
<style scoped>
.lg-p {
    word-wrap: break-word;
    word-break: break-all;
    overflow: hidden;
}
</style>
