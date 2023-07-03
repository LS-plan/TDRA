<template>
	<view class="content">
		<scroll-view v-if="true" scroll-y class="data_body" :style="{height:scrollHeight}">
			<!--人均学时数据-->
			<view class="split_line"></view>
			<view class="friend_operate">
			<view class="title">人均学时情况</view>
			<view class="charts-box">
			  <qiun-data-charts
			    type="average_number"
			    :chartData="AverageData"
			    background="none"
			  />
			</view>
			</view>
			<view class="split_line"></view>
			
			<!-- 人均学时增长情况（月）-->
			<view class="friend_operate">
				<view class="title">人均学时增长情况（月）</view>
				<view class="charts-box">
				  <qiun-data-charts
				    type="rise_number"
				    :chartData="riseData"
				    background="none"
				    :ontouch="true"
				  />
				</view>
				<view class="trend_title">注：该数据自每学年初开始统计</view>
			</view>
			<view class="split_line"></view>
			<view class="friend_operate">
				<view class="title">学时获取方式统计</view>
				<view class="right_btn">
					<view v-for="(item,index) in historyBtn" :key="index" :class="item.state ? 'active_btn':''"
						@click="changeHistoryBtn(item.type)">{{item.name}}</view>
				</view>
				
				<view class="charts-box">
				  <qiun-data-charts
				    type="WayofGetting"
				    :chartData="historyData"
				    background="none"
				  />
				</view>	
				
			</view>
			<view class="split_line"></view>
			
			<view class="emp"></view>
		</scroll-view>
		<view  v-else class="container padding_stand-big normal_color">
			<li class="iconfont icon-cry cry"></li>暂无数据
		</view>
	</view>
</template>

<script>
	import DataProgress from "../data-progress/data-progress.vue"
	import SeniorTable from "../data-table/senior-table.vue"
	
	import wechatLineBar from '../../static/json/wechat/1.json';
	import friendTextBlock from '../../static/json/wechat/2.json';
	import panelData from '../../static/json/wechat/3.json';
	import friendTrand from '../../static/json/wechat/4.json';
	import teamTrand from '../../static/json/wechat/5.json';
	import dataTable from "../../static/json/wechat/6.json";
	import dataOne from '../../static/json/finance/1.json';
	
	export default {
		name:'wechat',
		props: {
			scrollHeight:{
				type:String,
				default:"1000px"
			}
		},
		components:{
			DataProgress,
			SeniorTable,
		},
		data() {
			return {
				wechatLineBar,
				friendTextBlock,
				friendTrand,
				panelData,
				teamTrand,
				dataOne,
				isCanvas2d: this.$Config.ISCANVAS2D,
				delayload: false,
				historyData: {},
				dataTable,
				scrollTop: 0,
				delayload: false,
				isCanvas2d: this.$Config.ISCANVAS2D,
				AverageData:{
					    "categories": [
					        "思想成长",
					        "文体发展",
					        "创新创业",
							"社会与志愿",
							"工作履历"
					    ],
					    "series": [
					        {
					            "name": "参与学时",
					            "data": [
					               62,
								   46,
								   31,
								   32,
								   15
					            ]
					        },
					        {
					            "name": "转换学时",
					            "data": [
					                21,
					                16,
					                12,
					                27,
									16
					                
					            ]
					        }
					    ]
				},
			riseData:{
				"categories": [
				        "9月",
				        "10月",
				        "11月",
				        "12月",
				        "1月",
				        "2月",
						"3月",
						"4月",
						"5月"
				    ],
				    "series": [
				        {
				            "name": "思想成长",
				            "data": [
				                12,
				                14,
				                11,
				                9,
				                15,
				                12,
								9,
								10,
								4
				            ]
				        },
				        {
				            "name": "文体发展",
				            "data": [
				                8,
				                12,
				                10,
				                9,
				                6,
				                12,
				                9,
				                10,
								3
				            ]
				        },
						{
						    "name": "创新创业",
						    "data": [
						        8,
						        6,
						        7,
						        4,
						        6,
						        3,
						        6,
						        6,
								3
						    ]
						},
					{
					    "name": "社会实践与志愿服务",
					    "data": [
					        6,
					        9,
					        7,
					        4,
					        10,
					        9,
					        11,
					        7,
							2
					    ]
					},
					{
						    "name": "工作履历与技能培训",
						    "data": [
						        12,
						        3,
						        4,
						        2,
						        4,
						        1,
						        2,
						        3,
								1
						    ]
						},
				    ]
			},
			historyBtn: [{
					name: "思想",
					state: 1,
					type: "sixiang"
				},
				{
					name: "文体",
					state: 0,
					type: "wenti"
				},
				{
					name: "创新",
					state: 0,
					type: "chuangxin"
				},
				{
					name: "实践志愿",
					state: 0,
					type: "shijian"
				},
				{
					name: "工作履历",
					state: 0,
					type: "gongzuo"
				},
				
			],
			}	
		},
		watch: {
			"historyBtn": {
				deep: true,
				handler: function(newVal, oldVal) {
					this.filterHistoryData();
				}
			}
		},
		mounted() {
			this.getData();
		},
		methods:{
			async getData() {
				
				this.filterHistoryData();
				for (let i = 0; i < this.expendDetail.series.length; i++) {
					this.expendDetail.series[i].format = "pieDemo"
				}
				let length = this.expendDetail.series[0].data.length
				for (let i = 0; i < length; i++) {
					this.expendCount += this.expendDetail.series[0].data[i].value
				}
				await setTimeout(() => {
					this.delayload = true;
					uni.hideLoading();
				}, 1000)
			},
		changeHistoryBtn(type) {
			for (let i = 0; i < this.historyBtn.length; i++) {
				if (this.historyBtn[i].type == type) {
					this.historyBtn[i].state = 1
					} else {
						this.historyBtn[i].state = 0
					}
				}
			},
		filterHistoryData() {
				let type = this.historyBtn.filter(x => x.state == 1)[0].type;
				switch (type) {
					case "sixiang":
						this.historyData = this.dataOne.sixiang;
						break;
					case "wenti":
						this.historyData = this.dataOne.wenti;
						break;
					case "chuangxin":
						this.historyData = this.dataOne.chuangxin;
						break;
					case "shijian":
						this.historyData = this.dataOne.shijian;
						break;
					case "gongzuo":
						this.historyData = this.dataOne.gongzuo;
						break;		
				}
			},
		}
	}
</script>

<style scoped lang="less">
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
</style>
