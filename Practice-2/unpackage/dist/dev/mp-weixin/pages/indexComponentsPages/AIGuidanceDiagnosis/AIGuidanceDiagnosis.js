"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const _sfc_main = {
  __name: "AIGuidanceDiagnosis",
  setup(__props) {
    const inputText = common_vendor.ref("");
    const scrollIntoView = common_vendor.ref("");
    const showHistory = common_vendor.ref(false);
    const quickSymptoms = common_vendor.ref([
      "头痛",
      "发烧",
      "咳嗽",
      "胃痛",
      "失眠",
      "胸闷",
      "腰疼",
      "头晕"
    ]);
    const historyList = common_vendor.ref([
      "最近总是失眠怎么办",
      "胃疼需要挂什么科",
      "发烧38度如何处理"
    ]);
    const messageList = common_vendor.ref([
      {
        type: "ai",
        content: "您好，我是AI导诊助手，请描述您的症状。",
        department: "",
        hospital: ""
      }
    ]);
    function selectSymptom(item) {
      inputText.value = item;
      sendMessage();
    }
    function sendMessage() {
      if (!inputText.value.trim())
        return;
      messageList.value.push({
        type: "user",
        content: inputText.value
      });
      const userText = inputText.value;
      inputText.value = "";
      scrollBottom();
      setTimeout(() => {
        let reply = {
          type: "ai",
          content: "",
          department: "",
          hospital: ""
        };
        if (userText.includes("头痛")) {
          reply.content = "头痛可能与睡眠不足、压力或感冒有关。如果持续头痛或伴随恶心呕吐，建议及时就医。";
          reply.department = "神经内科";
          reply.hospital = "成都市第一人民医院";
        } else if (userText.includes("胃")) {
          reply.content = "胃部不适可能与饮食不规律有关，建议清淡饮食并避免辛辣刺激。";
          reply.department = "消化内科";
          reply.hospital = "四川大学华西医院";
        } else {
          reply.content = "已收到您的症状描述，建议近期注意休息并持续观察，如症状加重请及时就医。";
          reply.department = "全科医学科";
          reply.hospital = "当地综合医院";
        }
        messageList.value.push(reply);
        scrollBottom();
      }, 800);
    }
    function scrollBottom() {
      common_vendor.nextTick$1(() => {
        scrollIntoView.value = "msg" + (messageList.value.length - 1);
      });
    }
    function chooseImage() {
      common_vendor.index.chooseImage({
        count: 1,
        success: (res) => {
          messageList.value.push({
            type: "user",
            content: "[上传了一张图片]"
          });
          messageList.value.push({
            type: "ai",
            content: "已收到图片，建议进一步结合症状描述进行分析。",
            department: "皮肤科",
            hospital: "成都市第二人民医院"
          });
          scrollBottom();
        }
      });
    }
    function voiceInput() {
      common_vendor.index.showToast({
        title: "语音识别开发中",
        icon: "none"
      });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(($event) => showHistory.value = !showHistory.value, "8c"),
        b: showHistory.value
      }, showHistory.value ? {
        c: common_vendor.f(historyList.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: index
          };
        })
      } : {}, {
        d: common_vendor.f(quickSymptoms.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: index,
            c: common_vendor.o(($event) => selectSymptom(item), index)
          };
        }),
        e: common_vendor.f(messageList.value, (item, index, i0) => {
          return common_vendor.e({
            a: item.type === "user"
          }, item.type === "user" ? {
            b: common_vendor.t(item.content)
          } : {}, {
            c: item.type === "ai"
          }, item.type === "ai" ? common_vendor.e({
            d: common_assets._imports_0$1,
            e: common_vendor.t(item.content),
            f: item.department
          }, item.department ? {
            g: common_vendor.t(item.department)
          } : {}, {
            h: item.hospital
          }, item.hospital ? {
            i: common_vendor.t(item.hospital)
          } : {}) : {}, {
            j: index,
            k: "msg" + index
          });
        }),
        f: scrollIntoView.value,
        g: common_vendor.o(chooseImage, "80"),
        h: common_vendor.o(voiceInput, "d9"),
        i: common_vendor.o(sendMessage, "12"),
        j: inputText.value,
        k: common_vendor.o(($event) => inputText.value = $event.detail.value, "22"),
        l: common_vendor.o(sendMessage, "77")
      });
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/indexComponentsPages/AIGuidanceDiagnosis/AIGuidanceDiagnosis.js.map
