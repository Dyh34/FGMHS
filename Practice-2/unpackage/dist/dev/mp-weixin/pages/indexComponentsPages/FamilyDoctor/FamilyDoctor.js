"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const _sfc_main = {
  __name: "FamilyDoctor",
  setup(__props) {
    const aiFeatures = [
      "AI导诊分析",
      "智能健康建议",
      "症状风险提醒",
      "健康趋势分析"
    ];
    const doctorServices = [
      {
        icon: "🩺",
        name: "图文问诊"
      },
      {
        icon: "📞",
        name: "电话咨询"
      },
      {
        icon: "📈",
        name: "长期随访"
      },
      {
        icon: "👨‍👩‍👧",
        name: "家庭共享"
      }
    ];
    function goAI() {
      common_vendor.index.navigateTo({
        url: "/pages/ai/ai"
      });
    }
    function contactDoctor() {
      common_vendor.index.showModal({
        title: "联系医生",
        content: "是否联系当前家庭医生？",
        success(res) {
          if (res.confirm) {
            common_vendor.index.showToast({
              title: "已发送请求",
              icon: "success"
            });
          }
        }
      });
    }
    function doctorDetail() {
      common_vendor.index.navigateTo({
        /*
        	替换医生详情页
        */
        url: "/pages/doctor/detail"
      });
    }
    function moreDoctors() {
      common_vendor.index.navigateTo({
        /*
        	替换医生列表页
        */
        url: "/pages/doctor/list"
      });
    }
    function buyDoctor() {
      common_vendor.index.showModal({
        title: "家庭医生服务",
        content: "是否立即开通家庭共享医生服务？",
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
        a: common_vendor.f(aiFeatures, (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: index
          };
        }),
        b: common_vendor.o(goAI, "32"),
        c: common_assets._imports_0$2,
        d: common_vendor.o(contactDoctor, "4c"),
        e: common_vendor.o(doctorDetail, "ec"),
        f: common_assets._imports_2,
        g: common_vendor.f(doctorServices, (item, index, i0) => {
          return {
            a: common_vendor.t(item.icon),
            b: common_vendor.t(item.name),
            c: index
          };
        }),
        h: common_vendor.o(contactDoctor, "d3"),
        i: common_vendor.o(moreDoctors, "31"),
        j: common_vendor.o(buyDoctor, "92")
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/indexComponentsPages/FamilyDoctor/FamilyDoctor.js.map
