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
                    <i class="el-icon-menu"></i>
                    <span slot="title">{{item.title}}</span>
                </el-menu-item>
            </template>
        </el-menu>
    </div>
</template>
<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 250px;
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
    mounted() {
        //this.getMdList();
    },
    computed : {
        defaultActive : function() {
            let theIndex = 0;
            this.mdList.forEach((obj, index) => {
                if (this.$route.params.id == obj.id) {
                    theIndex = index;
                }
            });
            return theIndex
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
            let theIndex = 0;
            this.mdList.forEach((obj, index) => {
                if (id == obj.id) {
                    theIndex = index;
                }
            });
            if (theIndex == this.mdList.length - 1) {
                this.getMdList();
                setTimeout(() => {
                    this.jumpMd(this.mdList[this.mdList.length - 1].id);
                }, 100);
            } else {
                this.getMdList();
                setTimeout(() => {
                    this.jumpMd(this.mdList[theIndex].id);
                }, 100);
            }
        }
    }
};
</script>