<template>
	<view class="page">

		<!-- 顶部栏 -->
		<view class="top-bar">
			<view class="title">AI导诊</view>
			<view class="history-btn" @click="showHistory = !showHistory">
				历史记录
			</view>
		</view>

		<!-- 历史记录 -->
		<view class="history-panel" v-if="showHistory">
			<view
				class="history-item"
				v-for="(item,index) in historyList"
				:key="index"
			>
				{{ item }}
			</view>
		</view>

		<!-- 快捷症状 -->
		<scroll-view
			scroll-x
			class="symptom-scroll"
			show-scrollbar="false"
		>
			<view class="symptom-wrap">
				<view
					class="symptom-tag"
					v-for="(item,index) in quickSymptoms"
					:key="index"
					@click="selectSymptom(item)"
				>
					{{ item }}
				</view>
			</view>
		</scroll-view>

		<!-- 聊天区域 -->
		<scroll-view
			scroll-y
			class="chat-area"
			:scroll-into-view="scrollIntoView"
		>

			<view
				v-for="(item,index) in messageList"
				:key="index"
				:id="'msg'+index"
			>

				<!-- 用户消息 -->
				<view
					v-if="item.type === 'user'"
					class="msg-row user-row"
				>
					<view class="user-msg">
						{{ item.content }}
					</view>
				</view>

				<!-- AI消息 -->
				<view
					v-if="item.type === 'ai'"
					class="msg-row ai-row"
				>

					<image
						src="/static/doctor.png"
						class="ai-avatar"
					></image>

					<view class="ai-card">

						<view class="ai-text">
							{{ item.content }}
						</view>

						<!-- 推荐科室 -->
						<view
							class="recommend-box"
							v-if="item.department"
						>
							<view class="recommend-title">
								推荐科室
							</view>

							<view class="recommend-tag">
								{{ item.department }}
							</view>
						</view>

						<!-- 推荐医院 -->
						<view
							class="recommend-box"
							v-if="item.hospital"
						>
							<view class="recommend-title">
								推荐医院
							</view>

							<view class="hospital-item">
								{{ item.hospital }}
							</view>
						</view>

					</view>

				</view>

			</view>

		</scroll-view>

		<!-- 底部输入栏 -->
		<view class="bottom-bar">

			<!-- 图片 -->
			<view class="tool-btn" @click="chooseImage">
				📷
			</view>

			<!-- 语音 -->
			<view class="tool-btn" @click="voiceInput">
				🎤
			</view>

			<input
				v-model="inputText"
				class="input"
				placeholder="请输入症状..."
				confirm-type="send"
				@confirm="sendMessage"
			/>

			<view class="send-btn" @click="sendMessage">
				发送
			</view>

		</view>

	</view>
</template>

<script setup>
import { ref,nextTick } from 'vue'

const inputText = ref('')

const scrollIntoView = ref('')

const showHistory = ref(false)

const quickSymptoms = ref([
	'头痛',
	'发烧',
	'咳嗽',
	'胃痛',
	'失眠',
	'胸闷',
	'腰疼',
	'头晕'
])

const historyList = ref([
	'最近总是失眠怎么办',
	'胃疼需要挂什么科',
	'发烧38度如何处理'
])

const messageList = ref([
	{
		type:'ai',
		content:'您好，我是AI导诊助手，请描述您的症状。',
		department:'',
		hospital:''
	}
])



function selectSymptom(item){
	inputText.value = item
	sendMessage()
}



function sendMessage(){

	if(!inputText.value.trim()) return

	// 用户消息
	messageList.value.push({
		type:'user',
		content:inputText.value
	})

	const userText = inputText.value

	inputText.value = ''

	scrollBottom()

	// 模拟AI回复
	setTimeout(()=>{

		let reply = {
			type:'ai',
			content:'',
			department:'',
			hospital:''
		}

		if(userText.includes('头痛')){

			reply.content =
			'头痛可能与睡眠不足、压力或感冒有关。如果持续头痛或伴随恶心呕吐，建议及时就医。'

			reply.department = '神经内科'

			reply.hospital = '成都市第一人民医院'

		}else if(userText.includes('胃')){

			reply.content =
			'胃部不适可能与饮食不规律有关，建议清淡饮食并避免辛辣刺激。'

			reply.department = '消化内科'

			reply.hospital = '四川大学华西医院'

		}else{

			reply.content =
			'已收到您的症状描述，建议近期注意休息并持续观察，如症状加重请及时就医。'

			reply.department = '全科医学科'

			reply.hospital = '当地综合医院'
		}

		messageList.value.push(reply)

		scrollBottom()

	},800)

}



