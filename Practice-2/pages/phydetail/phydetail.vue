<template>
	<view class="page-wrap">
		<login @close ="showlogin=false"
		v-if="showlogin==true"
		@success = "handleLoginSuccess"
		></login>

		<!-- 用户信息 -->
		<view class="user-card">
			<image
				class="user-avatar"
				src="/static/user1.jpg"
				mode="aspectFill"
				@click="hasLogin?'':goLogin()"
			></image>

			<view class="user-info" @click="hasLogin?'':goLogin()">
				<view class="user-name" v-if="hasLogin">{{nickname}}</view>
				<view class="user-name" v-else>请登录</view>
				<view class="user-desc">
					{{gender}}  {{age}}
				</view>
			</view>

			<view class="family-switch" @click.stop="toggleFamilyDropdown">
				<view class="family-current">
					<text class="family-name">{{ currentMemberName }}</text>
					<text class="family-arrow" :class="{ 'arrow-up': familyDropdownVisible }">▼</text>
				</view>
				<view class="family-dropdown" v-if="familyDropdownVisible">
					<view
						class="family-option"
						v-for="member in familyMembers"
						:key="member.id"
						:class="{ 'is-self': member.Self, 'is-active': member.id === currentMemberId }"
						@click.stop="selectFamilyMember(member)"
					>
						<text class="family-option-name">{{ member.nickname }}</text>
						<text class="family-option-tag" v-if="member.Self">本人</text>
						<text class="family-option-tag view-tag" v-else>查看</text>
						<text class="family-option-check" v-if="member.id === currentMemberId">✓</text>
					</view>
				</view>
			</view>
		</view>

		<!-- ====================== ✅ AI健康数据分析区域（已修复） ====================== -->
		<view class="ai-analysis-card">
			<view class="ai-header">
				<view class="ai-title-row">
					<text class="ai-icon">🤖</text>
					<text class="ai-title">AI健康分析</text>
				</view>
				<view class="ai-share-btn" @click="handleShare">
					<text class="share-icon">↗</text>
					<text class="share-text">分享</text>
				</view>
			</view>
			<view class="ai-content">
				<text class="ai-summary">{{ healthDataSummary }}</text>
				<view class="ai-suggest-group" v-if="healthDataAnalyse">
					<text class="ai-sub-title">📊 健康数据分析</text>
					<text class="ai-suggest-text">{{ healthDataAnalyse }}</text>
				</view>
			</view>
			<view class="ai-footer">
				<text class="ai-disclaimer">数据仅供参考，如有不适请及时就医</text>
				<text class="ai-time">{{ updateTime }}</text>
			</view>
		</view>

		<view class="page">
			<view class="tab-wrap">
				<view
					class="tab-item"
					:class="{ active: currentTab === 0 }"
					@click="changeTab(0)"
				>
					身体数据
				</view>

				<view
					class="tab-item"
					:class="{ active: currentTab === 1 }"
					@click="changeTab(1)"
				>
					病历详情
				</view>
			</view>

			<view v-if="currentTab === 0">
				<view class="card">
					<view class="card-head">
						<text class="title">核心健康数据</text>
						<text class="date">更新时间：{{updateTime}}</text>
					</view>

					<view class="group-title-row">
						<text class="group-title">体态</text>
						<text class="group-edit" v-if="currentMemberIsSelf" @click="toggleEdit('bodyShape')">
							{{ editMode.bodyShape ? '完成' : '编辑' }}
						</text>
					</view>
					<view class="list-item" v-for="(item, i) in bodyShape" :key="i">
						<text class="name">{{item.name}}</text>
						<view class="right">
							<text class="val">{{item.value}}</text>
							<text class="unit">{{item.unit}}</text>
							<text class="tag" :class="item.color">{{item.status}}</text>
							<text class="edit-btn" v-if="currentMemberIsSelf && editMode.bodyShape" @click="goEdit('bodyShape',i)">修改</text>
						</view>
					</view>

					<view class="group-title-row">
						<text class="group-title">生命体征</text>
						<text class="group-edit" v-if="currentMemberIsSelf" @click="toggleEdit('vitalSigns')">
							{{ editMode.vitalSigns ? '完成' : '编辑' }}
						</text>
					</view>
					<view class="list-item" v-for="(item, i) in vitalSigns" :key="i">
						<text class="name">{{item.name}}</text>
						<view class="right">
							<text class="val">{{item.value}}</text>
							<text class="unit">{{item.unit}}</text>
							<text class="tag" :class="item.color">{{item.status}}</text>
							<text class="edit-btn" v-if="currentMemberIsSelf && editMode.vitalSigns" @click="goEdit('vitalSigns',i)">修改</text>
						</view>
					</view>

					<view class="group-title-row">
						<text class="group-title">生化</text>
						<text class="group-edit" v-if="currentMemberIsSelf" @click="toggleEdit('biochemistry')">
							{{ editMode.biochemistry ? '完成' : '编辑' }}
						</text>
					</view>
					<view class="list-item" v-for="(item, i) in biochemistry" :key="i">
						<text class="name">{{item.name}}</text>
						<view class="right">
							<text class="val">{{item.value}}</text>
							<text class="unit">{{item.unit}}</text>
							<text class="tag" :class="item.color">{{item.status}}</text>
							<text class="edit-btn" v-if="currentMemberIsSelf && editMode.biochemistry" @click="goEdit('biochemistry',i)">修改</text>
						</view>
					</view>

					<view class="group-title-row">
						<text class="group-title">睡眠精力</text>
						<text class="group-edit" v-if="currentMemberIsSelf" @click="toggleEdit('sleepEnergy')">
							{{ editMode.sleepEnergy ? '完成' : '编辑' }}
						</text>
					</view>
					<view class="list-item" v-for="(item, i) in sleepEnergy" :key="i">
						<text class="name">{{item.name}}</text>
						<view class="right">
							<text class="val">{{item.value}}</text>
							<text class="unit">{{item.unit}}</text>
							<text class="tag" :class="item.color">{{item.status}}</text>
							<text class="edit-btn" v-if="currentMemberIsSelf && editMode.sleepEnergy" @click="goEdit('sleepEnergy',i)">修改</text>
						</view>
					</view>

					<view class="group-title-row">
						<text class="group-title">生活习惯</text>
						<text class="group-edit" v-if="currentMemberIsSelf" @click="toggleEdit('lifestyle')">
							{{ editMode.lifestyle ? '完成' : '编辑' }}
						</text>
					</view>
					<view class="list-item" v-for="(item, i) in lifestyle" :key="i">
						<text class="name">{{item.name}}</text>
						<view class="right">
							<text class="val">{{item.value}}</text>
							<text class="unit">{{item.unit}}</text>
							<text class="tag" :class="item.color">{{item.status}}</text>
							<text class="edit-btn" v-if="currentMemberIsSelf && editMode.lifestyle" @click="goEdit('lifestyle',i)">修改</text>
						</view>
					</view>

					<view class="group-title-row">
						<text class="group-title">主观症状自评</text>
						<text class="group-edit" v-if="currentMemberIsSelf" @click="toggleEdit('symptom')">
							{{ editMode.symptom ? '完成' : '编辑' }}
						</text>
					</view>
					<view class="list-item" v-for="(item, i) in symptom" :key="i">
						<text class="name">{{item.name}}</text>
						<view class="right">
							<text class="val">{{item.value}}</text>
							<text class="unit">{{item.unit}}</text>
							<text class="tag" :class="item.color">{{item.status}}</text>
							<text class="edit-btn" v-if="currentMemberIsSelf && editMode.symptom" @click="goEdit('symptom',i)">修改</text>
						</view>
					</view>
				</view>

				<view class="card">
					<view class="title">体检指标趋势</view>
					<view class="chart-box">
						<view class="line one"></view>
						<view class="line two"></view>
						<view class="line three"></view>
					</view>
				</view>

				<view class="card">
					<view class="title">健康状况总结</view>
					<text class="desc">{{healthSummary}}</text>
				</view>
				
				<view class="asitotal">
					<pinfen 
						:categories="['睡眠', '情绪', '运动', '饮食', '心率']"
						:scoreData="[10, 100, 100, 100, 100]"
					/>
				</view>
			</view>

			<view v-if="currentTab === 1">
				<view
					class="card"
					v-for="(item,index) in records"
					:key="index"
				>
					<view style="display:flex;justify-content:space-between;">
						<view class="title">就诊信息</view>
						<view class="detail-btn" @click="toggle(index)">
							{{ item.open ? '收起' : '详情' }}
						</view>
					</view>

					<view class="hospital">
						<text class="hos-name">{{item.hospitalName}}</text>
						<text class="tag green">门诊</text>
					</view>

					<text class="sub">就诊日期：{{item.visitDate}}</text>
					<text class="sub">科室：{{item.departmentName}}　医生：{{item.doctorName}}</text>

					<view v-if="item.open">
						<view class="card mini-card">
							<view class="title">主诉</view>
							<text class="desc">{{item.mainReason}}</text>
						</view>

						<view class="card mini-card">
							<view class="title">诊断结果</view>
							<text class="big-text">{{item.diagnosisResult}}</text>
						</view>

						<view class="card mini-card">
							<view class="title">医生建议</view>
							<view class="li">• {{item.doctorAdvice}}</view>
						</view>
					</view>						
				</view>
			</view>
			
			<view class="bottom-space"></view>
		</view>	
		
	</view>
