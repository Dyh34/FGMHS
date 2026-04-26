<template>
	<view class="total">
		<view class="phd"
			@touchstart="isPress = true"
			@touchend="isPress = false"
			@touchcancel="isPress = false">
			<view class="toptip"><head1 class="h1">{{faph.name}}:身体状态概览</head1></view>
			<view class="aa1">
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
			</view>
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
</script>

<style lang="scss">
	.total{
		// display: inline-block;
	}
	.messi{
		margin-left: 30rpx;
		display: flex;
		flex-direction: column;

		head1{
			width: 100%;
			font-weight: 500;
			color: gray;
			font-size: 25rpx;
			height: 40rpx;
			justify-content: center;
		}
		head2{
			font-size: 30rpx;
			font-weight: 700;
			height: 40rpx;
			justify-content: center;
		}
		head3{
			margin-top: 7rpx;
			font-weight: 100;
			justify-content: center;
			height: 40rpx;
			font-size: 25rpx;
			color: #71cb6f;
			
		}
		
	}
	.tubiaoa{
		height: 58%;
		width: 80%;
	}
	.toptip{
		width: 100%;
		display: flex;
		align-items: center;
		padding-left: 20rpx;
		font-weight: 700;
	}
	.phd{
				
				flex-wrap: wrap;
				display: flex;
				 margin-top: 40rpx;
				 margin-left: 20rpx;
				 width: 92%;
				 border: 2rpx solid #ffffff;
				 box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.1);
				 height: 440rpx;
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

	.aa1{
		display: flex;
		width: 300rpx;
		margin-left: 10rpx;
		height: 39%;
		border-right:2rpx,solid #ffffff ;
		align-items: center;
		
		.tubiao1{
			display: flex;
			align-items: center;
			justify-content: center;
			margin-left: 10rpx;
			height:80%;
			width: 30%;
			border: 2rpx solid #f7f7f6;
			border-radius: 40%;
			background-color: #f6f4f4;
			
		}
	}
	.aa2{
		margin-left: 10rpx;
		display: flex;
		width: 300rpx;
		height: 39%;
		border-right:2rpx,solid #ffffff ;
		align-items: center;
		.tubiao2{
			align-items: center;
			display: flex;
			justify-content: center;
			margin-left: 10rpx;
			height:80%;
			width: 30%;
			border: 2rpx solid #f7f7f6;
			border-radius: 40%;
			background-color: #f6f4f4;
			
		}
	}
	.aa3{
		display: flex;
		margin-left: 10rpx;
		width: 300rpx;
		height: 39%;
		border-right:2rpx,solid #ffffff ;
		align-items: center;
		.tubiao3{
			display: flex;
			align-items: center;
			justify-content: center;
			margin-left: 10rpx;
			height:80%;
			width: 30%;
			border: 2rpx solid #f7f7f6;
			border-radius: 40%;
			background-color: #f6f4f4;
			
		}
	}
	.aa4{
		display: flex;
		width: 300rpx;
		height: 39%;
		border-right:2rpx,solid #ffffff ;
		align-items: center;
		.tubiao4{
			display: flex;
			align-items: center;
			justify-content: center;
			margin-left: 10rpx;
			height:80%;
			width: 30%;
			border: 2rpx solid #f7f7f6;
			border-radius: 40%;
			background-color: #f6f4f4;
			
		}
	}

</style>