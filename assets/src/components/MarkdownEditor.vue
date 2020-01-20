<template>
    <div>
       <mavon-editor v-model="value" :ishljs="true" :toolbars="toolbars" @imgAdd="imgAdd" ref="md" />
    </div>
</template>
<script>
import axios from 'axios';

export default {
    props : ['initValue'],
    data(){
    	return {
            value : '',
            toolbars: {
              bold: false, // 粗体
              italic: false, // 斜体
              header: false, // 标题
              underline: false, // 下划线
              strikethrough: false, // 中划线
              mark: false, // 标记
              superscript: false, // 上角标
              subscript: false, // 下角标
              quote: false, // 引用
              ol: false, // 有序列表
              ul: false, // 无序列表
              link: true, // 链接
              imagelink: true, // 图片链接
              code: true, // code
              table: false, // 表格
              fullscreen: true, // 全屏编辑
              readmodel: true, // 沉浸式阅读
              htmlcode: false, // 展示html源码
              help: false, // 帮助
              /* 1.3.5 */
              undo: true, // 上一步
              redo: true, // 下一步
              trash: false, // 清空
              save: false, // 保存（触发events中的save事件）
              /* 1.4.2 */
              navigation: false, // 导航目录
              /* 2.1.8 */
              alignleft: false, // 左对齐
              aligncenter: false, // 居中
              alignright: false, // 右对齐
              /* 2.2.1 */
              subfield: false, // 单双栏模式
              preview: true, // 预览
              fontSize : '11px',
            }
    	}
    },
    watch : {
        value : function(val) {
            this.$emit('inputMarkdown', val);
        },
        initValue : function(val) {
            this.value = val;
        }
    },
    methods : {
        async imgAdd(pos, $file) {
            let res = await this.$api.uploadImage($file);
            if(res.code == 0) {
                this.$refs.md.$img2Url(pos, "http://127.0.0.1:8888/image/" + res.file);
            }
            
        }
    }
}
</script>