<template>
  <view class="task-card" :class="{press: isPress}"
    @touchstart="isPress = true"
    @touchend="isPress = false"
    @touchcancel="isPress = false">

    <!-- 顶部标题 -->
    <view class="title-text">今日任务</view>

    <!-- 任务列表 -->


    <view class="item-row">
      <view class="icon-wrap green-icon">
        <text class="icon">👣</text>
      </view>
      <view class="text-box">
        <text class="task-name">步数目标</text>
        <text class="task-value">{{ faph.stepNum }}/{{ faph.stepTotal }}步</text>
      </view>
    </view>    
	

    <view class="item-row">
      <view class="icon-wrap gray-icon">
        <text class="icon">🛌</text>
      </view>
      <view class="text-box">
        <text class="task-name">睡眠目标</text>
        <text class="task-value">{{ faph.sleepNum }}/{{ faph.sleepTotal }}小时</text>
      </view>
    </view>
	<view class="item-row">
	  <view class="icon-wrap gray-icon">
	    <text class="icon">💧</text>
	  </view>
	  <view class="text-box">
	    <text class="task-name">饮水目标</text>
	    <text class="task-value">{{ faph.waterNum }}/{{ faph.waterTotal }}杯</text>
	  </view>
	</view>

    <!-- 右下角查看详情按钮 -->
    <view class="detail-btn">查看详情</view>
  </view>
</template>

<script setup>
	import { ref } from 'vue';
defineProps({
  faph: {
    type: Object,
    default: () => ({})
  }
})
const isPress = ref(false)


</script>

<style lang="scss" scoped>
.task-card {
  height: 100%;
  margin: 40rpx auto;
  width: 85%;
  border-radius: 12rpx;
  background: #f2faf6;
  padding: 30rpx;
  box-shadow: 0 2rpx 4rpx rgba(0,0,0,0.1);
  transition: all 0.2s ease;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}

.task-card.press {
  transform: scale(1.05);
  box-shadow: 0 8rpx 12rpx rgba(0,0,0,0.15);
}

.title-text {
  font-size: 36rpx;
  font-weight: bold;
  color: #222;
  margin-bottom: 35rpx;
}

.item-row {
	height: 80rpx;
  display: flex;
  align-items: center;
  margin-bottom: 20rpx;
}

.icon-wrap {
  width: 70rpx;
  height: 70rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.green-icon {
  background: #72c19a;
}

.gray-icon {
  background: #a4d3bf;
}

.icon {
  font-size: 32rpx;
}

.text-box {
  flex: 1;
  margin-left: 20rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.task-name {
  font-size: 30rpx;
  color: #333;
}

.task-value {
  font-size: 32rpx;
  font-weight:  600;
  color: #333;
}

.detail-btn {
  margin-left: auto;
  margin-top: 20rpx;
  padding: 16rpx 40rpx;
  background: #39bc36;
  height: 40rpx;
  width: 100rpx;
  margin-top: 20rpx;
  border-radius: 30rpx;
  color: #fff;
  font-size: 25rpx;
}
</style>