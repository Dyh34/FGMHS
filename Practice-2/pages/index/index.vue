<template>
  <view class="base-background">
    <scroll-view scroll-y="true" class="scroll-container">
      <view class="hello1">
        <head1>早上好,董宇航</head1>
      </view>
      <view class="hello2">
        <head2>健康生活，从一个小建议做起！</head2>
      </view>
	  
	  
	  <scroll-view class="phs" scroll-x  :scrollbar="false"
        :show-scrollbar="false">
		  <view class="phbox">
		  	<phdata class="inlineph" v-for="(i,index) in faphlist" :key=index :faph=i>
				
			</phdata>
		  </view>
	  	
	  </scroll-view>
	  <aiadv></aiadv>
	  
	  <view class="container">
	     
	     <!-- 循环渲染：你的健康卡片 + AI任务卡片 -->
	     <missionto 
	       v-for="(item, index) in faphlist" 
	       :key=index
	       :faph=item
		   >111</missionto>
	 
	   </view>
	   
	   <view class="container">
	   		<!-- 广告轮播组件 -->
	   		<adshow :adshow="adData"></adshow>
	   	</view>
	  
      <view class="bottom-space"></view>
    </scroll-view>
  </view>
</template>
<script setup>
	const faphlist=[
		{
		name:"董宇航",
		  xueXing:"A",
		  changJianDu:"常见",
		  changState:"3",
		  guoMingYuan:"没有钱",
		  yanZhong:"严重",
		  yanState:"1",
		  jianKang:"无疾病",
		  jiyanZhong:"健康",
		  jiState:"3",
		  aiJianYi:"少吃饭",
		  aiyanZhong:"适中",
		  aiState:"2",
		  waterNum: 5,     // 当前喝水
		  waterTotal: 8,   // 目标喝水
		  stepNum: 6800,   // 当前步数
		  stepTotal: 10000,// 目标步数
		  sleepNum: 7.5,   // 当前睡眠
		  sleepTotal: 8    // 目标睡眠,
		  },
			{
			name:"董宇航",
			  xueXing:"A",
			  changJianDu:"常见",
			  changState:"3",
			  guoMingYuan:"没有钱",
			  yanZhong:"严重",
			  yanState:"1",
			  jianKang:"无疾病",
			  jiyanZhong:"健康",
			  jiState:"3",
			  aiJianYi:"少吃饭",
			  aiyanZhong:"适中",
			  aiState:"2",
			  waterNum: 5,     // 当前喝水
			  waterTotal: 8,   // 目标喝水
			  stepNum: 6800,   // 当前步数
			  stepTotal: 10000,// 目标步数
			  sleepNum: 7.5,   // 当前睡眠
			  sleepTotal: 8    // 目标睡眠,
			  },
			  {
			  	name:"董宇航",
			  	  xueXing:"A",
			  	  changJianDu:"常见",
			  	  changState:"3",
			  	  guoMingYuan:"没有钱",
			  	  yanZhong:"严重",
			  	  yanState:"1",
			  	  jianKang:"无疾病",
			  	  jiyanZhong:"健康",
			  	  jiState:"3",
			  	  aiJianYi:"少吃饭",
			  	  aiyanZhong:"适中",
			  	  aiState:"2",
			  	  waterNum: 5,     // 当前喝水
			  	  waterTotal: 8,   // 目标喝水
			  	  stepNum: 6800,   // 当前步数
			  	  stepTotal: 10000,// 目标步数
			  	  sleepNum: 7.5,   // 当前睡眠
			  	  sleepTotal: 8    // 目标睡眠,
			  	  }]
				  
			  const adData=[
						{ 
							adname:"a1",
							url: "/static/tubiao/ad1.png" 
						},
						{ 
							adname:"a2",
							url: "/static/tubiao/ad2.png" 
						},
						{ 
							adname:"a3",
							url: "/static/tubiao/ad3.png" 
						}
					]
</script>
<style lang="scss">
.base-background {
  display: flex;
  flex-direction: column;
  padding: 15px;
  color: #333;
  min-height: 100vh;
  background-image: linear-gradient(
    to top left,
    rgba(255, 255, 255, 0),
    rgba(242, 255, 246, 0.8),
    rgba(208, 240, 214, 0.8)
  );
  .phs{ 
	  flex-direction: row;
		// border:3rpx solid #333;
		height: 520rpx;
		-webkit-appearance: none;
		
	  .phbox{
		  white-space:nowrap;
		  .inlineph{
			  display: inline-block;
		  }
		  	  
	  }   

    
  }


  .hello1 {
    height: 60rpx;
    width: 100%;
    font-size: 35rpx;
    font-family: "PingFang SC", "Microsoft YaHei", sans-serif;
    font-weight: 700;
    letter-spacing: 6rpx;
    text-shadow: 0 1rpx 1rpx #999;
  }

  .hello2 {
    width: 100%;
    font-size: 25rpx;
    color: #999;
  }
  .scroll-container {
    flex: 1; 
    padding-bottom: 100rpx; 
  }
  
  .bottom-space {
    height: 90rpx; 
  }

}

.container{
	width: 100%;
	min-height: 20rpx;
}



</style>