</template>

<script setup>
import { ref, reactive, computed, onMounted} from 'vue'
import { onShow } from '@dcloudio/uni-app'
/* 登录状态 */
const hasLogin = ref(false)
const showlogin = ref(false)

/* 当前展示用户 */
const username = ref('')
const age = ref('')
const gender = ref('')
const nickname = ref('')

/* 当前家庭成员id */
const currentMemberId = ref('')
const currentMemberIsSelf = ref(false)

/* 家庭成员 */
const familyMembers = ref([])

/* 家庭菜单 */
const familyDropdownVisible = ref(false)

/* tab */
const currentTab = ref(0)

/* 更新时间 */
const updateTime = ref('')

/* 编辑模式 */
const editMode = reactive({
	bodyShape: false,
	vitalSigns: false,
	biochemistry: false,
	sleepEnergy: false,
	lifestyle: false,
	symptom: false
})

/* 健康数据 */
const bodyShape = ref([])
const vitalSigns = ref([])
const biochemistry = ref([])
const sleepEnergy = ref([])
const lifestyle = ref([])
const symptom = ref([])
const healthSummary = ref('')
const records = ref([])

// ====================== ✅ AI 分析变量（已修复） ======================
const healthDataSummary = ref('')
const dietSuggestions = ref('')
const liveSuggestions = ref('')
const exerciseSuggestions = ref('')
const healthDataAnalyse = ref('')

