<template>
	<login 
	v-if="showlogin==true"
	@success = "handleLoginSuccess"
	@close="showlogin=false"
	></login>
	
 
  <view class="page-mine">
    <!-- 用户信息卡片 -->
    <view class="profile-card">
      <view class="profile-top">
        <image class="avatar" :src="userInfo.avatar || '/static/user1.jpg'" mode="aspectFill"></image>
        <view class="profile-info">
          <view class="nickname" v-if="hasLogin">{{ userInfo.nickname || '暂无昵称' }}</view>
          <view class="nickname" v-else @click="goLogin">请登录</view>
          <view class="uid" v-if="hasLogin">ID：{{ userInfo.id || '' }}</view>
          <view class="uid" v-else>登录查看个人信息</view>
        </view>
        <view class="edit-btn" @click="goEditProfile" :class="{disabled:!hasLogin}">编辑资料</view>
      </view>
      <view class="profile-stats">
        <view class="stat-item" @click="goHealthRecord">
          <text class="stat-num">{{ userInfo.recordCount || 0 }}</text>
          <text class="stat-label">健康档案</text>
        </view>
        <view class="stat-item" @click="goFamilyManagement">
          <text class="stat-num">{{ familyList.length }}</text>
          <text class="stat-label">家庭成员</text>
        </view>
        <view class="stat-item" @click="goMyDoctor">
          <text class="stat-num">{{ userInfo.doctorCount || 0 }}</text>
          <text class="stat-label">家庭医生</text>
        </view>
      </view>
    </view>


    <!-- 常用功能 -->
    <view class="menu-card">
      <view class="section-title">常用功能</view>
      <view class="menu-item" v-for="item in mainMenus" :key="item.title" @click="handleMenu(item)">
        <image class="menu-icon" :src="item.icon" mode="aspectFit"></image>
        <text class="menu-title">{{ item.title }}</text>
        <text class="menu-arrow">›</text>
      </view>
    </view>

    <!-- 其他设置 -->
    <view class="menu-card">
      <view class="section-title">其他</view>
      <view class="menu-item" v-for="item in subMenus" :key="item.title" @click="handleMenu(item)">
        <image class="menu-icon" :src="item.icon" mode="aspectFit"></image>
        <text class="menu-title">{{ item.title }}</text>
        <text class="menu-arrow">›</text>
      </view>
    </view>

    <!-- 退出登录 -->
    <view class="logout-btn" v-if="hasLogin" @click="handleLogout">退出登录</view>

    <view class="bottom-space"></view>
  </view>
</template>

<script setup>
import { ref, computed,onMounted} from 'vue'

// 全局登录状态
const hasLogin = ref(false)
const userInfo = ref({})
const familyList = ref([])
let showlogin = ref(false)

/* 登录成功 */
const handleLoginSuccess = () => {
	hasLogin.value = true
	showlogin.value = false
	uni.showToast({ title:'登录成功', icon:'success' })
	getUserInfo()
}


const mainMenus = ref([
  { title: '我的收藏', icon: '/static/icon/star.png', page: '/pages/collect/collect' },
  { title: '健康报告', icon: '/static/icon/report.png', page: '/pages/report/list' },
  { title: '用药记录', icon: '/static/icon/med.png', page: '/pages/medication/medication' },
  { title: '问诊记录', icon: '/static/icon/chat.png', page: '/pages/consultation/consultation' }
])

const subMenus = ref([
  { title: '设置', icon: '/static/icon/setting.png', page: '/pages/setting/setting' },
  { title: '关于我们', icon: '/static/icon/about.png', page: '/pages/about/about' }
])

const currentMember = computed(() => {
  return familyList.value.find(item => item.isSelf) || familyList.value[0] || {}
})

// ================= 页面显示时执行（直接写，不用导入！！！） =================
const onShow = () => {
  const app = getApp()
  hasLogin.value = app.globalData.hasLogin
    getUserInfo()
}

// ================= 以下代码不变 =================
const getToken = () => uni.getStorageSync('token') || ''

const getUserInfo = () => {
  if(!hasLogin.value) return
  uni.request({
    url: 'http://localhost:8080/family/info',
    header: { token: getToken() },
    success: (res) => {
      if(res.data.code === 200) userInfo.value = res.data.data.self
	  familyList.value=res.data.data.familyList
	  console.log(userInfo)
    }
  })
}

const getFamilyList = () => {
  if(!hasLogin.value) return

}

const goLogin = () => { 
	showlogin.value= true
	console.log(showlogin)
}

const goEditProfile = () => {
  if(!hasLogin.value){
    uni.showToast({ title:'请先登录', icon:'none' })
    return
  }
  uni.navigateTo({ url:'/pages/edit-profile/edit-profile' })
}

const goHealthRecord = () => uni.navigateTo({ url:'/pages/health-record/record' })
const goFamilyManagement = () => uni.navigateTo({ url:'/pages/family-management/management' })
const goMyDoctor = () => uni.navigateTo({ url:'/pages/my-doctor/doctor' })

