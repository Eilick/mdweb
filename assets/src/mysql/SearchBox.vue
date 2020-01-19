<template>
    <el-row>
        <el-row>
            <el-input
                type="textarea"
                :rows="4"
                placeholder="请输入内容"
                v-model="sql"
                :autosize="{ minRows: 4, maxRows: 20 }"
                @keyup.enter="getSqlData"
            ></el-input>
        </el-row>

        <el-row style="margin:20px 0;">
            <el-button type="primary" @click="getSqlData" style="float:right">执行</el-button>
        </el-row>
        <el-row :gutter="10" id="table-id">
            <template v-for="(row, i) in tableData">
                <el-card :key="i" style="margin-bottom:10px">
                    <el-form :label-position="'right'" label-width="250px">
                        <template v-for="(val, key, j) in row">
                            <el-form-item :key="j" style="margin:0px;">
                                <div slot="label">
                                    <strong style="font-size:17px;color:red;">{{ key }}:</strong>
                                </div>
                                <span class="lg-p">{{ val }}</span>
                            </el-form-item>
                        </template>
                    </el-form>
                </el-card>
            </template>
        </el-row>
    </el-row>
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
            tableData: []
        };
    },
    methods: {
        setSelectSql(sqlStr) {
            this.sql = sqlStr;
            this.getSqlData();
        },
        async getSqlData() {
            const l = this.$loading({
                lock: true,
                target : "#table-id",
                fullscreen :false,
                text: "查询中",
                spinner: "el-icon-loading",
                background: "rgba(0, 0, 0, 0.7)"
            });
            let res = await this.$api.getSqlData("faraday", this.sql);
            l.close();
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