<template>
	<view class="page">

		<!-- 顶部背景 -->
		<view class="header">

			<view class="header-title">
				家庭医生
			</view>

			<view class="header-desc">
				AI健康咨询 + 真人医生服务
			</view>

		</view>



		<!-- AI医生 -->
		<view class="card">

			<view class="card-top">

				<view>
					<view class="card-title">
						AI家庭医生
					</view>

					<view class="card-subtitle">
						24小时在线智能问诊
					</view>
				</view>

				<view class="tag green">
					免费
				</view>

			</view>

			<view class="feature-list">

				<view class="feature-item">
					✓ AI导诊
				</view>

				<view class="feature-item">
					✓ 症状分析
				</view>

				<view class="feature-item">
					✓ 用药建议
				</view>

			</view>

			<view
				class="main-btn green-bg"
				@click="goAI"
			>
				立即咨询
			</view>

		</view>



		<!-- 真人医生 -->
		<view class="card">

			<view class="card-top">

				<view>
					<view class="card-title">
						真人家庭医生
					</view>

					<view class="card-subtitle">
						全家庭共享医疗服务
					</view>
				</view>

				<view class="tag orange">
					VIP
				</view>

			</view>



			<!-- 医生信息 -->
			<view class="doctor-box">

				<!-- 
					这里替换医生头像
					把图片放到：
					/static/avatar/doctor.png
				-->
				<image
					src="/static/avatar/doctor.png"
					class="doctor-avatar"
				></image>

				<view class="doctor-info">

					<view class="doctor-name">
						张医生
					</view>

					<view class="doctor-job">
						主任医师 · 全科医学
					</view>

					<view class="doctor-score">
						⭐ 4.9 ｜ 服务 328 家庭
					</view>

				</view>

			</view>



			<!-- 服务 -->
			<view class="service-grid">

				<view class="service-item">
					图文问诊
				</view>

				<view class="service-item">
					电话咨询
				</view>

				<view class="service-item">
					健康随访
				</view>

				<view class="service-item">
					家庭共享
				</view>

			</view>



			<!-- 价格 -->
			<view class="price-box">

				<view class="price">
					¥199
				</view>

				<view class="price-text">
					/月 · 家庭共享
				</view>

			</view>



			<view
				class="main-btn orange-bg"
				@click="buyDoctor"
			>
				立即开通
			</view>

		</view>



		<!-- 更多服务 -->
		<view class="section">

			<view class="section-title">
				健康服务
			</view>

			<view class="tool-grid">

				<view class="tool-item">
					<view class="tool-icon">
						💊
					</view>

					<view class="tool-text">
						用药提醒
					</view>
				</view>

				<view class="tool-item">
					<view class="tool-icon">
						📄
					</view>

					<view class="tool-text">
						病历管理
					</view>
				</view>

				<view class="tool-item">
					<view class="tool-icon">
						📈
					</view>

					<view class="tool-text">
						健康趋势
					</view>
				</view>

				<view class="tool-item">
					<view class="tool-icon">
						🩺
					</view>

					<view class="tool-text">
						体检分析
					</view>
				</view>

				<view class="tool-item">
					<view class="tool-icon">
						👨‍👩‍👧
					</view>

					<view class="tool-text">
						家庭共享
					</view>
				</view>

				<view class="tool-item">
					<view class="tool-icon">
						🚑
					</view>

					<view class="tool-text">
						紧急联系
					</view>
				</view>

			</view>

		</view>



		<!-- 最近记录 -->
		<view class="section">

			<view class="section-title">
				最近服务
			</view>

			<view class="record-card">

				<view class="record-top">

					<view class="record-title">
						AI导诊记录
					</view>

					<view class="record-time">
						今天 14:32
					</view>

				</view>

				<view class="record-content">
					近期睡眠不足，建议规律作息并减少熬夜。
				</view>

			</view>



			<view class="record-card">

				<view class="record-top">

					<view class="record-title">
						家庭医生随访
					</view>

					<view class="record-time">
						昨天
					</view>

				</view>

				<view class="record-content">
					提醒父亲按时测量血压并上传健康数据。
				</view>

			</view>

		</view>

	</view>
</template>

<script setup>



// 跳转AI导诊页面
function goAI(){

	uni.navigateTo({

		/*
			这里替换成你的AI导诊页面路径
		*/
		url:'/pages/ai/ai'

	})

}



