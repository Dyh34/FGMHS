<template>
	
	<view class="pingfen">
		<view class="ptitle">
			{{ title }}
		</view>
		<view class="zhuangtai">
			<view class="z1">
				<view class="z1a">
					{{ totalScore }}
				</view>
				<view class="z1b">
					分
				</view>
			</view>
			<view class="z2">
				<view class="z2a">
					良好
				</view>
			</view>
		</view>
		<view class="tu">
			<view class="radar-container">
				<!-- 雷达图网格 -->
				<view class="radar-grid">
					<view class="radar-layer" v-for="level in 3" :key="level" :style="{ transform: `scale(${level * 0.33})` }"></view>
				</view>
				
				<!-- 固定的文字标签和值 -->
				<view class="radar-corner top">
					<view class="radar-item-box">
						<view class="radar-label">{{ radarData[0].label }}</view>
						<view class="radar-value">{{ radarData[0].value }}</view>
					</view>
				</view>
				<view class="radar-corner right">
					<view class="radar-item-box">
						<view class="radar-label">{{ radarData[1].label }}</view>
						<view class="radar-value">{{ radarData[1].value }}</view>
					</view>
				</view>
				<view class="radar-corner bottom-right">
					<view class="radar-item-box">
						<view class="radar-label">{{ radarData[2].label }}</view>
						<view class="radar-value">{{ radarData[2].value }}</view>
					</view>
				</view>
				<view class="radar-corner bottom-left">
					<view class="radar-item-box">
						<view class="radar-label">{{ radarData[3].label }}</view>
						<view class="radar-value">{{ radarData[3].value }}</view>
					</view>
				</view>
				<view class="radar-corner left">
					<view class="radar-item-box">
						<view class="radar-label">{{ radarData[4].label }}</view>
						<view class="radar-value">{{ radarData[4].value }}</view>
					</view>
				</view>
				
				<!-- 数据多边形 -->
				<view class="radar-polygon" :style="{ clipPath: getPolygonPath() }"></view>
				
				<!-- 连接线 -->
				<view class="radar-lines">
					<view v-for="(item, index) in radarData" :key="index" class="radar-line" :style="getLineStyle(index)"></view>
				</view>
			</view>
		</view>

		<!-- 计划组件 -->
		<view class="plans-container">
			<diet-plan :planItems="dietPlan" />
			<exercise-plan :planItems="exercisePlan" />
			<life-plan :planItems="lifePlan" />
		</view>
	</view>
</template>

<script>
	import dietPlan from '../diet-plan/diet-plan.vue';
	import exercisePlan from '../exercise-plan/exercise-plan.vue';
	import lifePlan from '../life-plan/life-plan.vue';

	export default {
		name: "pinfen",
		components: {
			dietPlan,
			exercisePlan,
			lifePlan
		},
		props: {
			title: {
				type: String,
				default: '本周健康评分'
			},
			categories: {
				type: Array,
				default: () => ['睡眠', '运动', '饮食', '心率', '饮水']
			},
			scoreData: {
				type: Array,
				default: () => [83, 78, 82, 90, 87]
			},
			dietPlan: {
				type: Array,
				default: () => []
			},
			exercisePlan: {
				type: Array,
				default: () => []
			},
			lifePlan: {
				type: Array,
				default: () => []
			}
		},
		computed: {
			totalScore() {
				if (this.scoreData && this.scoreData.length > 0) {
					const sum = this.scoreData.reduce((acc, val) => acc + val, 0);
					return Math.round(sum / this.scoreData.length);
				}
				return 0;
			},
			radarData() {
				return this.categories.map((category, index) => ({
					label: category,
					value: this.scoreData[index] || 0,
					ratio: (this.scoreData[index] || 0) / 100
				}));
			}
		},
		methods: {
			getLineStyle(index) {
				// 计算角度，确保最上方的线笔直向上
				const angle = (index * 72) * Math.PI / 180 - Math.PI / 2-50;
				return {
					transform: `rotate(${angle}rad)`
				};
			},
			getPolygonPath() {
				const points = this.radarData.map((item, index) => {
					// 计算角度，确保与线条角度一致
					const angle = (index * 72) * Math.PI / 180 - Math.PI / 2;
					const radius = 180 * item.ratio;
					const x = 50 + (Math.cos(angle) * radius / 360) * 100;
					const y = 50 + (Math.sin(angle) * radius / 360) * 100;
					return `${x}% ${y}%`;
				});
				return `polygon(${points.join(', ')})`;
			}
		}
	}
