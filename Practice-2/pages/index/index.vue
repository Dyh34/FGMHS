<template>
  <view class="page-home">
    <!-- 天气组件（保留） -->
    <view class="hello1">
      <weatheremoj></weatheremoj>
    </view>

    <!-- 轮播图 -->
    <view class="banner-card">
      <swiper class="banner-swiper" indicator-dots autoplay circular interval="3000">
        <swiper-item v-for="(item, idx) in banners" :key="idx" @click="handleBanner(item)">
          <image :src="item.url" mode="aspectFill" class="banner-img"></image>
          <view class="banner-tag" v-if="item.tag">{{ item.tag }}</view>
        </swiper-item>
      </swiper>
    </view>

    <!-- 功能入口宫格 -->
    <view class="service-grid">
      <view class="grid-item" v-for="(item, idx) in serviceList" :key="idx" @click="handleService(item)">
        <image :src="item.icon" class="grid-icon" mode="aspectFit"></image>
        <text class="grid-name">{{ item.name }}</text>
      </view>
    </view>

    <!-- 生活提醒（AI分类建议） -->
    <view class="life-reminder-card">
      <view class="card-title">🌿 生活提醒</view>
      <!-- AI 分类建议 -->
      <view class="reminder-section">
        <text class="section-label">今日AI推荐</text>
        <view class="suggestion-list">
          <view class="suggestion-item" v-for="(item, i) in lifeReminder.suggestions" :key="i">
            <text class="suggestion-category">{{ item.category }}：</text>
            <text class="suggestion-content">{{ item.content }}</text>
          </view>
        </view>
      </view>

      <!-- 当家庭组有新病历时展示用药提醒/医嘱 -->
      <view class="reminder-section" v-if="lifeReminder.hasNewRecord">
        <text class="section-label">📋 新增病历提醒</text>
        <view class="med-reminder">
          <text class="med-text">💊 {{ lifeReminder.medication }}</text>
        </view>
        <view class="doctor-note">
          <text class="note-label">医嘱：</text>
          <text class="note-content">{{ lifeReminder.doctorNote }}</text>
        </view>
      </view>
      <text class="reminder-time">更新于 {{ lifeReminder.updateTime }}</text>
    </view>

    <!-- 文章推送 -->
    <view class="article-card">
      <view class="card-title">健康阅读</view>
      <view class="article-item" v-for="(article, idx) in articles" :key="idx" @click="handleArticle(article)">
        <view class="article-left">
          <text class="article-title">{{ article.title }}</text>
          <text class="article-source">{{ article.source }} · {{ article.time }}</text>
        </view>
        <image :src="article.thumb" mode="aspectFill" class="article-thumb"></image>
      </view>
      <view class="more-article" @click="handleMoreArticle">查看更多文章 →</view>
    </view>

    <view class="bottom-space"></view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const banners = ref([
  { url: '/static/banner1.png', tag: '限时活动', link: '' },
  { url: '/static/banner2.png', tag: '健康课堂', link: '' },
  { url: '/static/banner3.png', tag: '会员福利', link: '' }
])

const serviceList = ref([
  { name: 'AI导诊', icon: '/static/icon/ai.png', page: '/subpackages/indexComponentsPages/pages/AIGuidanceDiagnosis/AIGuidanceDiagnosis' },
  { name: '家庭医生', icon: '/static/icon/doctor.png', page: '/subpackages/indexComponentsPages/pages/FamilyDoctor/FamilyDoctor' },
  { name: '家庭群聊', icon: '/static/icon/chat.png', page: '/subpackages/indexComponentsPages/pages/FamilyChat/FamilyChat' },
  { name: '医疗地图', icon: '/static/icon/map.png', page: '/subpackages/indexComponentsPages/pages/MedicalMap/MedicalMap' },
  { name: '运动计划', icon: '/static/icon/sport.png', page: '/subpackages/indexComponentsPages/pages/ExercisePlan/ExercisePlan' },
  { name: '养生贴士', icon: '/static/icon/tips.png', page: '/subpackages/indexComponentsPages/pages/HealthTips/HealthTips' },
  { name: '用药提醒', icon: '/static/icon/med.png', page: '/subpackages/indexComponentsPages/pages/MedicationReminder/MedicationReminder' },
  { name: '健康档案', icon: '/static/icon/file.png', page: '/subpackages/indexComponentsPages/pages/HealthRecord/HealthRecord' },
  { name: '疫苗预约', icon: '/static/icon/vaccine.png', page: '/subpackages/indexComponentsPages/pages/VaccineBooking/VaccineBooking' },
  { name: '体检报告', icon: '/static/icon/report.png', page: '/subpackages/indexComponentsPages/pages/HealthReport/HealthReport' }
])

