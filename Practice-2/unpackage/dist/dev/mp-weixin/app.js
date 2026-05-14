"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/me/me.js";
  "./pages/market/market.js";
  "./pages/phydetail/phydetail.js";
  "./pages/indexComponentsPages/AIGuidanceDiagnosis/AIGuidanceDiagnosis.js";
  "./pages/indexComponentsPages/FamilyDoctor/FamilyDoctor.js";
  "./pages/indexComponentsPages/FamilyChat/FamilyChat.js";
  "./pages/indexComponentsPages/MedicalMap/MedicalMap.js";
  "./pages/indexComponentsPages/ExercisePlan/ExercisePlan.js";
  "./pages/indexComponentsPages/HealthTips/HealthTips.js";
}
const _sfc_main = {
  onLaunch: function() {
    common_vendor.index.__f__("log", "at App.vue:4", "App Launch");
  },
  onShow: function() {
    common_vendor.index.__f__("log", "at App.vue:7", "App Show");
  },
  onHide: function() {
    common_vendor.index.__f__("log", "at App.vue:10", "App Hide");
  }
};
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
//# sourceMappingURL=../.sourcemap/mp-weixin/app.js.map