function scrollBottom(){

	nextTick(()=>{
		scrollIntoView.value =
		'msg' + (messageList.value.length - 1)
	})

}



function chooseImage(){

	uni.chooseImage({
		count:1,
		success:(res)=>{

			messageList.value.push({
				type:'user',
				content:'[上传了一张图片]'
			})

			messageList.value.push({
				type:'ai',
				content:'已收到图片，建议进一步结合症状描述进行分析。',
				department:'皮肤科',
				hospital:'成都市第二人民医院'
			})

			scrollBottom()
		}
	})

}



function voiceInput(){

	uni.showToast({
		title:'语音识别开发中',
		icon:'none'
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
	height:100rpx;
	padding:0 30rpx;
	display:flex;
	align-items:center;
	justify-content:space-between;
	background:white;
	font-weight:bold;
	font-size:34rpx;
	box-shadow:0 2rpx 10rpx rgba(0,0,0,0.04);
}

.history-btn{
	font-size:26rpx;
	color:#4caf50;
}



/* 历史记录 */
.history-panel{
	background:white;
	padding:20rpx 30rpx;
}

.history-item{
	padding:16rpx 0;
	font-size:26rpx;
	color:#666;
	border-bottom:1rpx solid #f0f0f0;
}



/* 快捷症状 */
.symptom-scroll{
	width:100%;
	white-space:nowrap;
	background:white;
	padding-bottom:20rpx;
}

.symptom-wrap{
	display:flex;
	padding:20rpx;
}

.symptom-tag{
	padding:14rpx 28rpx;
	background:#edf7ee;
	color:#4caf50;
	border-radius:40rpx;
	font-size:24rpx;
	margin-right:20rpx;
	flex-shrink:0;
}



/* 聊天区 */
.chat-area{
	flex:1;
	padding:30rpx;
	box-sizing:border-box;
}



/* 消息 */
.msg-row{
	display:flex;
	margin-bottom:30rpx;
}

.user-row{
	justify-content:flex-end;
}

.ai-row{
	align-items:flex-start;
}



/* AI头像 */
.ai-avatar{
	width:70rpx;
	height:70rpx;
	border-radius:50%;
	margin-right:20rpx;
}



/* 用户气泡 */
.user-msg{
	max-width:520rpx;
	background:#95ec69;
	padding:22rpx;
	border-radius:20rpx;
	font-size:30rpx;
	line-height:42rpx;
}



/* AI卡片 */
.ai-card{
	max-width:540rpx;
	background:white;
	border-radius:24rpx;
	padding:24rpx;
	box-shadow:0 4rpx 20rpx rgba(0,0,0,0.05);
}

.ai-text{
	font-size:30rpx;
	color:#333;
	line-height:44rpx;
}



/* 推荐 */
.recommend-box{
	margin-top:24rpx;
}

.recommend-title{
	font-size:24rpx;
	color:#999;
	margin-bottom:14rpx;
}

.recommend-tag{
	display:inline-block;
	padding:12rpx 22rpx;
	background:#edf7ee;
	color:#4caf50;
	border-radius:30rpx;
	font-size:24rpx;
}

.hospital-item{
	background:#f6f7fb;
	padding:18rpx;
	border-radius:16rpx;
	font-size:26rpx;
	color:#555;
}



/* 底部输入栏 */
.bottom-bar{
	background:white;
	padding:20rpx;
	display:flex;
	align-items:center;
	box-shadow:0 -2rpx 10rpx rgba(0,0,0,0.05);
}

.tool-btn{
	width:70rpx;
	height:70rpx;
	display:flex;
	align-items:center;
	justify-content:center;
	font-size:38rpx;
}

.input{
	flex:1;
	height:72rpx;
	background:#f5f6fa;
	border-radius:40rpx;
	padding:0 24rpx;
	font-size:28rpx;
	margin:0 16rpx;
}

.send-btn{
	background:#4caf50;
	color:white;
	padding:16rpx 28rpx;
	border-radius:36rpx;
	font-size:28rpx;
}
</style>