<template>
  <view class="weather-box">
    <!-- 问候语 + 天气emoji -->
    <view class="greet">{{ greetText }}, {{ username }}! {{ weatherEmoji }}</view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// 数据
const temp = ref('--')
const weatherEmoji = ref('️')
const weatherText = ref('获取中...')
const greetText = ref('你好')
const username = ref('小伙伴') // 你可以改成自己的用户名

// 页面加载时执行
onMounted(() => {
  getGreet()
  getWeather()
})

// ======================
// 1. 根据时间生成问候语
// ======================
function getGreet() {
  const hour = new Date().getHours()
  let greet = ''

  if (hour >= 6 && hour < 9) {
    greet = '早上好'
  } else if (hour >= 9 && hour < 11) {
    greet = '上午好'
  } else if (hour >= 11 && hour < 13) {
    greet = '中午好'
  } else if (hour >= 13 && hour < 17) {
    greet = '下午好'
  } else if (hour >= 17 && hour < 19) {
    greet = '傍晚好'
  } else if (hour >= 19 && hour < 22) {
    greet = '晚上好'
  } else {
    greet = '夜深了'
  }

  greetText.value = greet
  console.log(greetText.value)
}

// ======================
// 2. 获取实时天气
// ======================
function getWeather() {
  // 获取定位
	  
	  
	  wx.getLocation({
	   type: 'wgs84',
	   success (res) {
	     const lat = res.latitude
	     const lon = res.longitude
	    console.log(lat,lon)


      // 请求天气API
      wx.request({
        url: 'https://restapi.amap.com/v3/weather/weatherInfo?parameters',
        data: {
          key: 'c4153508816115667862a6f009d34fd4',
          city: `610113`
        },
        success(result) {
         const weather = result.data.lives?.[0]
          if (!weather) return
         const weatherStr = weather.weather
         const temperature = weather.temperature

           weatherText.value = weatherStr
          temp.value = temperature
		  // console.log(weatherStr+"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
           setWeatherEmoji(weatherStr)
        }
      })
    }
  })
  
  console.log(weatherText.value)
}

// ======================
// 3. 天气 → 自动匹配emoji
// ======================
function setWeatherEmoji(weatherStr) {
  const map = {
    '晴': '☀️',
    '多云': '⛅',
    '阴': '☁️',
    '雾': '🌫️',
    '小雨': '🌧️',
    '中雨': '🌧️',
    '大雨': '🌧️',
    '暴雨': '🌧️',
    '雪': '❄️',
    '小雪': '❄️',
    '中雪': '❄️',
    '大雪': '❄️'
  }

  for (let key in map) {
    if (weatherStr.includes(key)) {
      weatherEmoji.value = map[key]
      return
    }
  }

  weatherEmoji.value = '☁️'
}
</script>

<style scoped>
.weather-box {
}
.greet {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 1px;
}
</style>