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
		<view class="layout_instrument" v-for="(item,index) of damageInstruments" :key="item.index">

			<view class="layout_select">


				<text>器材名称</text>
				<picker mode="selector" :value="instrumentIndex" :range="instruments" range-key="InstrumentName" @change="selectInstrument($event,index)">
					<text>{{item.InstrumentName}}</text>

				</picker>
			</view>


			<view class="layout_input">
				<text>设施名称</text>
				<text style="margin-left: 45rpx;">{{item.FacilitiesName}}</text>

			</view>


			<view class="layout_input">
				<text>故障描述</text>
				<input placeholder="请输入" type="text" @input="changeDamage($event,index)" />
			</view>

			<view class="layout_img">
				<text style="line-height: 100rpx;">拍摄照片</text>

				<image style="width: 130rpx;height: 100rpx;" :src="item.DamageInfosImg" @click="takePhoto($event,index)" mode="aspectFit"></image>
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

		onLoad(data) {
			this.instruments = JSON.parse(data.instruments)
			this.facilityName = data.facilityName;
			console.log(this.instruments)
		},

		data() {
			return {
				"facilityName": "",
				"instruments": [],
				"damageInstruments": [],
				"userName": "",
				"userPhone": "",
				"instrumentIndex": 0,
			}
		},
		methods: {
			/* 提交 */
			submit: function() {

				if (this.userName === "" || this.userPhone == "") {
					uni.showModal({
						title: "提示",
						content: "请输入您的姓名和联系电话",
						showCancel: false
					})

					return
				}

				if (this.damageInstruments.length == 0) {
					uni.showModal({
						title: "提示",
						content: "您还没有填写器材信息，请检查",
						showCancel: false
					})

					return
				}

				var instrument = this.damageInstruments[this.damageInstruments.length - 1]

				if (!instrument.InstrumentCode || !instrument.DamageInformation) {

					uni.showToast({
						title: "器材信息不完整，请检查",
						icon: "none"
					})
					return
				}


				if (instrument.DamageInfosImg == "../../static/img/ic_camera_with_bg.png") {
					uni.showToast({
						title: "器材图片未拍摄，请检查",
						icon: "none"
					})

					return
				}

				var data = {
					"Applicant": this.userName,
					"ApplicantPhone": this.userPhone,
					"EquipmentInformation": JSON.stringify(this.damageInstruments)
				}


				console.log("要提交的数据" + JSON.stringify(data))


				uni.showLoading({
					title: "正在提交数据"
				})
				this.$api.submitFacilityRepairs(data).then((res) => {
					console.log(res)
					uni.hideLoading()


					uni.showModal({
						title: "提示",
						content: "提交成功",
						showCancel: false,
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

					console.log('request faile', err);
				})

			},

			add: function() {

				/* 先判断列表中数据是否完整 */
				if (this.damageInstruments.length != 0) {
					const instrument = this.damageInstruments[this.damageInstruments.length - 1]
					console.log(instrument)

					if (!instrument.InstrumentCode || !instrument.DamageInformation) {
						uni.showToast({
							title: "上个器材信息不完整，请检查",
							icon: "none"
						})
						return
					}


					if (instrument.DamageInfosImg == "../../static/img/ic_camera_with_bg.png") {
						uni.showToast({
							title: "上个器材图片未拍摄，请检查",
							icon: "none"
						})

						return
					}
				}

				/* 新增器材 */
				this.damageInstruments.push({
					ID: 0,
					InstrumentCode: "",
					InstrumentName: "",
					FacilitiesName: "",
					DamageInformation: "",
					DamageInfosImg: "../../static/img/ic_camera_with_bg.png"
				})

			},

			/* 选择器材 */
			selectInstrument: function(e, index) {

				this.instrumentIndex = e.target.value
				const selectedInstrument = this.instruments[this.instrumentIndex];


				/* 先判断损坏列表中是否已存在选择的器材 */

				var alreadExist = false
				this.damageInstruments.forEach(item => {
					if (item.ID == selectedInstrument.ID) {
						alreadExist = true
					}

				})

				if (alreadExist) {
					uni.showModal({
						title: "提示",
						content: selectedInstrument.InstrumentName + " 已在报修列表中,无法重复报修",

					})

					return
				}

				this.$set(this.damageInstruments, index, {
					ID: selectedInstrument.ID,
					InstrumentCode: selectedInstrument.InstrumentCode,
					InstrumentName: selectedInstrument.InstrumentName,
					FacilitiesName: this.facilityName,
					DamageInformation: "",
					DamageInfosImg: "../../static/img/ic_camera_with_bg.png"
				})

				console.log(this.damageInstruments[index])

			},
			/* 器材损坏文字 */
			changeDamage: function(e, index) {
				this.$set(this.damageInstruments[index], "DamageInformation", e.detail.value)
			},
			/* 器材拍照 */
			takePhoto: function(e, index) {
				uni.chooseImage({
					count: 1,
					sizeType: ["compressed"],
					sourceType: ["camera", "album"],
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						this.uploadImgFile(tempFilePaths, index)
					}
				})
			},
			uploadImgFile: function(imgPath, index) {

				//console.log("要上传的图片：" + imgPath + "index:" + index)
				uni.showLoading({
					title: "正在上传图片..."
				})

				uni.uploadFile({
					url: "https://repair.esplohas.com/api/FileUpload/ImgUpload",
					filePath: imgPath[0],
					name: "file",
					formData: {
						'oldImgPath': this.damageInstruments[index].imgPath
					},
					success: (res) => {

						const result = JSON.parse(res.data)


						console.log(result.fig);
						if (result.fig === 1) {
							/* 上传成功 */
							console.log("上传成功：" + result.Path)
							this.$set(this.damageInstruments[index], "DamageInfosImg", result.Path)
							console.log(this.damageInstruments[index])


						} else {
							/* 上传失败 */
							console.log("上传失败")

						}

					},
					complete() {
						uni.hideLoading()
					}
				})
			},

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

	.layout_img {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
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

	.layout_select picker {
		flex: 1;
		height: 92rpx;
		margin-left: 30rpx;
		text-align: left;
		line-height: 92rpx;
		padding-left: 15rpx;
	}

	.layout_select picker text {
		text-align: left;
	}

	.layout_btn {
		display: flex;
		flex-direction: row;
		background: #FFFFFF;
		margin-top: 50rpx;
		margin-bottom: 50rpx;

	}
</style>