// AI 生活提醒数据结构调整：包含分类建议列表
const lifeReminder = ref({
  suggestions: [
    {
      category: '饮食建议',
      content: '林建国（父亲）建议多吃橙子、猕猴桃等富含维C的水果；陈秀英（母亲）需增加钙质摄入，每日一杯牛奶。'
    },
    {
      category: '运动建议',
      content: '全家可进行餐后散步30分钟；林小宇（孩子）每天跳绳10分钟以增强体质。'
    },
    {
      category: '生活习惯',
      content: '近期天气干燥，建议卧室使用加湿器；睡前1小时远离手机，改善睡眠质量。'
    }
  ],
  hasNewRecord: true,
  medication: '林小宇（孩子）需按时服用小儿氨酚黄那敏颗粒，每日3次，每次半包，饭后服用。',
  doctorNote: '多休息，多喝温水，避免剧烈运动，若体温超过38.5℃请及时就医。',
  updateTime: '2026-05-13 10:30'
})

const articles = ref([
  { title: '春季过敏高发，如何科学防护？', source: '健康报', time: '2小时前', thumb: '/static/article1.png', id: 1 },
  { title: '每天走多少步最健康？最新研究来了', source: '生命时报', time: '5小时前', thumb: '/static/article2.png', id: 2 },
  { title: '这5种蔬菜生吃营养翻倍，别再炒了', source: '丁香医生', time: '昨天', thumb: '/static/article3.png', id: 3 },
  { title: '中老年关节养护指南：别让膝盖提前退休', source: '健康时报', time: '昨天', thumb: '/static/article4.png', id: 4 },
  { title: '熬夜后如何快速恢复？医生给出3条建议', source: '果壳病人', time: '前天', thumb: '/static/article5.png', id: 5 }
])

const handleBanner = (item) => {
  if (item.link) {
    uni.navigateTo({ url: item.link })
  } else {
    uni.showToast({ title: '活动详情开发中', icon: 'none' })
  }
}

const handleService = (item) => {
  if (item.page) {
    uni.navigateTo({ url: item.page })
	console.log(item.page)
  } else {
    uni.showToast({ title: `${item.name}即将上线`, icon: 'none' })
  }
}

const handleArticle = (article) => {
  uni.showToast({ title: `查看文章：${article.title}`, icon: 'none' })
}

const handleMoreArticle = () => {
  uni.showToast({ title: '进入健康资讯列表', icon: 'none' })
}
</script>

<style lang="scss" scoped>
page {
  background: #f7f8f6;
}
.page-home {
  padding: 24rpx;
  min-height: 100vh;
}

.hello1 {
  height: 60rpx;
  width: 100%;
  font-size: 35rpx;
  font-family: "PingFang SC", "Microsoft YaHei", sans-serif;
  font-weight: 700;
  letter-spacing: 6rpx;
  text-shadow: 0 1rpx 1rpx #999;
  margin-bottom: 24rpx;
}

