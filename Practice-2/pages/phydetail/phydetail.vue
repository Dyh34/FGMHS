<template>
	<view class="page-wrap">

		<!-- 用户信息 -->
		<view class="user-card">
			<image
				class="user-avatar"
				src="/static/user1.jpg"
				mode="aspectFill"
			></image>

			<view class="user-info">
				<view class="user-name">林小雨</view>
				<view class="user-desc">
					女 · 28岁 · 健康档案已同步
				</view>
			</view>

			<!-- 家庭组成员切换下拉菜单 -->
			<view class="family-switch" @click.stop="toggleFamilyDropdown">
				<view class="family-current">
					<text class="family-name">{{ currentMemberName }}</text>
					<text class="family-arrow" :class="{ 'arrow-up': familyDropdownVisible }">▼</text>
				</view>
				<view class="family-dropdown" v-if="familyDropdownVisible">
					<view
						class="family-option"
						v-for="member in familyMembers"
						:key="member.id"
						:class="{ 'is-self': member.isSelf, 'is-active': member.id === currentMemberId }"
						@click.stop="selectFamilyMember(member)"
					>
						<text class="family-option-name">{{ member.name }}</text>
						<text class="family-option-tag" v-if="member.isSelf">本人</text>
						<text class="family-option-tag view-tag" v-else>查看</text>
						<text class="family-option-check" v-if="member.id === currentMemberId">✓</text>
					</view>
				</view>
			</view>
		</view>

		<!-- AI健康数据分析区域 -->
		<view class="ai-analysis-card">
			<view class="ai-header">
				<view class="ai-title-row">
					<text class="ai-icon">🤖</text>
					<text class="ai-title">AI健康分析</text>
				</view>
				<view class="ai-share-btn" @click="handleShare">
					<text class="share-icon">↗</text>
					<text class="share-text">分享</text>
				</view>
			</view>
			<view class="ai-content">
				<text class="ai-summary">{{ aiAnalysis.summary }}</text>
				<view class="ai-suggestions" v-if="aiAnalysis.suggestions && aiAnalysis.suggestions.length">
					<view class="ai-suggestion-item" v-for="(tip, idx) in aiAnalysis.suggestions" :key="idx">
						<view class="suggestion-dot"></view>
						<text class="suggestion-text">{{ tip }}</text>
					</view>
				</view>
			</view>
			<view class="ai-footer">
				<text class="ai-disclaimer">数据仅供参考，如有不适请及时就医</text>
				<text class="ai-time">{{ aiAnalysis.updateTime }}</text>
			</view>
		</view>

		<view class="page">

			<!-- 顶部切换 -->
			<view class="tab-wrap">
				<view
					class="tab-item"
					:class="{ active: currentTab === 0 }"
					@click="changeTab(0)"
				>
					身体数据
				</view>

				<view
					class="tab-item"
					:class="{ active: currentTab === 1 }"
					@click="changeTab(1)"
				>
					病历详情
				</view>
			</view>

			<!-- 身体数据内容 -->
			<view v-if="currentTab === 0">
				<view class="card">
					<view class="card-head">
						<text class="title">核心健康数据</text>
						<text class="date">更新时间：{{updateTime}}</text>
					</view>

					<!-- 体态肥胖类 -->
					<view class="group-title-row">
						<text class="group-title">体态</text>
						<text class="group-edit" v-if="isSelf" @click="toggleEdit('bodyShape')">
							{{ editMode.bodyShape ? '完成' : '编辑' }}
						</text>
					</view>
					<view class="list-item" v-for="(item, i) in bodyShape" :key="i">
						<text class="name">{{item.name}}</text>
						<view class="right">
							<text class="val">{{item.value}}</text>
							<text class="unit">{{item.unit}}</text>
							<text class="tag green">{{item.status}}</text>
							<text class="edit-btn" v-if="isSelf && editMode.bodyShape" @click="goEdit('bodyShape',i)">修改</text>
						</view>
					</view>

					<!-- 生命体征类 -->
					<view class="group-title-row">
						<text class="group-title">生命体征</text>
						<text class="group-edit" v-if="isSelf" @click="toggleEdit('vitalSigns')">
							{{ editMode.vitalSigns ? '完成' : '编辑' }}
						</text>
					</view>
					<view class="list-item" v-for="(item, i) in vitalSigns" :key="i">
						<text class="name">{{item.name}}</text>
						<view class="right">
							<text class="val">{{item.value}}</text>
							<text class="unit">{{item.unit}}</text>
							<text class="tag green">{{item.status}}</text>
							<text class="edit-btn" v-if="isSelf && editMode.vitalSigns" @click="goEdit('vitalSigns',i)">修改</text>
						</view>
					</view>

					<!-- 居家生化类 -->
					<view class="group-title-row">
						<text class="group-title">生化</text>
						<text class="group-edit" v-if="isSelf" @click="toggleEdit('biochemistry')">
							{{ editMode.biochemistry ? '完成' : '编辑' }}
						</text>
					</view>
					<view class="list-item" v-for="(item, i) in biochemistry" :key="i">
						<text class="name">{{item.name}}</text>
						<view class="right">
							<text class="val">{{item.value}}</text>
							<text class="unit">{{item.unit}}</text>
							<text class="tag green">{{item.status}}</text>
							<text class="edit-btn" v-if="isSelf && editMode.biochemistry" @click="goEdit('biochemistry',i)">修改</text>
						</view>
					</view>

					<!-- 睡眠精力类 -->
					<view class="group-title-row">
						<text class="group-title">睡眠精力</text>
						<text class="group-edit" v-if="isSelf" @click="toggleEdit('sleepEnergy')">
							{{ editMode.sleepEnergy ? '完成' : '编辑' }}
						</text>
					</view>
					<view class="list-item" v-for="(item, i) in sleepEnergy" :key="i">
						<text class="name">{{item.name}}</text>
						<view class="right">
							<text class="val">{{item.value}}</text>
							<text class="unit">{{item.unit}}</text>
							<text class="tag green">{{item.status}}</text>
							<text class="edit-btn" v-if="isSelf && editMode.sleepEnergy" @click="goEdit('sleepEnergy',i)">修改</text>
						</view>
					</view>

					<!-- 生活习惯类 -->
					<view class="group-title-row">
						<text class="group-title">生活习惯</text>
						<text class="group-edit" v-if="isSelf" @click="toggleEdit('lifestyle')">
							{{ editMode.lifestyle ? '完成' : '编辑' }}
						</text>
					</view>
					<view class="list-item" v-for="(item, i) in lifestyle" :key="i">
						<text class="name">{{item.name}}</text>
						<view class="right">
							<text class="val">{{item.value}}</text>
							<text class="unit">{{item.unit}}</text>
							<text class="tag green">{{item.status}}</text>
							<text class="edit-btn" v-if="isSelf && editMode.lifestyle" @click="goEdit('lifestyle',i)">修改</text>
						</view>
					</view>

					<!-- 主观症状类 -->
					<view class="group-title-row">
						<text class="group-title">主观症状自评</text>
						<text class="group-edit" v-if="isSelf" @click="toggleEdit('symptom')">
							{{ editMode.symptom ? '完成' : '编辑' }}
						</text>
					</view>
					<view class="list-item" v-for="(item, i) in symptom" :key="i">
						<text class="name">{{item.name}}</text>
						<view class="right">
							<text class="val">{{item.value}}</text>
							<text class="unit">{{item.unit}}</text>
							<text class="tag green">{{item.status}}</text>
							<text class="edit-btn" v-if="isSelf && editMode.symptom" @click="goEdit('symptom',i)">修改</text>
						</view>
					</view>
				</view>

				<!-- 趋势 -->
				<view class="card">
					<view class="title">体检指标趋势</view>
					<view class="chart-box">
						<view class="line one"></view>
						<view class="line two"></view>
						<view class="line three"></view>
					</view>
				</view>

				<!-- 摘要 -->
				<view class="card">
					<view class="title">健康状况总结</view>
					<text class="desc">{{healthSummary}}</text>
				</view>
				
				<view class="asitotal">
					<pinfen 
						:categories="['睡眠', '情绪', '运动', '饮食', '心率']"
						:scoreData="[100, 100, 100, 100, 100]"
					/>
				</view>
			</view>

			<!-- 病历详情内容 -->
			<view v-if="currentTab === 1">
				<view
					class="card"
					v-for="(item,index) in records"
					:key="index"
				>
					<view style="display:flex;justify-content:space-between;">
						<view class="title">就诊信息</view>
						<view class="detail-btn" @click="toggle(index)">
							{{ item.open ? '收起' : '详情' }}
						</view>
					</view>

					<view class="hospital">
						<text class="hos-name">{{item.hospital}}</text>
						<text class="tag green">门诊</text>
					</view>

					<text class="sub">就诊日期：{{item.date}}</text>
					<text class="sub">科室：{{item.dept}}　医生：{{item.doctor}}</text>

					<view v-if="item.open">
						<view class="card mini-card">
							<view class="title">主诉</view>
							<text class="desc">{{item.reason}}</text>
						</view>

						<view class="card mini-card">
							<view class="title">诊断结果</view>
							<text class="big-text">{{item.disease}}</text>
						</view>

						<view class="card mini-card">
							<view class="title">医生建议</view>
							<view class="li">• {{item.advice}}</view>
						</view>
					</view>						
				</view>
			</view>
			
			<view class="bottom-space"></view>
		</view>	
		
	</view>
