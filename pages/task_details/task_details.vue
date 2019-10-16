<template>


	<view class="page">


		<scroll-view scroll-y="true">

			<view class="container">

				<!-- 设施点信息 -->
				<view class="facilityInfo">

					<!-- 图片 -->
					<image class="img" :src='facility.PanoramicPhoto' :data-src="facility.PanoramicPhoto" @click="previewImg"></image>


					<!-- 设施名称和面积 -->
					<view class="uni-flex uni-row facilityInfoText">

						<text class="textTitle">{{facility.FacilitiesName}}</text>
						<text class="activityArea uni-text uni-text-gray">{{facility.ActivityArea}}平方米</text>
					</view>

					<!-- 开放时间 -->
					<view class="uni-flex uni-row openTime">

						<text>工作日开放时间：全天</text>
						<text style="margin-left: 30rpx;">节假日开放时间：全天</text>


					</view>

					<!-- 地址和导航  -->
					<view class="uni-flex uni-row addressLayout">

						<view class="addressLeft">
							<text class="iconfont iconlocation"></text>
							<text class="address uni-text-small uni-text-gray">{{facility.FacilitiesAddr}}</text>
						</view>

						<text class="navigation" @click="navication">查看路线</text>


					</view>


				</view>

				<!-- 器材信息 -->

				<view class="instrumentLayout">
					<text class="textTitle">器材信息</text>

					<!-- 器材列表 -->
					<view class="instrumentContent">

						<view class="instrumentItem" v-for="item of instrumentList" :key="item.id">
							<image :src="item.InstrumentImage" class="uni-media-list-logo" :data-src="item.InstrumentImage" @click="previewImg"></image>
							<!-- <image src='http://pic23.nipic.com/20120830/9686992_180336646144_2.jpg' mode="scaleToFill" class="uni-media-list-logo"></image> -->
							<text class="uni-text-small uni-text-gray">{{item.InstrumentName}}</text>
						</view>

					</view>

				</view>

				<!-- 教学视频 -->

				<view class="video">
					<text class="textTitle uni-flex-item">教学视频</text>
					<text class="watchText">点击观看</text>

					<text class="iconfont iconplay"></text>

				</view>


				<!-- 设施信息 -->

				<view class="facilityInfo" style="margin-top: 20rpx;padding-bottom: 10rpx;">
					<text class="textTitle uni-flex-item">设施信息</text>

					<text class="textContent uni-text-gray">设施类型:{{facility.FacilitiesType}}</text>
					<text class="textContent uni-text-gray">投资性质:{{facility.ConstructionProperty}}</text>
					<text class="textContent uni-text-gray">建成时间:{{facility.CompletionTime}}</text>


				</view>


			</view>

		</scroll-view>


		<!-- 底部报修和意见反馈 -->

		<view class="bottom">

			<text @click="repair">我要报修</text>
			<view class="line"></view>
			<text @click="feedback">意见反馈</text>


		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				facility: {},
				instrumentList: [],

			}
		},
		onLoad(data) {
			console.log(data.facilityCode)
			// 			this.$api.taskDetails({
			// 					// FacilitiesTypeCode: "08M08MJYZWT4501",
			// 					FacilitiesTypeCode: data.facilityCode
			// 				})
			// 				.then((res) => {
			// 
			// 
			// 					res.PanoramicPhoto = "http://operation.esplohas.com" + res.PanoramicPhoto
			// 
			// 					this.facility = res
			// 					console.log(this.facility.PanoramicPhoto)
			// 
			// 
			// 					for (let item of res.EqInfo) {
			// 						item.InstrumentImage = "http://operation.esplohas.com" + item.InstrumentImage
			// 					}
			// 
			// 					this.instrumentList = res.EqInfo
			// 
			// 					console.log(JSON.stringify(res))
			// 				})

		},
		methods: {
			navication: function() {

				if (this.facility.Coordinate == "") {
					uni.showToast({
						title: '没有经纬度数据,无法导航',
						icon: "none"
					});
					return
				}
				var location = JSON.parse(this.facility.Coordinate)

				console.log(location)

				uni.openLocation({
					latitude: parseFloat(location.latitude),
					longitude: parseFloat(location.longitude),
					address: this.facility.address,
					fail() {
						uni.showToast({
							title: '导航失败，可能是该苑点没有经纬度数据'
						});
					}
				})
			},
			previewImg: function(e) {
				console.log(e.target.dataset.src)
				uni.previewImage({
					current: e.target.dataset.src,
					urls: [e.target.dataset.src]
				})
			},
			feedback: function() {
				uni.navigateTo({
					url: '../feedback/feedback',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			repair: function() {
				uni.navigateTo({
					url: "../repairs/repairs"
				})
			}

		}
	}
</script>

<style>
	.page {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	scroll-view {
		flex: 1;
		width: 100%;
		padding-bottom: 90rpx;
	}

	.container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		background-color: #F4F5F6;
		text-align: center;
	}

	.facilityInfo {
		display: flex;
		flex-direction: column;
		background: #FFFFFF;
		padding-top: 10rpx;
		padding-left: 20rpx;
		padding-right: 20rpx;


	}


	.img {
		background: #F4F5F6;
		width: 690rpx;
		height: 325rpx;
		margin: 0 auto;
		border-radius: 10rpx;
	}

	.facilityInfoText {
		height: 76rpx;

	}

	.facilityInfo .activityArea {
		margin-left: 28rpx;
		text-align: center;
		line-height: 76rpx;

	}


	.addressLayout {
		height: 76rpx;
		margin-bottom: 20rpx;
	}

	.addressLeft {
		flex: 1;
		display: flex;
		line-height: 76rpx;
		flex-direction: row;
		justify-content: flex-start;
	}

	.iconlocation {
		color: #ABADAE;
		line-height: 76rpx;
		font-size: 24rpx;
	}

	.address {
		line-height: 76rpx;
	}


	.openTime {
		display: flex;
		height: 56rpx;
		flex-direction: row;
		justify-content: flex-start;
	}

	.openTime text {
		line-height: 56rpx;
		background: #FFF1E8;
		padding-left: 20rpx;
		padding-right: 20rpx;
		font-size: 24rpx;
		color: #888888;
	}

	.navigation {
		width: 100rpx;
		height: 40rpx;
		line-height: 40rpx;
		margin-top: 18rpx;
		align-content: center;
		font-size: 20rpx;
		color: #007AFF;
		justify-content: flex-end;
		border: 1px solid #007AFF;
		border-radius: 20rpx;
	}

	.instrumentLayout {
		display: flex;
		flex-direction: column;
		background: #FFFFFF;
		margin-top: 10rpx;
		padding-top: 10rpx;
		padding-left: 20rpx;
		padding-right: 20rpx;


	}

	.textTitle {
		font-size: 30rpx;
		color: #171717;
		font-weight: bold;
		text-align: left;
		line-height: 76rpx;
	}

	.textContent {
		font-size: 26rpx;
		text-align: left;
	}



	.video {
		display: flex;
		flex-direction: row;
		height: 76rpx;
		margin-top: 10rpx;
		background: #FFFFFF;
		padding-top: 10rpx;
		padding-left: 20rpx;
		padding-right: 20rpx;

	}

	.video .watchText {
		line-height: 76rpx;
		color: #007AFF;
		justify-content: flex-end;

	}

	.iconplay {
		height: 14rpx;
		width: 14rpx;
		align-content: center;
		justify-content: center;
		line-height: 76rpx;
		color: #007AFF;
		margin-right: 10rpx;
	}

	.instrumentContent {
		display: flex;
		justify-content: flex-start;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.instrumentItem {
		display: flex;
		flex-direction: column;
		margin: 10rpx;
		width: 120rpx;
	}

	.instrumentItem image {
		width: 100%;
		min-height: 88rpx;
		background: #F4F5F6;
	}

	.instrumentItem text {
		flex: 1;
		width: 100%;
		font-size: 20rpx;
		text-align: center;
		height: 30rpx;
		overflow: hidden;
	}

	.bottom {
		width: 100%;
		height: 90rpx;
		position: fixed;
		z-index: 100;
		bottom: 0rpx;
		background-color: #FFFFFF;
		display: flex;
		flex-direction: row;
		border-top: 1px solid #F0F0F0;
	}

	.bottom text {
		flex: 1;
		line-height: 90rpx;

		text-align: center;
	}

	.bottom .line {
		width: 1rpx;
		height: 100%;
		background: #F0F0F0;
	}
</style>
