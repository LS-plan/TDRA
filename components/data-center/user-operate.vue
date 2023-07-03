<template>
	<view class="content" >
		<scroll-view>
			<!--人均学时数据-->
			<view class="split_line"></view>
			<view class="friend_operate">
			<view class="title">实时数据显示</view>
			<text-block :content="textData"></text-block>
			</view>	
			
			
			<view class="split_line"></view>
			 
			<image v-if="textData[4].content[2]['value'] == '否' " src="../../static/weixian.png" style="height: 200px;"></image>
			
			<image v-if="textData[4].content[2]['value'] == '是' " src="../../static/safe.png" style="height: 200px;"></image>
			
			<view class="split_line"></view>
			
			<view class="friend_operate">	
				<qiun-data-charts 
						type="mix" 
						canvasId="four_c" 
						:canvas2d="isCanvas2d" 
						:resshow="delayload"
						:opts="{yAxis:{data:[{position: 'left',title: '',min:0,unit:'万方'}]}}"
						:chartData="TrendData" 
				/>
			</view>
			<view class="split_line"></view>
			<view class="split_line"></view>
			
			
		</scroll-view>
		
	</view>
</template>

<script>
	import ProgressBar from "../../components/progress-bar/progress-bar.vue"
	import DataProgress from "../data-progress/data-progress.vue"
	import SeniorTable from "../data-table/senior-table.vue"
	import RankData from '../../static/json/school/1.json';
	
	
	import TrendData from '../../static/json/user-server/3.json';
	
	import scanTrandPrecent from '../../static/json/user-healthy/5.json';
	
	import wechatLineBar from '../../static/json/wechat/1.json';
	import friendTextBlock from '../../static/json/wechat/2.json';
	import panelData from '../../static/json/wechat/3.json';
	import friendTrand from '../../static/json/wechat/4.json';
	import teamTrand from '../../static/json/wechat/5.json';
	import dataTable from "../../static/json/wechat/6.json";
	import dataOne from '../../static/json/finance/1.json';
	import textData from '../../static/json/user-healthy/6.json';
	import partinum from '../../static/json/user-healthy/3.json';
	export default {
		name:'user—operate',
		props: {
			scrollHeight:{
				type:String,
				default:"600px"
			}
		},
		components:{
			DataProgress,
			SeniorTable,
		},
		data() {
			return {
				timer: null,
				RankData,
				wechatLineBar,
				friendTextBlock,
				friendTrand,
				scanTrandPrecent,
				TrendData,
				panelData,
				teamTrand,
				textData,
				dataOne,
				isCanvas2d: this.$Config.ISCANVAS2D,
				delayload: true,
				historyData: {},
				dataTable,
				scrollTop: 0,
				delayload: true,
				isCanvas2d: this.$Config.ISCANVAS2D,
				partinum
			}	
		},
		watch: {
			"historyBtn": {
				deep: true,
				handler: function(newVal, oldVal) {
					this.filterHistoryData();
				}
			},
		},
		mounted() {
			this.getData();
		},
		
		
		methods:{
			
		},
		onShow(){

		}
		
	}
</script>

<style scoped lang="less">
	
	
	.view_block1{
		background-color: #fff;
		padding: 16rpx 20rpx 10rpx 20rpx;
		border-radius: 20rpx;
		margin-bottom: 40rpx;
		.title{
			text-align:left;
			margin-bottom: 30rpx;
			font-size: 30rpx;
		}
		.trend_title{
			text-align: right;
			font-size: 22rpx;
			color: #ff9900;
			margin-top: 50rpx;
		}
	}
	
	.scroll_list{
		height: 100%;
		.view_block{
			background-color: #fff;
			padding: 16rpx 20rpx 10rpx 20rpx;
			border-radius: 20rpx;
			margin-bottom: 40rpx;
			.title{
				text-align:left;
				margin-bottom: 30rpx;
				font-size: 30rpx;
			}
			.trend_title{
				text-align: right;
				font-size: 22rpx;
				color: #ff9900;
				margin-top: 50rpx;
			}
		}
	}
	.title1 {
		color: #fff;
		font-size: 30rpx;
		flex: 1;
		text-align: center;
	}
	
	.content{
		padding-top: 0rpx;
		.progress,.firend_operate{
			padding: 0 10rpx;
		}
		.progress{
			margin-bottom: 20rpx;
		}
		.friend_operate{
			padding: 30rpx 20rpx;
			.title{
				text-align:left;
				margin-bottom: 30rpx;
				font-size: 40rpx;
			}
			.trend_title{
				text-align: right;
				font-size: 22rpx;
				color: #ff9900;
				margin-top: 50rpx;
			}
		}
	}
	.split_line{
	width: 100%;
	height: 20rpx;
	background-color: #F0F0F0;
}
.emp{
	height: 220rpx;
	width: 100%;
}
.right_btn {
				float: right;
				display: flex;
				color: #ccc;
				font-size: 22rpx;

				view {
					line-height: 50rpx;
					height: 50rpx;
					margin: 0 20rpx;
				}

				.active_btn {
					padding: 0rpx 20rpx;
					border: 1px solid #ccc;
					border-radius: 40rpx;
				}
			}
			@keyframes bganimation {
			  0%{
			    background-position: 0% 50%;
			  }
			  50%{
			    background-position: 100% 50%;
			  }
			  100%{
			    background-position: 0% 50%;
			  }
			}
</style>
