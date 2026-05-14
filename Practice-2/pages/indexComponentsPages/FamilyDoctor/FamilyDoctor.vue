<template>
	<view class="page">

		<!-- 顶部 -->
		<view class="top-bg">

			<view class="page-title">
				家庭医生
			</view>

			<view class="page-desc">
				智能健康守护 · 真人医生长期服务
			</view>

		</view>



		<!-- AI医生 -->
		<view class="doctor-card ai-card">

			<view class="card-header">

				<view>

					<view class="card-title">
						AI家庭医生
					</view>

					<view class="card-subtitle">
						24小时在线 AI 智能问诊
					</view>

				</view>

				<view class="tag green-tag">
					免费
				</view>

			</view>



			<!-- 功能 -->
			<view class="feature-box">

				<view
					class="feature-item"
					v-for="(item,index) in aiFeatures"
					:key="index"
				>

					<view class="dot"></view>

					<view class="feature-text">
						{{ item }}
					</view>

				</view>

			</view>



			<!-- AI提醒 -->
			<view class="ai-tip-box">

				<view class="tip-title">
					AI今日提醒
				</view>

				<view class="tip-content">
					近期家庭成员睡眠时间偏晚，建议减少熬夜并保持规律作息。
				</view>

			</view>



			<view
				class="main-btn green-btn"
				@click="goAI"
			>
				立即咨询
			</view>

		</view>



		<!-- 我的医生 -->
		<view class="doctor-card">

			<view class="card-header">

				<view>

					<view class="card-title">
						我的医生
					</view>

					<view class="card-subtitle">
						已签约家庭医生
					</view>

				</view>

				<view class="tag green-tag">
					已开通
				</view>

			</view>



			<!-- 医生 -->
			<view class="real-doctor-box">

				<!-- 
					替换头像：
					/static/avatar/mydoctor.png
				-->
				<image
					src="/static/avatar/mydoctor.png"
					class="doctor-avatar"
				></image>

				<view class="doctor-info">

					<view class="doctor-name">
						李医生
					</view>

					<view class="doctor-job">
						主任医师 · 全科医学
					</view>

					<view class="doctor-score">
						⭐ 4.9 ｜ 已服务5年
					</view>

				</view>

			</view>



			<!-- 联系 -->
			<view class="contact-box">

				<view
					class="contact-btn"
					@click="contactDoctor"
				>
					联系医生
				</view>

				<view
					class="contact-btn white-btn"
					@click="doctorDetail"
				>
					医生主页
				</view>

			</view>

		</view>



		<!-- 医生推荐 -->
		<view class="doctor-card">

			<view class="card-header">

				<view>

					<view class="card-title">
						医生推荐
					</view>

					<view class="card-subtitle">
						长期随访 · 在线问诊 · 家庭共享
					</view>

				</view>

				<view class="tag orange-tag">
					VIP
				</view>

			</view>



			<!-- 医生 -->
			<view class="real-doctor-box">

				<!-- 
					替换头像：
					/static/avatar/doctor.png
				-->
				<image
					src="/static/avatar/doctor.png"
					class="doctor-avatar"
				></image>

				<view class="doctor-info">

					<view class="doctor-name">
						张明远 医生
					</view>

					<view class="doctor-job">
						主任医师 · 全科医学
					</view>

					<view class="doctor-score">
						⭐ 4.9 ｜ 已服务328家庭
					</view>

				</view>

			</view>



			<!-- 服务 -->
			<view class="service-grid">

				<view
					class="service-item"
					v-for="(item,index) in doctorServices"
					:key="index"
				>

					<view class="service-icon">
						{{ item.icon }}
					</view>

					<view class="service-name">
						{{ item.name }}
					</view>

				</view>

			</view>



			<!-- 家庭共享 -->
			<view class="family-share-box">

				<view class="family-title">
					家庭共享权益
				</view>

				<view class="family-content">
					家庭成员均可共享医生问诊、健康分析与长期随访服务。
				</view>

			</view>



			<!-- 联系 -->
			<view class="contact-box">

				<view
					class="contact-btn"
					@click="contactDoctor"
				>
					联系医生
				</view>

				<view
					class="contact-btn white-btn"
					@click="moreDoctors"
				>
					查看更多医生
				</view>

			</view>



			<!-- 价格 -->
			<view class="price-box">

				<view class="price-left">

					<view class="price">
						¥199
					</view>

					<view class="price-desc">
						/月
					</view>

				</view>

				<view class="share-tag">
					全家庭共享
				</view>

			</view>



			<view
				class="main-btn orange-btn"
				@click="buyDoctor"
			>
				立即开通
			</view>

		</view>

	</view>
</template>

<script setup>

const aiFeatures = [

	'AI导诊分析',
	'智能健康建议',
	'症状风险提醒',
	'健康趋势分析'

]



const doctorServices = [

	{
		icon:'🩺',
		name:'图文问诊'
	},

	{
		icon:'📞',
		name:'电话咨询'
	},

	{
		icon:'📈',
		name:'长期随访'
	},

	{
		icon:'👨‍👩‍👧',
		name:'家庭共享'
	}

]



/* AI问诊 */

function goAI(){

	/*
		替换AI页面路径
	*/

	uni.navigateTo({

		url:'/pages/ai/ai'

	})

}



/* 联系医生 */

function contactDoctor(){

	uni.showModal({

		title:'联系医生',

		content:'是否联系当前家庭医生？',

		success(res){

			if(res.confirm){

				/*
					这里后续接聊天接口
				*/

				uni.showToast({

					title:'已发送请求',

					icon:'success'

				})

			}

		}

	})

}



/* 医生主页 */

function doctorDetail(){

	uni.navigateTo({

		/*
			替换医生详情页
		*/

		url:'/pages/doctor/detail'

	})

}



