"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "weatheremoj",
  setup(__props) {
    const temp = common_vendor.ref("--");
    const weatherEmoji = common_vendor.ref("️");
    const weatherText = common_vendor.ref("获取中...");
    const greetText = common_vendor.ref("你好");
    const username = common_vendor.ref("小伙伴");
    common_vendor.onMounted(() => {
      getGreet();
      getWeather();
    });
    function getGreet() {
      const hour = (/* @__PURE__ */ new Date()).getHours();
      let greet = "";
      if (hour >= 6 && hour < 9) {
        greet = "早上好";
      } else if (hour >= 9 && hour < 11) {
        greet = "上午好";
      } else if (hour >= 11 && hour < 13) {
        greet = "中午好";
      } else if (hour >= 13 && hour < 17) {
        greet = "下午好";
      } else if (hour >= 17 && hour < 19) {
        greet = "傍晚好";
      } else if (hour >= 19 && hour < 22) {
        greet = "晚上好";
      } else {
        greet = "夜深了";
      }
      greetText.value = greet;
      common_vendor.index.__f__("log", "at components/weatheremoj/weatheremoj.vue:48", greetText.value);
    }
    function getWeather() {
      common_vendor.wx$1.getLocation({
        type: "wgs84",
        success(res) {
          const lat = res.latitude;
          const lon = res.longitude;
          common_vendor.index.__f__("log", "at components/weatheremoj/weatheremoj.vue:63", lat, lon);
          common_vendor.wx$1.request({
            url: "https://restapi.amap.com/v3/weather/weatherInfo?parameters",
            data: {
              key: "c4153508816115667862a6f009d34fd4",
              city: `610113`
            },
            success(result) {
              var _a;
              const weather = (_a = result.data.lives) == null ? void 0 : _a[0];
              if (!weather)
                return;
              const weatherStr = weather.weather;
              const temperature = weather.temperature;
              weatherText.value = weatherStr;
              temp.value = temperature;
              setWeatherEmoji(weatherStr);
            }
          });
        }
      });
      common_vendor.index.__f__("log", "at components/weatheremoj/weatheremoj.vue:88", weatherText.value);
    }
    function setWeatherEmoji(weatherStr) {
      const map = {
        "晴": "☀️",
        "多云": "⛅",
        "阴": "☁️",
        "雾": "🌫️",
        "小雨": "🌧️",
        "中雨": "🌧️",
        "大雨": "🌧️",
        "暴雨": "🌧️",
        "雪": "❄️",
        "小雪": "❄️",
        "中雪": "❄️",
        "大雪": "❄️"
      };
      for (let key in map) {
        if (weatherStr.includes(key)) {
          weatherEmoji.value = map[key];
          return;
        }
      }
      weatherEmoji.value = "☁️";
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(greetText.value),
        b: common_vendor.t(username.value),
        c: common_vendor.t(weatherEmoji.value)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-dc78d0f3"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/weatheremoj/weatheremoj.js.map
