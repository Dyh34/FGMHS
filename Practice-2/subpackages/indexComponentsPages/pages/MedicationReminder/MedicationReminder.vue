<!-- MentalAssessment.vue - 心理测评 -->
<template>
	<view class="page">

		<!-- 顶部 -->
		<view class="top-bg">
			<view class="page-title">心理测评</view>
			<view class="page-desc">关注情绪 · 守护心理健康</view>
		</view>

		<!-- 添加按钮 -->
		<view class="add-btn" @click="addAssessment">
			<text class="add-icon">+</text>
			<text>添加心理测评</text>
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

		<!-- 今日待测 -->
		<view class="section">
			<view class="section-header">
				<text class="section-title">今日待测</text>
				<text class="section-count">{{ todayAssessments.length }}项</text>
			</view>

			<view v-if="todayAssessments.length === 0" class="empty-state">
				<text class="empty-icon">🧠</text>
				<text class="empty-text">今日暂无心理测评</text>
			</view>

			<view v-else class="assessment-list">
				<view 
					v-for="(item, idx) in todayAssessments" 
					:key="idx"
					class="assessment-card"
					:class="{ done: item.finished }"
				>
					<view class="assessment-time-box">
						<text class="assessment-time">{{ item.time }}</text>
					</view>

					<view class="assessment-info">
						<view class="assessment-name">{{ item.name }}</view>
						<view class="assessment-desc">
							{{ item.questionCount }}题 · {{ item.duration }}
						</view>
						<view class="assessment-tip">
							{{ item.tip }}
						</view>
					</view>

					<view class="assessment-action">
						<view 
							v-if="!item.finished"
							class="start-btn"
							@click="finishAssessment(item)"
						>
							开始
						</view>

						<view v-else class="done-mark">
							✓ 已完成
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 测评记录 -->
		<view class="section">
			<view class="section-header">
				<text class="section-title">测评记录</text>
				<text class="section-count">
					{{ currentMemberAssessments.length }}项
				</text>
			</view>

			<view class="record-list">
				<view 
					v-for="(item, idx) in currentMemberAssessments"
					:key="idx"
					class="record-item"
					@click="viewAssessment(item)"
				>
					<view class="record-icon">📋</view>

					<view class="record-info">
						<view class="record-name">{{ item.name }}</view>
						<view class="record-date">{{ item.schedule }}</view>
					</view>

					<view class="record-score">
						{{ item.score }}
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script setup>
import { ref, computed } from 'vue'

// 当前成员
const currentMember = ref(0)

// 家庭成员
const familyMembers = ref([
	{ name: '本人', avatar: '👤' },
	{ name: '父亲', avatar: '👨' },
	{ name: '母亲', avatar: '👩' }
])

// 心理测评数据
const assessmentData = ref({

	0: [
		{
			id: 1,
			name: '焦虑测评',
			time: '09:00',
			questionCount: '20',
			duration: '约5分钟',
			tip: '评估近期焦虑状态',
			finished: false,
			score: '轻度焦虑',
			schedule: '2026/05/15'
		},
		{
			id: 2,
			name: '睡眠质量测试',
			time: '21:00',
			questionCount: '15',
			duration: '约3分钟',
			tip: '分析近期睡眠情况',
			finished: false,
			score: '睡眠良好',
			schedule: '2026/05/14'
		}
	],

	1: [
		{
			id: 1,
			name: '压力评估',
			time: '19:00',
			questionCount: '18',
			duration: '约4分钟',
			tip: '检测压力水平',
			finished: false,
			score: '中等压力',
			schedule: '2026/05/12'
		}
	],

	2: [
		{
			id: 1,
			name: '情绪状态测试',
			time: '20:00',
			questionCount: '12',
			duration: '约3分钟',
			tip: '了解情绪波动情况',
			finished: false,
			score: '情绪稳定',
			schedule: '2026/05/10'
		}
	]
})

// 当前成员测评
const currentMemberAssessments = computed(() => {
	return assessmentData.value[currentMember.value] || []
})

