<template>
    <el-row >
        <el-col :span="17">
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
                <el-button type="primary" @click="getSqlData">执行</el-button>
            </el-row>
            <el-row :gutter="10">
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
        </el-col>
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
            tableData: [],
            database: [],
            tables: [],
            dbName: "",
            dbNameText: "",
            DbList: {},
            showDbList: false
        };
    },
    mounted() {
        let p = this.GetQueryString("db_name");
        if (p != null) {
            this.dbName = p;
        }
        this.initDBList();
    },
    methods: {
        GetQueryString(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]);
            return null;
        },
        async initDBList() {
            let res = await this.$api.getDBList();
            this.DbList = res;
            if (res[this.dbName] != undefined) {
                this.dbNameText = this.DbList[this.dbName];
                this.getTables();
            } else if (Object.keys(res).length == 1) {
                this.dbName = Object.keys(res)[0];
                this.dbNameText = res[this.dbName];
                this.getTables();
            } else {
                this.showDbList = true;
            }
        },
        async getTables() {
            let res = await this.$api.getSqlData(this.dbName, "show tables");
            let tableList = [];
            res.forEach(element => {
                let i = Object.keys(element)[0];
                tableList.push(element[i]);
            });
            this.tables = tableList;
        },
        async getSqlData() {
            this.sqlList.push(this.sql);
            let res = await this.$api.getSqlData(this.dbName, this.sql);
            this.tableData = res;
        },
        openDb(d, dt) {
            if (this.dbName == "") {
                this.dbName = d;
                this.dbNameText = dt;
                this.getTables();
                this.showDbList = false;
            } else {
                window.open("/?db_name=" + d, "_blank");
            }
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