const handleMenu = (item) => {
  if(!hasLogin.value){
    uni.showToast({ title:'请先登录', icon:'none' })
    return
  }
  if(item.page) uni.navigateTo({ url: item.page })
}

const handleLogout = () => {
  uni.showModal({
    title:'确定退出？',
    success: res => {
      if(res.confirm){
        const app = getApp()
        app.globalData.hasLogin = false
        uni.removeStorageSync('token')
        hasLogin.value = false
        userInfo.value = {}
        familyList.value = []		
		uni.reLaunch({
		  url: '/pages/me/me'
		})
        uni.showToast({ title:'已退出登录' })

      }
    }
  })
}
onMounted(() => {
	const token = uni.getStorageSync('token')
	if(token){
		hasLogin.value = true
	}
})

onShow(()=>{
	const token = uni.getStorageSync('token')
	if(token){
		hasLogin.value = true
		goLogin()
	}
})
</script>

<style lang="scss" scoped>
page {
  background: #f7f8f6;
}
.page-mine {
  padding: 24rpx;
  min-height: 100vh;
}

/* 用户信息卡片 */
.profile-card {
  background: #fff;
  border-radius: 28rpx;
  padding: 30rpx 28rpx 20rpx;
  margin-bottom: 24rpx;
  box-shadow: 0 8rpx 20rpx rgba(0, 0, 0, 0.03);
}
.profile-top {
  display: flex;
  align-items: center;
  margin-bottom: 28rpx;
}
.avatar {
  width: 110rpx;
  height: 110rpx;
  border-radius: 50%;
  background: #eee;
  margin-right: 20rpx;
}
.profile-info {
  flex: 1;
}
.nickname {
  font-size: 36rpx;
  font-weight: bold;
  color: #222;
  margin-bottom: 8rpx;
}
.uid {
  font-size: 24rpx;
  color: #999;
}
.edit-btn {
  font-size: 24rpx;
  color: #24b35a;
  background: #e8f8ee;
  padding: 10rpx 24rpx;
  border-radius: 30rpx;
}
.edit-btn.disabled{
  opacity: 0.5;
  pointer-events: none;
}
.profile-stats {
  display: flex;
  border-top: 1rpx solid #f5f5f5;
  padding-top: 20rpx;
}
.stat-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.stat-num {
  font-size: 32rpx;
  font-weight: bold;
  color: #222;
  margin-bottom: 8rpx;
}
.stat-label {
  font-size: 22rpx;
  color: #888;
}

/* 家庭成员卡片 */
.family-card {
  background: #fff;
  border-radius: 28rpx;
  padding: 24rpx 28rpx;
  margin-bottom: 24rpx;
  box-shadow: 0 8rpx 20rpx rgba(0, 0, 0, 0.03);
}
.section-title {
  font-size: 30rpx;
  font-weight: bold;
  color: #222;
  margin-bottom: 18rpx;
}
.current-member {
  display: flex;
  align-items: center;
  background: #f9fdf7;
  padding: 16rpx 20rpx;
  border-radius: 16rpx;
}
.member-avatar {
  width: 60rpx;
  height: 60rpx;
  border-radius: 50%;
  background: #eee;
  margin-right: 14rpx;
}
.member-name {
  font-size: 28rpx;
  color: #333;
  flex: 1;
}
.member-tag {
  font-size: 20rpx;
  color: #6fb682;
  background: #e8f6ec;
  padding: 4rpx 14rpx;
  border-radius: 20rpx;
  margin-right: 14rpx;
}
.switch-btn {
  font-size: 24rpx;
  color: #24b35a;
  padding: 8rpx 18rpx;
  border: 1rpx solid #d4edda;
  border-radius: 20rpx;
}

/* 功能菜单卡片 */
.menu-card {
  background: #fff;
  border-radius: 28rpx;
  padding: 24rpx 0;
  margin-bottom: 24rpx;
  box-shadow: 0 8rpx 20rpx rgba(0, 0, 0, 0.03);
}
.section-title {
  padding: 0 28rpx 18rpx;
  font-size: 30rpx;
  font-weight: bold;
  color: #222;
}
.menu-item {
  display: flex;
  align-items: center;
  padding: 22rpx 28rpx;
  border-bottom: 1rpx solid #f5f5f5;
}
.menu-item:last-child {
  border-bottom: none;
}
.menu-icon {
  width: 44rpx;
  height: 44rpx;
  margin-right: 18rpx;
}
.menu-title {
  flex: 1;
  font-size: 28rpx;
  color: #333;
}
.menu-arrow {
  font-size: 32rpx;
  color: #ccc;
  font-weight: 300;
}

/* 退出按钮 */
.logout-btn {
  margin: 40rpx 0 30rpx;
  text-align: center;
  font-size: 30rpx;
  color: #ff5e5e;
  background: #fff;
  padding: 24rpx;
  border-radius: 28rpx;
  box-shadow: 0 8rpx 20rpx rgba(0, 0, 0, 0.03);
}

.bottom-space {
  height: 50rpx;
}
</style>