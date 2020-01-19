<template>
    <div class="middle" >
        <el-menu :default-active="$route.path" class="el-menu-vertical-demo" :collapse="isCollapse" background-color="#323f49" text-color="#fff" active-text-color="#e6a23c" :default-openeds="defaultOpens">
            <el-submenu v-for="(mainMenuItem, index) in meauList" :index="index + ''" :key="index"  text-color="#fff" @open="openSubMenu(index)" @close="closeSubMenu(index)">
                <template slot="title">
                    <i :class="mainMenuItem.iconfont"></i>
                    <span>{{ mainMenuItem.mainMenuName }}</span>
                    <el-badge
                        :value="mainMenuItem.badge"
                        v-if="mainMenuItem.badge != undefined && mainMenuItem.badge > 0"
                    />
                </template>
                <el-menu-item-group collapse="true">
                    <a
                        v-for="(secondMenuItem,
                        secondIndex) in mainMenuItem.secondLevelMenu"
                    >
                        <router-link :to="secondMenuItem.url">
                            <el-menu-item :index="secondMenuItem.url">
                                {{
                                secondMenuItem.secondLevelMenuName
                                }}
                                <el-badge
                                    :value="secondMenuItem.badge"
                                    v-if="secondMenuItem.badge != undefined"
                                />
                            </el-menu-item>
                        </router-link>
                    </a>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
        <el-row style="bottom:10px;position:fixed" :style="{'left': isCollapse ? '8px' : '142px'}">
            <el-button @click="foldMenu" size="mini" circle plain>
                <i :class=" isCollapse ? 'el-icon-right' :'el-icon-back'  "></i>
            </el-button>
        </el-row>
       
    </div>
</template>
<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 210px;
    min-height: 100%;
}
.middle {
    height: 99%;
    position: fixed;
    overflow-x:hidden;
    border-top: 1px solid #828181;
    z-index: 99
}
.el-menu--collapse {
    height: 100%;
}
</style>

<style>
.el-menu-item-group__title {
    padding: 0 0 7px 20px !important;
}
</style>

<script>
import MenuExceptList from "@/config/MenuExceptList";

export default {
    name: "slideMenu",
    props: ["currentMenuData"],
    data() {
        return {
            isCollapse: false,
            meauList: [],
            value1: "",
            defaultOpens : ['0','1']
        };
    },
    watch: {
        currentMenuData: {
            handler(newVal, old) {
                this.meauList = newVal;
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        expandMenu(flag) {
            this.isCollapse = !flag;
            this.$emit("expand", flag);
        },
        foldMenu() {
            if (this.isCollapse) {
                this.expandMenu(true);
            } else {
                this.expandMenu(false);
            }
        },
        openSubMenu(i) {
            this.defaultOpens.push(i + '')
        },
        closeSubMenu(i) {
            this.defaultOpens = this.$lodash.pull(this.defaultOpens, i + '')
        }
    }
};
</script>