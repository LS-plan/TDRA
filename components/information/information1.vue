<template>
<view class="content">
		<scroll-view class="data_body" scroll-y :style="{height:scrollHeight}">
			<template v-if="true">
				
				<view class="view_item">
					<view class="title">各类学时情况</view>
					<view class="progress_circle">
						<view v-for="(item,index) in circleData" :key="index" :class="['progress_block','block_'+index]">
							<view class="name">{{item.series[0].name}}</view>
							<view class="value">{{item.series[0].value}}</view>
							<view class="charts-box arcbar" style="height: 180rpx;width: 60%;">
								<qiun-data-charts type="arcbar" :chartData="item" :canvasId="'four_a_'+index" :canvas2d="isCanvas2d"
									:resshow="delayload"
									:opts="{title:{name:item.series[0].precent,color:item.series[0].color,fontSize:15},subtitle:{name:'',color:'#666666',fontSize:12},extra:{arcbar:{backgroundColor:item.series[0].backgroundColor}}}" />
							</view>
							<view class="planet">
								<view class="planet_shadow"></view>
								<view class="crater1"></view>
								<view class="crater2"></view>
								<view class="crater3"></view>
								<view class="crater4"></view>
							</view>
							<view class="star" :class="['star'+index]"></view>
							<view class="star pink" :class="['star'+index]"></view>
							<view class="star blue" :class="['star'+index]"></view>
							<view class="star yellow" :class="['star'+index]"></view>
						</view>
					</view>
				</view>
				<view class="split_line"></view>
				
				<view class="friend_operate">
					<view class="title">能力分析</view>
				<view class="charts-box">
				  <qiun-data-charts
				      type="radar"
				      :chartData="analyseData"
				      background="none"
				    />
				</view>
				</view>
				<view class="split_line"></view>
				
				<view class="friend_operate">
					<view class="title">综合评价</view>
					<text class="conclusion">  
经认定，冷润茗同学在校期间累计获得：
					 思想成长类课程学分2.9个，专业排名22/56；
					 创新创业类课程学分2.4个，专业排名15/56；
					 文体发展类课程学分3.6个，专业排名8/56；
					 社会实践与志愿服务类课程学分2.6个，专业排名11/56；
					 当前状态：已达到毕业要求。
					 </text>
				</view>
				<view class="friend_operate">
					<view class="title">综合评价</view>
				</view>
			</template>
			<template v-else>
				<view class="container padding_stand-big normal_color">
					<li class="iconfont icon-cry cry"></li>暂无数据
				</view>
			</template>
		</scroll-view>
	</view>
</template>

<script>
	import ProgressBar from "../progress-bar/progress-bar.vue"
	
	import CircleData from "../../static/json/data-screen/1.json"
	import ProductRateData from '../../static/json/data-screen/2.json';
	import TrendData from '../../static/json/data-screen/3.json';
	import ServiceComment from '../../static/json/data-screen/4.json';
	import RankData from '../../static/json/data-screen/5.json';
	import total from '../../static/json/data-screen/total.json';
    import totalData from '../../static/json/data-screen/tl1.json';
	import totalrate from '../../static/json/data-screen/totalrate.json';
	import rateData from '../../static/json/data-screen/tr1.json';
	import cloud from '../../static/json/data-screen/cloud.json';
    import cloudData from '../../static/json/data-screen/cloudData.json';
    import tonyScroll from '@/components/tony-scroll/tony-scroll.vue';
	import RankList from '../../static/json/data-screen/rk1.json';
	import analyseData from '../../static/json/information/data2.json';
	import circleData from "../../static/json/information/2.json"
	
	export default {
		name:"data-screen",
		props:{
			scrollHeight:{
				type:String,
				default:"600px"
			}
		},
		components:{
			ProgressBar,
			tonyScroll
		},
		data(){
			return {
				CircleData,
				TrendData,
				ProductRateData,
				ServiceComment,
				RankData,
				total,
				totalData,
				totalrate,
				rateData,
				cloud,
				cloudData,
				RankList,
				circleData,
				analyseData,
				isRank:true,
				isCanvas2d:this.$Config.ISCANVAS2D,
				delayload: false, //延时加载图表，否则会出现图表加载完后定位错乱
			    scrollHeight: "100%"
			}
		},
		methods:{
			async getData(){
				uni.showLoading();
				await setTimeout(() => {
					this.delayload = true;
					uni.hideLoading();
				}, 1000)
			},
			updateRanking(nVal){
				this.RankData = nVal;
			},
		},
		mounted() {
			this.getData();
		}
	}
</script>

