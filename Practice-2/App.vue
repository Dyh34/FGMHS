<script>
	export default {
		globalData: {
			hasLogin: false,
			username: ''
		},
		
		onLaunch: function() {
			console.log('App Launch')
			
			// 启动时自动读取登录状态
			try {
				let token = uni.getStorageSync('token')
				let userInfo = uni.getStorageSync('userInfo')
				if (token && userInfo) {
					this.globalData.hasLogin = true
					this.globalData.username = userInfo.nickname || ''
					console.log(username)
				}
			} catch (e) {}
		},
		
		onShow: function() {
			console.log('App Show')
		},
		
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>