/* ====================== ✅ AI分析（已修复） ====================== */
const aiAnalysis = async (familyUserId) => {
	const token = uni.getStorageSync('token')
	try {
		const res = await uni.request({
			url:"http://localhost:8080/phy/aimsg",
			method:"GET",
			header:{ token },
			data:{ id: familyUserId }
		})
		
		if (!res || res.data.code != 200) {
			uni.showToast({ title:'获取AI分析失败', icon:'none' })
			return
		}

		// 赋值数据
		healthDataSummary.value = res.data.data.healthDataSummary
		healthDataAnalyse.value = res.data.data.healthDataAnalyse

	} catch (e) {
		console.log("AI分析异常：", e)
	}
}

/* 当前成员名称 */
const currentMemberName = computed(() => {
	const member = familyMembers.value.find(item => item.id == currentMemberId.value)
	return member ? member.nickname : '未知用户'
})

/* 页面加载 */
onMounted(() => {
	const token = uni.getStorageSync('token')
	if(token){
		hasLogin.value = true
		initUserData()
	}
	else
	initUserData()

})
onShow(()=>{
	const token = uni.getStorageSync('token')
	if(token){
		hasLogin.value = true
		initUserData()
	}	
	else
	initUserData()
})

/* 登录成功 */
const handleLoginSuccess = () => {
	hasLogin.value = true
	showlogin.value = false
	initUserData()
	uni.showToast({ title:'登录成功', icon:'success' })
}

