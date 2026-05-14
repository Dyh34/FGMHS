"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "MedicalMap",
  setup(__props) {
    const quickList = [
      {
        icon: "🏥",
        name: "医院"
      },
      {
        icon: "💊",
        name: "药店"
      },
      {
        icon: "🚑",
        name: "急诊"
      },
      {
        icon: "🩺",
        name: "体检"
      }
    ];
    const hospitalList = [
      {
        name: "人民医院",
        level: "三甲综合医院",
        distance: "1.2km"
      },
      {
        name: "中心医院",
        level: "三级医院",
        distance: "2.5km"
      },
      {
        name: "华康医院",
        level: "专科医院",
        distance: "3.8km"
      }
    ];
    function getLocation() {
      common_vendor.index.showToast({
        title: "定位中",
        icon: "none"
      });
    }
    function clickQuick(item) {
      common_vendor.index.showToast({
        title: item.name,
        icon: "none"
      });
    }
    function moreHospital() {
      common_vendor.index.showToast({
        title: "查看更多医院",
        icon: "none"
      });
    }
    function goHospital(item) {
      common_vendor.index.showToast({
        title: item.name,
        icon: "none"
      });
    }
    function callEmergency() {
      common_vendor.index.showModal({
        title: "急诊呼叫",
        content: "是否拨打120急救电话？",
        success(res) {
          if (res.confirm) {
            common_vendor.index.makePhoneCall({
              phoneNumber: "120"
            });
          }
        }
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(getLocation, "af"),
        b: common_vendor.f(quickList, (item, index, i0) => {
          return {
            a: common_vendor.t(item.icon),
            b: common_vendor.t(item.name),
            c: index,
            d: common_vendor.o(($event) => clickQuick(item), index)
          };
        }),
        c: common_vendor.o(moreHospital, "86"),
        d: common_vendor.f(hospitalList, (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.t(item.level),
            c: common_vendor.t(item.distance),
            d: index,
            e: common_vendor.o(($event) => goHospital(item), index)
          };
        }),
        e: common_vendor.o(callEmergency, "73")
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/indexComponentsPages/MedicalMap/MedicalMap.js.map
