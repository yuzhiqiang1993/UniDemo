<template>


	<view class="container">



		<!-- 用户信息 -->
		<view class="layout_user_info">

			<view class="layout_input">
				<text>您的姓名</text>
				<input placeholder="请输入" />
			</view>

			<view class="layout_input">
				<text>联系电话</text>
				<input placeholder="请输入" type="number" />
			</view>
		</view>


		<!-- 意见内容 -->
		<view class="layout_feed_back">

			<text>意见内容</text>
			<textarea placeholder="请输入" />

			</view>
			
			
		<button type="primary" @click="submit" style="width: 80%;background-color: #022456;margin-top: 60rpx;">确定</button>
			
	</view>




</template>

<script>
	export default{
		methods:{
			submit:function () {
				uni.showToast({
					title:"提交"
				})
			}
		}
	}
</script>

<style>
	.container {
		display: flex;
		flex-direction: column;
		height: 100%;
		width: 100%;
		background-color: #FAFAFA;
	}
	
	.layout_user_info {
		display: flex;
		background: #FFFFFF;
		flex-direction: column;
		padding-left: 30rpx;
		padding-right: 30rpx;
	}

	.layout_input {
		height: 92rpx;
		width: 100%;
		display: flex;
		flex-direction: row;

	}

	.layout_input text {
		height: 92rpx;
		display: block;
		line-height: 92rpx;
		align-content: center;
		text-align: center;

	}

	.layout_input input {
		flex: 1;
		height: 92rpx;
		margin-left: 30rpx;
		line-height: 92rpx;
		padding-left: 15rpx;
	}

	.layout_feed_back {
		display: flex;
		flex-direction: column;
		margin-top: 12rpx;
		height: 220rpx;
		background: #FFFFFF;
		padding-left: 30rpx;
		padding-right: 30rpx;
	}

	.layout_feed_back textarea {
		padding-top: 10rpx;
		flex: 1;

	}
	
</style>