</script>

<style lang="scss">
	.pingfen {
		margin-left: 60rpx;
		margin-top: 40rpx;
		width: 85%;
		border: #fff solid 2rpx;
		border-radius: 2%;
		height: 750rpx;
		background-color: white;

		.ptitle {
			margin-left: 30rpx;
			margin-top: 20rpx;
			font-weight: 600;
			font-size: 29rpx;
		}

		.zhuangtai {
			justify-content: space-between;
			align-items: center;
			display: flex;
			flex-direction: row;
			margin-left: 30rpx;
			margin-top: 40rpx;

			.z1 {
				display: flex;
				flex-direction: row;

				.z1a {
					font-size: 60rpx;
					font-weight: 700;
					color: green;
				}

				.z1b {
					margin-top: 38rpx;
					margin-left: 7rpx;
				}
			}

			.z2 {
				display: flex;
				justify-content: space-around;
				align-items: center;
				margin-right: 60rpx;
				width: 130rpx;
				height: 40rpx;
				border-radius: 100rpx;
				background-color: #e8f6ec;

				.z2a {
					font-size: 18rpx;
					color: #6fb682;
					font-weight: 500;
				}
			}
		}

		.tu {
			margin-top: 20rpx;
			margin-left: 30rpx;
			width: 90%;
			height: 500rpx;

			.radar-container {
				position: relative;
				width: 100%;
				height: 100%;

				.radar-grid {
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					width: 360rpx;
					height: 360rpx;

					.radar-layer {
						position: absolute;
						top: 0;
						left: 0;
						width: 100%;
						height: 100%;
						border: 2rpx solid #e0e0e0;
						border-radius: 50%;
						transform-origin: center;
					}
				}

				.radar-lines {
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					width: 360rpx;
					height: 360rpx;

					.radar-line {
						position: absolute;
						top: 0;
						left: 50%;
						width: 2rpx;
						height: 180rpx;
						background-color: #e0e0e0;
						transform-origin: bottom center;
					}
				}

				.radar-corner {
					position: absolute;
					text-align: center;

					&.top {
						top: -10%;
						left: 50%;
						transform: translateX(-50%);
					}

					&.right {
						top: 40%;
						right: 0;
						transform: translateY(-50%);
					}

					&.bottom-right {
						bottom: 0;
						right: 20%;
						transform: translateX(50%);
					}

					&.bottom-left {
						bottom: 0;
						left: 20%;
						transform: translateX(-50%);
					}

					&.left {
						top: 40%;
						left: 0;
						transform: translateY(-50%);
					}
				}

				.radar-item-box {
					padding: 10rpx;
					background-color: rgba(255, 255, 255, 0.8);
					border-radius: 8rpx;
					box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.1);

					.radar-label {
						font-size: 24rpx;
						color: #333;
					}

					.radar-value {
						font-size: 28rpx;
						font-weight: 600;
						color: #333;
						margin-top: 8rpx;
					}
				}

				.radar-polygon {
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					width: 360rpx;
					height: 360rpx;
					background: rgba(99, 168, 255, 0.2);
					border: 2rpx solid #63a8ff;
				}

				.radar-lines {
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					width: 360rpx;
					height: 360rpx;

					.radar-line {
						position: absolute;
						top: 0;
						left: 50%;
						width: 2rpx;
						height: 180rpx;
						background-color: #e0e0e0;
						transform-origin: bottom center;
					}
				}
			}

			.plans-container {
				margin-top: 30rpx;
				padding: 0 20rpx 20rpx;
			}
			}
		}
</style>