</template>

<script>
export default {
	data() {
		return {
			currentTab: 0,
			updateTime: '2026/04/25',
			healthSummary: '整体健康状况良好，请继续保持良好作息与运动习惯。',
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
					hospital:'上海第一人民医院',
					date:'2026/04/25',
					disease:'上呼吸道感染',
					doctor:'王医生',
					dept:'内科',
					reason:'持续咳嗽',
					advice:'多休息，多喝温水',
					open:false
				},
				{
					hospital:'西安军医医院',
					date:'2026/03/20',
					disease:'胃炎',
					doctor:'刘医生',
					dept:'消化科',
					reason:'胃部疼痛，反酸',
					advice:'清淡饮食，规律进餐',
					open:false
				}
			],
			familyMembers: [
				{ id: '1', name: '林小雨', isSelf: true },
				{ id: '2', name: '林建国', isSelf: false },
				{ id: '3', name: '陈秀英', isSelf: false },
				{ id: '4', name: '林小宇', isSelf: false }
			],
			currentMemberId: '1',
			familyDropdownVisible: false,
			aiAnalysis: {
				summary: '本周各项指标均在正常范围内，睡眠质量与运动频率稳定。饮食结构较为均衡，情绪状态良好。心率监测无异常波动，整体健康风险较低。',
				suggestions: [
					'建议每周增加一次有氧运动，提升心肺功能',
					'睡前可适当减少饮水，避免夜醒影响深睡眠',
					'增加绿叶蔬菜摄入量，维持维生素均衡'
				],
				updateTime: '2026年5月13日 更新'
			}
		}
	},
	computed: {
		currentMemberName() {
			const member = this.familyMembers.find(m => m.id === this.currentMemberId);
			return member ? member.name : '林小雨';
		},
		isSelf() {
			const member = this.familyMembers.find(m => m.id === this.currentMemberId);
			return member ? member.isSelf : true;
		}
	},
	onLoad() {
		this.getHealthDataFromHttp()
	},
	methods: {
		async getHealthDataFromHttp() {
			this.bodyShape = [
				{ name: '身高', value: '', unit: 'cm', status: '正常' },
				{ name: '体重', value: '', unit: 'kg', status: '正常' },
				{ name: 'BMI', value: '', unit: '', status: '正常' },
				{ name: '腰围', value: '', unit: 'cm', status: '正常' },
				{ name: '腰臀比', value: '', unit: '', status: '正常' },
				{ name: '体脂率', value: '', unit: '%', status: '正常' }
			]
			this.vitalSigns = [
				{ name: '静息血压', value: '', unit: 'mmHg', status: '正常' },
				{ name: '静息心率', value: '', unit: '次/分', status: '正常' },
				{ name: '血氧饱和度', value: '', unit: '%', status: '正常' },
				{ name: '基础体温', value: '', unit: '℃', status: '正常' }
			]
			this.biochemistry = [
				{ name: '空腹血糖', value: '', unit: 'mmol/L', status: '正常' },
				{ name: '尿酸', value: '', unit: 'μmol/L', status: '正常' },
				{ name: '总胆固醇', value: '', unit: 'mmol/L', status: '正常' },
				{ name: '尿常规', value: '', unit: '', status: '正常' }
			]
			this.sleepEnergy = [
				{ name: '每日睡眠时长', value: '', unit: '小时', status: '正常' },
				{ name: '入睡时间', value: '', unit: '', status: '正常' },
				{ name: '深睡眠占比', value: '', unit: '%', status: '正常' },
				{ name: '日间疲惫程度', value: '', unit: '', status: '正常' }
			]
			this.lifestyle = [
				{ name: '每周运动次数', value: '', unit: '次', status: '正常' },
				{ name: '单次运动时长', value: '', unit: '分钟', status: '正常' },
				{ name: '吸烟量', value: '', unit: '', status: '正常' },
				{ name: '饮酒频率', value: '', unit: '', status: '正常' },
				{ name: '每日饮水量', value: '', unit: 'ml', status: '正常' },
				{ name: '三餐规律度', value: '', unit: '', status: '正常' }
			]
			this.symptom = [
				{ name: '头晕/心慌/胸闷', value: '', unit: '', status: '正常' },
				{ name: '颈肩腰关节疼痛', value: '', unit: '', status: '正常' },
				{ name: '失眠/多梦/肠胃不适', value: '', unit: '', status: '正常' },
				{ name: '情绪焦虑、低落易怒', value: '', unit: '', status: '正常' }
			]
		},
		toggleEdit(type) {
			if (!this.isSelf) return;
			this.editMode[type] = !this.editMode[type]
		},
		goEdit(type, index) {
			if (!this.isSelf) return;
			uni.showToast({
				title: '修改：' + this[type][index].name,
				icon: 'none'
			})
		},
		changeTab(index) {
			this.currentTab = index
		},
		swiperChange(e) {
			// 保留兼容，但不再使用swiper
		},
		toggle(index) {
			this.records[index].open = !this.records[index].open
		},
		toggleFamilyDropdown() {
			this.familyDropdownVisible = !this.familyDropdownVisible;
		},
		selectFamilyMember(member) {
			this.familyDropdownVisible = false;
			if (member.id === this.currentMemberId) return;
			this.currentMemberId = member.id;
			this.getHealthDataFromHttp();
			this.$emit('memberChanged', member);
		},
		handleShare() {
			const shareData = {
				title: 'AI健康分析',
				summary: this.aiAnalysis.summary,
				memberName: this.currentMemberName
			};
			this.$emit('shareAnalysis', shareData);
			
			// #ifdef MP-WEIXIN
			uni.share({
				provider: 'weixin',
				scene: 'WXSceneSession',
				type: 0,
				title: `${this.currentMemberName}的健康分析`,
				summary: this.aiAnalysis.summary.substring(0, 100),
				success: (res) => {
					console.log('分享成功', res);
				},
				fail: (err) => {
					console.log('分享失败', err);
				}
			});
			// #endif
			
			// #ifdef H5
			uni.showToast({
				title: '已复制分享链接',
				icon: 'success',
				duration: 1500
			});
			// #endif
		}
	}
}
</script>

