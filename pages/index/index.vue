<template>



	<view class="box">

		<image src="../../static/img/logo.png" />


		<button @click="normalReport" style="background: #022456;margin-top: 150rpx;" type="primary">常规报修</button>

		<text>进入设施点及详情进行报修</text>

		<button @click="quickReport" style="background: #0090FF;margin-top: 60rpx;" type="primary">极速报修</button>
		<text>直接进入报修页面，输入器材编号进行报修</text>
	</view>


</template>

<script>
	export default {
		methods: {
			normalReport: function() {

				uni.navigateTo({
					url: "../task/task"
				})
			},
			quickReport:function () {
				uni.navigateTo({
					url:"../repairs/quick_repairs"
				})
			}
		}
	}
</script>

<style>
	.box {

		display: flex;
		justify-content: center;
		align-items: center;
		align-content: center;
		flex-direction: column;
	}


	image {
		display: block;
		/* width: 60%; */
		flex: 1;
		margin-top: 80rpx;

	}

	button {
		width: 80%;

	}



	text {
		color: #919191;
		font-size: 18rpx;
	}
</style>
