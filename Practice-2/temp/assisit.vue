<template>
	<view class="asitotal">
		<scroll-view scroll-y="true" >
			<view class="asititle">
				<head1>AI健康报告</head1>
			</view>
			
			<pinfen 
						:categories="['睡眠', '情绪', '运动', '饮食', '心率']"
						:scoreData="[100, 100, 100, 100, 100]"
					/>
		
		</scroll-view>
		
		
	</view>
</template>

<script setup>
	
</script>

<style lang="scss">
	.asitotal{
		display: flex;
		min-height: 100vh;
		border: 1rpx,solid,#000;
		background-image: linear-gradient(
		  to top,
		  rgba(244, 247, 244, 1.0),
		  rgba(232, 236, 233, 1.0),
		  rgba(238, 246, 242, 1.0)
		);
		
		.asititle{
			margin-top: 40rpx;
			margin-left: 270rpx;
			font-size: 36rpx;
			font-weight: 600;
			
		}

	}
	

</style>