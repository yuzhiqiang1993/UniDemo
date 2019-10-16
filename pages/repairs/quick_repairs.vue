<template>


	<view class="container">



		<!-- 用户信息 -->
		<view class="layout_user_info">

			<view class="layout_input">
				<text>您的姓名</text>
				<input placeholder="请输入" type="text" v-model="this.userName" />
			</view>

			<view class="layout_input">
				<text>联系电话</text>
				<input placeholder="请输入" type="number" v-model="this.userPhone" />
			</view>
		</view>



		<!-- 器材信息 -->


		<view class="layout_instrument" v-for="(item,index) of instruments" :key="item.index">


			<view class="layout_input">

				<text>器材编号</text>
				<input placeholder="请输入器材编号" type="text" @input="changeInstrumentCode" :value="item.InstrumentCode" />

				<button type="primary" size="mini" style="height: 50rpx;line-height: 50rpx;justify-content: center;margin-top: 20rpx;"
				 @click="requestInstrumentInfo(index)">确定</button>
			</view>

			<view class="layout_select">
				<text>设施名称</text>
				<text style="margin-left: 45rpx;">{{item.FacilitiesName}}</text>

			</view>


			<view class="layout_select">
				<text>器材名称</text>
				<text style="margin-left: 45rpx;">{{item.InstrumentName}}</text>

			</view>

			<view class="layout_input">
				<text>故障描述</text>

				<input placeholder="请输入" type="text" @input="changeDamage($event,index)" />
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
				"instruments": [],
				"InstrumentCode": "",
				"userName": "",
				"userPhone": "",
				"DamageInformation": ""
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

					return
				}

				if (this.instruments.length == 0) {
					uni.showModal({
						title: "提示",
						content: "您还没有填写器材信息，请检查",
						showCancel: false
					})

					return
				}

				var instrument = this.instruments[this.instruments.length - 1]

				if (!instrument.InstrumentCode || !instrument.DamageInformation) {

					uni.showToast({
						title: "器材信息不完整，请检查",
						icon: "none"
					})


					return
				}

				var data = {
					"Applicant": this.userName,
					"ApplicantPhone": this.userPhone,
					"EquipmentInformation":JSON.stringify(this.instruments) 
				}


				console.log("要提交的数据" + JSON.stringify(data))



				uni.showLoading({
					title: "正在提交数据"
				})
				this.$api.submitRepairs(data).then((res) => {
					console.log(res)
					uni.hideLoading()
					
					
					uni.showModal({
						title:"提示",
						content:"提交成功",
						showCancel:false,
						success: () => {
							uni.navigateBack({
								
							})
						}
					})

				}).catch((err) => {
					uni.hideLoading()

					uni.showToast({
						title: err.Message,
						icon: "none",
						mask: true
					})

					console.log('request fail', err);
				})




			},

			changeInstrumentCode: function(e) {
				console.log(e.detail.value)
				this.InstrumentCode = e.detail.value
				this.DamageInformation = e.detail.value

			},

			changeDamage: function(e, index) {
				console.log(index)
				console.log(e)

				this.$set(this.instruments[index], "DamageInformation", e.detail.value)


			},



			add: function() {

				// debugger
				var instrument = this.instruments[this.instruments.length - 1]
				console.log(instrument)
				/* 先判断列表中数据是否完整 */

				if (this.instruments.length === 0) {
					this.instruments.push({
						ID: 0,
						InstrumentCode: "",
						InstrumentName: "",
						FacilitiesName: "",
						DamageInformation: ""
					})

				} else {

					console.log(instrument.DamageInformation)

					if (!instrument.InstrumentCode || !instrument.DamageInformation) {

						uni.showToast({
							title: "请先完成上个器材",
							icon: "none"
						})


					} else {

						this.instruments.push({
							ID: 0,
							InstrumentCode: "",
							InstrumentName: "",
							FacilitiesName: ""
						})

					}
				}





				/* {ID: 5419, InstrumentCode: "08M08MJYZJW060106", InstrumentName: "太极云手", FacilitiesName: "南方城健身苑点A"} */



			},
			requestInstrumentInfo: function(index) {


				console.log("下标：" + index)


				/* 先判断编号是否为空 */

				console.log(this.InstrumentCode)


				uni.showLoading({
					title: "正在获取器材"
				})

				this.$api.getInfoByNumber({
					"InstrumentCode": this.InstrumentCode
				}).then((res) => {

					this.$set(this.instruments, index, res)

					uni.hideLoading()

				}).catch((err) => {
					uni.hideLoading()

					uni.showToast({
						title: err.Message,
						icon: "none",
						mask: true
					})

					console.log('request fail', err);
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
