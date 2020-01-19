<template>
    <el-row id="app">
        <el-container>
            <el-header :height="headerHeight">
                <myheader
                    :userName="userName"
                    :userType="userType"
                    contentType="exp"
                    @setHeaderHeight="setHeaderHeight"
                    @showMyAccess="showMyAccess"
                />
            </el-header>
            <el-container>
                <el-aside :width="showSlideMenu ? open : close">
                    <slidemenu
                        :currentMenuData="currentMenuData"
                        @expand="expand"
                        style="overflow-y:auto;ovreflow-x:hidden"
                    ></slidemenu>
                </el-aside>
                <el-main style="margin-bottom: 200px;">
                    <router-view
                        @hook:mounted="handleChildMounted"
                        @hook:beforeMount="handleChildBeforeMount"
                    />
                </el-main>
            </el-container>
        </el-container>
    </el-row>
</template>
<script>
//components
import myheader from "@/components/EleHeader";
import slideMenu from "@/components/SlideMenu";

import moment from "moment";

export default {
    name: "Exp",
    data() {
        return {
            close: "64px",
            open: "210px",
            headerHeight: "60px",
            showSlideMenu: true,
            currentMenuData: [],
            userType: 0,
            userName: "",
            PageInitAt: "",
            showAccess: false,
            myAccess: [],
            user_height: "0px"
        };
    },
    components: {
        myheader: myheader,
        slidemenu: slideMenu
    },
    methods: {
        async getUserInfo() {
            let res = await this.$api.user.getUserInfoByGo();

            if (res.errcode == 0) {
                this.userType = res.data.user_type;

                this.userName = res.data.user_name;
            }

            this.$store.commit("setUsername", this.userName);
            this.$store.commit("setUserType", this.userType);

            localStorage.setItem("userType", this.userType);
            localStorage.setItem("userName", this.userName);

            this.setSlideMenu();

            if (this.userType <= 0) {
                this.$alert("你暂时没有访问法拉第的权限，若要访问请申请权限", {
                    confirmButtonText: "确定",
                    callback: () =>
                        this.$router.push({ path: "/user/apply_access" })
                });
            }
            return;
        },
        handleChildBeforeMount() {
            this.$store.commit("setHeadBreadCrumb", "");
        },
        handleChildMounted() {
            this.sendPageView();
            this.getSlideMenuStatInfo();
            this.checkUpdatePage();
            //this.autoFixTableHead();
        },
        checkUpdatePage: function() {
            let initPageAt = this.PageInitAt;

            if (moment(initPageAt).isBefore(moment().subtract(3600, "s"))) {
                window.location.reload();
            }
        },
        async sendPageView() {
            let fullUrl = this.$route.path;
            let queryStr = this.$tool.obj2QueryString(this.$route.query);

            if (queryStr != "") {
                fullUrl += "?" + queryStr;
            }
            fullUrl += "&version=3.0";
            this.$api.user.sendPvStat(fullUrl);
        },
        async getSlideMenuStatInfo() {
            if (this.$store.state.user.user_type < 4) {
                return false;
            }

            let adminMenuIndex = 3;

            let res = await this.$api.exp.getExpCount();

            let auditExpCnt =
                res.data.audit_exp_count > 0 ? res.data.audit_exp_count : "";
            let auditStgyCnt =
                res.data.audit_strategy_count > 0
                    ? res.data.audit_strategy_count
                    : "";
            let totalCnt =
                auditExpCnt + auditStgyCnt > 0
                    ? auditExpCnt + auditStgyCnt
                    : "";

            this.$set(
                this.currentMenuData[adminMenuIndex].secondLevelMenu[0],
                "badge",
                auditExpCnt
            );
            this.$set(
                this.currentMenuData[adminMenuIndex].secondLevelMenu[1],
                "badge",
                auditStgyCnt
            );
            this.$set(this.currentMenuData[adminMenuIndex], "badge", totalCnt);
        },
        setSlideMenu: function() {
            let realMenu = [];
            RootUserMenu.forEach((mainVal, index) => {
                let subMenu = [];

                mainVal.secondLevelMenu.forEach(val => {
                    if (
                        val.userType == undefined ||
                        val.userType.length == 0 ||
                        val.userType.indexOf(this.userType) > -1
                    ) {
                        subMenu.push(val);
                    }
                });

                if (
                    mainVal.userType == undefined ||
                    mainVal.userType.length == 0 ||
                    mainVal.userType.indexOf(this.userType) > -1
                ) {
                    mainVal.secondLevelMenu = subMenu;

                    realMenu.push(mainVal);
                }
            });
            this.currentMenuData = realMenu;

            this.getSlideMenuStatInfo();
        },
        expand(flag) {
            this.$set(this, "showSlideMenu", flag);
        },
        setHeaderHeight(h) {
            this.headerHeight = h;
        },
        async showMyAccess() {
            let res = await this.$api.user.getUserAccess(
                this.$store.state.user.username
            );
            this.myAccess = res.data;
            this.showAccess = true;
        },
        setPageInitTime: function() {
            this.PageInitAt = moment().format("YYYY-MM-DD HH:mm:ss");
        },
        fixedTableHead: function(tableId) {
            if ($(tableId).length < 1) {
                return;
            }

            this.unFixedTableHead();
            $(window).scroll(function() {
                //到覆盖table
                var dist1 =
                    $(tableId).offset().top -
                    $(window).scrollTop() -
                    $(".el-header").height();
                //完全覆盖

                var dist2 =
                    $(tableId).offset().top +
                    $(tableId)[0].offsetHeight -
                    $(window).scrollTop() -
                    $(".navbar").height();

                if (dist1 <= 0 && dist2 > 0) {
                    console.log($(tableId + " thead").length);
                    $(tableId + " thead").css({
                        transform: "translateY(" + -dist1 + "px)"
                    });
                } else {
                    $(tableId + " thead").css({ transform: "translateY(0)" });
                }
            });
        },
        unFixedTableHead: function() {
            $(window).unbind("scroll");
        }
    },

    mounted() {
        var storage = localStorage;
        if (!storage.getItem("vuetour")) {
            setTimeout(() => {
                this.$tours["myTour"].start();
            }, 3000);
        }
        storage.setItem("vuetour", true);
        this.setPageInitTime();
        this.getUserInfo();
        //$('meta[name="viewport"]').attr('content',"***" );
    }
};
</script>

<style>
.modal-backdrop {
    z-index: 887;
}
</style>

