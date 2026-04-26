<template>
  <view class="ad-banner">
    <swiper
      class="swiper"
      autoplay
      circular
      indicator-dots
      indicator-color="rgba(255,255,255,0.5)"
      indicator-active-color="#fff"
	  interval="2000"
    >
      <swiper-item v-for="(item, index) in adshow" :key="index">
        <image class="ad-img" :src="item.url" mode="aspectFill"></image>
      </swiper-item>
    </swiper>
  </view>
</template>

<script setup>
// 接收父组件传过来的 adshow（即你的 adData）
const props = defineProps({
  adshow: {
    type: Array,
    default: () => []
  }
})
</script>

<style lang="scss" scoped>
.ad-banner {
  width: 92%;
  height: 440rpx;
  margin: 20rpx auto;
  border-radius: 20rpx;
  overflow: hidden;
}

.swiper {
  width: 100%;
  height: 100%;
}

.ad-img {
  width: 100%;
  height: 100%;
  display: block;
}
</style>