"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "HealthTips",
  setup(__props) {
    const tipList = [
      {
        title: "每天饮水1500ml以上",
        desc: "保持身体代谢与循环稳定",
        type: "饮食",
        time: "5分钟前",
        icon: "💧"
      },
      {
        title: "久坐1小时应适当活动",
        desc: "缓解腰背压力与肌肉疲劳",
        type: "运动",
        time: "12分钟前",
        icon: "🏃"
      },
      {
        title: "睡前减少玩手机",
        desc: "避免影响褪黑素分泌",
        type: "睡眠",
        time: "20分钟前",
        icon: "🌙"
      },
      {
        title: "保持稳定情绪状态",
        desc: "长期焦虑会影响睡眠与心率",
        type: "情绪",
        time: "35分钟前",
        icon: "🍃"
      }
    ];
    function openDetail(item) {
      common_vendor.index.showToast({
        title: item.title,
        icon: "none"
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(tipList, (item, index, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: common_vendor.t(item.desc),
            c: common_vendor.t(item.type),
            d: common_vendor.t(item.time),
            e: common_vendor.t(item.icon),
            f: index,
            g: common_vendor.o(($event) => openDetail(item), index)
          };
        })
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/indexComponentsPages/HealthTips/HealthTips.js.map
