"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "me",
  setup(__props) {
    const userInfo = common_vendor.ref({
      nickname: "林小雨",
      uid: "20240513001",
      avatar: "/static/user1.jpg",
      recordCount: 12,
      doctorCount: 2
    });
    const familyMembers = common_vendor.ref([
      { id: "1", name: "林小雨", avatar: "/static/user1.jpg", isSelf: true },
      { id: "2", name: "林建国", avatar: "/static/father.jpg", isSelf: false },
      { id: "3", name: "陈秀英", avatar: "/static/mother.jpg", isSelf: false }
    ]);
    const currentMember = common_vendor.computed(() => familyMembers.value.find((m) => m.isSelf) || familyMembers.value[0]);
    const mainMenus = common_vendor.ref([
      { title: "我的收藏", icon: "/static/icon/star.png", page: "/pages/collect/collect" },
      { title: "健康报告", icon: "/static/icon/report.png", page: "/pages/report/list" },
      { title: "用药记录", icon: "/static/icon/med.png", page: "/pages/medication/medication" },
      { title: "问诊记录", icon: "/static/icon/chat.png", page: "/pages/consultation/consultation" }
    ]);
    const subMenus = common_vendor.ref([
      { title: "设置", icon: "/static/icon/setting.png", page: "/pages/setting/setting" },
      { title: "关于我们", icon: "/static/icon/about.png", page: "/pages/about/about" }
    ]);
    const goEditProfile = () => {
      common_vendor.index.showToast({ title: "编辑个人资料", icon: "none" });
    };
    const goHealthRecord = () => {
      common_vendor.index.navigateTo({ url: "/pages/health-record/record" });
    };
    const goFamilyManagement = () => {
      common_vendor.index.navigateTo({ url: "/pages/family-management/management" });
    };
    const goMyDoctor = () => {
      common_vendor.index.navigateTo({ url: "/pages/my-doctor/doctor" });
    };
    const handleMenu = (item) => {
      if (item.page) {
        common_vendor.index.navigateTo({ url: item.page });
      } else {
        common_vendor.index.showToast({ title: `${item.title}开发中`, icon: "none" });
      }
    };
    const handleLogout = () => {
      common_vendor.index.showModal({
        title: "退出登录",
        content: "确定要退出当前账号吗？",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.showToast({ title: "已退出登录", icon: "success" });
          }
        }
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_assets._imports_0,
        b: common_vendor.t(userInfo.value.nickname),
        c: common_vendor.t(userInfo.value.uid),
        d: common_vendor.o(goEditProfile, "cd"),
        e: common_vendor.t(userInfo.value.recordCount),
        f: common_vendor.o(goHealthRecord, "ae"),
        g: common_vendor.t(familyMembers.value.length),
        h: common_vendor.o(goFamilyManagement, "bd"),
        i: common_vendor.t(userInfo.value.doctorCount),
        j: common_vendor.o(goMyDoctor, "73"),
        k: familyMembers.value.length > 0
      }, familyMembers.value.length > 0 ? common_vendor.e({
        l: currentMember.value.avatar,
        m: common_vendor.t(currentMember.value.name),
        n: currentMember.value.isSelf
      }, currentMember.value.isSelf ? {} : {}, {
        o: common_vendor.o(goFamilyManagement, "67")
      }) : {}, {
        p: common_vendor.f(mainMenus.value, (item, k0, i0) => {
          return {
            a: item.icon,
            b: common_vendor.t(item.title),
            c: item.title,
            d: common_vendor.o(($event) => handleMenu(item), item.title)
          };
        }),
        q: common_vendor.f(subMenus.value, (item, k0, i0) => {
          return {
            a: item.icon,
            b: common_vendor.t(item.title),
            c: item.title,
            d: common_vendor.o(($event) => handleMenu(item), item.title)
          };
        }),
        r: common_vendor.o(handleLogout, "1b")
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-19c123a7"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/me/me.js.map
