<template>
		<view class="aiadv" :class="{press: isPress}"
			@touchstart="isPress = true"
			@touchend="isPress = false"
			@touchcancel="isPress = false">
			<view class="hea">
				<head1>AI健康建议</head1>
			</view>
			<view class="conte">
				<img src="/static/tubiao/light.png" style="height: 32rpx;width: 32rpx;" />
				<view class="title1">
					<head2>根据您的身体数据，建议您：</head2>
				</view>
				
				
			</view>
			 <view class="text-box">
				              {{aitxt}}
				  </view>
				  
				  <button class="detail-btn" @click="detail">查看详情</button>
		</view>
</template>

<script setup>
import { ref,onMounted } from 'vue';

	const aitxt = ref("AI正在分析...")
	const aireturn = async()=>{
		const aite = await uni.request({
			url:"http://localhost/index/ai",
			method:"GET"
		})
		aitxt.value = aite.data
	}
	
	onMounted(()=>{
	
		aireturn()
	
	})
	
	const emit = defineEmits(['openDetail'])

	const detail = ()=>{
		emit('openDetail')
		console.log("点击")
	}
</script>

<style lang="scss">
	.hea{
		margin-left: 40rpx;
		margin-top: 20rpx;
		font-weight: 600;
	}
	.conte{
		display: flex;
		align-items: center;
		margin-left: 40rpx;
		margin-top: 20rpx;
		.title1{
			width: 100%;
			head2{
				margin-left: 10rpx;
			font-size: 25rpx;
			font-weight: 600;
				}
		}

	}
	.text-box{
		height: 90rpx;
		width: 550rpx;
		margin-left: 50rpx;
		margin-top: 20rpx;
		font-size: 23rpx;
		font-weight: 500;
	}
	.aiadv{
				 margin-top: 40rpx;
				 width: 92%;
				 margin-left: 20rpx;
				 border: 1rpx solid #b0e3ad;
				 box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.1);
				 height: 380rpx;
				 border-radius: 3%;
				 background: linear-gradient(to top right, #ffffff,#f4fff3, #e7ffef);
				 transition: transform 0.2s ease;
				 cursor: pointer; 
				 -webkit-tap-highlight-color: transparent !important;
	
	}			
	.aiadv:active {
				   transform: scale(1.05); /* 缩到95% */
				   box-shadow: 0 8rpx 10rpx rgba(0, 0, 0, 0.1);
				   
				 }
				 
				 .detail-btn {
				   height: 60rpx;
				   width: 160rpx;
				   margin-left: auto;
				   margin-top: 20rpx;
				   border-radius: 30rpx;
				   background-color: #419c5d;
				   align-items: center;
				   justify-content: center;
				   font-size: 20rpx;
				   color: #fff;
				   margin-top: 60rpx;
				   margin-left: 450rpx;
				 }

</style>