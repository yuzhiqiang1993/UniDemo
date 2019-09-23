<template>


	<view class="container">



		<!-- 用户信息 -->
		<view class="layout_user_info">

			<view class="layout_input">
				<text>您的姓名</text>
				<input placeholder="请输入" type="text" v-model="userName" />
			</view>

			<view class="layout_input">
				<text>联系电话</text>
				<input placeholder="请输入" type="number" v-model="userPhone" />
			</view>
		</view>



		<!-- 器材信息 -->


		<view class="layout_instrument" v-for="item of instruments" :key="item.index">


			<view class="layout_input">

				<text>器材编号</text>
				<input placeholder="请输入器材编号" type="number" v-model="instrumentCode"></text>

				<button type="primary" size="mini" style="height: 50rpx;line-height: 50rpx;justify-content: center;margin-top: 20rpx;"
				 @click="requestInstrumentInfo">确定</button>
			</view>

			<view class="layout_select">
				<text>设施名称</text>
				<text style="margin-left: 30rpx;">{{item.FacilitiesName}}</text>

			</view>


			<view class="layout_select">
				<text>器材名称</text>
				<text>{{item.name}}</text>

			</view>

			<view class="layout_input">
				<text>故障描述</text>
				<input placeholder="请输入" />
			</view>

		</view>

		<view class="layout_btn">
			<button type="default" size="mini" plain="true" @click="add" style="width: 40%;">添加</button>
			<button type="primary" size="mini" @click="submit" style="width: 40%;background: #022456;">确定</button>
		</view>



	</view>




</template>

<script>
	export default {
		data() {
			return {
				"instruments": [{
						"ID": 1,
						"InstrumentCode": "22222222",
						"FacilitiesName": "dfdfsafdsa"
					}

				],

				"instrumentCode": "111",
				"userName": "",
				"userPhone": ""
			}
		},
		methods: {
			submit: function() {

				if (this.userName === "" || this.userPhone == "") {
					uni.showModal({
						title: "提示",
						content: "请输入您的姓名和联系电话",
						showCancel: false

					})
				}


			},
			add: function() {
				uni.showToast({
					title: "添加"
				})
			},
			requestInstrumentInfo: function() {
				uni.showToast({
					title: this.instrumentCode
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
		align-content: center;

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


	.layout_facility_info {
		background: #FFFFFF;
		display: flex;
		flex-direction: column;
		margin-top: 20rpx;
		padding-left: 30rpx;
		padding-right: 30rpx;
	}

	.layout_instrument {
		background: #FFFFFF;
		display: flex;
		flex-direction: column;
		padding-left: 30rpx;
		margin-top: 20rpx;
		padding-right: 30rpx;
	}


	.layout_select {
		display: flex;
		flex-direction: row;
	}

	.layout_select text {
		height: 92rpx;
		display: block;
		line-height: 92rpx;
		align-content: center;
		text-align: center;
	}

	.layout_btn {
		display: flex;
		flex-direction: row;
		background: #FFFFFF;
		margin-top: 50rpx;
		margin-bottom: 50rpx;

	}
</style>