<style scoped lang="scss">
	.content{
		padding-top: 10rpx;
	}
	.data_body{
		height: 100%;
		text-align: center;
		color: #333333;
		background-repeat: repeat;
		background-color: #ffffff;
		.friend_operate{
			padding: 30rpx 20rpx;
			.title{
				text-align:left;
				margin-bottom: 30rpx;
				font-size: 40rpx;
			}
		}
		.view_item{
			padding: 30rpx 20rpx;
			.title{
				text-align:left;
				margin-bottom: 30rpx;
				font-size: 40rpx;
			}
		}
		.progress_circle{
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
			align-items: center;
			height: 450rpx;
			
			.progress_block{
				width: 45%;
				border-radius: 20rpx;
				height: 180rpx;
				position: relative;
				overflow: hidden;
				
				.name{
					color: #fff;
					font-size: 24rpx;
					position: absolute;
					top: 20rpx;
					left: 10rpx;
					max-width: 144rpx;
				}
				.value{
					color: #fff;
					font-size: 40rpx;
					position: absolute;
					top: 64rpx;
					left: 10rpx;
					max-width: 144rpx;
				}
				
				.circle{
					position: absolute;
					right: 8rpx;
					top: 16rpx;
				}
				.arcbar{
					position: absolute;
					right: -4rpx;
					top: 8rpx;
				}
			}
			.block_0{
				background-color: #0FC3FF;
			}
			.block_1{
				background-color: #FF6B8B;
			}
			.block_2{
				background-color: #FFCB1D;
			}
			.block_3{
				background-color: #3BDCAA;
			}
		}
	}
	.planet {
		width: 60px;
		height: 60px;
		border-radius: 50%;
		background: #333;
		position: absolute;
		left: -13px;
		bottom: -26px;
		overflow: hidden;
		opacity: 0.5;
		z-index: 0;
	}

	.planet_shadow {
		position: absolute;
		border-radius: 50%;
		height: 100%;
		width: 100%;
		top: -40%;
		right: -10%;
		border: 35px solid rgba(0, 0, 0, .15);
	}

	.crater1,
	.crater2,
	.crater3,
	.crater4 {
		position: absolute;
		border-radius: 50%;
		background: rgba(0, 0, 0, .3);
		box-shadow: inset 3px 3px 0 rgba(0, 0, 0, .2);
	}

	.crater1 {
		width: 20px;
		height: 20px;
		left: 25%;
		top: 20%;
	}

	.crater2 {
		width: 10px;
		height: 10px;
		left: 50%;
		top: 60%;
	}

	.crater3 {
		width: 15px;
		height: 15px;
		left: 30%;
		top: 65%;
	}

	.crater4 {
		width: 15px;
		height: 15px;
		left: 60%;
		top: 35%;
	}

	.star {
		display: block;
		width: 5px;
		height: 5px;
		border-radius: 50%;
		background: #FFF;
		top: 10px;
		left: 50px;
		position: relative;
		transform-origin: 100% 0;
		box-shadow: 0 0 5px 5px rgba(255, 255, 255, .3);
		opacity: 0;
		z-index: 2;
	}
	.star0{
		animation: star-ani 4s infinite ease-out;
	}
	.star1{
		animation: star-ani 5s infinite ease-out;
	}
	.star2{
		animation: star-ani 6s infinite ease-out;
	}
	.star3{
		animation: star-ani 7s infinite ease-out;
	}

	.star:after {
		content: '';
		display: block;
		top: 20px;
		left: 60px;
		border: 0px solid #fff;
		border-width: 0px 90px 2px 90px;
		border-color: transparent transparent transparent rgba(255, 255, 255, .3);
		transform: rotate(-45deg) translate3d(1px, 3px, 0);
		box-shadow: 0 0 1px 0 rgba(255, 255, 255, .1);
		transform-origin: 0% 100%;
		animation: shooting-ani 100s infinite ease-out;
	}

	.pink {
		top: 10px;
		left: 60px;
		background: #ff5a99;
		animation-delay: 5s;
		-webkit-animation-delay: 5s;
		-moz-animation-delay: 5s;
	}

	.pink:after {
		border-color: transparent transparent transparent #ff5a99;
		animation-delay: 5s;
		-webkit-animation-delay: 5s;
		-moz-animation-delay: 5s;
	}

	.blue {
		top: 15px;
		left: 70px;
		background: cyan;
		animation-delay: 7s;
		-webkit-animation-delay: 7s;
		-moz-animation-delay: 7s;
	}

	.blue:after {
		border-color: 'transpareanimation-delay: 12s';
		-webkit-animation-delay: 7s;
		-moz-animation-delay: 7s;
		animation-delay: 7s;
	}

	.yellow {
		top: 0px;
		left: 80px;
		background: #ffcd5c;
		animation-delay: 5.8s;
	}

	.yellow:after {
		border-color: transparent transparent transparent #ffcd5c;
		animation-delay: 5.8s;
	}
	.conclusion{
		font-size: 35rpx;
	}
	@keyframes star-ani {
		0% {
			opacity: 0;
			transform: scale(0) rotate(0) translate3d(0, 0, 0);
			-webkit-transform: scale(0) rotate(0) translate3d(0, 0, 0);
			-moz-transform: scale(0) rotate(0) translate3d(0, 0, 0);
		}

		50% {
			opacity: 0.5;
			transform: scale(1) rotate(0) translate3d(-20px, 20px, 0);
			-webkit-transform: scale(1) rotate(0) translate3d(-20px, 20px, 0);
			-moz-transform: scale(1) rotate(0) translate3d(-20px, 20px, 0);
		}

		100% {
			opacity: 0;
			transform: scale(1) rotate(0) translate3d(-30px, 30px, 0);
			-webkit-transform: scale(1) rotate(0) translate3d(-30px, 30px, 0);
			-moz-transform: scale(1) rotate(0) translate3d(-30px, 30px, 0);
		}
	}
</style>
