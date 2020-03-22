<template>
    <div>
        <div class="middle">
            <el-menu class="el-menu-vertical-demo" :collapse="false" background-color="#323f49" text-color="#fff"
                active-text-color="#e6a23c" :default-active="defaultActive">

                <template v-for="(item, idx) in mdList">
                    <el-menu-item :index="idx + ''" :key="idx + ''" @click="jumpMd(item.id)">
                        <span slot="title">{{item.title}}</span>
                    </el-menu-item>
                </template>
                <!-- <el-menu-item index="create" @click="jumpCreate()">
                    <span slot="title"><i class="el-icon-edit"></i>新建</span>
                </el-menu-item>
                <el-menu-item index="image" @click="jumpImageList()">
                    <span slot="title"><i class="el-icon-upload"></i>上传图片</span>
                </el-menu-item>
                <el-menu-item index="trash" @click="jumpTrashList()">
                    <span slot="title"><i class="el-icon-delete-solid"></i>回收站</span>
                </el-menu-item> -->
            </el-menu>
        </div>
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
</style>
<script>
    export default {
        data() {
            return {
                mdList: []
            };
        },
        computed: {
            defaultActive: function () {
                console.log(this.$route)
                if (this.$route.name == "Home" || this.$route.name == "CreateMd") {
                    return "create"
                }
                if (this.$route.name == "ImageList") {
                    return "image"
                }
                if (this.$route.name == "TrashMdList") {
                    return "trash"
                }
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
            jumpImageList() {
                this.$router.push("/markdown/images");
            },
            jumpTrashList() {
                this.$router.push("/markdown/trash_list");
            },
            jumpCreate() {
                this.$router.push("/markdown/create");
            },
            afterDelete(id) {
                let jumpIndex = 0;
                let delIndex = 0;
                this.mdList.forEach((obj, index) => {
                    if (id == obj.id) {
                        delIndex = index;
                    }
                });

                if (delIndex == this.mdList.length - 1) {
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