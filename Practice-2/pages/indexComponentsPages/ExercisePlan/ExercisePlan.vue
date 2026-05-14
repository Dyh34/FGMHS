<template>

	<view class="page">

		<!-- 顶部 -->
		<view class="header">

			<view class="header-title">
				运动计划
			</view>

			<view class="header-desc">
				保持规律运动 · 提升每日活力
			</view>

		</view>



		<!-- 今日运动 -->
		<view class="today-card">

			<view class="card-top">

				<view>
					<view class="card-title">
						今日目标
					</view>

					<view class="card-subtitle">
						已完成 65%
					</view>
				</view>

				<view class="step-circle">
					6500
				</view>

			</view>



			<!-- 进度 -->
			<view class="progress-bg">

				<view class="progress-inner"></view>

			</view>



			<!-- 数据 -->
			<view class="data-row">

				<view class="data-item">

					<view class="data-value">
						5.2km
					</view>

					<view class="data-label">
						运动距离
					</view>

				</view>

				<view class="data-item">

					<view class="data-value">
						420
					</view>

					<view class="data-label">
						消耗卡路里
					</view>

				</view>

				<view class="data-item">

					<view class="data-value">
						48min
					</view>

					<view class="data-label">
						运动时长
					</view>

				</view>

			</view>

		</view>



		<!-- 本周计划 -->
		<view class="section-card">

			<view class="section-title">
				本周计划
			</view>



			<view
				class="plan-item"
				v-for="(item,index) in weekPlan"
				:key="index"
			>

				<view class="plan-left">

					<view class="plan-icon">
						{{ item.icon }}
					</view>

					<view>

						<view class="plan-name">
							{{ item.name }}
						</view>

						<view class="plan-desc">
							{{ item.desc }}
						</view>

					</view>

				</view>



				<view
					class="plan-tag"
					:class="item.done ? 'done-tag' : 'wait-tag'"
				>

					{{ item.done ? '已完成' : '待完成' }}

				</view>

			</view>

		</view>



		<!-- 推荐训练 -->
		<view class="section-card">

			<view class="section-title">
				推荐训练
			</view>



			<scroll-view
				scroll-x
				class="train-scroll"
			>

				<view class="train-row">

					<view
						class="train-card"
						v-for="(item,index) in trainList"
						:key="index"
					>

						<view class="train-icon">
							{{ item.icon }}
						</view>

						<view class="train-name">
							{{ item.name }}
						</view>

						<view class="train-time">
							{{ item.time }}
						</view>

					</view>

				</view>

			</scroll-view>

		</view>



		<!-- AI建议 -->
		<view class="ai-card">

			<view class="ai-title">
				AI运动建议
			</view>

			<view class="ai-content">

				根据最近睡眠与心率情况，
				建议本周减少高强度训练，
				适当增加慢跑与拉伸。

			</view>

		</view>



		<!-- 底部按钮 -->
		<view
			class="start-btn"
			@click="startSport"
		>
			开始今日运动
		</view>

	</view>

</template>

<script setup>



const weekPlan = [

	{
		icon:'🏃',
		name:'晨跑',
		desc:'30分钟慢跑',
		done:true
	},

	{
		icon:'🧘',
		name:'拉伸训练',
		desc:'腰背舒缓训练',
		done:false
	},

	{
		icon:'🚴',
		name:'骑行',
		desc:'8公里骑行',
		done:false
	}

]



const trainList = [

	{
		icon:'🔥',
		name:'燃脂训练',
		time:'20分钟'
	},

	{
		icon:'💪',
		name:'力量训练',
		time:'35分钟'
	},

	{
		icon:'🧘',
		name:'瑜伽放松',
		time:'25分钟'
	}

]



function startSport(){

	uni.showToast({

		title:'运动开始',

		icon:'success'

	})

}

</script>

<style lang="scss">

.page{

	min-height:100vh;

	background:#f7f8fa;

	padding:30rpx;

	padding-bottom:60rpx;

	box-sizing:border-box;

}



/* 顶部 */

.header{

	margin-top:40rpx;

	margin-bottom:30rpx;

}



