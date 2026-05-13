"use strict";
const common_vendor = require("../../../../common/vendor.js");
const common_assets = require("../../../../common/assets.js");
const _sfc_main = {
  __name: "FamilyDoctor",
  setup(__props) {
    function goAI() {
      common_vendor.index.navigateTo({
        /*
        	这里替换成你的AI导诊页面路径
        */
        url: "/pages/ai/ai"
      });
    }
    function buyDoctor() {
      common_vendor.index.showModal({
        title: "家庭医生服务",
        content: "是否开通家庭共享医生服务？",
        success(res) {
          if (res.confirm) {
            common_vendor.index.showToast({
              title: "开通成功",
              icon: "success"
            });
          }
        }
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(goAI, "c8"),
        b: common_assets._imports_0$2,
        c: common_vendor.o(buyDoctor, "2d")
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/pages/indexComponentsPages/FamilyDoctor/FamilyDoctor/FamilyDoctor.js.map
