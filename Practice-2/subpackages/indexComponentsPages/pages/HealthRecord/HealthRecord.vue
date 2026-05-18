<!-- HealthRecord.vue - 健康档案 -->
<template>
	<view class="page">

		<!-- 顶部 -->
		<view class="top-bg">
			<view class="page-title">健康档案</view>
			<view class="page-desc">全面记录 · 科学管理</view>
		</view>

		<!-- 家庭成员切换 -->
		<scroll-view scroll-x class="family-scroll">
			<view class="family-list">
				<view 
					v-for="(member, idx) in familyMembers" 
					:key="idx"
					class="family-item"
					:class="{ active: currentMember === idx }"
					@click="currentMember = idx"
				>
					<view class="family-avatar">{{ member.avatar }}</view>
					<view class="family-name">{{ member.name }}</view>
				</view>
			</view>
		</scroll-view>

		<!-- 基本信息卡片 -->
		<view class="info-card">
			<view class="info-header">
				<text class="info-title">基本信息</text>
				<text class="info-edit" @click="editBasicInfo">编辑</text>
			</view>
			<view class="info-grid">
				<view class="info-item">
					<text class="info-label">姓名</text>
					<text class="info-value">{{ currentMemberData.name }}</text>
				</view>
				<view class="info-item">
					<text class="info-label">性别</text>
					<text class="info-value">{{ currentMemberData.gender }}</text>
				</view>
				<view class="info-item">
					<text class="info-label">年龄</text>
					<text class="info-value">{{ currentMemberData.age }}岁</text>
				</view>
				<view class="info-item">
					<text class="info-label">血型</text>
					<text class="info-value">{{ currentMemberData.bloodType }}</text>
				</view>
				<view class="info-item">
					<text class="info-label">身高</text>
					<text class="info-value">{{ currentMemberData.height }}cm</text>
				</view>
				<view class="info-item">
					<text class="info-label">体重</text>
					<text class="info-value">{{ currentMemberData.weight }}kg</text>
				</view>
			</view>
		</view>

		<!-- 健康指标 -->
		<view class="metrics-card">
			<view class="metrics-header">
				<text class="metrics-title">近期健康指标</text>
				<text class="metrics-more" @click="viewAllMetrics">全部 →</text>
			</view>
			<view class="metrics-list">
				<view class="metric-item">
					<view class="metric-value">{{ currentMemberData.bp }}</view>
					<view class="metric-label">血压(mmHg)</view>
				</view>
				<view class="metric-item">
					<view class="metric-value">{{ currentMemberData.bloodSugar }}</view>
					<view class="metric-label">血糖(mmol/L)</view>
				</view>
				<view class="metric-item">
					<view class="metric-value">{{ currentMemberData.heartRate }}</view>
					<view class="metric-label">心率(次/分)</view>
				</view>
				<view class="metric-item">
					<view class="metric-value">{{ currentMemberData.bmi }}</view>
					<view class="metric-label">BMI</view>
				</view>
			</view>
		</view>

		<!-- 病史记录 -->
		<view class="record-card">
			<view class="record-header">
				<text class="record-title">病史记录</text>
				<text class="record-add" @click="addRecord">+ 添加</text>
			</view>
			<view v-for="(record, idx) in currentMemberData.medicalHistory" :key="idx" class="record-item">
				<view class="record-year">{{ record.year }}</view>
				<view class="record-content">
					<view class="record-name">{{ record.name }}</view>
					<view class="record-desc">{{ record.desc }}</view>
				</view>
			</view>
			<view v-if="currentMemberData.medicalHistory.length === 0" class="empty-tip">
				暂无病史记录
			</view>
		</view>

		<!-- 过敏史 -->
		<view class="record-card">
			<view class="record-header">
				<text class="record-title">过敏史</text>
				<text class="record-add" @click="addAllergy">+ 添加</text>
			</view>
			<view class="allergy-tags">
				<view v-for="(item, idx) in currentMemberData.allergies" :key="idx" class="allergy-tag">
					{{ item }}
				</view>
				<view v-if="currentMemberData.allergies.length === 0" class="empty-tip">
					暂无过敏史
				</view>
			</view>
		</view>

	</view>
</template>

<script setup>
import { ref, computed } from 'vue'

const currentMember = ref(0)