/* 初始化用户数据 */
const initUserData = async () => {
	try{
		const token = uni.getStorageSync('token')
		const res = await uni.request({
			url:'http://localhost:8080/family/info',
			method:'GET',
			header:{ token }
		})
		if(res.data.code != 200){
			uni.showToast({ title:'获取信息失败', icon:'none' })
			return
		}
		const data = res.data.data
		nickname.value = currentMemberName
		age.value = data.self.age+"岁"
		gender.value = data.self.gender == 1 ? "男" : "女"
		familyMembers.value = data.familyList
		currentMemberId.value = data.self.id
		currentMemberIsSelf.value = data.self.Self
		getHealthData(data.self.id)
		getMedicalRecord(data.self.id)
		aiAnalysis(data.self.id)
	}catch(e){
		console.log(e)
	}
}

/* 获取健康数据 */
const getHealthData = async (familyUserId) => {
	try{
		const token = uni.getStorageSync('token')
		const res = await uni.request({
			url:'http://localhost:8080/family/gethd',
			method:'GET',
			header:{ token },
			data:{ familyUserId }
		})
		if(res.data.code != 200) {
			uni.showToast({ title:res.data.message, icon:'none' })
			return
		}
		const h = res.data.data
		updateTime.value = h.recordDate + ' ' + h.upDateTime

		bodyShape.value = [
			{ name:'身高', value:h.height, unit:'cm', status:'正常', color:'green' },
			{ name:'体重', value:h.weight, unit:'kg', status:'正常', color:'green' },
			{ name:'BMI', value:h.bmi, unit:'', 
				status: h.bmi>=28 ? '肥胖' : h.bmi>=24 ? '超重' : '正常', 
				color: h.bmi>=28 ? 'red' : h.bmi>=24 ? 'orange' : 'green' },
			{ name:'体脂率', value:h.bodyFatRate, unit:'%', status:'正常', color:'green' },
			{ name:'腰围', value:h.waistline, unit:'cm', status:'正常', color:'green' },
			{ name:'腰臀比', value:h.waistHipRatio, unit:'', status:'正常', color:'green' },
		]

		vitalSigns.value = [
			{ name:'血压', value:`${h.systolicPressure}/${h.diastolicPressure}`, unit:'mmHg', 
				status: h.systolicPressure>=160||h.diastolicPressure>=100 ? '偏高' : 
				       h.systolicPressure>=140||h.diastolicPressure>=90 ? '临界' : '正常', 
				color: h.systolicPressure>=160||h.diastolicPressure>=100 ? 'red' : 
				       h.systolicPressure>=140||h.diastolicPressure>=90 ? 'orange' : 'green' },
			{ name:'心率', value:h.restingHeartRate, unit:'次/分', 
				status: h.restingHeartRate>110 ? '过快' : h.restingHeartRate>100 ? '偏快' : '正常', 
				color: h.restingHeartRate>110 ? 'red' : h.restingHeartRate>100 ? 'orange' : 'green' },
			{ name:'血氧', value:h.bloodOxygen, unit:'%', 
				status: h.bloodOxygen<90 ? '危险' : h.bloodOxygen<95 ? '偏低' : '正常', 
				color: h.bloodOxygen<90 ? 'red' : h.bloodOxygen<95 ? 'orange' : 'green' },
			{ name:'体温', value:h.bodyTemperature, unit:'℃', 
				status: h.bodyTemperature>38.5 ? '高烧' : h.bodyTemperature>37.3 ? '低热' : '正常', 
				color: h.bodyTemperature>38.5 ? 'red' : h.bodyTemperature>37.3 ? 'orange' : 'green' },
		]

		biochemistry.value = [
			{ name:'空腹血糖', value:h.fastingBloodGlucose, unit:'mmol/L', 
				status: h.fastingBloodGlucose>7.0 ? '高血糖' : h.fastingBloodGlucose>6.1 ? '偏高' : '正常', 
				color: h.fastingBloodGlucose>7.0 ? 'red' : h.fastingBloodGlucose>6.1 ? 'orange' : 'green' },
			{ name:'总胆固醇', value:h.totalCholesterol, unit:'mmol/L', 
				status: h.totalCholesterol>5.7 ? '偏高' : '正常', 
				color: h.totalCholesterol>5.7 ? 'orange' : 'green' },
			{ name:'尿酸', value:h.uricAcid, unit:'μmol/L', 
				status: h.uricAcid>480 ? '偏高' : '正常', 
				color: h.uricAcid>480 ? 'orange' : 'green' },
			{ name:'尿糖', value:h.urineGlucose, unit:'', 
				status: h.urineGlucose!='阴性' ? '异常' : '正常', 
				color: h.urineGlucose!='阴性' ? 'red' : 'green' },
			{ name:'尿蛋白', value:h.urineProtein, unit:'', 
				status: h.urineProtein!='阴性' ? '异常' : '正常', 
				color: h.urineProtein!='阴性' ? 'red' : 'green' },
			{ name:'潜血', value:h.occultBlood, unit:'', 
				status: h.occultBlood!='阴性' ? '异常' : '正常', 
				color: h.occultBlood!='阴性' ? 'red' : 'green' },
		]

		sleepEnergy.value = [
			{ name:'睡眠时长', value:h.sleepDuration, unit:'小时', 
				status: h.sleepDuration<6 ? '不足' : '正常', 
				color: h.sleepDuration<6 ? 'orange' : 'green' },
			{ name:'深睡占比', value:h.deepSleepRate, unit:'%', status:'正常', color:'green' },
			{ name:'入睡时间', value:h.sleepTime, unit:'', status:'正常', color:'green' },
			{ name:'失眠', value:h.insomnia==1?'是':'否', unit:'', 
				status: h.insomnia==1 ? '异常' : '正常', 
				color: h.insomnia==1 ? 'orange' : 'green' },
		]

		lifestyle.value = [
			{ name:'每日饮水', value:h.dailyWaterIntake, unit:'ml', status:'正常', color:'green' },
			{ name:'运动时长', value:h.exerciseDuration, unit:'分钟/天', status:'正常', color:'green' },
			{ name:'周运动次数', value:h.weeklyExerciseCount, unit:'次/周', status:'正常', color:'green' },
			{ name:'饮食规律', value:h.mealRegularLevel, unit:'', status:'正常', color:'green' },
			{ name:'吸烟量', value:h.smokingAmount, unit:'', status:'正常', color:'green' },
			{ name:'饮酒频率', value:h.drinkingFrequency, unit:'', status:'正常', color:'green' },
			{ name:'疲劳程度', value:h.fatigueLevel, unit:'', status:'正常', color:'green' },
		]

		symptom.value = [
			{ name:'焦虑情绪', value:h.anxietyEmotion==1?'有':'无', unit:'', 
				status: h.anxietyEmotion==1 ? '异常' : '正常', 
				color: h.anxietyEmotion==1 ? 'orange' : 'green' },
			{ name:'心悸', value:h.palpitation==1?'有':'无', unit:'', 
				status: h.palpitation==1 ? '异常' : '正常', 
				color: h.palpitation==1 ? 'orange' : 'green' },
			{ name:'胸闷', value:h.chestDistress==1?'有':'无', unit:'', 
				status: h.chestDistress==1 ? '异常' : '正常', 
				color: h.chestDistress==1 ? 'orange' : 'green' },
			{ name:'头晕', value:h.dizziness==1?'有':'无', unit:'', 
				status: h.dizziness==1 ? '异常' : '正常', 
				color: h.dizziness==1 ? 'orange' : 'green' },
			{ name:'关节痛', value:h.jointPain==1?'有':'无', unit:'', 
				status: h.jointPain==1 ? '异常' : '正常', 
				color: h.jointPain==1 ? 'orange' : 'green' },
			{ name:'胃部不适', value:h.stomachDiscomfort==1?'有':'无', unit:'', 
				status: h.stomachDiscomfort==1 ? '异常' : '正常', 
				color: h.stomachDiscomfort==1 ? 'orange' : 'green' },
			{ name:'备注', value:h.remark, unit:'', status:'正常', color:'green' },
		]

	}catch(e){
		console.log(e)
		uni.showToast({ title:'网络错误', icon:'none' })
	}
}

