<template>
	<view class="container">
		<!-- 选择页 -->
		<view class="select_container">
			<!-- 区县选择 -->
			<view class="select_item">
				<picker mode="selector" :value="countryIndex" :range="countryList" range-key="DCName" @change="countryChanged">
					<text>{{countryList[countryIndex].DCName}}</text>
					<text class="iconfont iconjiantou"></text>
				</picker>
			</view>
			<!-- 区县选择 -->
			<view class="select_item">
				<picker mode="selector" :value="streetTownIndex" :range="streetTownList" range-key="StreetTownName" @change="streetTownChanged">
					<text>{{streetTownList[streetTownIndex].StreetTownName}}</text>
					<text class="iconfont iconjiantou"></text>
				</picker>
			</view>
			<!-- 选择类型 -->
			<view class="select_item">
				<picker mode="selector" :value="typeIndex" :range="facilityTypeList" range-key="FacilitiesTypeName" @change="typeChanged"
				 v-on:typeHasChanged="typeHasChanged">
					<text>{{facilityTypeList[typeIndex].FacilitiesTypeName}}</text>
					<text class="iconfont iconjiantou"></text>
				</picker>
			</view>
		</view>

		<!-- 列表-->
		<scroll-view class="uni-list" scroll-y="true">

			<view class="uni-list-cell" v-for="item of taskList" :key="item.BaseInfo.FacilitiesTypeCode" @click="goToTaskDetails(item.BaseInfo.ID)">

				<image :src="item.PanoramicPhoto" mode="scaleToFill" class="uni-media-list-logo" />
				<!-- <image src='http://pic23.nipic.com/20120830/9686992_180336646144_2.jpg' mode="scaleToFill" class="uni-media-list-logo"></image> -->

				<view class="uni-flex uni-column content">
					<text class="uni-title">{{item.BaseInfo.FacilitiesName}}</text>


					<view class="uni-flex uni-row address">
						<text class="uni-text-gray uni-flex-item address">{{item.BaseInfo.FacilitiesAddr}}</text>
						<text class="iconfont iconlocation"></text>
						<text class="uni-text-gray distance">{{item.distance}}m</text>
					</view>

				</view>

			</view>

		</scroll-view>


	</view>
</template>

<script>
	export default {


		data() {
			return {
				MembershipCounty: "",
				StreetTownName: "",
				FacilitiesType: "",
				longitude: "0.0",
				latitude: "0.0",
				Start: 0,
				Pagesize: 50,
				countryIndex: 0,
				streetTownIndex: 0,
				typeIndex: 0,
				address: "地址",
				type: "设施类型",
				taskList: [],
				countryList: [],
				streetTownList: [],
				facilityTypeList: [],
			}
		},

		onPullDownRefresh: function() {
			this.Start = 0

			this.requestTaskList()
		},
		onReachBottom: function() {
			console.log("上拉加载")
			uni.showNavigationBarLoading()

			this.$api.taskList({
				MembershipCounty: this.MembershipCounty,
				StreetTownName: this.StreetTownName,
				FacilitiesType: this.FacilitiesType,
				Start: this.Start,
				Pagesize: this.Pagesize,
				longitude: this.longitude,
				latitude: this.latitude
			}).then((res) => {

				// console.log("加载更多：" + JSON.stringify(res))

				if (res.length == 0) {
					uni.showToast({
						title: '没有更多数据了...',
						icon: "none"
					});
				} else {
					for (let item of res) {
						item.PanoramicPhoto = "http://operation.esplohas.com" + item.PanoramicPhoto
					}
					console.log("追加的数据：" + JSON.stringify(res))
					this.taskList = this.taskList.concat(res)
					this.Start = this.Start + this.Pagesize


				}

				uni.hideNavigationBarLoading()
			})

		},
		onLoad: function() {

			this.requestCoutryList()
			this.requestStreetTownList()
			this.requestFacilityTypeList()
			uni.getLocation({
				type: 'gcj02',

				success: (res) => {
					this.latitude = res.latitude
					this.longitude = res.longitude

				},
				fail: () => {
					uni.showModal({
						content: "位置信息获取失败，请检查GPS是否开启"
					})
				},
				complete: (res) => {
					this.requestTaskList()
				}

			});


		},

		methods: {
			/* 选择设施类型 */
			typeChanged: function(e) {
				this.Start = 0
				this.typeIndex = e.target.value
				this.FacilitiesType = this.facilityTypeList[this.typeIndex].TypeCode
				this.requestTaskList()
			},
			/* 选择区县 */
			countryChanged: function(e) {
				this.Start = 0
				this.streetTownIndex = 0
				this.StreetTownName = "all"
				this.countryIndex = e.target.value
				this.MembershipCounty = this.countryList[this.countryIndex].CountyCode
				this.requestStreetTownList()
				this.requestTaskList()

			},
			/* 选择街镇 */
			streetTownChanged: function(e) {
				this.Start = 0
				this.streetTownIndex = e.target.value
				this.StreetTownName = this.streetTownList[this.streetTownIndex].StreetTownCode
				this.requestTaskList()

			},


			/* 请求区县列表 */
			async requestCoutryList() {

				var data = await this.$api.countyList()

				// data.unshift({
				// 	"CountyCode": "",
				// 	"DCName": "上海市",

				// })
				this.countryList = data

				//console.log("区县列表：" + JSON.stringify(data))

			},
			/* 请求根据区县编号请求街镇 */
			async requestStreetTownList() {

				var data = await this.$api.streetTownList({
					CountyCode: this.MembershipCounty
				})

				// data.unshift({

				// 	"MembershipCounty": "01H",
				// 	"StreetTownName": "全部",
				// 	"StreetTownCode": ""
				// })

				//console.log("请求的街镇数据：" + JSON.stringify(data))

				this.streetTownList = data

			},
			/* 获取设施类型列表 */
			async requestFacilityTypeList() {
				var data = await this.$api.facilityTypeList()
				data.unshift({
					"FacilitiesTypeName": "全部",
					"TypeCode": ""
				})
				this.facilityTypeList = data


			},
			/* 请求任务列表 */
			async requestTaskList() {

				uni.showLoading({
					title: "请求中..."
				})

				var data = await this.$api.taskList({
					MembershipCounty: this.MembershipCounty,
					StreetTownName: this.StreetTownName,
					FacilitiesType: this.FacilitiesType,
					Start: this.Start,
					Pagesize: this.Pagesize,
					longitude: this.longitude,
					latitude: this.latitude
				})
				console.log("任务列表：" + JSON.stringify(data))
				if (data.length == 0) {
					this.taskList = []
					uni.showToast({
						title: '暂无数据',
						icon: "none"
					});
				} else {


					for (let item of data) {
						item.PanoramicPhoto = "http://operation.esplohas.com" + item.PanoramicPhoto
					}
					this.taskList = data
					this.Start = this.Start + this.Pagesize
				}

				uni.hideLoading()
				uni.stopPullDownRefresh()

			},
			goToTaskDetails: function(id) {
				console.log(id)

				uni.navigateTo({
					url: '../task_details/task_details?id=' + id
				})
			}
		}
	}
</script>

<style>
	@import url("styles/task.css");
	/* @import url("styles/iconfont/iconfont.css"); */
	@import url("../../common/iconfont/iconfont.css");
</style>
