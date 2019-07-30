<template>
	<scroll-view scroll-y="true">

		<view class="container">

			<!-- 设施点信息 -->
			<view class="facilityInfo">

				<!-- 图片 -->
				<image class="img" src='http://pic23.nipic.com/20120830/9686992_180336646144_2.jpg'></image>

				<!-- 设施名称和面积 -->
				<view class="uni-flex uni-row facilityInfoText">

					<text class="textTitle uni-title">{{facility.FacilitiesName}}</text>
					<text class="activityArea uni-text uni-text-gray">{{facility.ActivityArea}}平方米</text>
				</view>

				<!-- 开放时间 -->
				<view class="uni-flex uni-row openTime"></view>

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
						<!-- 	<image :src="item.InstrumentImage"></image> -->
						<image src='http://pic23.nipic.com/20120830/9686992_180336646144_2.jpg' mode="scaleToFill" class="uni-media-list-logo"></image>
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

			<view class="facilityInfo" style="margin-bottom: 20rpx;margin-top: 20rpx;">
				<text class="textTitle uni-flex-item">设施信息</text>

				<text class="textContent uni-text-gray">设施类型:{{facility.FacilitiesType}}</text>
				<text class="textContent uni-text-gray">投资性质:{{facility.ConstructionProperty}}</text>
				<text class="textContent uni-text-gray">建成时间:{{facility.CompletionTime}}</text>


			</view>


		</view>

	</scroll-view>
</template>

<script>
	export default {
		data() {
			return {
				facility: {},
				instrumentList: []
			}
		},
		onLoad(data) {
			console.log(data.facilityCode)
			this.$api.taskDetails({
					 FacilitiesTypeCode: "08M08MJYZWT4501",
					// FacilitiesTypeCode: data.facilityCode
				})
				.then((res) => {
					console.log(JSON.stringify(res))
					this.facility = res
					this.instrumentList = res.EqInfo
				})

		},
		methods: {
			navication: function() {
				console.log("查看路线")
			}

		}
	}
</script>

<style>
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

		width: 690rpx;
		height: 325rpx;
		color: #F4F5F6;
		margin: 0 auto;
		border-radius: 10rpx;
	}

	.facilityInfoText {
		height: 76rpx;
		line-height: 76rpx;

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
		color: #F4F5F6;
	}

	.instrumentItem text {
		flex: 1;
		width: 100%;
		font-size: 20rpx;
		text-align: center;
		height: 30rpx;
		overflow: hidden;
	}
</style>
