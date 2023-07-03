<template>
	<view class="window">
		<view class="topLine" :style="{height: topBar+'px'}"></view>
		<view class="nav row_align_center" id="nav">
			<li :class="['iconfont icon-zuojiantou back']" ></li>
			<text class="title">{{title?title:''}}</text>
			<li class="iconfont icon-zuojiantou back hidden"></li>
		</view>
		
		<view class="row_align_center head" id="head">
		</view>
		<!--主体内容-->
		<view class="data_body" :style="{height: scrollHeight}">
				<TotalScreen :scrollHeight="scrollHeight" />
			<view class="split_line"></view>
		</view>
	</view>
</template>
<script>
    import TotalScreen from "../../components/information/information1.vue"

	export default {
		components: {
			WucTab: resolve => require(['@/components/wuc-tab/wuc-tab.vue'], resolve),
			DropDown: resolve => require(['@/components/drop-down/drop-down.vue'], resolve),
            TotalScreen
		},
		data() {
			return {
				tabList: this.$Config.XINXICHAXUN, //标签头
				timeArray: this.$Config.TIMEARRAY, //时间数组
				info: this.$store.state.userInfo, //用户数据
				title: "冷润茗学时情况分析", //标题
				tabCur: 0, //标签头下标
				topBar: 40, //导航高
				scrollHeight: "100%", //数据展示体高度
			};
		},
		computed: {
			
		},
		methods: {
			changDrop(index) {
				if (index == 1 && this.$refs.companyDrop.showList) {
					this.$refs.companyDrop.closePopup()
				} else if (index == 2 && this.$refs.caleDrop.showList) {
					this.$refs.caleDrop.closePopup()
				}
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
			}
		},
		onReady () {

			uni.showShareMenu();
			this.getTelephoneInfo();
			this.getH5Info();
		},
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
		        console.log(option.id); //打印出上个页面传递的参数。
		        console.log(option.name); //打印出上个页面传递的参数。
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
			background-color: #1890FF;
			width: 100%;
		}
	
		scroll-view {
			box-sizing: border-box;
		}
	
		.swiper {
			box-sizing: border-box;
		}
	
		.nav {
			background-color: #1890FF;
			background-size: 100% 100%;
	
			.back {
				font-size: 0rpx;
				padding: 20rpx 14rpx 15rpx 14rpx;
				color: #1890FF;
			}
	
			.title {
				color: #fff;
				font-size: 40rpx;
				flex: 1;
				text-align: center;
			}
	
			.hidden {
				visibility: hidden;
			}
		}
	
		.head {
			padding: 0 16rpx 14rpx 16rpx;
			color: #fff;
			background-color: #1890FF;
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
					font-size: 50rpx;
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
			margin-top: 50rpx;
		}
	}
</style>
