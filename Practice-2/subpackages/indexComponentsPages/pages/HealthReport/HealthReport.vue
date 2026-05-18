<!-- HealthReport.vue - 体检报告 -->
<template>
	<view class="page">

		<!-- 顶部 -->
		<view class="top-bg">
			<view class="page-title">体检报告</view>
			<view class="page-desc">报告解读 · 指标追踪 · 健康趋势</view>
		</view>

		<!-- 添加报告按钮 -->
		<view class="add-btn" @click="addReport">
			<text class="add-icon">+</text>
			<text>上传体检报告</text>
		</view>

		<!-- 最新报告概览 -->
		<view class="latest-card" v-if="latestReport">
			<view class="latest-header">
				<text class="latest-title">📊 最新报告</text>
				<text class="latest-date">{{ latestReport.date }}</text>
			</view>
			<view class="latest-summary">
				<view class="summary-item">
					<text class="summary-label">体检机构</text>
					<text class="summary-value">{{ latestReport.hospital }}</text>
				</view>
				<view class="summary-item">
					<text class="summary-label">异常指标</text>
					<text class="summary-value abnormal">{{ latestReport.abnormalCount }}项</text>
				</view>
				<view class="summary-item">
					<text class="summary-label">健康评分</text>
					<text class="summary-value">{{ latestReport.score }}分</text>
				</view>
			</view>
			<view class="detail-btn" @click="viewReport(latestReport)">查看完整报告 →</view>
		</view>

		<!-- 异常指标提醒 -->
		<view class="alert-card" v-if="abnormalItems.length > 0">
			<view class="alert-header">
				<text class="alert-icon">⚠️</text>
				<text class="alert-title">异常指标提醒</text>
			</view>
			<view class="alert-list">
				<view v-for="(item, idx) in abnormalItems" :key="idx" class="alert-item">
					<view class="alert-name">{{ item.name }}</view>
					<view class="alert-value">{{ item.value }} (参考: {{ item.normalRange }})</view>
					<view class="alert-advice">{{ item.advice }}</view>
				</view>
			</view>
		</view>

		<!-- 指标趋势 -->
		<view class="trend-card">
			<view class="card-header">
				<text class="card-title">📈 指标趋势</text>
				<view class="trend-tabs">
					<view 
						v-for="(tab, idx) in trendTabs" 
						:key="idx"
						class="trend-tab"
						:class="{ active: currentTrend === tab.value }"
						@click="currentTrend = tab.value"
					>
						{{ tab.name }}
					</view>
				</view>
			</view>
			<view class="trend-chart">
				<view class="chart-bars">
					<view v-for="(item, idx) in currentTrendData" :key="idx" class="bar-item">
						<view class="bar" :style="{ height: item.percentage + '%' }"></view>
						<view class="bar-label">{{ item.date }}</view>
						<view class="bar-value">{{ item.value }}</view>
					</view>
				</view>
			</view>
			<view class="trend-note">* 趋势图基于历次体检数据生成</view>
		</view>

		<!-- 报告列表 -->
		<view class="section">
			<view class="section-header">
				<text class="section-title">历史报告</text>
				<text class="section-more" @click="viewAllReports">查看全部 →</text>
			</view>

			<view v-for="(item, idx) in reportList" :key="idx" class="report-card" @click="viewReport(item)">
				<view class="report-icon">📄</view>
				<view class="report-info">
					<view class="report-date">{{ item.date }}</view>
					<view class="report-hospital">{{ item.hospital }}</view>
					<view class="report-tags">
						<text class="tag" v-if="item.abnormalCount > 0" style="background:#fff4e4; color:#ff9800;">
							{{ item.abnormalCount }}项异常
						</text>
						<text class="tag" v-else style="background:#e9f8ec; color:#49b96e;">指标正常</text>
					</view>
				</view>
				<view class="report-arrow">→</view>
			</view>

			<view v-if="reportList.length === 0" class="empty-state">
				<text class="empty-icon">📋</text>
				<text class="empty-text">暂无体检报告</text>
				<text class="empty-hint">点击上方按钮上传报告</text>
			</view>
		</view>

	</view>
</template>

<script setup>
import { ref, computed } from 'vue'

