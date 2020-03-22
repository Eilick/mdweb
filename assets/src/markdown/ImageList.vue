<template>
    <el-row>
        <el-row>
            <el-upload class="upload-demo" ref="upload" action="/markdown/upload_image"
                :on-remove="handleRemove" :file-list="fileList" :auto-upload="false" :limit="8" multiple
                :on-exceed="handleExceed" list-type="picture-card" :on-success="handleSuccess">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <el-button style="margin-left: 10px;" size="large" type="success" @click="submitUpload">上传到服务器
                </el-button>
            </el-upload>
        </el-row>
        <h2 style="margin-top: 20px;">上传的图片列表</h2>
        <el-row style="margin-top: 20px;" :gutter="12">
            <template v-for="item in list">
                <el-col :span="8" style="margin-bottom: 10px;">
                    <el-card style="height: 400px;">
                        <div slot="header" class="clearfix">
                            <strong style="font-size: 17px;">{{item.create_at.substr(0,10)}}</strong><span
                                style="font-size: 13px;">({{item.create_at.substr(11,5)}})</span>

                            <el-button style="float: right; padding: 3px 5px;" type="danger"
                                @click="askToDelImg(item.name)" icon="el-icon-delete" size="mini">
                            </el-button>
                            <el-button type="text" @click="copyUrlPath(item.url)" style="float: right; padding: 3px 0;">
                                复制URL</el-button>
                        </div>

                        <a :href="item.url" target="_blank">
                            <el-image :src="item.url" :fit="fits" lazy></el-image>
                        </a>
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
            document.title = "上传图片"
            this.getImageList();
        },
        methods: {
            async getImageList(id) {
                let res = await this.$api.getImageList();
                this.list = lodash.orderBy(res.data, "create_at").reverse()
            },
            copyUrlPath(urlStr) {
                this.$copyText(urlStr).then((e) => {
                    this.$message('复制成功')
                }, () => {
                    alert('复制失败')
                })
            },
            askToDelImg(name) {
                this.$confirm('确认删除该图片么？将无法恢复, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'danger'
                }).then(() => {
                    this.delImg(name)
                }).catch(() => {

                });
            },
            async delImg(name) {
                let res = await this.$api.delImg(name);
                if (res.code == 0) {
                    this.$message("删除成功")
                    this.getImageList()
                } else {
                    this.$message(res.msg || "删除失败")
                }
                this.list = lodash.orderBy(res.data, "create_at").reverse()
            },
            submitUpload() {
                this.$refs.upload.submit();
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            handleSuccess(res, file, fileList) {
                this.fileList = fileList.filter((f) => {
                    if (f.name != file.name) {
                        return f
                    }
                })

                if (fileList.length < 2) {
                    this.getImageList()
                }
            }
        }
    }
</script>