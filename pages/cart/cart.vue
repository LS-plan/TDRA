<template>
	<view>
		<dropdown-screen></dropdown-screen>
		<uni-search-bar @confirm="search" :focus="true" v-model="searchValue" @input="input" @cancel="cancel"
			@clear="clear">
		</uni-search-bar>
		<contact-card :list="list"></contact-card>
	</view>

</template>
<script>
	import {
		getstudent
	} from "@/api/studentinfo"
	// import $route from '@/uni_modules/uview-ui/libs/util/route.js'
	import dropdownScreen from '@/components/dropdown-screen/dropdown-screen'
	import RenDropdownFilter from '@/components/ren-dropdown-filter/ren-dropdown-filter.vue'
	export default {
		components: {
			RenDropdownFilter,
			dropdownScreen
		},
		data() {
			return {
				scrollHeight: "100%",
				searchValue: '',
				filterData: [
					[{
						text: '年级',
						value: ''
					}, {
						text: '2018',
						value: 1
					}, {
						text: '2019',
						value: 2
					}, {
						text: '2020',
						value: 3
					}],
					[{
						text: '是否达标',
						value: ''
					}, {
						text: '是',
						value: 1
					}, {
						text: '否',
						value: 2
					}],
					[{
							text: '学院',
							value: ''
						}, {
							text: '地球科学与技术学院',
							value: 1
						},
						{
							text: '石油工程学院',
							value: 2
						}, {
							text: '化学工程学院',
							value: 3
						},
						{
							text: '机电工程学院',
							value: 4
						}, {
							text: '储运与建筑工程学院',
							value: 5
						},
						{
							text: '材料科学与工程学院',
							value: 6
						}, {
							text: '石大山能新能源学院',
							value: 7
						},
						{
							text: '海洋与空间信息学院',
							value: 8
						}, {
							text: '控制科学与工程学院',
							value: 9
						},
						{
							text: '理学院',
							value: 10
						}, {
							text: '经济管理学院',
							value: 11
						},
						{
							text: '外国语学院',
							value: 12
						}, {
							text: '文法学院',
							value: 13
						},
						{
							text: '体育教学部',
							value: 14
						}
					],
					[{
						text: '全部',
						value: ''
					}],
				],
				defaultIndex: [0, 0, 0, 0],
				tabList: this.$Config.XINXICHAXUN, //标签头
				timeArray: this.$Config.TIMEARRAY, //时间数组
				info: this.$store.state.userInfo, //用户数据
				title: "学生信息详情", //标题
				tabCur: 0, //标签头下标
				topBar: 40, //导航高 //数据展示体高度
				scrollHeight: "200%", //数据展示体高度
				list: [],
			}
		},
		// onLoad() {	
		// 	let that=this;
		// 			uni.addInterceptor('navigateTo', {//监听跳转
		// 				success(e) {
		// 					that.getstudent1();
		// 				}
		// 			})
		// },
		methods: {
			onSelected() {
				uni.navigateTo({
					url: './form1'
				})
			},

			search(res) {
				uni.showToast({
					title: '搜索：' + res.value,
					icon: 'none'
				})
			},
			input(res) {
				console.log('----input:', res)
			},
			clear(res) {
				uni.showToast({
					title: 'clear事件，清除值为：' + res.value,
					icon: 'none'
				})
			},
			blur(res) {
				uni.showToast({
					title: 'blur事件，输入值为：' + res.value,
					icon: 'none'
				})
			},

			cancel(res) {
				uni.showToast({
					title: '点击取消，输入值为：' + res.value,
					icon: 'none'
				})
			},
			onBackPress() {

				plus.key.hideSoftKeybord();

			},
			dateChange(d) {
				uni.showToast({
					icon: 'none',
					title: d
				})
			},

			getstudent1() {
				console.log('成功')
				// if (this.$route.path == '/pages/cart/cart') {
				getstudent().then(res => {
					let i = 0;
					while (i < 50) {
						this.list.push({
							number: res.data[i].studentId,
							name: res.data[i].studentName,
							class: res.data[i].grade,
							college: res.data[i].faculty,
							access: "是",
							warning: "正常"
						})
						i++;
					}
				})
				// }

			}
		},
		mounted(){
			this.getstudent1()
		},

		
		
		

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
			background-color: #1cbbb4;
			width: 100%;
		}

		scroll-view {
			box-sizing: border-box;
		}

		.swiper {
			box-sizing: border-box;
		}

		.nav {
			background-color: #1cbbb4;
			background-size: 100% 100%;

			.back {
				font-size: 0rpx;
				padding: 20rpx 14rpx 15rpx 14rpx;
				color: #1cbbb4;
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
			background-color: #1cbbb4;
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

	.search-result {
		padding-top: 10px;
		padding-bottom: 20px;
		text-align: center;
	}

	.search-result-text {
		text-align: center;
		font-size: 14px;
		color: #666;
	}

	.example-body {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		padding: 0px;
	}

	.uni-mt-10 {
		margin-top: 10px;
	}
</style>