<style>
page{
	background:#f7f8f6;
}
.page-wrap{
	padding:24rpx;
}
.user-card{
	background:#fff;
	border-radius:28rpx;
	padding:24rpx;
	display:flex;
	align-items:center;
	margin-bottom:24rpx;
	box-shadow:0 8rpx 20rpx rgba(0,0,0,.03);
}
.user-avatar{
	width:96rpx;
	height:96rpx;
	border-radius:50%;
	background:#eee;
	margin-right:20rpx;
}
.user-info{
	flex:1;
}
.user-name{
	font-size:34rpx;
	font-weight:bold;
	color:#222;
}
.user-desc{
	font-size:24rpx;
	color:#888;
	margin-top:10rpx;
}

/* 家庭组下拉菜单 */
.family-switch {
	position: relative;
	margin-left: 16rpx;
	z-index: 100;
}
.family-current {
	display: flex;
	align-items: center;
	padding: 10rpx 20rpx;
	background-color: #f0faf3;
	border: 2rpx solid #d4edda;
	border-radius: 30rpx;
}
.family-current:active {
	background-color: #e8f6ec;
}
.family-name {
	font-size: 24rpx;
	color: #333;
	font-weight: 500;
	margin-right: 6rpx;
	white-space: nowrap;
}
.family-arrow {
	font-size: 18rpx;
	color: #6fb682;
	transition: transform 0.25s;
}
.arrow-up {
	transform: rotate(180deg);
}
.family-dropdown {
	position: absolute;
	top: calc(100% + 8rpx);
	right: 0;
	min-width: 230rpx;        /* 加宽可容纳四字姓名 */
	background: #fff;
	border-radius: 16rpx;
	box-shadow: 0 12rpx 32rpx rgba(0,0,0,0.12);
	overflow: hidden;
	animation: fadeInDown 0.2s ease;
}
.family-option {
	display: flex;
	align-items: center;
	padding: 18rpx 24rpx;
	font-size: 26rpx;
	color: #333;
	border-bottom: 1rpx solid #f5f5f5;
}
.family-option:last-child {
	border-bottom: none;
}
.family-option:active {
	background-color: #f0faf3;
}
.family-option.is-active {
	background-color: #e8f6ec;
	color: #2d8a4e;
}
.family-option-name {
	flex: 1;
}
.family-option-tag {
	font-size: 20rpx;
	color: #6fb682;
	background: #e8f6ec;
	padding: 4rpx 12rpx;
	border-radius: 20rpx;
	margin-left: 10rpx;
}
.view-tag {
	color: #888;
	background: #f5f5f5;
}
.family-option-check {
	font-size: 22rpx;
	color: #2d8a4e;
	margin-left: 10rpx;
	font-weight: 600;
}