/* 轮播图卡片 */
.banner-card {
  background: #fff;
  border-radius: 28rpx;
  overflow: hidden;
  margin-bottom: 24rpx;
  box-shadow: 0 8rpx 20rpx rgba(0,0,0,.03);
}
.banner-swiper {
  width: 100%;
  height: 450rpx;
}
.banner-img {
  width: 100%;
  height: 100%;
  display: block;
}
.banner-tag {
  position: absolute;
  bottom: 16rpx;
  right: 16rpx;
  background: rgba(36,179,90,0.9);
  color: #fff;
  font-size: 22rpx;
  padding: 6rpx 18rpx;
  border-radius: 30rpx;
}

/* 功能入口宫格 */
.service-grid {
  display: flex;
  flex-wrap: wrap;
  background: #fff;
  border-radius: 28rpx;
  padding: 28rpx 10rpx 16rpx;
  margin-bottom: 24rpx;
  box-shadow: 0 8rpx 20rpx rgba(0,0,0,.03);
}
.grid-item {
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 24rpx;
}
.grid-icon {
  width: 80rpx;
  height: 80rpx;
  margin-bottom: 10rpx;
}
.grid-name {
  font-size: 24rpx;
  color: #333;
  text-align: center;
}

/* 生活提醒卡片 */
.life-reminder-card {
  background: #fff;
  border-radius: 28rpx;
  padding: 24rpx 28rpx;
  margin-bottom: 24rpx;
  box-shadow: 0 8rpx 20rpx rgba(0,0,0,.03);
}
.card-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #222;
  margin-bottom: 20rpx;
}
.reminder-section {
  margin-bottom: 20rpx;
}
.section-label {
  font-size: 26rpx;
  font-weight: bold;
  color: #2d8a4e;
  margin-bottom: 14rpx;
  display: block;
}
.suggestion-list {
  background: #f9fdf7;
  padding: 18rpx;
  border-radius: 12rpx;
}
.suggestion-item {
  margin-bottom: 14rpx;
  display: flex;
  flex-wrap: wrap;
}
.suggestion-item:last-child {
  margin-bottom: 0;
}
.suggestion-category {
  font-size: 26rpx;
  font-weight: 600;
  color: #333;
  margin-right: 8rpx;
}
.suggestion-content {
  font-size: 26rpx;
  color: #555;
  line-height: 1.5;
  flex: 1;
}
.med-reminder {
  background: #fff9e6;
  padding: 18rpx;
  border-radius: 12rpx;
  margin-bottom: 14rpx;
}
.med-text {
  font-size: 28rpx;
  color: #d97706;
  font-weight: 500;
}
.doctor-note {
  background: #f0f9ff;
  padding: 18rpx;
  border-radius: 12rpx;
}
.note-label {
  font-size: 24rpx;
  color: #0284c7;
  font-weight: 500;
}
.note-content {
  font-size: 26rpx;
  color: #333;
  line-height: 1.6;
  margin-left: 8rpx;
}
.reminder-time {
  font-size: 22rpx;
  color: #aaa;
  display: block;
  text-align: right;
  margin-top: 6rpx;
}

/* 文章推送卡片 */
.article-card {
  background: #fff;
  border-radius: 28rpx;
  padding: 24rpx 28rpx;
  margin-bottom: 24rpx;
  box-shadow: 0 8rpx 20rpx rgba(0,0,0,.03);
}
.article-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx 0;
  border-bottom: 1rpx solid #f0f0f0;
}
.article-item:last-child {
  border-bottom: none;
}
.article-left {
  flex: 1;
  margin-right: 20rpx;
}
.article-title {
  font-size: 28rpx;
  color: #333;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.article-source {
  font-size: 22rpx;
  color: #aaa;
  margin-top: 10rpx;
}
.article-thumb {
  width: 120rpx;
  height: 90rpx;
  border-radius: 12rpx;
  background: #eee;
}
.more-article {
  text-align: center;
  font-size: 26rpx;
  color: #24b35a;
  margin-top: 20rpx;
  font-weight: 500;
}

.bottom-space {
  height: 50rpx;
}
</style>