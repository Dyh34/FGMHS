<template>
	<view class="life-plan">
		<view class="plan-title">
			<view class="title-icon">🏠</view>
			<view class="title-text">生活计划</view>
		</view>
		<view class="plan-content">
			<view v-if="planItems && planItems.length > 0">
				<view v-for="(item, index) in planItems" :key="index" class="plan-item">
					<view class="item-dot"></view>
					<view class="item-content">{{ item }}</view>
				</view>
			</view>
			<view v-else class="plan-empty">
				暂无生活计划
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "life-plan",
		props: {
			planItems: {
				type: Array,
				default: () => []
			}
		}
	}
</script>

<style lang="scss">
	.life-plan {
		margin-top: 20rpx;
		padding: 20rpx;
		background-color: white;
		border-radius: 12rpx;
		box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.08);

		.plan-title {
			display: flex;
			align-items: center;
			margin-bottom: 16rpx;

			.title-icon {
				font-size: 32rpx;
				margin-right: 12rpx;
			}

			.title-text {
				font-size: 28rpx;
				font-weight: 600;
				color: #333;
			}
		}

		.plan-content {
			.plan-item {
				display: flex;
				align-items: flex-start;
				margin-bottom: 12rpx;

				.item-dot {
					width: 12rpx;
					height: 12rpx;
					background-color: #FF9800;
					border-radius: 50%;
					margin-top: 8rpx;
					margin-right: 12rpx;
				}

				.item-content {
					font-size: 24rpx;
					color: #666;
					line-height: 36rpx;
				}
			}

			.plan-empty {
				font-size: 24rpx;
				color: #999;
				text-align: center;
				padding: 20rpx 0;
			}
		}
	}
</style>