// 当前选中的趋势指标
const currentTrend = ref('bloodPressure')

const trendTabs = [
	{ name: '血压', value: 'bloodPressure' },
	{ name: '血糖', value: 'bloodSugar' },
	{ name: '血脂', value: 'bloodLipid' }
]

// 最新报告
const latestReport = ref({
	id: 1,
	date: '2024-01-15',
	hospital: '市第一人民医院',
	abnormalCount: 2,
	score: 85
})

// 异常指标列表
const abnormalItems = ref([
	{
		name: '总胆固醇',
		value: '6.2 mmol/L',
		normalRange: '2.8-5.2 mmol/L',
		advice: '建议低脂饮食，增加运动'
	},
	{
		name: '舒张压',
		value: '92 mmHg',
		normalRange: '60-90 mmHg',
		advice: '注意监测血压，低盐饮食'
	}
])

// 趋势数据
const trendData = ref({
	bloodPressure: [
		{ date: '2023-01', value: '125/82', percentage: 65 },
		{ date: '2023-06', value: '128/85', percentage: 68 },
		{ date: '2023-12', value: '135/88', percentage: 72 },
		{ date: '2024-01', value: '130/92', percentage: 70 }
	],
	bloodSugar: [
		{ date: '2023-01', value: '5.2', percentage: 45 },
		{ date: '2023-06', value: '5.5', percentage: 50 },
		{ date: '2023-12', value: '5.8', percentage: 55 },
		{ date: '2024-01', value: '6.0', percentage: 58 }
	],
	bloodLipid: [
		{ date: '2023-01', value: '4.8', percentage: 60 },
		{ date: '2023-06', value: '5.2', percentage: 70 },
		{ date: '2023-12', value: '5.8', percentage: 85 },
		{ date: '2024-01', value: '6.2', percentage: 95 }
	]
})

const currentTrendData = computed(() => trendData.value[currentTrend.value])

// 历史报告列表
const reportList = ref([
	{
		id: 1,
		date: '2024-01-15',
		hospital: '市第一人民医院',
		abnormalCount: 2
	},
	{
		id: 2,
		date: '2023-06-10',
		hospital: '美年大健康',
		abnormalCount: 1
	},
	{
		id: 3,
		date: '2023-01-05',
		hospital: '社区体检中心',
		abnormalCount: 0
	}
])

// 方法
function addReport() {
	uni.showToast({ title: '上传体检报告', icon: 'none' })
}

function viewReport(item) {
	uni.showToast({ title: `查看报告 - ${item.date}`, icon: 'none' })
}

function viewAllReports() {
	uni.showToast({ title: '查看全部报告', icon: 'none' })
}
</script>

<style lang="scss" scoped>
.page {
	min-height: 100vh;
	background: #f5f7fb;
	padding-bottom: 40rpx;
}

.top-bg {
	padding: 70rpx 34rpx 80rpx;
	background: linear-gradient(135deg, #6fd08c, #43b96e);
	border-bottom-left-radius: 40rpx;
	border-bottom-right-radius: 40rpx;
}

.page-title {
	font-size: 52rpx;
	font-weight: bold;
	color: white;
}

.page-desc {
	margin-top: 16rpx;
	font-size: 26rpx;
	color: rgba(255,255,255,0.9);
}

.add-btn {
	margin: -40rpx 30rpx 30rpx;
	height: 88rpx;
	background: white;
	border-radius: 44rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 12rpx;
	box-shadow: 0 8rpx 24rpx rgba(0,0,0,0.08);
	font-size: 28rpx;
	color: #49b96e;
	font-weight: bold;
}

.add-icon {
	font-size: 40rpx;
}

.latest-card {
	margin: 0 30rpx 24rpx;
	padding: 28rpx;
	background: white;
	border-radius: 28rpx;
	box-shadow: 0 4rpx 16rpx rgba(0,0,0,0.04);
}

.latest-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-bottom: 20rpx;
	border-bottom: 1rpx solid #f0f0f0;
}

.latest-title {
	font-size: 30rpx;
	font-weight: bold;
	color: #222;
}

.latest-date {
	font-size: 24rpx;
	color: #999;
}

.latest-summary {
	display: flex;
	justify-content: space-around;
	padding: 24rpx 0;
}

