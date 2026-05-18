<!-- VaccineBooking.vue - 疫苗预约 -->
<template>
	<view class="page">

		<!-- 顶部 -->
		<view class="top-bg">
			<view class="page-title">疫苗预约</view>
			<view class="page-desc">预防接种 · 守护全家健康</view>
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

		<!-- 即将到期提醒 -->
		<view class="reminder-card" v-if="dueVaccine">
			<view class="reminder-icon">⏰</view>
			<view class="reminder-content">
				<view class="reminder-title">{{ dueVaccine.name }} 即将到期</view>
				<view class="reminder-desc">建议在 {{ dueVaccine.dueDate }} 前完成接种</view>
			</view>
			<view class="reminder-btn" @click="bookVaccine(dueVaccine)">去预约</view>
		</view>

		<!-- 接种记录卡片 -->
		<view class="record-card">
			<view class="card-header">
				<view>
					<view class="card-title">📋 接种记录</view>
					<view class="card-subtitle">已接种 {{ currentMemberRecords.length }} 剂次</view>
				</view>
				<view class="tag green-tag" @click="viewRecordDetail">查看全部</view>
			</view>

			<view v-if="currentMemberRecords.length === 0" class="empty-state">
				<text class="empty-icon">💉</text>
				<text class="empty-text">暂无接种记录</text>
			</view>

			<view v-else class="record-list">
				<view 
					v-for="(item, idx) in currentMemberRecords.slice(0, 3)" 
					:key="idx"
					class="record-item"
				>
					<view class="record-dot"></view>
					<view class="record-info">
						<view class="record-name">{{ item.name }}</view>
						<view class="record-date">{{ item.date }}</view>
					</view>
					<view class="record-status status-done">已完成</view>
				</view>
			</view>
		</view>

		<!-- 推荐疫苗 -->
		<view class="section">
			<view class="section-header">
				<view class="section-title">推荐疫苗</view>
				<view class="section-more" @click="viewAllVaccines">查看全部 →</view>
			</view>

			<view class="vaccine-list">
				<view 
					v-for="(item, idx) in recommendedVaccines" 
					:key="idx"
					class="vaccine-card"
					@click="bookVaccine(item)"
				>
					<view class="vaccine-icon">{{ item.icon }}</view>
					<view class="vaccine-info">
						<view class="vaccine-name">{{ item.name }}</view>
						<view class="vaccine-desc">{{ item.desc }}</view>
						<view class="vaccine-tags">
							<text class="tag">{{ item.age }}</text>
							<text class="tag">{{ item.doses }}剂次</text>
						</view>
					</view>
					<view class="vaccine-right">
						<view class="vaccine-price">¥{{ item.price }}</view>
						<view class="book-btn">预约</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 附近接种点 -->
		<view class="section">
			<view class="section-header">
				<view class="section-title">附近接种点</view>
				<view class="section-more" @click="viewAllLocations">查看更多 →</view>
			</view>

			<view class="location-list">
				<view 
					v-for="(item, idx) in nearbyLocations" 
					:key="idx"
					class="location-card"
					@click="selectLocation(item)"
				>
					<view class="location-info">
						<view class="location-name">{{ item.name }}</view>
						<view class="location-address">{{ item.address }}</view>
						<view class="location-distance">距您 {{ item.distance }}km</view>
					</view>
					<view class="location-status" :class="item.hasSlot ? 'has-slot' : 'full'">
						{{ item.hasSlot ? '可预约' : '约满' }}
					</view>
				</view>
			</view>
		</view>

		<!-- 我的预约 -->
		<view class="section">
			<view class="section-header">
				<view class="section-title">我的预约</view>
				<view class="section-more" @click="viewAllAppointments">查看全部 →</view>
			</view>

			<view v-if="myAppointments.length === 0" class="empty-state small">
				<text class="empty-text">暂无预约记录</text>
			</view>

			<view v-else class="appointment-list">
				<view 
					v-for="(item, idx) in myAppointments.slice(0, 2)" 
					:key="idx"
					class="appointment-card"
				>
					<view class="appointment-header">
						<view class="appointment-name">{{ item.vaccineName }}</view>
						<view class="appointment-status" :class="getStatusClass(item.status)">
							{{ item.status }}
						</view>
					</view>
					<view class="appointment-info">
						<view class="info-row">
							<text class="info-icon">📅</text>
							<text>{{ item.date }}</text>
						</view>
						<view class="info-row">
							<text class="info-icon">📍</text>
							<text>{{ item.location }}</text>
						</view>
					</view>
					<view v-if="item.status === '待接种'" class="appointment-actions">
						<view class="action-btn cancel" @click.stop="cancelAppointment(item)">取消</view>
						<view class="action-btn reschedule" @click.stop="rescheduleAppointment(item)">改期</view>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script setup>
