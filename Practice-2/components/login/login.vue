<template>
  <view class="login-mask">
    <view class="login-card">
      <view class="login-title">{{ isRegister ? '注册' : '登录' }}</view>

      <input class="inp" v-model="username" placeholder="请输入账号" />
      <input class="inp" v-model="password" placeholder="请输入密码" password />

      <button class="login-btn" @click="submit">
        {{ isRegister ? '注册' : '登录' }}
      </button>

      <view class="text-btn" @click="isRegister = !isRegister">
        {{ isRegister ? '已有账号？去登录' : '没有账号？去注册' }}
      </view>
      <view class="close-btn" @click="emit('close')">取消</view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

// 定义事件（Vue3 setup 标准写法，不会报错）
const emit = defineEmits(['close', 'success'])

const username = ref('')
const password = ref('')
const isRegister = ref(false)

const submit = async () => {
  if (!username.value || !password.value) {
    uni.showToast({ title: '请输入账号密码', icon: 'none' })
    return
  }

  const url = isRegister.value ? '/register' : '/login'

  try {
    const { data } = await uni.request({
      url: 'http://localhost:8080/api' + url,
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      data: {
        username: username.value,
        password: password.value
      }
    })

    if (data.code === 200) {
      uni.showToast({ title: data.msg, icon: 'success' })
		console.log(data)
      // 保存登录信息
      uni.setStorageSync('token', data.data.token)
      uni.setStorageSync('userInfo', {
        userid: data.data.id.value,
        nickname: data.data.nickname.value
      })

      // ===================== 登录成功，更新全局状态 =====================
      const app = getApp()
      app.globalData.hasLogin = true
      app.globalData.username = username.value

      // 关闭弹窗
      emit('success')
      emit('close')
    } else {
      uni.showToast({ title: data.message || '操作失败', icon: 'none' })
    }
  } catch (e) {
    console.error('登录错误：', e)
    uni.showToast({ title: '网络或服务异常', icon: 'none' })
  }
}
</script>

<style scoped>
.login-mask {
  position: fixed;
  left: 0; top: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.45);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}
.login-card {
  width: 580rpx;
  background: #fff;
  border-radius: 32rpx;
  padding: 50rpx 40rpx;
}
.login-title {
  font-size: 38rpx;
  font-weight: bold;
  text-align: center;
  margin-bottom: 40rpx;
}
.inp {
  border: 1px solid #eee;
  border-radius: 12rpx;
  padding: 20rpx;
  margin-bottom: 20rpx;
}
.login-btn {
  background: #24b35a;
  color: #fff;
  border-radius: 12rpx;
  margin-top: 20rpx;
}
.text-btn {
  text-align: center;
  margin-top: 20rpx;
  font-size: 26rpx;
  color: #666;
}
.close-btn {
  text-align: center;
  margin-top: 20rpx;
  color: #999;
}
</style>