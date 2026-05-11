<template>
	<!-- 背景遮罩 添加过渡 -->
	<transition name="mask-fade">
		<view 
			v-if="showDetail"
			class="mask"
			@click="closeDetail"
		>
			<!-- 弹窗主体 添加过渡 -->
			<transition name="popup-scale">
				<view 
					class="detail-card"
					@click.stop
					v-if="showDetail"
				>
					
					<!-- 顶部 -->
					<view class="top-bar">
						<view class="title">
							AI 深度健康分析
						</view>

						<view class="close-btn" @click="closeDetail">
							×
						</view>
					</view>

					<!-- 内容区域 -->
					<scroll-view scroll-y class="content-area">

						<!-- 身体数据分析 -->
						<view class="module">
							<view class="module-title">
								📊 身体数据分析
							</view>
							<view class="module-content">
								{{ bodyAdvice }}
							</view>
						</view>

						<!-- 病历分析 -->
						<view class="module">
							<view class="module-title">
								📄 病历分析建议
							</view>
							<view class="module-content">
								{{ medicalAdvice }}
							</view>
						</view>

						<!-- 饮食 -->
						<view class="module">
							<view class="module-title">
								🥗 饮食建议
							</view>
							<view class="module-content">
								{{ foodAdvice }}
							</view>
						</view>

						<!-- 运动 -->
						<view class="module">
							<view class="module-title">
								🏃 运动建议
							</view>
							<view class="module-content">
								{{ sportAdvice }}
							</view>
						</view>

						<!-- 用药 -->
						<view class="module">
							<view class="module-title">
								💊 用药建议
							</view>
							<view class="module-content">
								{{ medicineAdvice }}
							</view>
						</view>

						<!-- 生活习惯 -->
						<view class="module">
							<view class="module-title">
								🌙 生活习惯建议
							</view>
							<view class="module-content">
								{{ lifeAdvice }}
							</view>
						</view>

					</scroll-view>

					<!-- 底部按钮 -->
					<view class="bottom-btns">
						<button class="share-btn">分享建议</button>
					</view>

				</view>
			</transition>
		</view>
	</transition>
</template>

<script setup>
import { ref } from 'vue'

// 接收父组件传过来的 是否显示
const props = defineProps({
	showDetail:{
		type:Boolean,
		default:false
	}
})

// 定义事件：告诉父组件关闭弹窗
const emit = defineEmits(['close'])

/* ===== 你原有留白数据保留不动 ===== */
const bodyAdvice = ref("")
const medicalAdvice = ref("")
const foodAdvice = ref("")
const sportAdvice = ref("")
const medicineAdvice = ref("")
const lifeAdvice = ref("")

/* 关闭弹窗：不直接改props，触发事件通知父组件 */
const closeDetail = () => {
	emit('closeDetail')
}
</script>

<style lang="scss">
/* 你的原有样式 原封不动保留 */
.mask{
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	background: rgba(0,0,0,0.25);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 999;
	backdrop-filter: blur(6rpx);
}

.detail-card{
	width: 620rpx;
	height: 1200rpx;
	background: linear-gradient(to top right,#ffffff,#f4fff3,#e8fff1);
	border-radius: 36rpx;
	box-shadow: 0 12rpx 40rpx rgba(0,0,0,0.12);
	display: flex;
	flex-direction: column;
}

.top-bar{
	height: 110rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-left: 36rpx;
	padding-right: 30rpx;
}

.title{
	font-size: 36rpx;
	font-weight: 700;
	color: #2b6b42;
}

.close-btn{
	width: 52rpx;
	height: 52rpx;
	border-radius: 50%;
	background: #edf8ef;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 42rpx;
	color: #4b8d61;
}

.content-area{
	flex: 1;
	width: 560rpx;
	height: 540rpx;
	padding-left: 30rpx;
	padding-right: 30rpx;
}

.module{
	margin-bottom: 26rpx;
	background: rgba(255,255,255,0.72);
	border-radius: 24rpx;
	padding: 24rpx;
	border: 1rpx solid #d7f0da;
}

.module-title{
	font-size: 28rpx;
	font-weight: 700;
	color: #34734a;
	margin-bottom: 18rpx;
}

.module-content{
	min-height: 80rpx;
	font-size: 24rpx;
	line-height: 42rpx;
	color: #4c4c4c;
}

.bottom-btns{
	height: 120rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}

.share-btn{
	width: 260rpx;
	height: 72rpx;
	border-radius: 40rpx;
	background: linear-gradient(to right,#4ba867,#5ec07c);
	color: #fff;
	font-size: 28rpx;
	font-weight: 600;
	display: flex;
	align-items: center;
	justify-content: center;
	border: none;
	box-shadow: 0 8rpx 20rpx rgba(80,170,100,0.25);
}
.share-btn::after{
	border: none;
}

/* ====================== */
/* 👇 新增：弹窗过渡动画  */
/* ====================== */

/* 背景淡入淡出 */
.mask-fade-enter-active, .mask-fade-leave-active {
	transition: all 0.3s ease;
}
.mask-fade-enter-from { opacity: 0; }
.mask-fade-leave-to { opacity: 0; }

/* 弹窗缩放 + 淡入 */
.popup-scale-enter-active, .popup-scale-leave-active {
	transition: all 0.3s ease;
}
.popup-scale-enter-from {
	opacity: 0;
	transform: scale(0.7);
}
.popup-scale-leave-to {
	opacity: 0;
	transform: scale(0.7);
}
</style>