const getMedicalRecord = async (familyUserId) => {
	try{
		const token = uni.getStorageSync('token')
		const res = await uni.request({
			url:'http://localhost:8080/family/record',
			method:'GET',
			header:{ token },
			data:{ familyUserId }
		})
		if(res.data.code === 200){
			records.value = res.data.data.map(item => {
				return { ...item, open: false }
			})
		}
	}catch(e){
		console.log(e)
	}
}

const goLogin = () => { showlogin.value = true }
const toggleFamilyDropdown = () => { familyDropdownVisible.value = !familyDropdownVisible.value }

const selectFamilyMember = (member) => {
	familyDropdownVisible.value = false
	currentMemberId.value = member.id
	currentMemberIsSelf.value = member.self
	username.value = member.username
	nickname.value = member.nickname
	age.value = member.age+"岁"
	gender.value = member.gender == 2 ? "女" : "男"
	getHealthData(member.id)
	getMedicalRecord(member.id)
	aiAnalysis(member.id)
}

const changeTab = (index) => { currentTab.value = index }
const toggleEdit = (key) => { editMode[key] = !editMode[key] }
const goEdit = (type, index) => {}
const handleShare = () => { uni.showToast({ title:'分享成功', icon:'success' }) }
const toggle = (index) => { records.value[index].open = !records.value[index].open }
</script>

