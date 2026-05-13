"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      currentTab: 0,
      updateTime: "2026/04/25",
      healthSummary: "整体健康状况良好，请继续保持良好作息与运动习惯。",
      editMode: {
        bodyShape: false,
        vitalSigns: false,
        biochemistry: false,
        sleepEnergy: false,
        lifestyle: false,
        symptom: false
      },
      bodyShape: [],
      vitalSigns: [],
      biochemistry: [],
      sleepEnergy: [],
      lifestyle: [],
      symptom: [],
      records: [
        {
          hospital: "上海第一人民医院",
          date: "2026/04/25",
          disease: "上呼吸道感染",
          doctor: "王医生",
          dept: "内科",
          reason: "持续咳嗽",
          advice: "多休息，多喝温水",
          open: false
        },
        {
          hospital: "西安军医医院",
          date: "2026/03/20",
          disease: "胃炎",
          doctor: "刘医生",
          dept: "消化科",
          reason: "胃部疼痛，反酸",
          advice: "清淡饮食，规律进餐",
          open: false
        }
      ],
      familyMembers: [
        { id: "1", name: "林小雨", isSelf: true },
        { id: "2", name: "林建国", isSelf: false },
        { id: "3", name: "陈秀英", isSelf: false },
        { id: "4", name: "林小宇", isSelf: false }
      ],
      currentMemberId: "1",
      familyDropdownVisible: false,
      aiAnalysis: {
        summary: "本周各项指标均在正常范围内，睡眠质量与运动频率稳定。饮食结构较为均衡，情绪状态良好。心率监测无异常波动，整体健康风险较低。",
        suggestions: [
          "建议每周增加一次有氧运动，提升心肺功能",
          "睡前可适当减少饮水，避免夜醒影响深睡眠",
          "增加绿叶蔬菜摄入量，维持维生素均衡"
        ],
        updateTime: "2026年5月13日 更新"
      }
    };
  },
  computed: {
    currentMemberName() {
      const member = this.familyMembers.find((m) => m.id === this.currentMemberId);
      return member ? member.name : "林小雨";
    },
    isSelf() {
      const member = this.familyMembers.find((m) => m.id === this.currentMemberId);
      return member ? member.isSelf : true;
    }
  },
  onLoad() {
    this.getHealthDataFromHttp();
  },
  methods: {
    async getHealthDataFromHttp() {
      this.bodyShape = [
        { name: "身高", value: "", unit: "cm", status: "正常" },
        { name: "体重", value: "", unit: "kg", status: "正常" },
        { name: "BMI", value: "", unit: "", status: "正常" },
        { name: "腰围", value: "", unit: "cm", status: "正常" },
        { name: "腰臀比", value: "", unit: "", status: "正常" },
        { name: "体脂率", value: "", unit: "%", status: "正常" }
      ];
      this.vitalSigns = [
        { name: "静息血压", value: "", unit: "mmHg", status: "正常" },
        { name: "静息心率", value: "", unit: "次/分", status: "正常" },
        { name: "血氧饱和度", value: "", unit: "%", status: "正常" },
        { name: "基础体温", value: "", unit: "℃", status: "正常" }
      ];
      this.biochemistry = [
        { name: "空腹血糖", value: "", unit: "mmol/L", status: "正常" },
        { name: "尿酸", value: "", unit: "μmol/L", status: "正常" },
        { name: "总胆固醇", value: "", unit: "mmol/L", status: "正常" },
        { name: "尿常规", value: "", unit: "", status: "正常" }
      ];
      this.sleepEnergy = [
        { name: "每日睡眠时长", value: "", unit: "小时", status: "正常" },
        { name: "入睡时间", value: "", unit: "", status: "正常" },
        { name: "深睡眠占比", value: "", unit: "%", status: "正常" },
        { name: "日间疲惫程度", value: "", unit: "", status: "正常" }
      ];
      this.lifestyle = [
        { name: "每周运动次数", value: "", unit: "次", status: "正常" },
        { name: "单次运动时长", value: "", unit: "分钟", status: "正常" },
        { name: "吸烟量", value: "", unit: "", status: "正常" },
        { name: "饮酒频率", value: "", unit: "", status: "正常" },
        { name: "每日饮水量", value: "", unit: "ml", status: "正常" },
        { name: "三餐规律度", value: "", unit: "", status: "正常" }
      ];
      this.symptom = [
        { name: "头晕/心慌/胸闷", value: "", unit: "", status: "正常" },
        { name: "颈肩腰关节疼痛", value: "", unit: "", status: "正常" },
        { name: "失眠/多梦/肠胃不适", value: "", unit: "", status: "正常" },
        { name: "情绪焦虑、低落易怒", value: "", unit: "", status: "正常" }
      ];
    },
    toggleEdit(type) {
      if (!this.isSelf)
        return;
      this.editMode[type] = !this.editMode[type];
    },
    goEdit(type, index) {
      if (!this.isSelf)
        return;
      common_vendor.index.showToast({
        title: "修改：" + this[type][index].name,
        icon: "none"
      });
    },
    changeTab(index) {
      this.currentTab = index;
    },
    swiperChange(e) {
    },
    toggle(index) {
      this.records[index].open = !this.records[index].open;
    },
    toggleFamilyDropdown() {
      this.familyDropdownVisible = !this.familyDropdownVisible;
    },
    selectFamilyMember(member) {
      this.familyDropdownVisible = false;
      if (member.id === this.currentMemberId)
        return;
      this.currentMemberId = member.id;
      this.getHealthDataFromHttp();
      this.$emit("memberChanged", member);
    },
    handleShare() {
      const shareData = {
        title: "AI健康分析",
        summary: this.aiAnalysis.summary,
        memberName: this.currentMemberName
      };
      this.$emit("shareAnalysis", shareData);
      common_vendor.index.share({
        provider: "weixin",
        scene: "WXSceneSession",
        type: 0,
        title: `${this.currentMemberName}的健康分析`,
        summary: this.aiAnalysis.summary.substring(0, 100),
        success: (res) => {
          common_vendor.index.__f__("log", "at pages/phydetail/phydetail.vue:436", "分享成功", res);
        },
        fail: (err) => {
          common_vendor.index.__f__("log", "at pages/phydetail/phydetail.vue:439", "分享失败", err);
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_pinfen2 = common_vendor.resolveComponent("pinfen");
  _easycom_pinfen2();
}
const _easycom_pinfen = () => "../../components/pinfen/pinfen.js";
if (!Math) {
  _easycom_pinfen();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_assets._imports_0,
    b: common_vendor.t($options.currentMemberName),
    c: $data.familyDropdownVisible ? 1 : "",
    d: $data.familyDropdownVisible
  }, $data.familyDropdownVisible ? {
    e: common_vendor.f($data.familyMembers, (member, k0, i0) => {
      return common_vendor.e({
        a: common_vendor.t(member.name),
        b: member.isSelf
      }, member.isSelf ? {} : {}, {
        c: member.id === $data.currentMemberId
      }, member.id === $data.currentMemberId ? {} : {}, {
        d: member.id,
        e: member.isSelf ? 1 : "",
        f: member.id === $data.currentMemberId ? 1 : "",
        g: common_vendor.o(($event) => $options.selectFamilyMember(member), member.id)
      });
    })
  } : {}, {
    f: common_vendor.o((...args) => $options.toggleFamilyDropdown && $options.toggleFamilyDropdown(...args), "8d"),
    g: common_vendor.o((...args) => $options.handleShare && $options.handleShare(...args), "46"),
    h: common_vendor.t($data.aiAnalysis.summary),
    i: $data.aiAnalysis.suggestions && $data.aiAnalysis.suggestions.length
  }, $data.aiAnalysis.suggestions && $data.aiAnalysis.suggestions.length ? {
    j: common_vendor.f($data.aiAnalysis.suggestions, (tip, idx, i0) => {
      return {
        a: common_vendor.t(tip),
        b: idx
      };
    })
  } : {}, {
    k: common_vendor.t($data.aiAnalysis.updateTime),
    l: $data.currentTab === 0 ? 1 : "",
    m: common_vendor.o(($event) => $options.changeTab(0), "ff"),
    n: $data.currentTab === 1 ? 1 : "",
    o: common_vendor.o(($event) => $options.changeTab(1), "ee"),
    p: $data.currentTab === 0
  }, $data.currentTab === 0 ? common_vendor.e({
    q: common_vendor.t($data.updateTime),
    r: $options.isSelf
  }, $options.isSelf ? {
    s: common_vendor.t($data.editMode.bodyShape ? "完成" : "编辑"),
    t: common_vendor.o(($event) => $options.toggleEdit("bodyShape"), "1b")
  } : {}, {
    v: common_vendor.f($data.bodyShape, (item, i, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.name),
        b: common_vendor.t(item.value),
        c: common_vendor.t(item.unit),
        d: common_vendor.t(item.status)
      }, $options.isSelf && $data.editMode.bodyShape ? {
        e: common_vendor.o(($event) => $options.goEdit("bodyShape", i), i)
      } : {}, {
        f: i
      });
    }),
    w: $options.isSelf && $data.editMode.bodyShape,
    x: $options.isSelf
  }, $options.isSelf ? {
    y: common_vendor.t($data.editMode.vitalSigns ? "完成" : "编辑"),
    z: common_vendor.o(($event) => $options.toggleEdit("vitalSigns"), "98")
  } : {}, {
    A: common_vendor.f($data.vitalSigns, (item, i, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.name),
        b: common_vendor.t(item.value),
        c: common_vendor.t(item.unit),
        d: common_vendor.t(item.status)
      }, $options.isSelf && $data.editMode.vitalSigns ? {
        e: common_vendor.o(($event) => $options.goEdit("vitalSigns", i), i)
      } : {}, {
        f: i
      });
    }),
    B: $options.isSelf && $data.editMode.vitalSigns,
    C: $options.isSelf
  }, $options.isSelf ? {
    D: common_vendor.t($data.editMode.biochemistry ? "完成" : "编辑"),
    E: common_vendor.o(($event) => $options.toggleEdit("biochemistry"), "19")
  } : {}, {
    F: common_vendor.f($data.biochemistry, (item, i, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.name),
        b: common_vendor.t(item.value),
        c: common_vendor.t(item.unit),
        d: common_vendor.t(item.status)
      }, $options.isSelf && $data.editMode.biochemistry ? {
        e: common_vendor.o(($event) => $options.goEdit("biochemistry", i), i)
      } : {}, {
        f: i
      });
    }),
    G: $options.isSelf && $data.editMode.biochemistry,
    H: $options.isSelf
  }, $options.isSelf ? {
    I: common_vendor.t($data.editMode.sleepEnergy ? "完成" : "编辑"),
    J: common_vendor.o(($event) => $options.toggleEdit("sleepEnergy"), "cd")
  } : {}, {
    K: common_vendor.f($data.sleepEnergy, (item, i, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.name),
        b: common_vendor.t(item.value),
        c: common_vendor.t(item.unit),
        d: common_vendor.t(item.status)
      }, $options.isSelf && $data.editMode.sleepEnergy ? {
        e: common_vendor.o(($event) => $options.goEdit("sleepEnergy", i), i)
      } : {}, {
        f: i
      });
    }),
    L: $options.isSelf && $data.editMode.sleepEnergy,
    M: $options.isSelf
  }, $options.isSelf ? {
    N: common_vendor.t($data.editMode.lifestyle ? "完成" : "编辑"),
    O: common_vendor.o(($event) => $options.toggleEdit("lifestyle"), "5f")
  } : {}, {
    P: common_vendor.f($data.lifestyle, (item, i, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.name),
        b: common_vendor.t(item.value),
        c: common_vendor.t(item.unit),
        d: common_vendor.t(item.status)
      }, $options.isSelf && $data.editMode.lifestyle ? {
        e: common_vendor.o(($event) => $options.goEdit("lifestyle", i), i)
      } : {}, {
        f: i
      });
    }),
    Q: $options.isSelf && $data.editMode.lifestyle,
    R: $options.isSelf
  }, $options.isSelf ? {
    S: common_vendor.t($data.editMode.symptom ? "完成" : "编辑"),
    T: common_vendor.o(($event) => $options.toggleEdit("symptom"), "34")
  } : {}, {
    U: common_vendor.f($data.symptom, (item, i, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.name),
        b: common_vendor.t(item.value),
        c: common_vendor.t(item.unit),
        d: common_vendor.t(item.status)
      }, $options.isSelf && $data.editMode.symptom ? {
        e: common_vendor.o(($event) => $options.goEdit("symptom", i), i)
      } : {}, {
        f: i
      });
    }),
    V: $options.isSelf && $data.editMode.symptom,
    W: common_vendor.t($data.healthSummary),
    X: common_vendor.p({
      categories: ["睡眠", "情绪", "运动", "饮食", "心率"],
      scoreData: [100, 100, 100, 100, 100]
    })
  }) : {}, {
    Y: $data.currentTab === 1
  }, $data.currentTab === 1 ? {
    Z: common_vendor.f($data.records, (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.open ? "收起" : "详情"),
        b: common_vendor.o(($event) => $options.toggle(index), index),
        c: common_vendor.t(item.hospital),
        d: common_vendor.t(item.date),
        e: common_vendor.t(item.dept),
        f: common_vendor.t(item.doctor),
        g: item.open
      }, item.open ? {
        h: common_vendor.t(item.reason),
        i: common_vendor.t(item.disease),
        j: common_vendor.t(item.advice)
      } : {}, {
        k: index
      });
    })
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/phydetail/phydetail.js.map
