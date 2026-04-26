"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _component_head1 = common_vendor.resolveComponent("head1");
  const _component_head2 = common_vendor.resolveComponent("head2");
  const _component_head3 = common_vendor.resolveComponent("head3");
  (_component_head1 + _component_head2 + _component_head3)();
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
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(__props.faph.name),
        b: common_assets._imports_0,
        c: common_vendor.t(__props.faph.xueXing),
        d: common_vendor.t(__props.faph.changJianDu),
        e: __props.faph.xueState == 1 ? "red" : __props.faph.xueState == 2 ? "yellow" : "green",
        f: common_assets._imports_1,
        g: common_vendor.t(__props.faph.jianKang),
        h: common_vendor.t(__props.faph.jiyanZhong),
        i: __props.faph.jiState == 1 ? "red" : __props.faph.jiyanState == 2 ? "yellow" : "green",
        j: common_assets._imports_2,
        k: common_vendor.t(__props.faph.guoMingYuan),
        l: common_vendor.t(__props.faph.yanZhong),
        m: __props.faph.yanState == 1 ? "red" : __props.faph.yantate == 2 ? "yellow" : "green",
        n: common_assets._imports_3,
        o: common_vendor.t(__props.faph.aiJianYi),
        p: common_vendor.t(__props.faph.aiyanZhong),
        q: __props.faph.aiState == 1 ? "red" : __props.faph.aiState == 2 ? "yellow" : "green",
        r: common_vendor.o(($event) => _ctx.isPress = true, "e4"),
        s: common_vendor.o(($event) => _ctx.isPress = false, "84"),
        t: common_vendor.o(($event) => _ctx.isPress = false, "74")
      };
    };
  }
};
wx.createComponent(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/phdata/phdata.js.map
