"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _component_head1 = common_vendor.resolveComponent("head1");
  _component_head1();
}
const _sfc_main = {
  __name: "phdata",
  props: {
    faph: {
      type: Object,
      default: () => ({})
    }
  },
  setup(__props) {
    const goto = () => {
      common_vendor.index.navigateTo({
        url: "/pages/index/phydetail/phydetail/phydetail"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(__props.faph.name),
        b: common_vendor.o(goto, "fa"),
        c: common_vendor.o(($event) => _ctx.isPress = true, "e4"),
        d: common_vendor.o(($event) => _ctx.isPress = false, "84"),
        e: common_vendor.o(($event) => _ctx.isPress = false, "74")
      };
    };
  }
};
wx.createComponent(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/phdata/phdata.js.map
