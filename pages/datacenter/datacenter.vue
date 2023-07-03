<!-- datacenter -->
<template>
	<view class="window">
		<!-- #ifndef H5 -->
		<view class="topLine" :style="{height: topBar+'px'}"></view>
		<!-- #endif -->
		<view class="nav row_align_center" id="nav">
			<li :class="['iconfont icon-zuojiantou back']" @click="gotoBack()"></li>
			
			<view class="title">
				<text>数据展示</text>
			</view>
			
			
			<li class="iconfont icon-zuojiantou back hidden"></li>
		</view>
	
		<!--滑动列表头-->
	<!-- 	<wuc-tab id="wuctab" :tab-list="tabList" :tabCur.sync="tabCur" tab-class="text-center text-white bg-blue"
			select-class="text-white"></wuc-tab> -->
		<!--主体内容-->
		<view  class="data_body" :style="{height: scrollHeight}">
			<!-- <view v-if="tabCur == 0">
				<wechat :scrollHeight="scrollHeight" />
			</view> -->
			<view>
				<user-operate :scrollHeight="scrollHeight" />
			</view>
		</view>
	</view>
</template>
<script>
	//import Wechat from "../../components/data-center/wechat.vue"
	
	import textData from '../../static/json/user-healthy/6.json';
	import TrendData from '../../static/json/user-healthy/3.json';
	
	import UserOperate from "../../components/data-center/user-operate.vue"
	import { 
		Tem_hum
		} from "../../api/Tem_hum.js"
	// import UserHealthy from "../../components/data-center/user-healthy.vue"

	// import UserServer from "../../components/data-center/user-server.vue"

	export default {
		components: {
			WucTab: resolve => require(['@/components/wuc-tab/wuc-tab.vue'], resolve),
			DropDown: resolve => require(['@/components/drop-down/drop-down.vue'], resolve),
			//Wechat,
			UserOperate,
			// UserHealthy,
			// UserServer,
		},
		data() {
			return {
				TrendData,
				textData,
				// timer : null,
				tabList: this.$Config.TABLIST, //标签头
				timeArray: this.$Config.TIMEARRAY, //时间数组
				info: this.$store.state.userInfo, //用户数据
				title: "数据中心", //标题
				tabCur: 0, //标签头下标
				topBar: 30, //导航高
				top: '180', //下拉栏位置
				scrollHeight: "100%", //数据展示体高度
				
			};
		},

		methods: {
			gotoBack() {
				this.$Common.navigateBack("/index/index");
			},
			//获取设备信息
			async getTelephoneInfo() {
				var telephoneInfo = await this.$Common.getTelephoneInfo();
				let hasHeight = 0;
				if (telephoneInfo.top >= 40) {
					this.top = telephoneInfo.statusBarHeight * 2 + 150;
					this.topBar = telephoneInfo.statusBarHeight;
				}

				// 设置滚动高度
				const query = wx.createSelectorQuery();
				query.select('#nav').boundingClientRect();
				query.select('#head').boundingClientRect();
				query.select('#wuctab').boundingClientRect();
				query.exec(res => {
					res.map((item, index) => {
						hasHeight += item.height;
					})
					this.scrollHeight = (telephoneInfo.screenHeight - hasHeight - this.topBar) + 'px';
				})
			},
			getH5Info() {
				uni.getSystemInfo({
					success: e => {
						let hasHeight = 0;
						let element = wx.createSelectorQuery().in(this);
						element.select('#nav').boundingClientRect();
						element.select('#head').boundingClientRect();
						element.select('#wuctab').boundingClientRect();
						element.exec(res => {
							res.map((item, index) => {
								hasHeight += item.height;
							})
							this.scrollHeight = (e.screenHeight - hasHeight) + 'px';
						})
					},
					fail: (err) => {
						reject(err);
					}
				})
			},
			
		},
		

		
		onReady () {
			//#ifndef H5
			uni.showShareMenu();
			this.getTelephoneInfo();
			//#endif
			//#ifdef H5
			this.getH5Info();
			
			//#endif
		},
		onShow() {
			
			this.timer = setInterval(function() {
			Tem_hum().then(res=>{
				// console.log(textData[0].content[2]['value'])
				textData[0].content[2]['value'] = res.data[0].temperature
				textData[1].content[2]['value'] = res.data[0].humidity
				textData[2].content[2]['value'] = res.data[0].smoke
				if(res.data[0].person){
					textData[3].content[2]['value'] = "是"
				}else{
					textData[3].content[2]['value'] = "否"
				}
				
				if(res.data[0].brightness){
					textData[4].content[2]['value'] = "否"
				}else{
					textData[4].content[2]['value'] = "是"
				}
				textData[5].content[2]['value'] = res.data[0].result
				// console.log(res.data[0].id)
				// console.log(res.data)
				
				TrendData['series'][0].data[0] = TrendData['series'][0].data[1]
				TrendData['series'][0].data[1] = TrendData['series'][0].data[2]
				TrendData['series'][0].data[2] = TrendData['series'][0].data[3]
				TrendData['series'][0].data[3] = TrendData['series'][0].data[4]
				TrendData['series'][0].data[4] = TrendData['series'][0].data[5]
				TrendData['series'][0].data[5] = TrendData['series'][0].data[6]
				TrendData['series'][0].data[6] = res.data[0].result
				
				console.log(TrendData['series'][0].data[0])
				
				
			})
			
			
			
			}, 1000)
		}
	};
