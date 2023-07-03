<template>
	<view class="container">

		<!-- 头部轮播 -->
		<view class="carousel-section">
			<!-- 标题栏和状态栏占位符 -->
			<view class="titleNview-placing"></view>
			<!-- 背景色区域 -->
			<view class="titleNview-background" :style="{backgroundColor:titleNViewBackground}"></view>
			<swiper class="carousel" :autoplay="true" circular>
				<swiper-item v-for="(item, index) in carouselList" :key="index" class="carousel-item"
					@click="navToDetailPage()">
					<image :src="item.src" />
				</swiper-item>
			</swiper>
		</view>
		<!-- 分类 -->
		<view class="cate-section">
			<view class="cate-item">
				<image src="/static/文件下载.png" @click="navTodocument()"></image>
				<text>文件下载</text>
			</view>

			<view class="cate-item">
				<image src="/static/FAQ.png" @tap="gotoFAQ()"></image>
				<text>FAQ专</text>
			</view>

			<view class="cate-item" @tap="gotoXueshi()">
				<image src="/static/学时导入.png"></image>
				<text>学时导入预约</text>
			</view>

			<view class="cate-item" @tap="gotoFuzeren()">
				<image src="/static/负责人变更.png"></image>
				<text>负责人变更</text>
			</view>
		</view>
		
		<view class="top_head">
			<view class="top_desc">
				<view class="left_title">
					<view class="title_icon"></view>
					<text class="large-title">基本信息</text>
				</view>
				<view class="row head_block">
					<view class="flex_1">
					<text class="text-gray">姓名</text>
					<text class="text-black">{{teacher.name}}</text>
				</view>
					<text class="text-gray">所属单位</text>
					<text class="text-black">{{teacher.unit}}</text>
				</view>
				<view class="row head_block">
					<view class="flex_1">
					<text class="text-gray">身份</text>
					<text class="text-black">{{teacher.indentify}}</text>
				</view>
					<text class="text-gray">注册志愿者人数</text>
					<text class="text-black">{{teacher.volunteer_number}}({{teacher.volunteer_rate}}%)</text>
				</view>
				<view class="row head_block">
					<view class="flex_1">
					<text class="text-gray">达标人数</text>
					<text class="text-black">{{teacher.pass_number}}({{teacher.pass_rate}}%)</text>
				</view>
				
					<text class="text-gray">预警人数</text>
					<text class="text-black">{{teacher.warning_number}}({{teacher.warning_rate}}%)</text>
				</view>
				<view class="left_title">
					<view class="title_icon"></view>
					<text class="large-title">平均学时情况</text>
				</view>
				<view class="charts-box">
					<view class="charts-box">
					  <qiun-data-charts
					    type="varial_number"
					    :chartData="AverageData"
					    background="none"
					  />
					</view>
			</view>

			</view>
			<view class="main">
				<view class="row_block">
				<view class="top_desc">
				<view class="left_title">
					<view class="title_icon"></view>
					<text class="large-title">课程与活动统计</text>
				</view>
				<view class="row head_block">
						<view class="flex_1">
						<text class="text-gray">标准课程数量</text>
						<text class="text-black">{{classes.classnumber}}</text>
					</view>
						<text class="text-gray">累计活动数量</text>
						<text class="text-black">{{classes.activitynumber}}</text>
					</view>
					<view class="row head_block">
							<view class="flex_1">
							<text class="text-gray">一审通过率</text>
							<text class="text-black">{{classes.judge1}}%</text>
						</view>
							<text class="text-gray">二审通过率</text>
							<text class="text-black">{{classes.judge2}}%</text>
						</view>
					<view class="row head_block">
							<view class="flex_1">
							<text class="text-gray">完结通过率</text>
							<text class="text-black">{{classes.overcome}}%</text>
						</view>
							<text class="text-gray">活动参与率</text>
							<text class="text-black">{{classes.participate}}%</text>
						</view>	
						<view class="left_title">
							<view class="title_icon"></view>
							<text class="large-title">热门课程（活动）</text>
						</view>	
						<view class="wordcharts-box">
						  <qiun-data-charts
						    type="word"
						    :chartData="DataCloud"
						    background="#ffffff"
						  />
						</view>
				</view>
				
			</view>
			</view>
		</view>
		


	</view>
