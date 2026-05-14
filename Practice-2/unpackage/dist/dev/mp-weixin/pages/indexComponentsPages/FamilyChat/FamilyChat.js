"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const _sfc_main = {
  __name: "FamilyChat",
  setup(__props) {
    function groupInfo() {
      common_vendor.index.showToast({
        title: "家庭群信息",
        icon: "none"
      });
    }
    function callAI() {
      common_vendor.index.showToast({
        title: "AI分析中",
        icon: "none"
      });
    }
    function callDoctor() {
      common_vendor.index.showModal({
        title: "呼叫家庭医生",
        content: "是否联系家庭医生进入群聊？",
        success(res) {
          if (res.confirm) {
            common_vendor.index.showToast({
              title: "已通知医生",
              icon: "success"
            });
          }
        }
      });
    }
    function shareReport() {
      common_vendor.index.showToast({
        title: "选择健康报告",
        icon: "none"
      });
    }
    function sendMessage() {
      common_vendor.index.showToast({
        title: "发送成功",
        icon: "success"
      });
    }
    function chooseImage() {
      common_vendor.index.chooseImage({
        count: 1
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(groupInfo, "89"),
        b: common_assets._imports_0$3,
        c: common_assets._imports_1,
        d: common_assets._imports_2,
        e: common_assets._imports_3,
        f: common_vendor.o(callAI, "f6"),
        g: common_vendor.o(callDoctor, "f1"),
        h: common_vendor.o(shareReport, "df"),
        i: common_vendor.o(chooseImage, "ca"),
        j: common_vendor.o(sendMessage, "b4")
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/indexComponentsPages/FamilyChat/FamilyChat.js.map
