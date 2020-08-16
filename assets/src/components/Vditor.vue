<template>
    <div id="vditor">
    </div>
</template>
<script>
    import Vditor from 'vditor'
    import "vditor/src/assets/scss/index.scss"

    export default {
        data() {
            return {
                contentEditor: null,
            }
        },
        mounted() {
            var that = this
            this.contentEditor = new Vditor('vditor', {
                toolbarConfig: {
                    pin: true,
                },
                cache: {
                    enable: false,
                },
                minHeight: 300,
                icon: "material",
                placeholder: "请输入",
                upload: {
                    fieldName: "file",
                    url: "/markdown/upload_image",//文件上传路径 
                    success: function (textarea, msg) {//textarea 
                        msg = JSON.parse(msg)
                        if (msg.code === 0) {//请求成功 
                            let content = '![' + msg.file + '](/image/' + msg.file + ')'
                            //插入上传文件后的markdown代码 
                            that.contentEditor.insertValue(content, true)
                        }
                    }
                },
                input: (value) => {
                    that.inputValue(value)
                },
                preview : {
                    maxWidth : 1000,
                    delay : 1000,
                    mode : "editor"
                }
            })
        },
        methods: {
            setValue(text) {
                this.contentEditor.setValue(text)
            },
            getValue() {
                return this.contentEditor.getValue()
            },
            inputValue(v) {
                this.$emit('inputValue', v);
            },
            ctrlSave() {
                this.$emit('ctrlSave');
            }
        }
    }
</script>