import { ref, computed } from 'vue'

// 当前选中的家庭成员
const currentMember = ref(0)

// 家庭成员列表
const familyMembers = ref([
	{ name: '本人', avatar: '👤' },
	{ name: '配偶', avatar: '👩' },
	{ name: '孩子', avatar: '👶' },
	{ name: '父亲', avatar: '👨' },
	{ name: '母亲', avatar: '👩' }
])

// 接种记录数据
const vaccinationRecords = ref({
	0: [
		{ name: '新冠疫苗', date: '2023-01-15' },
		{ name: '流感疫苗', date: '2023-10-20' },
		{ name: '乙肝疫苗', date: '2022-05-10' }
	],
	1: [
		{ name: 'HPV九价疫苗', date: '2023-06-20' },
		{ name: '流感疫苗', date: '2023-11-01' }
	],
	2: [
		{ name: '卡介苗', date: '2020-03-01' },
		{ name: '乙肝疫苗', date: '2020-03-01' },
		{ name: '百白破', date: '2020-06-15' },
		{ name: '麻腮风', date: '2021-01-10' }
	],
	3: [
		{ name: '流感疫苗', date: '2023-09-15' },
		{ name: '肺炎疫苗', date: '2023-04-20' }
	],
	4: [
		{ name: '流感疫苗', date: '2023-10-01' },
		{ name: '带状疱疹疫苗', date: '2023-07-15' }
	]
})

const currentMemberRecords = computed(() => vaccinationRecords.value[currentMember.value] || [])

// 即将到期的疫苗提醒
const dueVaccine = ref({
	name: '流感疫苗',
	dueDate: '2024-03-30'
})

// 推荐疫苗列表
const recommendedVaccines = ref([
	{ id: 1, icon: '🦠', name: '流感疫苗', desc: '预防流行性感冒', age: '6月龄以上', doses: 1, price: 158 },
	{ id: 2, icon: '🛡️', name: 'HPV九价疫苗', desc: '预防宫颈癌', age: '9-45岁女性', doses: 3, price: 1298 },
	{ id: 3, icon: '💪', name: '带状疱疹疫苗', desc: '预防带状疱疹', age: '50岁以上', doses: 2, price: 1598 },
	{ id: 4, icon: '🫁', name: '肺炎疫苗', desc: '预防肺炎球菌感染', age: '65岁以上', doses: 1, price: 268 }
])

// 附近接种点
const nearbyLocations = ref([
	{ id: 1, name: '社区卫生服务中心', address: 'xx路118号', distance: 0.8, hasSlot: true },
	{ id: 2, name: '市妇幼保健院', address: 'xx大道99号', distance: 1.5, hasSlot: true },
	{ id: 3, name: '区人民医院', address: 'xx中路66号', distance: 2.3, hasSlot: false }
])

// 我的预约
const myAppointments = ref([
	{ id: 1, vaccineName: '流感疫苗', date: '2024-03-25 14:30', location: '社区卫生服务中心', status: '待接种' },
	{ id: 2, vaccineName: 'HPV九价疫苗', date: '2024-04-10 09:00', location: '市妇幼保健院', status: '待接种' }
])

