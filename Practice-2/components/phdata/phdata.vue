<template>
	<view class="total">
		<view class="phd"
			@touchstart="isPress = true"
			@touchend="isPress = false"
			@touchcancel="isPress = false"
			
			>
			
			
			<view class="toptip"><view style="height: 40rpx;width: 40rpx;border: 2rpx solid black;border-radius: 50rpx;"></view> <head1 class="h1">{{faph.name}}</head1></view>
			<view class="toptip2"@click="goto" >
				<view style="margin-right: 20rpx; margin-top: 80rpx;" >详细数据</view>
				<view style="margin-top: 80rpx;">&gt;</view>
			</view>
			
			<!-- <view class="aa1">
				<view class="tubiao1">
					<img class="tubiaoa" src="/static/tubiao/c.png" />
				</view>
				<view class="messi">
					<head1>血型</head1>
					<head2>{{faph.xueXing}}</head2>
					<head3 :style="{ color: faph.xueState == 1 ? 'red' : faph.xueState == 2 ? 'yellow' : 'green' }">
					  {{faph.changJianDu}}
					</head3>
				</view>
				
			</view>
			<view class="aa2">
				<view class="tubiao2">
					<img class="tubiaoa"  src="/static/tubiao/a.png" />
					
				</view>
				<view class="messi">
						<head1>健康状况</head1>
						<head2>{{faph.jianKang}}</head2>
						<head3 :style="{ color: faph.jiState == 1 ? 'red' : faph.jiyanState == 2 ? 'yellow' : 'green' }">
						  {{faph.jiyanZhong}}
						</head3>
					</view>

			</view>
			<view class="aa3">
				<view class="tubiao3">
					<img class="tubiaoa" src="/static/tubiao/b.png" />
				</view>
				<view class="messi">
						<head1>过敏原</head1>
						<head2>{{faph.guoMingYuan}}</head2>
						<head3 :style="{ color: faph.yanState == 1 ? 'red' : faph.yantate == 2 ? 'yellow' : 'green' }">
						  {{faph.yanZhong}}
						</head3>
					</view>
			</view>
			<view class="aa4">
				<view class="tubiao4">
					<img class="tubiaoa"  src="/static/tubiao/d.png" />
				</view>
				<view class="messi">
						<head1>AI建议</head1>
						<head2>{{faph.aiJianYi}}</head2>
						<head3 :style="{ color: faph.aiState == 1 ? 'red' : faph.aiState == 2 ? 'yellow' : 'green' }">
						  {{faph.aiyanZhong}}
						</head3>
					</view>
			</view> -->
		</view>
	</view>
		
</template>

<script setup>
	import { ref } from 'vue';
	defineProps({
		faph:{
			type:Object,
			default: () => ({})
			 
		}
			
		
	})
	const goto=()=>{
		uni.navigateTo({
			url:"/pages/index/phydetail/phydetail/phydetail"
		})
	}
</script>

<style lang="scss">
	.total{
		// display: inline-block;
	}
	.messi{
		margin-left: 30rpx;
		display: flex;
		flex-direction: column;

		// head1{
		// 	width: 100%;
		// 	font-weight: 500;
		// 	color: gray;
		// 	font-size: 25rpx;
		// 	height: 40rpx;
		// 	justify-content: center;
		// }
		// head2{
		// 	font-size: 30rpx;
		// 	font-weight: 700;
		// 	height: 40rpx;
		// 	justify-content: center;
		// }
		// head3{
		// 	margin-top: 7rpx;
		// 	font-weight: 100;
		// 	justify-content: center;
		// 	height: 40rpx;
		// 	font-size: 25rpx;
		// 	color: #71cb6f;
			
		// }
		
	}
	.tubiaoa{
		height: 58%;
		width: 80%;
	}
	.toptip{
		width: 82%;
		display: flex;
		align-items: center;
		padding-left: 25rpx;
		font-weight: 700;
		.h1{
			margin-left: 30rpx;
		}
	}
	.toptip2{
		height: 65rpx;
		margin-left: 25rpx;
		width: 82%;
		display: flex;
		justify-content: space-between;
	}
	.phd{
				
				flex-wrap: wrap;
				display: flex;
				 margin-top: 40rpx;
				 margin-left: 20rpx;
				 width: 92%;
				 border: 2rpx solid #ffffff;
				 box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.1);
				 height: 240rpx;
				 border-radius: 3%;
				 transition: transform 0.2s ease;
				 cursor: pointer; 
				background-color: white;
				 -webkit-tap-highlight-color: transparent !important;
	
	}			
	.phd:active {
				   transform: scale(1.05); /* 缩到95% */
				   box-shadow: 0 8rpx 10rpx rgba(0, 0, 0, 0.1);
				   
				 }
</style>