<style lang="scss">
page{ background:#f7f8f6; }
.page-wrap{ padding:24rpx; }
.user-card{ background:#fff; border-radius:28rpx; padding:24rpx; display:flex; align-items:center; margin-bottom:24rpx; box-shadow:0 8rpx 20rpx rgba(0,0,0,.03); }
.user-avatar{ width:96rpx; height:96rpx; border-radius:50%; background:#eee; margin-right:20rpx; }
.user-info{ flex:1; }
.user-name{ font-size:34rpx; font-weight:bold; color:#222; }
.user-desc{ font-size:24rpx; color:#888; margin-top:10rpx; }

.family-switch { position:relative; margin-left:16rpx; z-index:100; }
.family-current { display:flex; align-items:center; padding:10rpx 20rpx; background:#f0faf3; border:2rpx solid #d4edda; border-radius:30rpx; }
.family-name { font-size:24rpx; color:#333; font-weight:500; margin-right:6rpx; white-space:nowrap; }
.family-arrow { font-size:18rpx; color:#6fb682; transition:.25s; }
.arrow-up { transform:rotate(180deg); }
.family-dropdown { position:absolute; top:calc(100% + 8rpx); right:0; min-width:230rpx; background:#fff; border-radius:16rpx; box-shadow:0 12rpx 32rpx rgba(0,0,0,.12); overflow:hidden; animation:fadeInDown .2s; }
.family-option { display:flex; align-items:center; padding:18rpx 24rpx; font-size:26rpx; color:#333; border-bottom:1rpx solid #f5f5f5; }
.family-option:last-child{ border-bottom:none; }
.family-option.is-active { background:#e8f6ec; color:#2d8a4e; }
.family-option-name { flex:1; }
.family-option-tag { font-size:20rpx; color:#6fb682; background:#e8f6ec; padding:4rpx 12rpx; border-radius:20rpx; margin-left:10rpx; }
.view-tag { color:#888; background:#f5f5f5; }
.family-option-check { font-size:22rpx; color:#2d8a4e; margin-left:10rpx; font-weight:600; }

/* ====================== ✅ AI 样式（已修复） ====================== */
.ai-analysis-card { background:linear-gradient(135deg,#f8fdf9 0%,#f0faf3 100%); border-radius:24rpx; padding:24rpx; margin-bottom:24rpx; border:2rpx solid #e0f0e4; box-shadow:0 8rpx 20rpx rgba(0,0,0,.03); }
.ai-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:16rpx; }
.ai-title-row { display:flex; align-items:center; }
.ai-icon { font-size:34rpx; margin-right:10rpx; }
.ai-title { font-size:30rpx; font-weight:600; color:#2d8a4e; }
.ai-share-btn { display:flex; align-items:center; padding:10rpx 22rpx; background:#6fb682; border-radius:30rpx; color:#fff; }
.share-icon{ margin-right:6rpx; }
.ai-content { margin-bottom:14rpx; }
.ai-summary { font-size:28rpx; color:#333; line-height:1.7; margin-bottom:20rpx; display:block; }
.ai-suggest-group { margin-top:20rpx; }
.ai-sub-title { font-size:26rpx; font-weight:bold; color:#2d8a4e; margin-bottom:8rpx; display:block; }
.ai-suggest-text { font-size:26rpx; color:#555; line-height:1.7; display:block; }
.ai-footer { display:flex; justify-content:space-between; align-items:center; padding-top:12rpx; border-top:1rpx solid #e0f0e4; }
.ai-disclaimer { font-size:20rpx; color:#aaa; }
.ai-time{ font-size:20rpx; color:#888; }

.tab-wrap{ display:flex; background:#fff; border-radius:26rpx; padding:8rpx; margin-bottom:24rpx; box-shadow:0 8rpx 20rpx rgba(0,0,0,.03); }
.tab-item{ flex:1; text-align:center; padding:22rpx 0; font-size:30rpx; color:#777; }
.active{ color:#24b35a; font-weight:bold; border-bottom:4rpx solid #24b35a; }

.card{ background:#fff; border-radius:28rpx; padding:28rpx; margin-bottom:24rpx; box-shadow:0 8rpx 20rpx rgba(0,0,0,.03); }
.card-head{ display:flex; justify-content:space-between; align-items:center; margin-bottom:20rpx; }
.title{ font-size:32rpx; font-weight:bold; color:#222; }
.date{ font-size:24rpx; color:#888; }
.group-title-row{ display:flex; justify-content:space-between; align-items:center; margin:30rpx 0 16rpx; }
.group-title{ font-size:26rpx; color:#24b35a; font-weight:bold; }
.group-edit{ font-size:24rpx; color:#4a8cff; padding:4rpx 10rpx; }
.list-item{ display:flex; justify-content:space-between; align-items:center; padding:24rpx 0; border-bottom:1rpx solid #f0f0f0; }
.list-item:last-child{ border-bottom:none; }
.list-item .name{ font-size:28rpx; color:#333; flex:1; }
.list-item .right{ display:flex; align-items:center; gap:12rpx; }
.list-item .val{ font-size:28rpx; font-weight:bold; color:#222; }
.list-item .unit{ font-size:22rpx; color:#888; }

.tag{ padding:6rpx 14rpx; border-radius:999rpx; font-size:22rpx; }
.green{ background:#e8f8ee; color:#24b35a; }
.orange{ background:#fff3e0; color:#ff9500; }
.red{ background:#fee; color:#f53f3f; }

.edit-btn{ font-size:24rpx; color:#4a8cff; padding:4rpx 10rpx; }
.chart-box{ height:260rpx; background:#fafafa; border-radius:20rpx; position:relative; overflow:hidden; margin-top:20rpx; }
.line{ position:absolute; left:30rpx; right:30rpx; height:4rpx; border-radius:20rpx; }
.one{ top:80rpx; background:#4a8cff; transform:rotate(-8deg); }
.two{ top:140rpx; background:#24b35a; transform:rotate(2deg); }
.three{ top:200rpx; background:#8f5cff; transform:rotate(-2deg); }
.desc{ font-size:28rpx; color:#555; line-height:44rpx; }
.hospital{ display:flex; justify-content:space-between; align-items:center; margin-top:20rpx; margin-bottom:14rpx; }
.hos-name{ font-size:34rpx; font-weight:bold; color:#222; }
.big-text{ font-size:36rpx; font-weight:bold; margin-top:12rpx; color:#222; }
.li{ font-size:28rpx; color:#555; line-height:46rpx; }
.detail-btn{ color:#24b35a; font-size:28rpx; }
.bottom-space{ height:190rpx; }
.asitotal{ display:flex; min-height:100vh; width:725rpx; }

@keyframes fadeInDown { from{opacity:0;transform:translateY(-10rpx);} to{opacity:1;transform:translateY(0);} }
</style>