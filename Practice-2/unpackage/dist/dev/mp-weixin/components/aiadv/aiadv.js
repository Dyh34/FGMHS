"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _component_head1 = common_vendor.resolveComponent("head1");
  const _component_head2 = common_vendor.resolveComponent("head2");
  (_component_head1 + _component_head2)();
}
const _sfc_main = {
  __name: "aiadv",
  emits: ["openDetail"],
  setup(__props, { emit: __emit }) {
    const aitxt = common_vendor.ref("AI正在分析...");
    const aireturn = async () => {
      const aite = await common_vendor.index.request({
        url: "http://10.93.233.3:8080/index/ai",
        method: "GET"
      });
      aitxt.value = aite.data;
    };
    common_vendor.onMounted(() => {
      aireturn();
    });
    const emit = __emit;
    const detail = () => {
      emit("openDetail");
      common_vendor.index.__f__("log", "at components/aiadv/aiadv.vue:47", "点击");
    };
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$1,
        b: common_vendor.t(aitxt.value),
        c: common_vendor.o(detail, "10"),
        d: _ctx.isPress ? 1 : "",
        e: common_vendor.o(($event) => _ctx.isPress = true, "72"),
        f: common_vendor.o(($event) => _ctx.isPress = false, "ce"),
        g: common_vendor.o(($event) => _ctx.isPress = false, "72")
      };
    };
  }
};
wx.createComponent(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/aiadv/aiadv.js.map
