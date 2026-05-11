"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _component_transition = common_vendor.resolveComponent("transition");
  _component_transition();
}
const _sfc_main = {
  __name: "aiadvDetail",
  props: {
    showDetail: {
      type: Boolean,
      default: false
    }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const bodyAdvice = common_vendor.ref("");
    const medicalAdvice = common_vendor.ref("");
    const foodAdvice = common_vendor.ref("");
    const sportAdvice = common_vendor.ref("");
    const medicineAdvice = common_vendor.ref("");
    const lifeAdvice = common_vendor.ref("");
    const closeDetail = () => {
      emit("closeDetail");
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: __props.showDetail
      }, __props.showDetail ? common_vendor.e({
        b: __props.showDetail
      }, __props.showDetail ? {
        c: common_vendor.o(closeDetail, "d0"),
        d: common_vendor.t(bodyAdvice.value),
        e: common_vendor.t(medicalAdvice.value),
        f: common_vendor.t(foodAdvice.value),
        g: common_vendor.t(sportAdvice.value),
        h: common_vendor.t(medicineAdvice.value),
        i: common_vendor.t(lifeAdvice.value),
        j: common_vendor.o(() => {
        }, "de")
      } : {}, {
        k: common_vendor.p({
          name: "popup-scale"
        }),
        l: common_vendor.o(closeDetail, "87")
      }) : {}, {
        m: common_vendor.p({
          name: "mask-fade"
        })
      });
    };
  }
};
wx.createComponent(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/aiadvDetail/aiadvDetail.js.map