/* AI分析卡片 */
.ai-analysis-card {
	background: linear-gradient(135deg, #f8fdf9 0%, #f0faf3 100%);
	border-radius: 24rpx;
	padding: 24rpx;
	margin-bottom: 24rpx;
	border: 2rpx solid #e0f0e4;
	box-shadow: 0 8rpx 20rpx rgba(0,0,0,.03);
}
.ai-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 16rpx;
}
.ai-title-row {
	display: flex;
	align-items: center;
}
.ai-icon {
	font-size: 34rpx;
	margin-right: 10rpx;
}
.ai-title {
	font-size: 30rpx;
	font-weight: 600;
	color: #2d8a4e;
}
.ai-share-btn {
	display: flex;
	align-items: center;
	padding: 10rpx 22rpx;
	background-color: #6fb682;
	border-radius: 30rpx;
}
.ai-share-btn:active {
	background-color: #5da571;
	transform: scale(0.96);
}
.share-icon {
	font-size: 22rpx;
	color: #fff;
	margin-right: 6rpx;
}
.share-text {
	font-size: 22rpx;
	color: #fff;
	font-weight: 500;
}
.ai-content {
	margin-bottom: 14rpx;
}
.ai-summary {
	font-size: 28rpx;
	color: #444;
	line-height: 1.7;
}
.ai-suggestions {
	margin-top: 16rpx;
	padding-top: 14rpx;
	border-top: 1rpx dashed #d4edda;
}
.ai-suggestion-item {
	display: flex;
	align-items: flex-start;
	margin-top: 10rpx;
}
.suggestion-dot {
	width: 10rpx;
	height: 10rpx;
	min-width: 10rpx;
	border-radius: 50%;
	background-color: #6fb682;
	margin-top: 12rpx;
	margin-right: 12rpx;
}
.suggestion-text {
	font-size: 26rpx;
	color: #555;
	line-height: 1.6;
}
.ai-footer {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-top: 12rpx;
	border-top: 1rpx solid #e0f0e4;
}
.ai-disclaimer {
	font-size: 20rpx;
	color: #aaa;
}
.ai-time {
	font-size: 20rpx;
	color: #bbb;
}

