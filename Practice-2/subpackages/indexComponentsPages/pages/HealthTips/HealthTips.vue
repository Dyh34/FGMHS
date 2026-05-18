<!-- HealthTips.vue - 养生贴士 -->
<template>
	<view class="page">

		<!-- 顶部 -->
		<view class="top-bg">
			<view class="page-title">养生贴士</view>
			<view class="page-desc">四季养生 · 合理膳食 · 规律作息</view>
		</view>

		<!-- 分类筛选 -->
		<scroll-view scroll-x class="category-scroll">
			<view class="category-list">
				<view 
					v-for="(cat, idx) in categories" 
					:key="idx"
					class="category-item"
					:class="{ active: currentCategory === cat.value }"
					@click="currentCategory = cat.value"
				>
					{{ cat.name }}
				</view>
			</view>
		</scroll-view>

		<!-- 今日推荐 -->
		<view class="today-tip">
			<view class="today-header">
				<text class="today-icon">🌿</text>
				<text class="today-title">今日推荐</text>
			</view>
			<view class="today-content">{{ todayTip.content }}</view>
			<view class="today-source">—— {{ todayTip.source }}</view>
		</view>

		<!-- 贴士列表 -->
		<view class="tip-list">
			<view 
				v-for="(item, idx) in filteredTips" 
				:key="idx"
				class="tip-card"
				@click="viewDetail(item)"
			>
				<view class="tip-header">
					<view class="tip-category">{{ item.categoryName }}</view>
					<view class="tip-date">{{ item.date }}</view>
				</view>
				<view class="tip-title">{{ item.title }}</view>
				<view class="tip-desc">{{ item.desc }}</view>
				<view class="tip-footer">
					<view class="tip-views">👁️ {{ item.views }}</view>
					<view class="tip-likes">❤️ {{ item.likes }}</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script setup>
import { ref, computed } from 'vue'

const currentCategory = ref('all')

const categories = [
	{ name: '全部', value: 'all' },
	{ name: '四季养生', value: 'season' },
	{ name: '膳食调理', value: 'diet' },
	{ name: '运动健康', value: 'sport' },
	{ name: '情志调养', value: 'mood' }
]

const todayTip = ref({
	content: '春养肝，夏养心，秋养肺，冬养肾。顺应四时变化，调整作息与饮食，是中医养生的核心要义。',
	source: '《黄帝内经》'
})

const tipsList = ref([
	{
		id: 1,
		title: '春季养肝正当时',
		desc: '春季阳气生发，宜多吃绿色蔬菜，少酸增甘，保持心情舒畅。',
		category: 'season',
		categoryName: '四季养生',
		date: '2024-03-15',
		views: 1243,
		likes: 89
	},
	{
		id: 2,
		title: '每天一杯枸杞水',
		desc: '枸杞滋补肝肾，明目润肺，适合长期用眼人群。',
		category: 'diet',
		categoryName: '膳食调理',
		date: '2024-03-14',
		views: 982,
		likes: 67
	},
	{
		id: 3,
		title: '八段锦养生法',
		desc: '每天练习八段锦15分钟，疏通经络，强身健体。',
		category: 'sport',
		categoryName: '运动健康',
		date: '2024-03-13',
		views: 756,
		likes: 112
	}
])

const filteredTips = computed(() => {
	if (currentCategory.value === 'all') return tipsList.value
	return tipsList.value.filter(item => item.category === currentCategory.value)
})

function viewDetail(item) {
	uni.showToast({ title: item.title, icon: 'none' })
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
.category-scroll {
	white-space: nowrap;
	margin: -30rpx 30rpx 20rpx;
}
.category-list {
	display: inline-flex;
	gap: 20rpx;
	padding: 10rpx 0;
}
.category-item {
	padding: 16rpx 32rpx;
	background: white;
	border-radius: 60rpx;
	font-size: 26rpx;
	color: #666;
	box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.05);
}
.category-item.active {
	background: #49b96e;
	color: white;
}
.today-tip {
	margin: 20rpx 30rpx;
	padding: 30rpx;
	background: linear-gradient(135deg, #fff8e7, #fff0d0);
	border-radius: 28rpx;
}
.today-header {
	display: flex;
	align-items: center;
	gap: 12rpx;
}
.today-icon {
	font-size: 40rpx;
}
.today-title {
	font-size: 30rpx;
	font-weight: bold;
	color: #d4a017;
}
.today-content {
	margin-top: 20rpx;
	font-size: 28rpx;
	line-height: 44rpx;
	color: #555;
}
.today-source {
	margin-top: 16rpx;
	font-size: 24rpx;
	color: #999;
	text-align: right;
}
.tip-list {
	margin: 0 30rpx;
}
.tip-card {
	background: white;
	border-radius: 28rpx;
	padding: 28rpx;
	margin-bottom: 24rpx;
	box-shadow: 0 4rpx 16rpx rgba(0,0,0,0.04);
}
.tip-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 16rpx;
}
.tip-category {
	font-size: 22rpx;
	color: #49b96e;
	background: #e9f8ec;
	padding: 6rpx 18rpx;
	border-radius: 20rpx;
}
.tip-date {
	font-size: 22rpx;
	color: #999;
}
.tip-title {
	font-size: 32rpx;
	font-weight: bold;
	color: #222;
	margin-bottom: 12rpx;
}
.tip-desc {
	font-size: 26rpx;
	color: #666;
	line-height: 40rpx;
}
.tip-footer {
	display: flex;
	gap: 30rpx;
	margin-top: 20rpx;
	padding-top: 16rpx;
	border-top: 1rpx solid #f0f0f0;
	font-size: 24rpx;
	color: #999;
}
</style>
