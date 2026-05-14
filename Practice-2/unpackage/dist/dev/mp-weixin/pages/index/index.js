"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_weatheremoj2 = common_vendor.resolveComponent("weatheremoj");
  _easycom_weatheremoj2();
}
const _easycom_weatheremoj = () => "../../components/weatheremoj/weatheremoj.js";
if (!Math) {
  _easycom_weatheremoj();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const banners = common_vendor.ref([
      { url: "/static/banner1.png", tag: "限时活动", link: "" },
      { url: "/static/banner2.png", tag: "健康课堂", link: "" },
      { url: "/static/banner3.png", tag: "会员福利", link: "" }
    ]);
    const serviceList = common_vendor.ref([
      { name: "AI导诊", icon: "/static/icon/ai.png", page: "/pages/indexComponentsPages/AIGuidanceDiagnosis/AIGuidanceDiagnosis" },
      { name: "家庭医生", icon: "/static/icon/doctor.png", page: "/pages/indexComponentsPages/FamilyDoctor/FamilyDoctor" },
      { name: "家庭群聊", icon: "/static/icon/chat.png", page: "/pages/indexComponentsPages/FamilyChat/FamilyChat" },
      { name: "医疗地图", icon: "/static/icon/map.png", page: "/pages/indexComponentsPages/MedicalMap/MedicalMap" },
      { name: "运动计划", icon: "/static/icon/sport.png", page: "/pages/indexComponentsPages/ExercisePlan/ExercisePlan" },
      { name: "养生贴士", icon: "/static/icon/tips.png", page: "/pages/health-tips/tips" },
      { name: "用药提醒", icon: "/static/icon/med.png", page: "/pages/med-remind/remind" },
      { name: "健康档案", icon: "/static/icon/file.png", page: "/pages/health-record/record" },
      { name: "疫苗预约", icon: "/static/icon/vaccine.png", page: "/pages/vaccine/vaccine" },
      { name: "体检报告", icon: "/static/icon/report.png", page: "/pages/report/report" }
    ]);
    const lifeReminder = common_vendor.ref({
      suggestions: [
        {
          category: "饮食建议",
          content: "林建国（父亲）建议多吃橙子、猕猴桃等富含维C的水果；陈秀英（母亲）需增加钙质摄入，每日一杯牛奶。"
        },
        {
          category: "运动建议",
          content: "全家可进行餐后散步30分钟；林小宇（孩子）每天跳绳10分钟以增强体质。"
        },
        {
          category: "生活习惯",
          content: "近期天气干燥，建议卧室使用加湿器；睡前1小时远离手机，改善睡眠质量。"
        }
      ],
      hasNewRecord: true,
      medication: "林小宇（孩子）需按时服用小儿氨酚黄那敏颗粒，每日3次，每次半包，饭后服用。",
      doctorNote: "多休息，多喝温水，避免剧烈运动，若体温超过38.5℃请及时就医。",
      updateTime: "2026-05-13 10:30"
    });
    const articles = common_vendor.ref([
      { title: "春季过敏高发，如何科学防护？", source: "健康报", time: "2小时前", thumb: "/static/article1.png", id: 1 },
      { title: "每天走多少步最健康？最新研究来了", source: "生命时报", time: "5小时前", thumb: "/static/article2.png", id: 2 },
      { title: "这5种蔬菜生吃营养翻倍，别再炒了", source: "丁香医生", time: "昨天", thumb: "/static/article3.png", id: 3 },
      { title: "中老年关节养护指南：别让膝盖提前退休", source: "健康时报", time: "昨天", thumb: "/static/article4.png", id: 4 },
      { title: "熬夜后如何快速恢复？医生给出3条建议", source: "果壳病人", time: "前天", thumb: "/static/article5.png", id: 5 }
    ]);
    const handleBanner = (item) => {
      if (item.link) {
        common_vendor.index.navigateTo({ url: item.link });
      } else {
        common_vendor.index.showToast({ title: "活动详情开发中", icon: "none" });
      }
    };
    const handleService = (item) => {
      if (item.page) {
        common_vendor.index.navigateTo({ url: item.page });
        common_vendor.index.__f__("log", "at pages/index/index.vue:134", item.page);
      } else {
        common_vendor.index.showToast({ title: `${item.name}即将上线`, icon: "none" });
      }
    };
    const handleArticle = (article) => {
      common_vendor.index.showToast({ title: `查看文章：${article.title}`, icon: "none" });
    };
    const handleMoreArticle = () => {
      common_vendor.index.showToast({ title: "进入健康资讯列表", icon: "none" });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(banners.value, (item, idx, i0) => {
          return common_vendor.e({
            a: item.url,
            b: item.tag
          }, item.tag ? {
            c: common_vendor.t(item.tag)
          } : {}, {
            d: idx,
            e: common_vendor.o(($event) => handleBanner(item), idx)
          });
        }),
        b: common_vendor.f(serviceList.value, (item, idx, i0) => {
          return {
            a: item.icon,
            b: common_vendor.t(item.name),
            c: idx,
            d: common_vendor.o(($event) => handleService(item), idx)
          };
        }),
        c: common_vendor.f(lifeReminder.value.suggestions, (item, i, i0) => {
          return {
            a: common_vendor.t(item.category),
            b: common_vendor.t(item.content),
            c: i
          };
        }),
        d: lifeReminder.value.hasNewRecord
      }, lifeReminder.value.hasNewRecord ? {
        e: common_vendor.t(lifeReminder.value.medication),
        f: common_vendor.t(lifeReminder.value.doctorNote)
      } : {}, {
        g: common_vendor.t(lifeReminder.value.updateTime),
        h: common_vendor.f(articles.value, (article, idx, i0) => {
          return {
            a: common_vendor.t(article.title),
            b: common_vendor.t(article.source),
            c: common_vendor.t(article.time),
            d: article.thumb,
            e: idx,
            f: common_vendor.o(($event) => handleArticle(article), idx)
          };
        }),
        i: common_vendor.o(handleMoreArticle, "64")
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
