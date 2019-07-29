<template>
	<scroll-view scroll-y="true">


		<view class="container">
			<!-- 图片 -->

			<image class="img" src='http://pic23.nipic.com/20120830/9686992_180336646144_2.jpg'></image>

		</view>

	</scroll-view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		onLoad(data) {
			console.log(data.facilityCode)
			this.$api.taskDetails({
					FacilitiesTypeCode: data.facilityCode
				})
				.then((res) => {
					console.log(res)
				})

		},
		methods: {

		}
	}
</script>

<style>
	.container {

		display: flex;
		justify-content: center;

		border: 1px solid red;
		background-color: #F4F5F6;
		padding: 10rpx;
		text-align: center;
	}

	.img {
		width: 690rpx;
		height: 325rpx;
		color: #F4F5F6;
		border-radius: 10rpx;
	}
</style>