.header-title{

	font-size:52rpx;

	font-weight:bold;

	color:#222;

}



.header-desc{

	margin-top:14rpx;

	font-size:26rpx;

	color:#888;

}



/* 今日卡片 */

.today-card{

	background:#eef8f1;

	border-radius:34rpx;

	padding:34rpx;

}



.card-top{

	display:flex;

	align-items:center;

	justify-content:space-between;

}



.card-title{

	font-size:34rpx;

	font-weight:bold;

	color:#222;

}



.card-subtitle{

	margin-top:12rpx;

	font-size:24rpx;

	color:#666;

}



/* 圆 */

.step-circle{

	width:140rpx;

	height:140rpx;

	border-radius:50%;

	background:white;

	display:flex;

	align-items:center;

	justify-content:center;

	font-size:34rpx;

	font-weight:bold;

	color:#5ebf7b;

}



/* 进度 */

.progress-bg{

	height:16rpx;

	background:#dbeedf;

	border-radius:20rpx;

	margin-top:34rpx;

	overflow:hidden;

}



.progress-inner{

	width:65%;

	height:100%;

	background:#8ed6a3;

	border-radius:20rpx;

}



/* 数据 */

.data-row{

	display:flex;

	justify-content:space-between;

	margin-top:34rpx;

}



.data-item{

	flex:1;

	text-align:center;

}



.data-value{

	font-size:34rpx;

	font-weight:bold;

	color:#222;

}



.data-label{

	margin-top:10rpx;

	font-size:22rpx;

	color:#888;

}



/* 区块 */

.section-card{

	margin-top:30rpx;

	background:white;

	border-radius:34rpx;

	padding:30rpx;

}



.section-title{

	font-size:34rpx;

	font-weight:bold;

	color:#222;

	margin-bottom:24rpx;

}



/* 计划 */

.plan-item{

	display:flex;

	align-items:center;

	justify-content:space-between;

	padding:24rpx 0;

	border-bottom:1rpx solid #f3f3f3;

}



.plan-item:last-child{

	border:none;

}



.plan-left{

	display:flex;

	align-items:center;

}



.plan-icon{

	width:84rpx;

	height:84rpx;

	border-radius:24rpx;

	background:#f4faf5;

	display:flex;

	align-items:center;

	justify-content:center;

	font-size:40rpx;

	margin-right:20rpx;

}



.plan-name{

	font-size:30rpx;

	font-weight:bold;

	color:#222;

}



.plan-desc{

	margin-top:8rpx;

	font-size:24rpx;

	color:#888;

}



/* tag */

.plan-tag{

	padding:10rpx 20rpx;

	border-radius:18rpx;

	font-size:22rpx;

}



.done-tag{

	background:#edf8f0;

	color:#5ebf7b;

}



.wait-tag{

	background:#f4f4f4;

	color:#888;

}



/* 推荐训练 */

.train-scroll{

	white-space:nowrap;

}



.train-row{

	display:flex;

}



.train-card{

	width:240rpx;

	background:#f8faf8;

	border-radius:30rpx;

	padding:28rpx;

	margin-right:20rpx;

	box-sizing:border-box;

}



.train-icon{

	font-size:52rpx;

}



.train-name{

	margin-top:20rpx;

	font-size:30rpx;

	font-weight:bold;

	color:#222;

}



.train-time{

	margin-top:10rpx;

	font-size:24rpx;

	color:#888;

}



/* AI建议 */

.ai-card{

	margin-top:30rpx;

	background:#f2f8f4;

	border-radius:34rpx;

	padding:32rpx;

}



.ai-title{

	font-size:32rpx;

	font-weight:bold;

	color:#222;

}



.ai-content{

	margin-top:16rpx;

	font-size:28rpx;

	line-height:44rpx;

	color:#666;

}



/* 按钮 */

.start-btn{

	height:92rpx;

	background:#8ed6a3;

	border-radius:28rpx;

	display:flex;

	align-items:center;

	justify-content:center;

	color:white;

	font-size:32rpx;

	font-weight:bold;

	margin-top:40rpx;

}

</style>