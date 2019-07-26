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
				<picker mode="selector" :value="typeIndex" :range="types" range-key="name" @change="bindPickerChange">
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
				Start: "0",
				Pagesize: "30",
				countryIndex: 0,
				typeIndex: 0,
				address: "地址",
				type: "设施类型",
				taskList: [],
				countryList: [],
				types: [{
					name: "类型"
				}, {

					name: "市民健身苑点"
				}, {

					name: "市民球场"
				}, {

					name: "市民健身房"
				}, {

					name: "市民健身步道"
				}, ],
			}
		},

		onPullDownRefresh: function() {

			this.$api.taskList({
				MembershipCounty: "all",
				StreetTownName: "all",
				FacilitiesType: "all",
				Start: "0",
				Pagesize: "30"
			}).then((res) => {

				this.taskList = res
				uni.stopPullDownRefresh()
			})

		},
		onLoad: function() {
			this.requestCoutryList()
			this.requestTaskList()
		},



		methods: {

			bindPickerChange: function(e) {

				this.typeIndex = e.target.value
				uni.showToast({
					title: this.types[this.typeIndex].name
				})
			},
			countryChanged: function(e) {
				this.countryIndex = e.target.value
				this.MembershipCounty=this.countryList[this.countryIndex].CountyCode
				
			},
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
			async requestTaskList() {
				uni.showLoading({
					title:"请求中..."
				})
				var data = await this.$api.taskList({
					MembershipCounty: this.MembershipCounty,
					StreetTownName: "all",
					FacilitiesType: "all",
					Start: "0",
					Pagesize: "30"
				})
				console.log("任务列表：" + JSON.stringify(data))
				this.taskList = data
				
				uni.hideLoading()
			}
		}
	}
</script>

<style>
	@import url("styles/task.css");
	@import url("styles/iconfont/iconfont.css");
</style>
