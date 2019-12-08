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
                    <template v-for="(s, i) in sqlList">
                        <el-tag v-if="s != ''" :key="i">
                            {{ s }}
                        </el-tag>
                    </template>
                </el-row>
                <el-row>
                    <el-input
                        type="textarea"
                        :rows="4"
                        placeholder="请输入内容"
                        v-model="sql"
                        :autosize="{ minRows: 4, maxRows: 20 }"
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
                            <template v-for="(val, key, j) in row">
                                <div :key="j">
                                    <strong style="color:red"
                                        >{{ key }}：</strong
                                    >
                                    {{ val }}
                                </div>
                            </template>
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
            let res = await this.$api.getSqlData(this.sql);

            this.tableData = res;
        }
    }
};
</script>