const familyMembers = ref([
	{ name: '本人', avatar: '👤' },
	{ name: '父亲', avatar: '👨' },
	{ name: '母亲', avatar: '👩' }
])

const memberData = ref({
	0: {
		name: '张明',
		gender: '男',
		age: 32,
		bloodType: 'A型',
		height: 175,
		weight: 70,
		bp: '118/76',
		bloodSugar: '5.2',
		heartRate: '72',
		bmi: '22.9',
		medicalHistory: [
			{ year: '2022', name: '急性肠胃炎', desc: '经治疗已痊愈' }
		],
		allergies: ['青霉素']
	},
	1: {
		name: '张建国',
		gender: '男',
		age: 60,
		bloodType: 'O型',
		height: 172,
		weight: 75,
		bp: '135/85',
		bloodSugar: '6.1',
		heartRate: '78',
		bmi: '25.4',
		medicalHistory: [
			{ year: '2019', name: '高血压', desc: '需长期服药' }
		],
		allergies: ['无']
	},
	2: {
		name: '李秀英',
		gender: '女',
		age: 58,
		bloodType: 'B型',
		height: 160,
		weight: 62,
		bp: '128/82',
		bloodSugar: '5.8',
		heartRate: '75',
		bmi: '24.2',
		medicalHistory: [],
		allergies: ['花粉']
	}
})

const currentMemberData = computed(() => memberData.value[currentMember.value])

function editBasicInfo() { uni.showToast({ title: '编辑基本信息', icon: 'none' }) }
function viewAllMetrics() { uni.showToast({ title: '全部指标', icon: 'none' }) }
function addRecord() { uni.showToast({ title: '添加病史记录', icon: 'none' }) }
function addAllergy() { uni.showToast({ title: '添加过敏史', icon: 'none' }) }
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
.family-scroll {
	white-space: nowrap;
	margin: -30rpx 30rpx 20rpx;
}
.family-list {
	display: inline-flex;
	gap: 20rpx;
	padding: 10rpx 0;
}
.family-item {
	display: inline-flex;
	flex-direction: column;
	align-items: center;
	padding: 16rpx 24rpx;
	background: white;
	border-radius: 40rpx;
	box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.05);
}
.family-item.active {
	background: #49b96e;
	.family-name { color: white; }
}
.family-avatar { font-size: 40rpx; }
.family-name { font-size: 24rpx; color: #666; margin-top: 6rpx; }
.family-item.active .family-name { color: white; }
.info-card, .metrics-card, .record-card {
	margin: 0 30rpx 24rpx;
	padding: 28rpx;
	background: white;
	border-radius: 28rpx;
}
.info-header, .metrics-header, .record-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 24rpx;
}
.info-title, .metrics-title, .record-title {
	font-size: 30rpx;
	font-weight: bold;
	color: #222;
}
.info-edit, .metrics-more, .record-add {
	font-size: 24rpx;
	color: #49b96e;
}
.info-grid {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 20rpx;
}
.info-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 12rpx 0;
	border-bottom: 1rpx solid #f5f5f5;
}
.info-label { font-size: 26rpx; color: #888; }
.info-value { font-size: 26rpx; color: #222; font-weight: bold; }
.metrics-list {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 20rpx;
}
.metric-item {
	background: #f8f9fc;
	border-radius: 20rpx;
	padding: 24rpx;
	text-align: center;
}
.metric-value { font-size: 36rpx; font-weight: bold; color: #49b96e; }
.metric-label { font-size: 22rpx; color: #888; margin-top: 8rpx; }
.record-item {
	display: flex;
	gap: 24rpx;
	padding: 20rpx 0;
	border-bottom: 1rpx solid #f0f0f0;
}
.record-year {
	min-width: 100rpx;
	font-size: 26rpx;
	font-weight: bold;
	color: #49b96e;
}
.record-name { font-size: 28rpx; font-weight: bold; color: #222; }
.record-desc { font-size: 24rpx; color: #888; margin-top: 6rpx; }
.allergy-tags { display: flex; flex-wrap: wrap; gap: 16rpx; }
.allergy-tag {
	padding: 12rpx 24rpx;
	background: #fff4e4;
	color: #ff9800;
	border-radius: 30rpx;
	font-size: 24rpx;
}
.empty-tip {
	padding: 30rpx 0;
	text-align: center;
	font-size: 26rpx;
	color: #bbb;
}
</style>