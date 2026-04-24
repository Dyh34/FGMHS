<template>
		<view class="aiadv" :class="{press: isPress}"
			@touchstart="isPress = true"
			@touchend="isPress = false"
			@touchcancel="isPress = false">
			
		</view>
</template>

<script>
	export default {
		name:"aiavi",
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	.aiadv{
				 margin-top: 40rpx;
				 width: 100%;
				 border: 1rpx #cfe3d2;
				 box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.1);
				 height: 400rpx;
				 border-radius: 3%;
				 background-color: white;
				 transition: transform 0.2s ease;
				 cursor: pointer; 
				 -webkit-tap-highlight-color: transparent !important;
	
	}			
	.aiadv:active {
				   transform: scale(1.05); /* 缩到95% */
				   box-shadow: 0 8rpx 10rpx rgba(0, 0, 0, 0.1);
				   
				 }

</style>