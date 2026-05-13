"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "pinfen",
  props: {
    title: {
      type: String,
      default: "本周健康评分"
    },
    // 保留外部传入能力，以便在没有网络时仍可展示默认数据
    categories: {
      type: Array,
      default: () => ["睡眠", "运动", "饮食", "心率", "饮水"]
    },
    scoreData: {
      type: Array,
      default: () => [83, 78, 82, 90, 87]
    }
  },
  data() {
    return {
      httpRadarData: [],
      // HTTP 获取的雷达数据
      showRetry: false,
      // 是否显示重试遮罩
      loading: false
    };
  },
  computed: {
    // 优先使用 HTTP 数据，若无则回退到 props
    radarData() {
      if (this.httpRadarData.length > 0) {
        return this.httpRadarData;
      }
      return this.categories.map((category, index) => ({
        label: category,
        value: this.scoreData[index] || 0,
        ratio: (this.scoreData[index] || 0) / 100
      }));
    },
    totalScore() {
      const data = this.radarData;
      if (data && data.length > 0) {
        const sum = data.reduce((acc, item) => acc + item.value, 0);
        return Math.round(sum / data.length);
      }
      return 0;
    }
  },
  mounted() {
    this.fetchRadarData();
  },
  methods: {
    // 模拟 HTTP 请求（带超时控制）
    async fetchRadarData() {
      this.showRetry = false;
      this.loading = true;
      try {
        const data = await Promise.race([
          this.mockHttpRequest(),
          new Promise(
            (_, reject) => setTimeout(() => reject(new Error("timeout")), 3e3)
          )
        ]);
        this.httpRadarData = data;
      } catch (e) {
        common_vendor.index.__f__("error", "at components/pinfen/pinfen.vue:151", "获取雷达图数据失败", e);
        this.showRetry = true;
      } finally {
        this.loading = false;
      }
    },
    // 模拟 HTTP 请求返回占位数据
    mockHttpRequest() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            { label: "睡眠", value: 91, ratio: 0.91 },
            { label: "情绪", value: 84, ratio: 0.84 },
            { label: "运动", value: 78, ratio: 0.78 },
            { label: "饮食", value: 88, ratio: 0.88 },
            { label: "心率", value: 93, ratio: 0.93 }
          ]);
        }, 500);
      });
    },
    // 重试点击
    retryFetch() {
      this.fetchRadarData();
    },
    getLineStyle(index) {
      const angle = index * 72 * Math.PI / 180 - Math.PI / 2 - 50;
      return {
        transform: `rotate(${angle}rad)`
      };
    },
    getPolygonPath() {
      const points = this.radarData.map((item, index) => {
        const angle = index * 72 * Math.PI / 180 - Math.PI / 2;
        const radius = 180 * item.ratio;
        const x = 50 + Math.cos(angle) * radius / 360 * 100;
        const y = 50 + Math.sin(angle) * radius / 360 * 100;
        return `${x}% ${y}%`;
      });
      return `polygon(${points.join(", ")})`;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t($props.title),
    b: common_vendor.t($options.totalScore),
    c: common_vendor.f(3, (level, k0, i0) => {
      return {
        a: level,
        b: `scale(${level * 0.33})`
      };
    }),
    d: common_vendor.t($options.radarData[0].label),
    e: common_vendor.t($options.radarData[0].value),
    f: common_vendor.t($options.radarData[1].label),
    g: common_vendor.t($options.radarData[1].value),
    h: common_vendor.t($options.radarData[2].label),
    i: common_vendor.t($options.radarData[2].value),
    j: common_vendor.t($options.radarData[3].label),
    k: common_vendor.t($options.radarData[3].value),
    l: common_vendor.t($options.radarData[4].label),
    m: common_vendor.t($options.radarData[4].value),
    n: $options.getPolygonPath(),
    o: common_vendor.f($options.radarData, (item, index, i0) => {
      return {
        a: index,
        b: common_vendor.s($options.getLineStyle(index))
      };
    }),
    p: $data.showRetry
  }, $data.showRetry ? {
    q: common_vendor.o((...args) => $options.retryFetch && $options.retryFetch(...args), "c8")
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/pinfen/pinfen.js.map