// 今日待测
const todayAssessments = computed(() => {
	return currentMemberAssessments.value.filter(
		item => !item.finished
	)
})

// 完成测评
function finishAssessment(item) {
	item.finished = true

	if (typeof uni !== 'undefined' && uni.showToast) {
		uni.showToast({
			title: '测评完成',
			icon: 'success'
		})
	}
}

// 添加测评
function addAssessment() {
	if (typeof uni !== 'undefined' && uni.showToast) {
		uni.showToast({
			title: '添加心理测评',
			icon: 'none'
		})
	}
}

// 查看详情
function viewAssessment(item) {
	if (typeof uni !== 'undefined' && uni.showToast) {
		uni.showToast({
			title: item.name,
			icon: 'none'
		})
	}
}
</script>

<style lang="scss" scoped>
.page {
	min-height: 100vh;
	background: #f5f7fb;
	padding-bottom: 40rpx;
}

/* 顶部 */
.top-bg {
	padding: 70rpx 34rpx 80rpx;
	background: linear-gradient(135deg, #7a8cff, #5b6dff);
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

/* 添加按钮 */
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
	color: #5b6dff;
	font-weight: bold;
}

.add-icon {
	font-size: 40rpx;
}

/* 家庭成员 */
.family-scroll {
	white-space: nowrap;
	margin: 0 30rpx 20rpx;
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
	background: #5b6dff;

	.family-name {
		color: white;
	}
}

.family-avatar {
	font-size: 40rpx;
}

.family-name {
	font-size: 24rpx;
	color: #666;
	margin-top: 6rpx;
}

/* 区块 */
.section {
	margin: 0 30rpx 30rpx;
}

.section-header {
	display: flex;
	justify-content: space-between;
	margin-bottom: 20rpx;
}

.section-title {
	font-size: 32rpx;
	font-weight: bold;
}

.section-count {
	font-size: 24rpx;
	color: #999;
}

/* 卡片 */
.assessment-list {
	display: flex;
	flex-direction: column;
	gap: 20rpx;
}

.assessment-card {
	background: white;
	border-radius: 24rpx;
	padding: 24rpx;
	display: flex;
	align-items: center;
	gap: 20rpx;
	box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.05);
}

.assessment-card.done {
	opacity: 0.6;
}

.assessment-time {
	font-size: 30rpx;
	font-weight: bold;
	color: #5b6dff;
}

.assessment-info {
	flex: 1;
}

.assessment-name {
	font-size: 30rpx;
	font-weight: bold;
}

.assessment-desc {
	font-size: 24rpx;
	color: #888;
	margin-top: 6rpx;
}

.assessment-tip {
	font-size: 22rpx;
	color: #aaa;
	margin-top: 4rpx;
}

.start-btn {
	width: 90rpx;
	height: 60rpx;
	background: #5b6dff;
	border-radius: 30rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	color: white;
	font-size: 24rpx;
}

.done-mark {
	font-size: 24rpx;
	color: #5b6dff;
}

/* 记录 */
.record-list {
	background: white;
	border-radius: 28rpx;
	overflow: hidden;
}

.record-item {
	display: flex;
	align-items: center;
	padding: 24rpx;
	border-bottom: 1rpx solid #f0f0f0;
}

.record-item:last-child {
	border-bottom: none;
}

.record-icon {
	font-size: 42rpx;
	margin-right: 20rpx;
}

.record-info {
	flex: 1;
}

.record-name {
	font-size: 28rpx;
	font-weight: bold;
}

.record-date {
	font-size: 24rpx;
	color: #999;
	margin-top: 6rpx;
}

.record-score {
	font-size: 24rpx;
	color: #5b6dff;
	font-weight: bold;
}

/* 空状态 */
.empty-state {
	background: white;
	border-radius: 28rpx;
	padding: 80rpx 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 20rpx;
}

.empty-icon {
	font-size: 64rpx;
}

.empty-text {
	font-size: 26rpx;
	color: #999;
}
</style>