"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "aiavi",
  data() {
    return {};
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: _ctx.isPress ? 1 : "",
    b: common_vendor.o(($event) => _ctx.isPress = true, "72"),
    c: common_vendor.o(($event) => _ctx.isPress = false, "ce"),
    d: common_vendor.o(($event) => _ctx.isPress = false, "72")
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/aiadv/aiadv.js.map
