<template>
	<view class="page">

		<!-- 顶部 -->
		<view class="top-bar">

			<view class="group-info">

				<view class="group-name">
					家庭健康群
				</view>

				<view class="group-desc">
					5位成员 · AI医生在线
				</view>

			</view>

			<view
				class="top-btn"
				@click="groupInfo"
			>
				···
			</view>

		</view>



		<!-- 聊天区域 -->
		<scroll-view
			scroll-y
			class="chat-area"
		>

			<!-- 时间 -->
			<view class="time-text">
				今天 14:25
			</view>



			<!-- AI消息 -->
			<view class="message-row left">

				<!-- AI头像 -->
				<image
					src="/static/avatar/ai.png"
					class="avatar"
				></image>

				<view class="message-content">

					<view class="sender-name ai-name">
						AI家庭医生
					</view>

					<view class="message-bubble ai-bubble">

						检测到最近家庭成员普遍睡眠偏晚，
						建议减少熬夜并规律作息。

					</view>

				</view>

			</view>



			<!-- 用户消息 -->
			<view class="message-row right">

				<view class="message-content user-content">

					<view class="sender-name">
						妈妈
					</view>

					<view class="message-bubble user-bubble">

						最近确实睡得比较晚。

					</view>

				</view>

				<image
					src="/static/avatar/user1.png"
					class="avatar"
				></image>

			</view>



			<!-- 医生消息 -->
			<view class="message-row left">

				<image
					src="/static/avatar/doctor.png"
					class="avatar"
				></image>

				<view class="message-content">

					<view class="sender-name doctor-name">
						李医生
					</view>

					<view class="message-bubble doctor-bubble">

						建议晚上11点前休息，
						尤其注意老人的血压变化。

					</view>

				</view>

			</view>



			<!-- 用户 -->
			<view class="message-row right">

				<view class="message-content user-content">

					<view class="sender-name">
						我
					</view>

					<view class="message-bubble user-bubble">

						好的，我会提醒家里人。

					</view>

				</view>

				<image
					src="/static/avatar/user2.png"
					class="avatar"
				></image>

			</view>

		</scroll-view>



		<!-- 底部快捷功能 -->
		<view class="tool-bar">

			<view
				class="tool-btn"
				@click="callAI"
			>
				🤖 AI分析
			</view>

			<view
				class="tool-btn"
				@click="callDoctor"
			>
				🩺 呼叫医生
			</view>

			<view
				class="tool-btn"
				@click="shareReport"
			>
				📄 分享报告
			</view>

		</view>



		<!-- 输入框 -->
		<view class="input-area">

			<view
				class="input-icon"
				@click="chooseImage"
			>
				＋
			</view>

			<input
				class="chat-input"
				placeholder="发送消息..."
			/>

			<view
				class="send-btn"
				@click="sendMessage"
			>
				发送
			</view>

		</view>

	</view>
</template>

<script setup>



/* 群信息 */

function groupInfo(){

	uni.showToast({

		title:'家庭群信息',

		icon:'none'

	})

}



/* AI分析 */

function callAI(){

	uni.showToast({

		title:'AI分析中',

		icon:'none'

	})

}



/* 呼叫医生 */

function callDoctor(){

	uni.showModal({

		title:'呼叫家庭医生',

		content:'是否联系家庭医生进入群聊？',

		success(res){

			if(res.confirm){

				uni.showToast({

					title:'已通知医生',

					icon:'success'

				})

			}

		}

	})

}



/* 分享报告 */

function shareReport(){

	uni.showToast({

		title:'选择健康报告',

		icon:'none'

	})

}



/* 发送 */

function sendMessage(){

	uni.showToast({

		title:'发送成功',

		icon:'success'

	})

}



/* 上传图片 */

function chooseImage(){

	uni.chooseImage({

		count:1

	})

}

</script>

<style lang="scss">

.page{

	height:100vh;

	background:#f5f7fb;

	display:flex;

	flex-direction:column;

}



/* 顶部 */

.top-bar{

	padding:70rpx 30rpx 30rpx;

	background:white;

	display:flex;

	align-items:center;

	justify-content:space-between;

	box-shadow:0 4rpx 20rpx rgba(0,0,0,0.04);

}



.group-name{

	font-size:38rpx;

	font-weight:bold;

	color:#222;

}



.group-desc{

	margin-top:10rpx;

	font-size:24rpx;

	color:#888;

}



.top-btn{

	font-size:42rpx;

	color:#666;

}



/* 聊天区域 */

.chat-area{

	flex:1;

	padding:30rpx;

	box-sizing:border-box;

}



/* 时间 */

.time-text{

	text-align:center;

	font-size:22rpx;

	color:#999;

	margin-bottom:30rpx;

}



/* 消息 */

.message-row{

	display:flex;

	margin-bottom:34rpx;

}



.left{

	justify-content:flex-start;

}



.right{

	justify-content:flex-end;

}



/* 头像 */

.avatar{

	width:84rpx;

	height:84rpx;

	border-radius:50%;

	background:#eee;

}



/* 内容 */

.message-content{

	max-width:520rpx;

	margin-left:20rpx;

}



.user-content{

	margin-left:0;

	margin-right:20rpx;

}



/* 名字 */

.sender-name{

	font-size:22rpx;

	color:#999;

	margin-bottom:10rpx;

}



.ai-name{

	color:#49b96e;

}



.doctor-name{

	color:#ff9800;

}



/* 气泡 */

.message-bubble{

	padding:24rpx;

	border-radius:26rpx;

	font-size:28rpx;

	line-height:42rpx;

	word-break:break-all;

}



.ai-bubble{

	background:#eaf8ee;

	color:#333;

	border-top-left-radius:8rpx;

}



.doctor-bubble{

	background:#fff4e8;

	color:#333;

	border-top-left-radius:8rpx;

}



.user-bubble{

	background:#49b96e;

	color:white;

	border-top-right-radius:8rpx;

}



/* 快捷功能 */

.tool-bar{

	padding:20rpx 24rpx;

	display:flex;

	background:white;

	border-top:1rpx solid #f0f0f0;

}



.tool-btn{

	flex:1;

	height:72rpx;

	background:#f5f7fb;

	border-radius:20rpx;

	display:flex;

	align-items:center;

	justify-content:center;

	font-size:24rpx;

	color:#555;

	margin:0 10rpx;

}



/* 输入区域 */

.input-area{

	height:110rpx;

	background:white;

	display:flex;

	align-items:center;

	padding:0 24rpx;

	border-top:1rpx solid #f2f2f2;

}



.input-icon{

	width:70rpx;

	height:70rpx;

	background:#f5f7fb;

	border-radius:18rpx;

	display:flex;

	align-items:center;

	justify-content:center;

	font-size:42rpx;

	color:#666;

}



.chat-input{

	flex:1;

	height:74rpx;

	background:#f5f7fb;

	border-radius:22rpx;

	margin:0 20rpx;

	padding:0 24rpx;

	font-size:28rpx;

}



.send-btn{

	width:110rpx;

	height:74rpx;

	background:#49b96e;

	border-radius:22rpx;

	display:flex;

	align-items:center;

	justify-content:center;

	color:white;

	font-size:28rpx;

	font-weight:bold;

}

</style>