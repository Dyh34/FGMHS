"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "ExercisePlan",
  setup(__props) {
    const weekPlan = [
      {
        icon: "🏃",
        name: "晨跑",
        desc: "30分钟慢跑",
        done: true
      },
      {
        icon: "🧘",
        name: "拉伸训练",
        desc: "腰背舒缓训练",
        done: false
      },
      {
        icon: "🚴",
        name: "骑行",
        desc: "8公里骑行",
        done: false
      }
    ];
    const trainList = [
      {
        icon: "🔥",
        name: "燃脂训练",
        time: "20分钟"
      },
      {
        icon: "💪",
        name: "力量训练",
        time: "35分钟"
      },
      {
        icon: "🧘",
        name: "瑜伽放松",
        time: "25分钟"
      }
    ];
    function startSport() {
      common_vendor.index.showToast({
        title: "运动开始",
        icon: "success"
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(weekPlan, (item, index, i0) => {
          return {
            a: common_vendor.t(item.icon),
            b: common_vendor.t(item.name),
            c: common_vendor.t(item.desc),
            d: common_vendor.t(item.done ? "已完成" : "待完成"),
            e: common_vendor.n(item.done ? "done-tag" : "wait-tag"),
            f: index
          };
        }),
        b: common_vendor.f(trainList, (item, index, i0) => {
          return {
            a: common_vendor.t(item.icon),
            b: common_vendor.t(item.name),
            c: common_vendor.t(item.time),
            d: index
          };
        }),
        c: common_vendor.o(startSport, "30")
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/indexComponentsPages/ExercisePlan/ExercisePlan.js.map
