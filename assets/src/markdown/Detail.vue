<template>
    <el-row>
        <h2>{{title}}</h2>
        <el-divider></el-divider>

        <el-row style="margin-top: 20px;">
            <mavon-editor v-model="mdtext" :defaultOpen="'preview'" :subfield="false" :toolbarsFlag="false"
                :codeStyle="'code-idea'" id="pdfId" />
        </el-row>
        <el-row style="margin-top:30px;">
            <el-col align="center">
                <el-button type="warning" size="large" @click="jumpEdit" style="margin-right:20px;">修改</el-button>
                <el-popover placement="top" width="160" v-model="visible">
                    <p>确定删除该文档么？？</p>
                    <div style="text-align: right; margin: 0">
                        <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                        <el-button type="primary" size="mini" @click="deleteMd">确定</el-button>
                    </div>
                    <el-button slot="reference" type="danger" style="margin-right:20px;">删除</el-button>
                </el-popover>
                <el-button type="primary" @click="savePdf">导出PDF</el-button>
            </el-col>
        </el-row>
    </el-row>
</template>

<script>
    import html2Canvas from 'html2canvas'
    import JsPDF from 'jspdf'
    import html2PDF from 'jspdf-html2canvas'
    export default {
        data() {
            return {
                mdtext: "",
                title: "",
                visible: false
            };
        },
        watch: {
            $route: function () {
                this.getArticleDetail(this.$route.params["id"]);
            }
        },
        mounted() {
            this.getArticleDetail(this.$route.params["id"]);
        },
        methods: {
            async getArticleDetail(id) {
                let res = await this.$api.getMdDetail(id);
                this.mdtext = res.content;
                this.title = res.title;
                document.title = res.title;
            },
            jumpEdit() {
                this.$router.push("/markdown/edit/" + this.$route.params["id"]);
            },
            async deleteMd() {
                let res = await this.$api.deleteMd(this.$route.params["id"]);
                if (res.code == 0) {
                    this.$message("删除成功");
                    this.$emit("talk2SlieMenu", "delete", this.$route.params["id"]);
                }
            },
            savePdf() {

                // 导出pdf
                let page = document.querySelector('#pdfId');
                // page 元素背景设成#FFF，解决打印处理黑边问题

                html2PDF(page, {
                    jsPDF: {
                        unit: 'pt',
                        format: 'a4'
                    },
                    imageType: 'image/jpeg',
                    success: function (pdf) {
                        window.scrollTo(0, document.body.scrollHeight)
                        pdf.save('材料清单' + '.pdf');
                    }

                });
                return
                let t = this.title
                html2Canvas(document.querySelector('#pdfId'), {
                    allowTaint: true
                }).then(function (canvas) {
                    console.log(canvas)
                    let contentWidth = canvas.width
                    let contentHeight = canvas.height
                    let pageHeight = contentWidth / 592.28 * 841.89
                    let leftHeight = contentHeight
                    let position = 0
                    let imgWidth = 595.28
                    let imgHeight = 592.28 / contentWidth * contentHeight
                    let pageData = canvas.toDataURL('image/jpeg', 1.0)
                    let PDF = new JsPDF('', 'pt', 'a4')
                    if (leftHeight < pageHeight) {
                        PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
                    } else {
                        while (leftHeight > 0) {
                            console.log(position, imgWidth, imgHeight)
                            PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
                            leftHeight -= pageHeight
                            position -= 841.89
                            if (leftHeight > 0) {
                                PDF.addPage()
                            }
                        }
                    }
                    PDF.save(t + '.pdf')
                })
            }
        }
    }
</script>