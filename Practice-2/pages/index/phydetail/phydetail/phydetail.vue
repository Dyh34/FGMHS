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

			<!-- 内容 -->
			<swiper
				class="swiper-box"
				:current="currentTab"
				@change="swiperChange"
			>

				<!-- 身体数据 -->
				<swiper-item>
					<scroll-view scroll-y class="scroll-page">

						<!-- 核心体检数据 -->
						<view class="card">

							<view class="card-head">
								<text class="title">核心体检数据</text>
								<text class="date">体检日期：2026/04/25</text>
							</view>

							<view class="grid">

								<view
									class="small-card"
									v-for="(item,index) in showHealthList"
									:key="index"
								>
									<text class="label">{{item.name}}</text>

									<text class="value">{{item.value}}</text>

									<text class="unit">{{item.unit}}</text>

									<text class="tag green">
										{{item.status}}
									</text>
								</view>

							</view>

							<view
								class="more-btn"
								@click="isOpen=!isOpen"
							>
								{{ isOpen ? '收起数据 ↑' : '查看更多数据 ↓' }}
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
							<view class="title">体检报告摘要</view>

							<text class="desc">
								本次体检整体状况良好，各项指标基本正常。
								建议保持运动习惯，规律作息。
							</text>
						</view>

					</scroll-view>
				</swiper-item>

				<!-- 病历 -->
				<swiper-item>
					<scroll-view scroll-y class="scroll-page">

						<view
							class="card"
							v-for="(item,index) in records"
							:key="index"
						>

							<view style="display:flex;justify-content:space-between;">
								<view class="title">就诊信息</view>

								<view
									class="detail-btn"
									@click="toggle(index)"
								>
									{{ item.open ? '收起' : '详情' }}
								</view>
							</view>

							<view class="hospital">
								<text class="hos-name">
									{{item.hospital}}
								</text>

								<text class="tag green">门诊</text>
							</view>

							<text class="sub">
								就诊日期：{{item.date}}
							</text>

							<text class="sub">
								科室：{{item.dept}}　
								医生：{{item.doctor}}
							</text>

							<!-- 展开 -->
							<view v-if="item.open">

								<view class="card mini-card">
									<view class="title">主诉</view>
									<text class="desc">
										{{item.reason}}
									</text>
								</view>

								<view class="card mini-card">
									<view class="title">诊断结果</view>
									<text class="big-text">
										{{item.disease}}
									</text>
								</view>

								<view class="card mini-card">
									<view class="title">医生建议</view>

									<view class="li">
										• {{item.advice}}
									</view>
								</view>

							</view>

						</view>

					</scroll-view>
				</swiper-item>

			</swiper>

		</view>

	</view>
</template>

<script>
export default {
	data() {
		return {
			currentTab: 0,

			isOpen: false,

			healthList: [
				{name:'心率',value:'72',unit:'次/分',status:'正常'},
				{name:'血压',value:'118/76',unit:'mmHg',status:'正常'},
				{name:'血糖',value:'5.2',unit:'mmol/L',status:'正常'},
				{name:'体重',value:'52.3',unit:'kg',status:'正常'},

				{name:'BMI',value:'20.4',unit:'',status:'正常'},
				{name:'尿酸',value:'320',unit:'μmol/L',status:'正常'},
				{name:'血脂',value:'4.2',unit:'mmol/L',status:'正常'},
				{name:'胆固醇',value:'4.8',unit:'mmol/L',status:'正常'},

				{name:'肺功能',value:'96',unit:'%',status:'正常'},
				{name:'血氧',value:'98',unit:'%',status:'正常'},
				{name:'脉搏',value:'70',unit:'次/分',status:'正常'},
				{name:'骨密度',value:'良好',unit:'',status:'正常'},

				{name:'肝功能',value:'正常',unit:'',status:'正常'},
				{name:'肾功能',value:'正常',unit:'',status:'正常'},
				{name:'视力',value:'1.0',unit:'',status:'正常'},
				{name:'甲状腺',value:'正常',unit:'',status:'正常'}
			],

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
			]
		}
	},

	computed:{
		showHealthList(){
			return this.isOpen
				? this.healthList
				: this.healthList.slice(0,4)
		}
	},

	methods:{
		changeTab(index){
			this.currentTab = index
		},

		swiperChange(e){
			this.currentTab = e.detail.current
		},

		toggle(index){
			this.records[index].open =
			!this.records[index].open
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

/* 用户卡片 */
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

/* tab */
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

.swiper-box{
	height:calc(100vh - 280rpx);
}

.scroll-page{
	height:100%;
}

/* 卡片 */
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

/* grid */
.grid{
	display:grid;
	grid-template-columns:repeat(2,1fr);
	grid-gap:20rpx;
}

.small-card{
	background:#f8faf8;
	border-radius:24rpx;
	padding:24rpx;
}

.label{
	display:block;
	font-size:26rpx;
	color:#666;
	margin-bottom:18rpx;
}

.value{
	font-size:48rpx;
	font-weight:bold;
	color:#111;
}

.unit{
	font-size:24rpx;
	color:#777;
	margin-left:8rpx;
}

.tag{
	display:inline-block;
	margin-top:18rpx;
	padding:6rpx 16rpx;
	border-radius:999rpx;
	font-size:22rpx;
}

.green{
	background:#e8f8ee;
	color:#24b35a;
}

.more-btn{
	margin-top:24rpx;
	text-align:center;
	padding:22rpx 0;
	background:#eef8f0;
	color:#24b35a;
	font-size:28rpx;
	border-radius:22rpx;
	font-weight:bold;
}

/* 趋势图 */
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

/* 病历 */
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
</style>