<template>
    <div class="middle">
        <el-menu
            class="el-menu-vertical-demo"
            :collapse="false"
            background-color="#323f49"
            text-color="#fff"
            active-text-color="#e6a23c"
            :default-active="defaultActive"
        >
            <template v-for="(item, idx) in mdList">
                <el-menu-item :index="idx + ''" :key="idx + ''" :route="{path:'/markdown/detail/' + item.id}" @click="jumpMd(item.id)">
                    <span slot="title">{{item.title}}</span>
                </el-menu-item>
            </template>
        </el-menu>
    </div>
</template>
<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 230px;
    min-height: 100%;
}
.middle {
    height: 99%;
    position: fixed;
    overflow-x: scroll;
    border-top: 1px solid #828181;
    z-index: 99;
}
.el-menu--collapse {
    height: 100%;
}
</style>
<script>
export default {
    data() {
        return {
            mdList: []
        };
    },
    computed : {
        defaultActive : function() {
            let theIndex = -1;
            this.mdList.forEach((obj, index) => {
                if (this.$route.params.id == obj.id) {
                    theIndex = index;
                }
            });
            return theIndex + ""
        }
    },
    methods: {
        async getMdList() {
            let res = await this.$api.getMdList();
            this.mdList = res;
        },
        jumpMd(id) {
            this.$router.push("/markdown/detail/" + id);
        },
        afterDelete(id) {
            let jumpIndex = 0;
            let delIndex = 0;
            this.mdList.forEach((obj, index) => {
                if (id == obj.id) {
                    delIndex = index;
                }
            });

            if (delIndex == this.mdList.length - 1 ) {
                jumpIndex = delIndex - 1
            } else {
                jumpIndex = delIndex + 1
            }
            this.jumpMd(this.mdList[jumpIndex].id)
            setTimeout(() => {
                this.getMdList()
            }, 100)
            
        }
    }
};
</script>