</template>

<script>
	export default {

		data() {
			return {
				titleNViewBackground: 'deepskyblue',
				swiperCurrent: 0,
				swiperLength: 0,
				carouselList: [],
				goodsList: [],
				teacher:{
					name: '邱钰杰',
					unit:'海洋与空间信息学院',
					indentify:'团委书记',
					volunteer_number:'822',
					volunteer_rate:'82.2',
					pass_number:'523',
					pass_rate:'52.3',
					warning_number:'122',
					warning_rate:'12.2'
				},
				classes:{
					classnumber:'35',
					activitynumber:'122',
					judge1:'71.12',
					judge2:'32.24',
					overcome:'85.66',
					participate:'72.64'
				},
				DataCloud:{
				 "series": [
				        {
				            "name": "海空学院girls，向未来！",
				            "textSize": 20
				        },
						{
						    "name": "第二届“海空杯”海洋科技创新创业大赛",
						    "textSize": 18
						},
						{
						    "name": "探索海洋之谜”海洋科普知识竞赛",
						    "textSize": 19
						},
						{
						    "name": "“华测导航杯”第十八届测绘技能大赛",
						    "textSize": 20
						},
							]
				},
				AverageData:{
					    "categories": [
					        "2018",
					        "2019",
					        "2020",
					        "2021"
					    ],
					    "series": [
					        {
					            "name": "思想成长",
					            "data": [
					               86,
								   78,
								   43,
								   21
					            ]
					        },
					        {
					            "name": "文体发展",
					            "data": [
					                78,
					                69,
					                39,
					                21
					                
					            ]
					        },
							{
							    "name": "创新创业",
							    "data": [
							        63,
							        55,
							        35,
							        19
							        
							    ]
							},
							{
							    "name": "社会实践与志愿服务",
							    "data": [
							        58,
							        62,
							        36,
							        16
							        
							    ]
							}
					    ]
				}
			};
		},



		onLoad() {
			this.loadData();
		},
		methods: {
			/* getcarousedata(){         /*调用接口数据
				uni.request({
				url="";
				success:(res)=>{
					this.carouselList=res.data;
				}
				})
			} */

			gotoload() {
				uni.navigateTo({
					url: "/pages/download/download"
				})
			},

			gotoFAQ() {
				uni.navigateTo({
					url: "/pages/FAQ/FAQ"
				})
			},

			gotoXueshi() {
				uni.navigateTo({
					url: "/pages/appointment/appointment"
				})
			},

			gotoFuzeren() {
				uni.navigateTo({
					url: "/pages/leader_change/leader_change"
				})
			},




			async loadData() {
				let carouselList = await this.$api.json('carouselList');
				this.swiperLength = carouselList.length;
				this.carouselList = carouselList;
				let goodsList = await this.$api.json('goodsList');
				this.goodsList = goodsList || [];
			},

			// swiperChange(e) {
			// 	const index = e.detail.current;
			// 	this.swiperCurrent = index;
			// 	this.titleNViewBackground = this.carouselList[index].background;
			// },
			//详情页
			navToDetailPage(item) {
				//测试数据没有写id，用title代替
				let id = item.title;
				uni.navigateTo({
					url: `/pages/product/product?id=${id}`
				})
			},
		},
		// #ifndef MP
		// 标题栏input搜索框点击
		onNavigationBarSearchInputClicked: async function(e) {
			this.$api.msg('点击了搜索框');
		},
		//点击导航栏 buttons 时触发
		onNavigationBarButtonTap(e) {
			const index = e.index;
			if (index === 0) {
				this.$api.msg('点击了扫描');
			} else if (index === 1) {
				// #ifdef APP-PLUS
				const pages = getCurrentPages();
				const page = pages[pages.length - 1];
				const currentWebview = page.$getAppWebview();
				currentWebview.hideTitleNViewButtonRedDot({
					index
				});
				// #endif
				uni.navigateTo({
					url: '/pages/notice/notice'
				})
			}
		}
		// #endif
	}
</script>

