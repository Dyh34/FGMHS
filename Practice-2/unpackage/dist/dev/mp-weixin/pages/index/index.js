"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_weatheremoj2 = common_vendor.resolveComponent("weatheremoj");
  const _component_head2 = common_vendor.resolveComponent("head2");
  const _easycom_phdata2 = common_vendor.resolveComponent("phdata");
  const _easycom_aiadv2 = common_vendor.resolveComponent("aiadv");
  const _easycom_aiadvDetail2 = common_vendor.resolveComponent("aiadvDetail");
  const _easycom_missionto2 = common_vendor.resolveComponent("missionto");
  const _easycom_adshow2 = common_vendor.resolveComponent("adshow");
  (_easycom_weatheremoj2 + _component_head2 + _easycom_phdata2 + _easycom_aiadv2 + _easycom_aiadvDetail2 + _easycom_missionto2 + _easycom_adshow2)();
}
const _easycom_weatheremoj = () => "../../components/weatheremoj/weatheremoj.js";
const _easycom_phdata = () => "../../components/phdata/phdata.js";
const _easycom_aiadv = () => "../../components/aiadv/aiadv.js";
const _easycom_aiadvDetail = () => "../../components/aiadvDetail/aiadvDetail.js";
const _easycom_missionto = () => "../../components/missionto/missionto.js";
const _easycom_adshow = () => "../../components/adshow/adshow.js";
if (!Math) {
  (_easycom_weatheremoj + _easycom_phdata + _easycom_aiadv + _easycom_aiadvDetail + _easycom_missionto + _easycom_adshow)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const showDetail = common_vendor.ref(false);
    const test = () => {
      common_vendor.index.__f__("log", "at pages/index/index.vue:51", showDetail.value);
    };
    const faphlist = [
      {
        name: "董宇航",
        xueXing: "A",
        changJianDu: "常见",
        changState: "3",
        guoMingYuan: "没有钱",
        yanZhong: "严重",
        yanState: "1",
        jianKang: "无疾病",
        jiyanZhong: "健康",
        jiState: "3",
        aiJianYi: "少吃饭",
        aiyanZhong: "适中",
        aiState: "2",
        waterNum: 5,
        // 当前喝水
        waterTotal: 8,
        // 目标喝水
        stepNum: 6800,
        // 当前步数
        stepTotal: 1e4,
        // 目标步数
        sleepNum: 7.5,
        // 当前睡眠
        sleepTotal: 8
        // 目标睡眠,
      },
      {
        name: "董宇航",
        xueXing: "A",
        changJianDu: "常见",
        changState: "3",
        guoMingYuan: "没有钱",
        yanZhong: "严重",
        yanState: "1",
        jianKang: "无疾病",
        jiyanZhong: "健康",
        jiState: "3",
        aiJianYi: "少吃饭",
        aiyanZhong: "适中",
        aiState: "2",
        waterNum: 5,
        // 当前喝水
        waterTotal: 8,
        // 目标喝水
        stepNum: 6800,
        // 当前步数
        stepTotal: 1e4,
        // 目标步数
        sleepNum: 7.5,
        // 当前睡眠
        sleepTotal: 8
        // 目标睡眠,
      },
      {
        name: "董宇航",
        xueXing: "A",
        changJianDu: "常见",
        changState: "3",
        guoMingYuan: "没有钱",
        yanZhong: "严重",
        yanState: "1",
        jianKang: "无疾病",
        jiyanZhong: "健康",
        jiState: "3",
        aiJianYi: "少吃饭",
        aiyanZhong: "适中",
        aiState: "2",
        waterNum: 5,
        // 当前喝水
        waterTotal: 8,
        // 目标喝水
        stepNum: 6800,
        // 当前步数
        stepTotal: 1e4,
        // 目标步数
        sleepNum: 7.5,
        // 当前睡眠
        sleepTotal: 8
        // 目标睡眠,
      }
    ];
    const adData = [
      {
        adname: "a1",
        url: "/static/tubiao/ad1.png"
      },
      {
        adname: "a2",
        url: "/static/tubiao/ad2.png"
      },
      {
        adname: "a3",
        url: "/static/tubiao/ad3.png"
      }
    ];
    common_vendor.wx$1.getLocation({
      type: "wgs84",
      success(res) {
        res.latitude;
        res.longitude;
      }
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(faphlist, (i, index, i0) => {
          return {
            a: index,
            b: "77f22a78-2-" + i0,
            c: common_vendor.p({
              faph: i
            })
          };
        }),
        b: common_vendor.o(($event) => showDetail.value = true, "17"),
        c: common_vendor.o(test, "86"),
        d: common_vendor.o(($event) => showDetail.value = false, "bb"),
        e: common_vendor.p({
          showDetail: showDetail.value
        }),
        f: common_vendor.f(faphlist, (item, index, i0) => {
          return {
            a: index,
            b: "77f22a78-5-" + i0,
            c: common_vendor.p({
              faph: item
            })
          };
        }),
        g: common_vendor.p({
          adshow: adData
        })
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
