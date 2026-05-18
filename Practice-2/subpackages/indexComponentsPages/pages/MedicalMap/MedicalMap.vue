<template>

	<view class="page">

		<!-- 顶部 -->
		<view class="top-bg">

			<view class="page-title">
				医疗地图
			</view>

			<view class="page-desc">
				附近医院 · 药店 · 急诊服务
			</view>

		</view>



		<!-- 搜索 -->
		<view class="search-box">

			<view class="search-inner">

				<view class="search-icon">
					🔍
				</view>

				<input
					class="search-input"
					placeholder="搜索医院、药店、科室"
				/>

			</view>

		</view>



		<!-- 地图区域 -->
		<view class="map-card">

			<!-- 
				地图组件占位
				
				后续替换：
				<map></map>

				或者腾讯地图、高德地图组件
			-->

			<view class="fake-map">

				<view class="map-center">
					🗺️ 医疗地图区域
				</view>

			</view>



			<!-- 定位按钮 -->
			<view
				class="location-btn"
				@click="getLocation"
			>
				📍
			</view>

		</view>



		<!-- 快捷功能 -->
		<view class="quick-grid">

			<view
				class="quick-item"
				v-for="(item,index) in quickList"
				:key="index"
				@click="clickQuick(item)"
			>

				<view class="quick-icon">
					{{ item.icon }}
				</view>

				<view class="quick-text">
					{{ item.name }}
				</view>

			</view>

		</view>



		<!-- 附近医院 -->
		<view class="section-card">

			<view class="section-header">

				<view class="section-title">
					附近医院
				</view>

				<view
					class="more-btn"
					@click="moreHospital"
				>
					查看更多
				</view>

			</view>



			<!-- 医院列表 -->
			<view
				class="hospital-item"
				v-for="(item,index) in hospitalList"
				:key="index"
				@click="goHospital(item)"
			>

				<!-- 图标 -->
				<view class="hospital-icon">
					🏥
				</view>



				<!-- 信息 -->
				<view class="hospital-info">

					<view class="hospital-name">
						{{ item.name }}
					</view>

					<view class="hospital-desc">
						{{ item.level }}
					</view>

					<view class="hospital-distance">
						📍 {{ item.distance }}
					</view>

				</view>



				<!-- 导航 -->
				<view class="nav-btn">
					导航
				</view>

			</view>

		</view>



		<!-- 急诊 -->
		<view class="emergency-card">

			<view class="emergency-title">
				急诊绿色通道
			</view>

			<view class="emergency-desc">
				快速联系附近急诊医院与120
			</view>



			<view
				class="emergency-btn"
				@click="callEmergency"
			>
				立即呼叫
			</view>

		</view>

	</view>

</template>

<script setup>



const quickList = [

	{
		icon:'🏥',
		name:'医院'
	},

	{
		icon:'💊',
		name:'药店'
	},

	{
		icon:'🚑',
		name:'急诊'
	},

	{
		icon:'🩺',
		name:'体检'
	}

]



const hospitalList = [

	{
		name:'人民医院',
		level:'三甲综合医院',
		distance:'1.2km'
	},

	{
		name:'中心医院',
		level:'三级医院',
		distance:'2.5km'
	},

	{
		name:'华康医院',
		level:'专科医院',
		distance:'3.8km'
	}

]



/* 定位 */

function getLocation(){

	uni.showToast({

		title:'定位中',

		icon:'none'

	})

}



/* 快捷功能 */

function clickQuick(item){

	uni.showToast({

		title:item.name,

		icon:'none'

	})

}



/* 更多医院 */

function moreHospital(){

	uni.showToast({

		title:'查看更多医院',

		icon:'none'

	})

}



/* 医院详情 */

function goHospital(item){

	uni.showToast({

		title:item.name,

		icon:'none'

	})

}



/* 急诊 */

function callEmergency(){

	uni.showModal({

		title:'急诊呼叫',

		content:'是否拨打120急救电话？',

		success(res){

			if(res.confirm){

				uni.makePhoneCall({

					phoneNumber:'120'

				})

			}

		}

	})

}

</script>

<style lang="scss">

.page{

	min-height:100vh;

	background:#f5f7fb;

	padding-bottom:40rpx;

}



/* 顶部 */