// 开通家庭医生
function buyDoctor(){

	uni.showModal({

		title:'家庭医生服务',

		content:'是否开通家庭共享医生服务？',

		success(res){

			if(res.confirm){

				/*
					这里调用支付接口
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

.header{

	padding:60rpx 36rpx 50rpx;

	background:linear-gradient(
		135deg,
		#6dd27c,
		#49b96e
	);

	border-bottom-left-radius:40rpx;

	border-bottom-right-radius:40rpx;

	color:white;

}



.header-title{

	font-size:48rpx;

	font-weight:bold;

}



.header-desc{

	margin-top:14rpx;

	font-size:26rpx;

	opacity:0.9;

}



/* 卡片 */

.card{

	margin:30rpx;

	background:white;

	border-radius:30rpx;

	padding:30rpx;

	box-shadow:0 6rpx 30rpx rgba(0,0,0,0.05);

}



.card-top{

	display:flex;

	align-items:center;

	justify-content:space-between;

}



.card-title{

	font-size:36rpx;

	font-weight:bold;

	color:#222;

}



.card-subtitle{

	margin-top:12rpx;

	font-size:26rpx;

	color:#777;

}



/* 标签 */

.tag{

	padding:10rpx 20rpx;

	border-radius:20rpx;

	font-size:22rpx;

}



.green{

	background:#e8f8ec;

	color:#4caf50;

}



.orange{

	background:#fff3df;

	color:#ff9800;

}



/* 功能列表 */

.feature-list{

	margin-top:28rpx;

}



.feature-item{

	margin-bottom:16rpx;

	font-size:28rpx;

	color:#555;

}



/* 按钮 */

.main-btn{

	height:88rpx;

	border-radius:24rpx;

	display:flex;

	align-items:center;

	justify-content:center;

	color:white;

	font-size:30rpx;

	font-weight:bold;

	margin-top:30rpx;

}



.green-bg{

	background:#4caf50;

}



.orange-bg{

	background:linear-gradient(
		135deg,
		#ffb74d,
		#ff9800
	);

}



/* 医生信息 */

.doctor-box{

	display:flex;

	align-items:center;

	margin-top:30rpx;

}



.doctor-avatar{

	width:110rpx;

	height:110rpx;

	border-radius:50%;

	margin-right:24rpx;

	background:#eee;

}



.doctor-name{

	font-size:34rpx;

	font-weight:bold;

	color:#222;

}



.doctor-job{

	margin-top:10rpx;

	font-size:24rpx;

	color:#777;

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

	margin-top:30rpx;

}



.service-item{

	background:#f7f8fb;

	border-radius:22rpx;

	padding:24rpx;

	text-align:center;

	font-size:26rpx;

	color:#555;

}



/* 价格 */

.price-box{

	display:flex;

	align-items:flex-end;

	margin-top:30rpx;

}



.price{

	font-size:54rpx;

	font-weight:bold;

	color:#ff9800;

}



.price-text{

	font-size:24rpx;

	color:#888;

	margin-left:14rpx;

	margin-bottom:8rpx;

}



/* section */

.section{

	margin:30rpx;

	background:white;

	border-radius:30rpx;

	padding:30rpx;

	box-shadow:0 6rpx 30rpx rgba(0,0,0,0.04);

}



.section-title{

	font-size:34rpx;

	font-weight:bold;

	color:#222;

	margin-bottom:30rpx;

}



/* 工具 */

.tool-grid{

	display:grid;

	grid-template-columns:repeat(3,1fr);

	gap:24rpx;

}



.tool-item{

	background:#f8f9fc;

	border-radius:24rpx;

	padding:28rpx 0;

	display:flex;

	flex-direction:column;

	align-items:center;

}



.tool-icon{

	font-size:48rpx;

}



.tool-text{

	margin-top:14rpx;

	font-size:24rpx;

	color:#555;

}



/* 最近记录 */

.record-card{

	background:#f8f9fc;

	border-radius:24rpx;

	padding:24rpx;

	margin-bottom:24rpx;

}



.record-top{

	display:flex;

	align-items:center;

	justify-content:space-between;

}



.record-title{

	font-size:28rpx;

	font-weight:bold;

	color:#222;

}



.record-time{

	font-size:22rpx;

	color:#999;

}



.record-content{

	margin-top:16rpx;

	font-size:26rpx;

	color:#666;

	line-height:42rpx;

}

</style>