.summary-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 8rpx;
}

.summary-label {
	font-size: 24rpx;
	color: #888;
}

.summary-value {
	font-size: 32rpx;
	font-weight: bold;
	color: #333;
}

.summary-value.abnormal {
	color: #ff9800;
}

.detail-btn {
	text-align: center;
	padding-top: 16rpx;
	font-size: 26rpx;
	color: #49b96e;
}

.alert-card {
	margin: 0 30rpx 24rpx;
	padding: 28rpx;
	background: #fff8ef;
	border-radius: 28rpx;
	border-left: 8rpx solid #ff9800;
}

.alert-header {
	display: flex;
	align-items: center;
	gap: 12rpx;
	margin-bottom: 20rpx;
}

.alert-icon {
	font-size: 36rpx;
}

.alert-title {
	font-size: 28rpx;
	font-weight: bold;
	color: #ff9800;
}

.alert-item {
	padding: 16rpx 0;
	border-bottom: 1rpx solid rgba(255,152,0,0.15);
}

.alert-item:last-child {
	border-bottom: none;
}

.alert-name {
	font-size: 28rpx;
	font-weight: bold;
	color: #333;
}

.alert-value {
	font-size: 24rpx;
	color: #ff9800;
	margin-top: 6rpx;
}

.alert-advice {
	font-size: 24rpx;
	color: #888;
	margin-top: 6rpx;
}

.trend-card {
	margin: 0 30rpx 24rpx;
	padding: 28rpx;
	background: white;
	border-radius: 28rpx;
}

.card-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 24rpx;
	flex-wrap: wrap;
	gap: 16rpx;
}

.card-title {
	font-size: 30rpx;
	font-weight: bold;
	color: #222;
}

.trend-tabs {
	display: flex;
	gap: 16rpx;
}

.trend-tab {
	padding: 8rpx 20rpx;
	background: #f5f7fb;
	border-radius: 30rpx;
	font-size: 24rpx;
	color: #666;
}

.trend-tab.active {
	background: #49b96e;
	color: white;
}

.trend-chart {
	padding: 20rpx 0;
}

.chart-bars {
	display: flex;
	justify-content: space-around;
	align-items: flex-end;
	height: 280rpx;
}

.bar-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 12rpx;
	width: 100rpx;
}

.bar {
	width: 50rpx;
	background: linear-gradient(180deg, #6fd08c, #49b96e);
	border-radius: 12rpx;
	min-height: 8rpx;
}

.bar-label {
	font-size: 22rpx;
	color: #999;
}

.bar-value {
	font-size: 22rpx;
	font-weight: bold;
	color: #333;
}

.trend-note {
	margin-top: 24rpx;
	font-size: 22rpx;
	color: #bbb;
	text-align: center;
}

.section {
	margin: 0 30rpx 24rpx;
}

.section-header {
	display: flex;
	justify-content: space-between;
	align-items: baseline;
	margin-bottom: 20rpx;
}

.section-title {
	font-size: 32rpx;
	font-weight: bold;
	color: #222;
}

.section-more {
	font-size: 24rpx;
	color: #49b96e;
}

.report-card {
	display: flex;
	align-items: center;
	gap: 20rpx;
	background: white;
	border-radius: 20rpx;
	padding: 24rpx;
	margin-bottom: 16rpx;
}

.report-icon {
	font-size: 48rpx;
}

.report-info {
	flex: 1;
}

.report-date {
	font-size: 28rpx;
	font-weight: bold;
	color: #222;
}

.report-hospital {
	font-size: 24rpx;
	color: #888;
	margin-top: 6rpx;
}

.report-tags {
	display: flex;
	gap: 16rpx;
	margin-top: 10rpx;
}

.tag {
	padding: 4rpx 16rpx;
	border-radius: 20rpx;
	font-size: 22rpx;
}

.report-arrow {
	font-size: 32rpx;
	color: #ccc;
}

.empty-state {
	background: white;
	border-radius: 28rpx;
	padding: 80rpx 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 16rpx;
}

.empty-icon {
	font-size: 64rpx;
}

.empty-text {
	font-size: 28rpx;
	color: #999;
}

.empty-hint {
	font-size: 24rpx;
	color: #bbb;
}
</style>