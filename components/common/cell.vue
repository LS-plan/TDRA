<template>
	<view class="row_align_center cell_body"  :style="{margin:marginVal}" @click="clickCell">
		<li v-if="leftIcon != '' && !isImg" :class="[leftIcon,leftIconClass,'iconfont']" style="margin-right: 18rpx;"></li>
		<image v-if="leftIcon != '' && isImg" :src="leftIcon" class="cellIcon"></image>
		<text class="the_text">{{textVal}}</text>
		<slot></slot>
		<li v-if="rightIcon != ''" :class="[rightIcon,rightIconClass,'iconfont']"></li>
	</view>
</template>

<script>
	export default {
		name:'cell',
		props:{
			leftIcon:{
				type: String,
				default: ''
			},
			rightIcon:{
				type: String,
				default: ''
			},
			rightIconClass:{
				type: String,
				default: ''
			},
			textVal:{
				type: String,
				default: ''
			},
			marginVal:{
				type: String,
				default: '0'
			},
			isImg:{
				type:Boolean,
				default:true
			},
			linkUrl:{
				type: String,
				default: ''
			}
		},
		data() {
			return {
				
			}
		},
		methods: {
			clickCell(){
				this.$emit("clickCell",this.linkUrl);
			}
		},
	}
</script>

<style scoped lang="scss">
	.cell_body{
		padding: 24rpx 0;
		border-bottom: 1px solid #F8F8FA;
		.cellIcon{
			margin-right: 18rpx;
			height: 40rpx;
			width: 40rpx;
		}
		.the_text{
			flex: 1;
			font-size: 14px;
			color: #fff;
		}
		.iconfont{
			color: #fff;
		}
		li {
			list-style-type:none;
		}
	}
	
</style>
