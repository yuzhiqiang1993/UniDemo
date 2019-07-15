<template>
	<view class="container">
		<!-- 选择页 -->
		<view class="select_container">
			<!-- 地址选择 -->
			<view class="select_item">
				<text class="uni-text">{{address}}</text>

				<text class="iconfont iconjiantou"></text>
			</view>
			<!-- 中间的分割线 -->
			<text class="split_text">|</text>
			<!-- 选择类型 -->
			<view class="select_item">
				<picker mode="selector" :value="index" :range="types" range-key="name" @change="bindPickerChange">
					<text class="uni-text">{{types[index].name}}</text>
					<text class="iconfont iconjiantou"></text>
				</picker>
			</view>
		</view>

		<!-- 列表-->
		<scroll-view class="uni-list" scroll-y="true">

			<view class="uni-list-cell" v-for="item of newsList" :key="item.id">
				<image :src="item.img" mode="scaleToFill"></image>

				<text class="text_title">{{item.name}}</text>

			</view>


		</scroll-view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				index: 0,
				address: "地址",
				type: "设施类型",
				newsList: [],
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

			this.$api.taskList().then((res) => {
			
				this.newsList = res.data.data.news
				uni.stopPullDownRefresh()
			})

		},
		onLoad: function() {

			uni.showLoading({
				title: "请求中...."
			})

			this.$api.taskList().then((res) => {
			
			
			
			console.log(res)
				this.newsList = res.data.data.news

				uni.hideLoading()
			})

		},



		methods: {

			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为：' + e.target.value)
				this.index = e.target.value
				uni.showToast({
					title: this.types[this.index].name
				})
			},
		}
	}
</script>

<style>
	@import url("styles/task.css");
	@import url("styles/iconfont/iconfont.css");
</style>