// 状态样式
function getStatusClass(status) {
	switch(status) {
		case '待接种': return 'status-pending'
		case '已完成': return 'status-done'
		case '已取消': return 'status-cancelled'
		default: return ''
	}
}

// 方法
function bookVaccine(item) {
	uni.showModal({
		title: '预约疫苗',
		content: `确认预约${item.name}吗？`,
		success(res) {
			if(res.confirm) {
				uni.showToast({ title: '预约成功', icon: 'success' })
			}
		}
	})
}

function cancelAppointment(item) {
	uni.showModal({
		title: '取消预约',
		content: `确认取消${item.vaccineName}的预约吗？`,
		success(res) {
			if(res.confirm) {
				uni.showToast({ title: '已取消', icon: 'success' })
			}
		}
	})
}

function rescheduleAppointment(item) {
	uni.showToast({ title: '选择新的接种时间', icon: 'none' })
}

function selectLocation(item) {
	uni.showToast({ title: `选择${item.name}`, icon: 'none' })
}

function viewRecordDetail() {
	uni.showToast({ title: '查看全部接种记录', icon: 'none' })
}

function viewAllVaccines() {
	uni.showToast({ title: '查看全部疫苗', icon: 'none' })
}

function viewAllLocations() {
	uni.showToast({ title: '查看附近接种点', icon: 'none' })
}

