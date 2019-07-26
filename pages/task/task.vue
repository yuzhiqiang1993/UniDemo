<template>
	<view class="container">
		<!-- 选择页 -->
		<view class="select_container">
			<!-- 地址选择 -->
			<view class="select_item">
				<picker mode="selector" :value="countryIndex" :range="countryList" range-key="DCName" @change="countryChanged">
					<text>{{countryList[countryIndex].DCName}}</text>
					<text class="iconfont iconjiantou"></text>
				</picker>
			</view>
			<!-- 中间的分割线 -->
			<text class="split_text">|</text>
			<!-- 选择类型 -->
			<view class="select_item">
				<picker mode="selector" :value="typeIndex" :range="types" range-key="name" @change="typeChanged"
				 v-on:typeHasChanged="typeHasChanged">
					<text>{{types[typeIndex].name}}</text>
					<text class="iconfont iconjiantou"></text>
				</picker>
			</view>
		</view>

		<!-- 列表-->
		<scroll-view class="uni-list" scroll-y="true">

			<view class="uni-list-cell" v-for="item of taskList" :key="item.FacilitiesTypeCode">
				<image :src="item.PanoramicPhoto" mode="scaleToFill" class="uni-media-list-logo"></image>

				<view class="uni-flex uni-column">
					<text class="uni-title">{{item.FacilitiesName}}</text>
					<text class="uni-text-gray">{{item.FacilitiesAddr}}</text>
				</view>

			</view>


		</scroll-view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				MembershipCounty: "all",
				StreetTownName: "all",
				FacilitiesType: "all",
				Start: 0,
				Pagesize: 50,
				countryIndex: 0,
				typeIndex: 0,
				address: "地址",
				type: "设施类型",
				taskList: [],
				countryList: [],
				types: [{
					name: "类型",
					code: "all"
				}, {

					name: "市民健身苑点",
					code: "JD"
				}, {

					name: "市民球场",
					code: "QC"
				}, {

					name: "市民健身房",
					code: "SF"
				}, {

					name: "市民健身步道",
					code: "BD"

				}, ],
			}
		},

		onPullDownRefresh: function() {
			this.Start = 0
			this.$api.taskList({
				MembershipCounty: this.MembershipCounty,
				StreetTownName: this.StreetTownName,
				FacilitiesType: this.FacilitiesType,
				Start: this.Start,
				Pagesize: this.Pagesize
			}).then((res) => {
				if (res.length == 0) {
					this.taskList = []
					uni.showToast({
						title: '暂无数据',
						icon: "none"
					});
				} else {
					this.taskList = res
				}

				uni.stopPullDownRefresh()

			})

		},
		onReachBottom: function() {
			console.log("上拉加载")
			uni.showNavigationBarLoading()
			this.$api.taskList({
				MembershipCounty: this.MembershipCounty,
				StreetTownName: this.StreetTownName,
				FacilitiesType: this.FacilitiesType,
				Start: this.Start,
				Pagesize: this.Pagesize
			}).then((res) => {

				console.log("加载更多：" + JSON.stringify(res))

				if (res.length == 0) {
					uni.showToast({
						title: '没有更多数据了...',
						icon: "none"
					});
				} else {
					this.taskList = this.taskList.concat(res)
					this.Start = this.Start + this.Pagesize
				}

				uni.hideNavigationBarLoading()
			})

		},
		onLoad: function() {
			this.requestCoutryList()
			this.requestTaskList()
		},



		methods: {

			typeChanged: function(e) {
				this.Start = 0
				this.typeIndex = e.target.value
				this.FacilitiesType = this.types[this.typeIndex].code
				this.requestTaskList()
			},
			countryChanged: function(e) {
				this.Start = 0
				this.countryIndex = e.target.value
				this.MembershipCounty = this.countryList[this.countryIndex].CountyCode

				this.requestTaskList()

			},


			/* 请求区县列表 */
			async requestCoutryList() {
				var data = await this.$api.countyList()
				data.unshift({
					"ID": 0,
					"DCName": "上海市",
					"CountyCode": "all"
				})
				this.countryList = data
				console.log("区县列表：" + JSON.stringify(data))
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
					Pagesize: this.Pagesize
				})
				console.log("任务列表：" + JSON.stringify(data))

				if (data.length == 0) {
					this.taskList = []
					uni.showToast({
						title: '暂无数据',
						icon: "none"
					});
				} else {
					this.taskList = data
					this.Start = this.Start + this.Pagesize


				}

				uni.hideLoading()
			}
		}
	}
</script>

<style>
	@import url("styles/task.css");
	@import url("styles/iconfont/iconfont.css");
</style>