.top-bg{

	padding:70rpx 30rpx 120rpx;

	background:linear-gradient(
		135deg,
		#64d38a,
		#3dbb73
	);

	border-bottom-left-radius:40rpx;

	border-bottom-right-radius:40rpx;

}



.page-title{

	font-size:52rpx;

	font-weight:bold;

	color:white;

}



.page-desc{

	margin-top:14rpx;

	font-size:26rpx;

	color:rgba(255,255,255,0.92);

}



/* 搜索 */

.search-box{

	margin-top:-70rpx;

	padding:0 30rpx;

}



.search-inner{

	height:90rpx;

	background:white;

	border-radius:26rpx;

	display:flex;

	align-items:center;

	padding:0 24rpx;

	box-shadow:0 8rpx 30rpx rgba(0,0,0,0.05);

}



.search-icon{

	font-size:30rpx;

	color:#999;

}



.search-input{

	flex:1;

	height:90rpx;

	margin-left:16rpx;

	font-size:28rpx;

}



/* 地图 */

.map-card{

	margin:30rpx;

	position:relative;

}



.fake-map{

	height:420rpx;

	background:#dde7df;

	border-radius:34rpx;

	display:flex;

	align-items:center;

	justify-content:center;

}



.map-center{

	font-size:36rpx;

	color:#666;

}



.location-btn{

	position:absolute;

	right:24rpx;

	bottom:24rpx;

	width:84rpx;

	height:84rpx;

	background:white;

	border-radius:50%;

	display:flex;

	align-items:center;

	justify-content:center;

	font-size:36rpx;

	box-shadow:0 6rpx 20rpx rgba(0,0,0,0.08);

}



/* 快捷 */

.quick-grid{

	margin:0 30rpx;

	display:grid;

	grid-template-columns:repeat(4,1fr);

	gap:20rpx;

}



.quick-item{

	background:white;

	border-radius:28rpx;

	padding:28rpx 0;

	display:flex;

	flex-direction:column;

	align-items:center;

}



.quick-icon{

	font-size:46rpx;

}



.quick-text{

	margin-top:12rpx;

	font-size:24rpx;

	color:#555;

}



/* 区块 */

.section-card{

	margin:30rpx;

	background:white;

	border-radius:34rpx;

	padding:30rpx;

}



.section-header{

	display:flex;

	align-items:center;

	justify-content:space-between;

	margin-bottom:20rpx;

}



.section-title{

	font-size:34rpx;

	font-weight:bold;

	color:#222;

}



.more-btn{

	font-size:24rpx;

	color:#49b96e;

}



/* 医院 */

.hospital-item{

	display:flex;

	align-items:center;

	padding:24rpx 0;

	border-bottom:1rpx solid #f3f3f3;

}



.hospital-item:last-child{

	border:none;

}



.hospital-icon{

	width:90rpx;

	height:90rpx;

	background:#edf8f1;

	border-radius:24rpx;

	display:flex;

	align-items:center;

	justify-content:center;

	font-size:42rpx;

}



.hospital-info{

	flex:1;

	margin-left:20rpx;

}



.hospital-name{

	font-size:30rpx;

	font-weight:bold;

	color:#222;

}



.hospital-desc{

	margin-top:8rpx;

	font-size:24rpx;

	color:#888;

}



.hospital-distance{

	margin-top:8rpx;

	font-size:22rpx;

	color:#999;

}



.nav-btn{

	width:110rpx;

	height:64rpx;

	background:#49b96e;

	border-radius:18rpx;

	display:flex;

	align-items:center;

	justify-content:center;

	color:white;

	font-size:24rpx;

}



/* 急诊 */

.emergency-card{

	margin:30rpx;

	background:linear-gradient(
		135deg,
		#ff8b8b,
		#ff6464
	);

	border-radius:34rpx;

	padding:34rpx;

	color:white;

}



.emergency-title{

	font-size:38rpx;

	font-weight:bold;

}



.emergency-desc{

	margin-top:14rpx;

	font-size:26rpx;

	opacity:0.92;

}



.emergency-btn{

	margin-top:28rpx;

	height:84rpx;

	background:white;

	border-radius:24rpx;

	display:flex;

	align-items:center;

	justify-content:center;

	color:#ff5d5d;

	font-size:30rpx;

	font-weight:bold;

}

</style>