function viewAllAppointments() {
	uni.showToast({ title: '查看全部预约', icon: 'none' })
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

/* 家庭成员切换 */
.family-scroll {
	white-space: nowrap;
	margin: -40rpx 30rpx 20rpx;
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

.family-avatar {
	font-size: 40rpx;
}

.family-name {
	font-size: 24rpx;
	color: #666;
	margin-top: 6rpx;
}

/* 提醒卡片 */
.reminder-card {
	margin: 0 30rpx 24rpx;
	padding: 24rpx;
	background: linear-gradient(135deg, #fff8ef, #fff0d0);
	border-radius: 28rpx;
	display: flex;
	align-items: center;
	gap: 20rpx;
}

.reminder-icon {
	font-size: 48rpx;
}

.reminder-content {
	flex: 1;
}

.reminder-title {
	font-size: 28rpx;
	font-weight: bold;
	color: #ff9800;
}

.reminder-desc {
	font-size: 24rpx;
	color: #888;
	margin-top: 6rpx;
}

.reminder-btn {
	padding: 12rpx 28rpx;
	background: #ff9800;
	border-radius: 30rpx;
	font-size: 24rpx;
	color: white;
	font-weight: bold;
}

/* 接种记录卡片 */
.record-card {
	margin: 0 30rpx 24rpx;
	padding: 28rpx;
	background: white;
	border-radius: 28rpx;
	box-shadow: 0 4rpx 16rpx rgba(0,0,0,0.04);
}

.card-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.card-title {
	font-size: 32rpx;
	font-weight: bold;
	color: #222;
}

.card-subtitle {
	font-size: 24rpx;
	color: #888;
	margin-top: 6rpx;
}

.tag {
	padding: 8rpx 20rpx;
	border-radius: 20rpx;
	font-size: 22rpx;
	font-weight: bold;
}

.green-tag {
	background: #e9f8ec;
	color: #49b96e;
}

.record-list {
	margin-top: 20rpx;
}

.record-item {
	display: flex;
	align-items: center;
	padding: 16rpx 0;
	border-bottom: 1rpx solid #f5f5f5;
}

.record-item:last-child {
	border-bottom: none;
}

.record-dot {
	width: 12rpx;
	height: 12rpx;
	border-radius: 50%;
	background: #49b96e;
	margin-right: 20rpx;
}

.record-info {
	flex: 1;
}

.record-name {
	font-size: 28rpx;
	font-weight: bold;
	color: #222;
}

.record-date {
	font-size: 22rpx;
	color: #999;
	margin-top: 4rpx;
}

.record-status {
	font-size: 22rpx;
	padding: 6rpx 16rpx;
	border-radius: 20rpx;
}

.status-done {
	background: #e9f8ec;
	color: #49b96e;
}

/* 区块 */
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

/* 疫苗列表 */
.vaccine-list {
	display: flex;
	flex-direction: column;
	gap: 20rpx;
}

.vaccine-card {
	display: flex;
	align-items: center;
	gap: 20rpx;
	background: white;
	border-radius: 24rpx;
	padding: 24rpx;
	box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.04);
}

.vaccine-icon {
	font-size: 52rpx;
}

.vaccine-info {
	flex: 1;
}

.vaccine-name {
	font-size: 30rpx;
	font-weight: bold;
	color: #222;
}

.vaccine-desc {
	font-size: 24rpx;
	color: #888;
	margin-top: 6rpx;
}

.vaccine-tags {
	display: flex;
	gap: 12rpx;
	margin-top: 10rpx;
}

.tag {
	padding: 4rpx 16rpx;
	background: #f5f7fb;
	border-radius: 20rpx;
	font-size: 22rpx;
	color: #666;
}

.vaccine-right {
	align-items: flex-end;
	text-align: right;
}

.vaccine-price {
	font-size: 32rpx;
	font-weight: bold;
	color: #ff9800;
}

.book-btn {
	margin-top: 12rpx;
	padding: 10rpx 24rpx;
	background: #49b96e;
	border-radius: 30rpx;
	font-size: 24rpx;
	color: white;
	font-weight: bold;
}

/* 接种点列表 */
.location-list {
	display: flex;
	flex-direction: column;
	gap: 16rpx;
}

.location-card {
	display: flex;
	justify-content: space-between;
	align-items: center;
	background: white;
	border-radius: 20rpx;
	padding: 24rpx;
}

.location-name {
	font-size: 28rpx;
	font-weight: bold;
	color: #222;
}

.location-address {
	font-size: 24rpx;
	color: #888;
	margin-top: 6rpx;
}

.location-distance {
	font-size: 22rpx;
	color: #aaa;
	margin-top: 6rpx;
}

.location-status {
	padding: 10rpx 24rpx;
	border-radius: 30rpx;
	font-size: 24rpx;
	font-weight: bold;
}

.has-slot {
	background: #e9f8ec;
	color: #49b96e;
}

.full {
	background: #ffeeee;
	color: #ff6b6b;
}

/* 我的预约 */
.appointment-list {
	display: flex;
	flex-direction: column;
	gap: 20rpx;
}

.appointment-card {
	background: white;
	border-radius: 24rpx;
	padding: 24rpx;
}

.appointment-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-bottom: 16rpx;
	border-bottom: 1rpx solid #f0f0f0;
}

.appointment-name {
	font-size: 28rpx;
	font-weight: bold;
	color: #222;
}

.appointment-status {
	font-size: 22rpx;
	padding: 6rpx 16rpx;
	border-radius: 20rpx;
}

.status-pending {
	background: #fff4e4;
	color: #ff9800;
}

.status-cancelled {
	background: #f0f0f0;
	color: #999;
}

.appointment-info {
	margin-top: 16rpx;
}

.info-row {
	display: flex;
	align-items: center;
	gap: 12rpx;
	font-size: 24rpx;
	color: #666;
	margin-bottom: 10rpx;
}

.info-icon {
	font-size: 28rpx;
}

.appointment-actions {
	display: flex;
	gap: 20rpx;
	margin-top: 20rpx;
	padding-top: 16rpx;
	border-top: 1rpx solid #f0f0f0;
}

.action-btn {
	flex: 1;
	text-align: center;
	padding: 16rpx 0;
	border-radius: 40rpx;
	font-size: 26rpx;
}

.cancel {
	background: #f5f5f5;
	color: #666;
}

.reschedule {
	background: #e9f8ec;
	color: #49b96e;
}

/* 空状态 */
.empty-state {
	background: white;
	border-radius: 24rpx;
	padding: 60rpx 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 12rpx;
}

.empty-state.small {
	padding: 40rpx 0;
}

.empty-icon {
	font-size: 64rpx;
}

.empty-text {
	font-size: 26rpx;
	color: #999;
}
</style>