</script>
<style lang="scss">
	page,
	body {
		margin: 0;
		padding: 0;
		width: 100%;
		height: 100%;
	}

	li {
		list-style-type: none;
	}

	.window {
		height: 100vh;
		overflow: hidden;

		.topLine {
			background-color: #40A2ED;
			width: 100%;
		}

		scroll-view {
			box-sizing: border-box;
		}

		.swiper {
			box-sizing: border-box;
		}

		.nav {
			background-image: url(http://photo.gdbjyy.cn/image/BCAI/top_bg.jpg);
			background-size: 100% 100%;
			height: 70rpx;
			

			.back {
				font-size: 54rpx;
				padding: 20rpx 14rpx 15rpx 14rpx;
				color: #fff;
			}

			.title {
				color: #fff;
				font-size: 34rpx;
				flex: 1;
				overflow: auto;
				text-align:  center;
				margin-top: 10rpx;
				padding: 10upx 100upx;
			}

			.hidden {
				visibility: hidden;
			}
		}

		.head {
			padding: 0 16rpx 14rpx 16rpx;
			color: #fff;
			background-color: #40A2ED;
			justify-content: space-between;
			font-size: 26rpx !important;

			.calendar_drag {
				width: 340rpx;
				display: flex;
				justify-content: center;
				align-items: center;

				.calendar_name {
					margin-right: 10rpx;
				}

				.icon-calendar {
					font-size: 26rpx;
					margin-top: 4rpx;
				}
			}
		}

		.data_body {
			overflow: auto;
			text-align: center;
			color: #333333;
			background-repeat: repeat;
			background-color: #ffffff;
			position: relative;

			.item {
				padding: 0 20rpx;
				margin-bottom: 20rpx;

				.name {
					font-weight: 600;
					font-size: 36rpx;
				}

				.operate {
					view {
						padding: 5rpx 12rpx;
						color: #fff;
					}

					.bg-blue {
						background-color: #40A2ED;
					}

					.bg-yellow {
						background-color: #FFC300;
					}
				}

				.tip {
					margin-bottom: 30rpx;

					.update {
						color: #C4100A;
						margin-left: auto;
						font-size: 30rpx;
					}
				}
			}

			.cry {
				font-size: 96rpx;
				margin-bottom: 10rpx;
			}
		}
	}

	.water-mark-mask {
		width: 100%;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 1000;
		justify-content: space-between;
		pointer-events: none; //无视鼠标事件，相当于鼠标事件透传下去一样
		flex: 1;
		overflow: hidden;

		text {
			width: 50%;
			color: #909399;
			opacity: 0.25;
			transform: rotate(-15deg);
		}
	}

	.histogram {
		height: 100%;
		width: 100%;

		canvas {
			margin-top: 40rpx;
		}
	}
	.row_align_center {
	    display: flex;
	    flex-direction: row;
	    align-items: center;
	}
</style>
