<template>
    <el-row>
        <el-row style="margin-top:30vh;">
            <el-col :span="14" :offset="5">
                <p style="margin-bottom: 20px;"><strong slot="label" style="font-size: 20px;">输入登录口令:</strong></p>
                <el-input v-model="user" @keyup.enter.native="goLogin"></el-input>
            </el-col>

        </el-row>
    </el-row>
    </el-row>
</template>

<script>
    import VditorPreview from 'vditor/dist/method.min'

    export default {
        data() {
            return {
                user: ""
            };
        },
        methods: {
            async goLogin() {
                let res = await this.$api.genToken(this.user);
                if(res.code == 0) {
                    localStorage.setItem("token", res.token)
                    window.location.href = "/"
                } else {
                    this.$message(res.message)
                }
            }
        }
    };
</script>