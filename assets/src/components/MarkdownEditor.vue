<template>
    <div>
       <mavon-editor v-model="value" :ishljs="true" :toolbars="toolbars" @imgAdd="imgAdd" ref="md" codeStyle="androidstudio"/>
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
              bold: true, // 粗体
              italic: true, // 斜体
              header: true, // 标题
              underline: true, // 下划线
              strikethrough: true, // 中划线
              mark: false, // 标记
              superscript: true, // 上角标
              subscript: true, // 下角标
              quote: true, // 引用
              ol: true, // 有序列表
              ul: true, // 无序列表
              link: true, // 链接
              imagelink: true, // 图片链接
              code: true, // code
              table: true, // 表格
              fullscreen: true, // 全屏编辑
              readmodel: true, // 沉浸式阅读
              htmlcode: false, // 展示html源码
              help: true, // 帮助
              /* 1.3.5 */
              undo: true, // 上一步
              redo: true, // 下一步
              trash: false, // 清空
              save: false, // 保存（触发events中的save事件）
              /* 1.4.2 */
              navigation: true, // 导航目录
              /* 2.1.8 */
              alignleft: true, // 左对齐
              aligncenter: true, // 居中
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
                this.$refs.md.$img2Url(pos, "/image/" + res.file);
            }
            
        }
    }
}
</script>