<style scoped lang="scss">
	/* #ifdef MP */
	}

	.mp-search-box {
		position: absolute;
		left: 0;
		top: 30upx;
		z-index: 9999;
		width: 100%;
		padding: 0 80upx;

		.ser-input {
			flex: 1;
			height: 56upx;
			line-height: 56upx;
			text-align: center;
			font-size: 28upx;
			color: $font-color-base;
			border-radius: 20px;
			background: rgba(255, 255, 255, .6);
		}
	}

	page {
		.cate-section {
			position: relative;
			z-index: 4;
			border-radius: 16upx 2upx 0 0;
			margin-top: -20upx;
		}

		.carousel-section {
			padding: 0;

			.titleNview-placing {
				padding-top: 0;
				height: 0;
				color: #00aaff;
			}

			.carousel {
				.carousel-item {
					padding: 0;
				}
			}

			.swiper-dots {
				left: 45upx;
				bottom: 40upx;
			}
		}
	}

	/* #endif */


	page {
		background: #f5f5f5;
	}

	.m-t {
		margin-top: 16upx;
	}

	/* 头部 轮播图 */
	.carousel-section {
		position: relative;
		padding-top: 10px;


		.titleNview-placing {
			height: var(--status-bar-height);
			padding-top: 44px;
			box-sizing: content-box;

		}

		.titleNview-background {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 420upx;
			transition: .4s;
			color: #4399FC;
		}
	}

	.carousel {
		width: 100%;
		height: 350upx;

		.carousel-item {
			width: 100%;
			height: 100%;
			padding: 0 28upx;
			overflow: hidden;
		}

		image {
			width: 100%;
			height: 100%;
			border-radius: 10upx;
		}
	}

	.swiper-dots {
		display: flex;
		position: absolute;
		left: 60upx;
		bottom: 15upx;
		width: 72upx;
		height: 36upx;
		background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAABkCAYAAADDhn8LAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTk4MzlBNjE0NjU1MTFFOUExNjRFQ0I3RTQ0NEExQjMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTk4MzlBNjA0NjU1MTFFOUExNjRFQ0I3RTQ0NEExQjMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Q0E3RUNERkE0NjExMTFFOTg5NzI4MTM2Rjg0OUQwOEUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Q0E3RUNERkI0NjExMTFFOTg5NzI4MTM2Rjg0OUQwOEUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4Gh5BPAAACTUlEQVR42uzcQW7jQAwFUdN306l1uWwNww5kqdsmm6/2MwtVCp8CosQtP9vg/2+/gY+DRAMBgqnjIp2PaCxCLLldpPARRIiFj1yBbMV+cHZh9PURRLQNhY8kgWyL/WDtwujjI8hoE8rKLqb5CDJaRMJHokC6yKgSCR9JAukmokIknCQJpLOIrJFwMsBJELFcKHwM9BFkLBMKFxNcBCHlQ+FhoocgpVwwnv0Xn30QBJGMC0QcaBVJiAMiec/dcwKuL4j1QMsVCXFAJE4s4NQA3K/8Y6DzO4g40P7UcmIBJxbEesCKWBDg8wWxHrAiFgT4fEGsB/CwIhYE+AeBAAdPLOcV8HRmWRDAiQVcO7GcV8CLM8uCAE4sQCDAlHcQ7x+ABQEEAggEEAggEEAggEAAgQACASAQQCCAQACBAAIBBAIIBBAIIBBAIABe4e9iAe/xd7EAJxYgEGDeO4j3EODp/cOCAE4sYMyJ5cwCHs4rCwI4sYBxJ5YzC84rCwKcXxArAuthQYDzC2JF0H49LAhwYUGsCFqvx5EF2T07dMaJBetx4cRyaqFtHJ8EIhK0i8OJBQxcECuCVutxJhCRoE0cZwMRyRcFefa/ffZBVPogePihhyCnbBhcfMFFEFM+DD4m+ghSlgmDkwlOgpAl4+BkkJMgZdk4+EgaSCcpVX7bmY9kgXQQU+1TgE0c+QJZUUz1b2T4SBbIKmJW+3iMj2SBVBWz+leVfCQLpIqYbp8b85EskIxyfIOfK5Sf+wiCRJEsllQ+oqEkQfBxmD8BBgA5hVjXyrBNUQAAAABJRU5ErkJggg==);
		background-size: 100% 100%;

		.num {
			width: 36upx;
			height: 36upx;
			border-radius: 50px;
			font-size: 24upx;
			color: #fff;
			text-align: center;
			line-height: 36upx;
		}

		.sign {
			position: absolute;
			top: 0;
			left: 50%;
			line-height: 36upx;
			font-size: 12upx;
			color: #fff;
			transform: translateX(-50%);
		}
	}

	/* 分类 */
	.cate-section {
		display: flex;
		justify-content: space-around;
		align-items: center;
		flex-wrap: wrap;
		padding: 30upx 22upx;
		background: #fff;

		.cate-item {
			display: flex;
			flex-direction: column;
			align-items: center;
			font-size: $font-sm + 2upx;
			color: $font-color-dark;
		}

		/* 原图标颜色太深,不想改图了,所以加了透明度 */
		image {
			width: 88upx;
			height: 88upx;
			margin-bottom: 14upx;
			border-radius: 50%;
			opacity: .7;
			box-shadow: 4upx 4upx 20upx rgba(250, 67, 106, 0.3);
		}
	}

	.ad-1 {
		width: 100%;
		height: 210upx;
		padding: 10upx 0;
		background: #fff;

		image {
			width: 100%;
			height: 100%;
		}
	}

	/* 秒杀专区 */
	.seckill-section {
		padding: 4upx 30upx 24upx;
		background: #fff;

		.s-header {
			display: flex;
			align-items: center;
			height: 92upx;
			line-height: 1;

			.s-img {
				width: 140upx;
				height: 30upx;
			}

			.tip {
				font-size: $font-base;
				color: $font-color-light;
				margin: 0 20upx 0 40upx;
			}

			.timer {
				display: inline-block;
				width: 40upx;
				height: 36upx;
				text-align: center;
				line-height: 36upx;
				margin-right: 14upx;
				font-size: $font-sm+2upx;
				color: #fff;
				border-radius: 2px;
				background: rgba(0, 0, 0, .8);
			}

			.icon-you {
				font-size: $font-lg;
				color: $font-color-light;
				flex: 1;
				text-align: right;
			}
		}

		.floor-list {
			white-space: nowrap;
		}

		.scoll-wrapper {
			display: flex;
			align-items: flex-start;
		}

		.floor-item {
			width: 150upx;
			margin-right: 20upx;
			font-size: $font-sm+2upx;
			color: $font-color-dark;
			line-height: 1.8;

			image {
				width: 150upx;
				height: 150upx;
				border-radius: 6upx;
			}

			.price {
				color: $uni-color-primary;
			}
		}
	}

	.f-header {
		display: flex;
		align-items: center;
		height: 140upx;
		padding: 6upx 30upx 8upx;
		background: #fff;

		image {
			flex-shrink: 0;
			width: 80upx;
			height: 80upx;
			margin-right: 20upx;
		}

		.tit-box {
			flex: 1;
			display: flex;
			flex-direction: column;
		}

		.tit {
			font-size: $font-lg +2upx;
			color: #font-color-dark;
			line-height: 1.3;
		}

		.tit2 {
			font-size: $font-sm;
			color: $font-color-light;
		}

		.icon-you {
			font-size: $font-lg +2upx;
			color: $font-color-light;
		}
	}

	/* 团购楼层 */
	.group-section {
		background: #fff;

		.g-swiper {
			height: 650upx;
			padding-bottom: 30upx;
		}

		.g-swiper-item {
			width: 100%;
			padding: 0 30upx;
			display: flex;
		}

		image {
			width: 100%;
			height: 460upx;
			border-radius: 4px;
		}

		.g-item {
			display: flex;
			flex-direction: column;
			overflow: hidden;
		}

		.left {
			flex: 1.2;
			margin-right: 24upx;

			.t-box {
				padding-top: 20upx;
			}
		}

		.right {
			flex: 0.8;
			flex-direction: column-reverse;

			.t-box {
				padding-bottom: 20upx;
			}
		}

		.t-box {
			height: 160upx;
			font-size: $font-base+2upx;
			color: $font-color-dark;
			line-height: 1.6;
		}

		.price {
			color: $uni-color-primary;
		}

		.m-price {
			font-size: $font-sm+2upx;
			text-decoration: line-through;
			color: $font-color-light;
			margin-left: 8upx;
		}

		.pro-box {
			display: flex;
			align-items: center;
			margin-top: 10upx;
			font-size: $font-sm;
			color: $font-base;
			padding-right: 10upx;
		}

		.progress-box {
			flex: 1;
			border-radius: 10px;
			overflow: hidden;
			margin-right: 8upx;
		}
	}

	/* 分类推荐楼层 */
	.hot-floor {
		width: 100%;
		overflow: hidden;
		margin-bottom: 20upx;

		.floor-img-box {
			width: 100%;
			height: 320upx;
			position: relative;

			&:after {
				content: '';
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
				background: linear-gradient(rgba(255, 255, 255, .06) 30%, #f8f8f8);
			}
		}

		.floor-img {
			width: 100%;
			height: 100%;
		}

		.floor-list {
			white-space: nowrap;
			padding: 20upx;
			padding-right: 50upx;
			border-radius: 6upx;
			margin-top: -140upx;
			margin-left: 30upx;
			background: #fff;
			box-shadow: 1px 1px 5px rgba(0, 0, 0, .2);
			position: relative;
			z-index: 1;
		}

		.scoll-wrapper {
			display: flex;
			align-items: flex-start;
		}

		.floor-item {
			width: 180upx;
			margin-right: 20upx;
			font-size: $font-sm+2upx;
			color: $font-color-dark;
			line-height: 1.8;

			image {
				width: 180upx;
				height: 180upx;
				border-radius: 6upx;
			}

			.price {
				color: $uni-color-primary;
			}
		}

		.more {
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			flex-shrink: 0;
			width: 180upx;
			height: 180upx;
			border-radius: 6upx;
			background: #f3f3f3;
			font-size: $font-base;
			color: $font-color-light;

			text:first-child {
				margin-bottom: 4upx;
			}
		}
	}

	/* 猜你喜欢 */
	.guess-section {
		display: flex;
		flex-wrap: wrap;
		padding: 0 30upx;
		background: #fff;

		.guess-item {
			display: flex;
			flex-direction: column;
			width: 48%;
			padding-bottom: 40upx;

			&:nth-child(2n+1) {
				margin-right: 4%;
			}
		}

		.image-wrapper {
			width: 100%;
			height: 330upx;
			border-radius: 3px;
			overflow: hidden;

			image {
				width: 100%;
				height: 100%;
				opacity: 1;
			}
		}

		.title {
			font-size: $font-lg;
			color: $font-color-dark;
			line-height: 80upx;
		}

		.price {
			font-size: $font-lg;
			color: $uni-color-primary;
			line-height: 1;
		}
	}

	.top_head {
		height: 100%;
		width: 100%;
		padding: 20rpx 10rpx 10rpx 10rpx;
		background-color: #f5f5f5;
		background-size: 100% 100%;
		box-sizing: border-box;

		.top_desc {
			width: 100%;
			border-radius: 10rpx;
			background-color: #fff;
			margin-top: 5rpx;
			padding: 10rpx;
			box-sizing: border-box;
			.text-gray {
				font-size: 30rpx;
				color: #ccc;
				margin-right: 10rpx;
			}
			.text-black{
				font-size: 34rpx;
			}
			.remaining {
				font-size: 46rpx;
			}

			.flex_1 {
				flex: 1;
			}
			.row{
			display: flex;
			flex-direction: row;	
			}
			.head_block {
				margin-top: 10rpx;
				

				.income {
					color: #E34B5E;
				}
			}
			
		}
	}
	.main {
		width: 100%;
		box-sizing: border-box;
		margin-top: 20rpx;
		}
		.row_block {
			width: 100%;
			box-sizing: border-box;
			background-color: #fff;
			border-radius: 12rpx;
			position: relative;
			}
			.title_icon {
				background-color: #7E7E7E;
				height: 40rpx;
				width: 10rpx;
				border-radius: 10rpx;
				margin-right: 20rpx;
				font-size: 16px;
				font-weight: 600;
			}
			.large-title{
				font-size: 40rpx;
			}
			.left_title {
					display: flex;
					align-items: center;
					margin-top: 10rpx;
				}
	.wordcharts-box{
		 width: 100%;
		  height:250px;
	}
		
</style>
