<template>


	<view class="container">



		<!-- 用户信息 -->
		<view class="layout_user_info">

			<view class="layout_input">
				<text>您的姓名</text>
				<input placeholder="请输入" />
			</view>

			<view class="layout_input">
				<text>联系电话</text>
				<input placeholder="请输入" type="number" />
			</view>
		</view>


		<!-- 设施信息 -->
		<view class="layout_facility_info">


			<view class="layout_select">
				<text>设施名称</text>
				<picker>
					<text>请选择</text>

				</picker>
			</view>

		</view>



		<!-- 器材信息 -->


		<view class="layout_instrument" v-for="item of instruments" :key="item.index">
			<view class="layout_select">
				<text>器材名称</text>
				<picker mode="selector" >
					<text>{{item.name}}</text>

				</picker>

			</view>

			<view class="layout_input">
				<text>故障描述</text>
				<input placeholder="请输入"/>
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
						"name": "三人上肢牵引器",
						"damages": "轴承损坏"
					},
					{
						"name": "多功能锻炼器",
						"damages": "油漆脱落"
					}, {
						"name": "双人扭腰器",
						"damages": "主体部件损坏"
					}, {
						"name": "健骑器",
						"damages": "螺丝松动"
					}, {
						"name": "压腿杠",
						"damages": "用不了了"
					},

				],
			}
		},
		methods: {
			submit: function() {
				uni.showToast({
					title: "提交"
				})
			},
			add:function () {
				uni.showToast({
					title:"添加"
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