/* 顶部切换 */
.tab-wrap{
	display:flex;
	background:#fff;
	border-radius:26rpx;
	padding:8rpx;
	margin-bottom:24rpx;
	box-shadow:0 8rpx 20rpx rgba(0,0,0,.03);
}
.tab-item{
	flex:1;
	text-align:center;
	padding:22rpx 0;
	font-size:30rpx;
	color:#777;
}
.active{
	color:#24b35a;
	font-weight:bold;
	border-bottom:4rpx solid #24b35a;
}

/* 卡片通用 */
.card{
	background:#fff;
	border-radius:28rpx;
	padding:28rpx;
	margin-bottom:24rpx;
	box-shadow:0 8rpx 20rpx rgba(0,0,0,.03);
}
.mini-card{
	margin-top:20rpx;
	background:#fafafa;
	box-shadow:none;
}
.card-head{
	display:flex;
	justify-content:space-between;
	align-items:center;
	margin-bottom:20rpx;
}
.title{
	font-size:32rpx;
	font-weight:bold;
	color:#222;
}
.date,.sub{
	font-size:24rpx;
	color:#888;
}
.desc{
	font-size:28rpx;
	color:#555;
	line-height:44rpx;
}
.group-title-row{
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 30rpx 0 16rpx;
}
.group-title-row:first-child{
	margin-top:0;
}
.group-title{
	font-size:26rpx;
	color:#24b35a;
	font-weight:bold;
}
.group-edit{
	font-size:24rpx;
	color:#4a8cff;
	padding: 4rpx 10rpx;
}
.list-item{
	display:flex;
	justify-content:space-between;
	align-items:center;
	padding:24rpx 0;
	border-bottom:1rpx solid #f0f0f0;
}
.list-item:last-child{
	border-bottom:none;
}
.list-item .name{
	font-size:28rpx;
	color:#333;
	flex:1;
}
.list-item .right{
	display:flex;
	align-items:center;
	gap:12rpx;
}
.list-item .val{
	font-size:28rpx;
	font-weight:bold;
	color:#222;
}
.list-item .unit{
	font-size:22rpx;
	color:#888;
}
.tag{
	padding:6rpx 14rpx;
	border-radius:999rpx;
	font-size:22rpx;
}
.green{
	background:#e8f8ee;
	color:#24b35a;
}
.edit-btn{
	font-size:24rpx;
	color:#4a8cff;
	padding:4rpx 10rpx;
}
.chart-box{
	height:260rpx;
	background:#fafafa;
	border-radius:20rpx;
	position:relative;
	overflow:hidden;
	margin-top:20rpx;
}
.line{
	position:absolute;
	left:30rpx;
	right:30rpx;
	height:4rpx;
	border-radius:20rpx;
}
.one{
	top:80rpx;
	background:#4a8cff;
	transform:rotate(-8deg);
}
.two{
	top:140rpx;
	background:#24b35a;
	transform:rotate(2deg);
}
.three{
	top:200rpx;
	background:#8f5cff;
	transform:rotate(-2deg);
}
.hospital{
	display:flex;
	justify-content:space-between;
	align-items:center;
	margin-top:20rpx;
	margin-bottom:14rpx;
}
.hos-name{
	font-size:34rpx;
	font-weight:bold;
	color:#222;
}
.big-text{
	font-size:36rpx;
	font-weight:bold;
	margin-top:12rpx;
	color:#222;
}
.li{
	font-size:28rpx;
	color:#555;
	line-height:46rpx;
}
.detail-btn{
	color:#24b35a;
	font-size:28rpx;
}
.bottom-space{
	height: 190rpx;
}
.asitotal{
	display: flex;
	min-height: 100vh;
	width: 725rpx;
}
.asititle{
	margin-top: 40rpx;
	font-size: 36rpx;
	font-weight: 600;
}

@keyframes fadeInDown {
	from { opacity: 0; transform: translateY(-10rpx); }
	to { opacity: 1; transform: translateY(0); }
}
</style>