/* 更多医生 */

function moreDoctors(){

	uni.navigateTo({

		/*
			替换医生列表页
		*/

		url:'/pages/doctor/list'

	})

}



/* 开通服务 */

function buyDoctor(){

	uni.showModal({

		title:'家庭医生服务',

		content:'是否立即开通家庭共享医生服务？',

		success(res){

			if(res.confirm){

				/*
					支付接口
				*/

				uni.showToast({

					title:'开通成功',

					icon:'success'

				})

			}

		}

	})

}

</script>

<style lang="scss">

.page{

	min-height:100vh;

	background:#f5f7fb;

	padding-bottom:40rpx;

}



/* 顶部 */

.top-bg{

	padding:70rpx 34rpx 120rpx;

	background:linear-gradient(
		135deg,
		#6fd08c,
		#43b96e
	);

	border-bottom-left-radius:40rpx;

	border-bottom-right-radius:40rpx;

}



.page-title{

	font-size:52rpx;

	font-weight:bold;

	color:white;

}



.page-desc{

	margin-top:16rpx;

	font-size:26rpx;

	color:rgba(255,255,255,0.9);

}



/* 卡片 */

.doctor-card{

	margin:0 30rpx 30rpx;

	padding:30rpx;

	background:white;

	border-radius:34rpx;

	box-shadow:0 8rpx 30rpx rgba(0,0,0,0.05);

}



.ai-card{

	margin-top:-70rpx;

}



/* header */

.card-header{

	display:flex;

	align-items:center;

	justify-content:space-between;

}



.card-title{

	font-size:38rpx;

	font-weight:bold;

	color:#222;

}



.card-subtitle{

	margin-top:12rpx;

	font-size:25rpx;

	color:#888;

}



/* tag */

.tag{

	padding:10rpx 20rpx;

	border-radius:20rpx;

	font-size:22rpx;

	font-weight:bold;

}



.green-tag{

	background:#e9f8ec;

	color:#45b96f;

}



.orange-tag{

	background:#fff4e4;

	color:#ff9800;

}



/* feature */

.feature-box{

	margin-top:30rpx;

}



.feature-item{

	display:flex;

	align-items:center;

	margin-bottom:20rpx;

}



.dot{

	width:14rpx;

	height:14rpx;

	border-radius:50%;

	background:#4caf50;

	margin-right:16rpx;

}



.feature-text{

	font-size:28rpx;

	color:#555;

}



/* ai提醒 */

.ai-tip-box{

	margin-top:24rpx;

	padding:24rpx;

	background:#f6fbf7;

	border-radius:24rpx;

}



.tip-title{

	font-size:28rpx;

	font-weight:bold;

	color:#333;

}



.tip-content{

	margin-top:12rpx;

	font-size:26rpx;

	line-height:42rpx;

	color:#666;

}



/* 按钮 */

.main-btn{

	height:88rpx;

	border-radius:24rpx;

	display:flex;

	align-items:center;

	justify-content:center;

	font-size:30rpx;

	font-weight:bold;

	color:white;

	margin-top:30rpx;

}



.green-btn{

	background:#49b96e;

}



.orange-btn{

	background:linear-gradient(
		135deg,
		#ffb84d,
		#ff9800
	);

}



/* 医生 */

.real-doctor-box{

	display:flex;

	align-items:center;

	margin-top:34rpx;

}



.doctor-avatar{

	width:120rpx;

	height:120rpx;

	border-radius:50%;

	background:#eee;

	margin-right:24rpx;

}



.doctor-name{

	font-size:34rpx;

	font-weight:bold;

	color:#222;

}



.doctor-job{

	margin-top:10rpx;

	font-size:24rpx;

	color:#888;

}



.doctor-score{

	margin-top:10rpx;

	font-size:24rpx;

	color:#ff9800;

}



/* 服务 */

.service-grid{

	display:grid;

	grid-template-columns:repeat(2,1fr);

	gap:20rpx;

	margin-top:34rpx;

}



.service-item{

	background:#f8f9fc;

	border-radius:24rpx;

	padding:26rpx;

	display:flex;

	align-items:center;

}



.service-icon{

	font-size:40rpx;

}



.service-name{

	margin-left:16rpx;

	font-size:26rpx;

	color:#555;

}



/* 家庭共享 */

.family-share-box{

	margin-top:30rpx;

	padding:24rpx;

	background:#fff8ef;

	border-radius:24rpx;

}



.family-title{

	font-size:28rpx;

	font-weight:bold;

	color:#ff9800;

}



.family-content{

	margin-top:12rpx;

	font-size:26rpx;

	line-height:42rpx;

	color:#666;

}



/* 联系 */

.contact-box{

	display:flex;

	margin-top:30rpx;

	gap:20rpx;

}



.contact-btn{

	flex:1;

	height:82rpx;

	background:#49b96e;

	border-radius:22rpx;

	display:flex;

	align-items:center;

	justify-content:center;

	color:white;

	font-size:28rpx;

	font-weight:bold;

}



.white-btn{

	background:#f5f7fb;

	color:#555;

}



/* 价格 */

.price-box{

	display:flex;

	align-items:center;

	justify-content:space-between;

	margin-top:30rpx;

}



.price-left{

	display:flex;

	align-items:flex-end;

}



.price{

	font-size:58rpx;

	font-weight:bold;

	color:#ff9800;

}



.price-desc{

	margin-left:10rpx;

	margin-bottom:8rpx;

	font-size:26rpx;

	color:#888;

}



.share-tag{

	padding:10rpx 18rpx;

	background:#fff4e4;

	color:#ff9800;

	border-radius:20rpx;

	font-size:22rpx;

}

</style>