<template>
	<!-- 搜索框 -->
	<view class="search-input-box dis-flex">
		<view class="search-input dis-flex flex-y-center"  @tap="gosearch" :style="{background:background,borderRadius:radius}">
			<text class="icon iconfont2 icon-searchfor col-9"></text>
			<input :disabled="disabled" v-model="keyword" @blur="search" :focus="focus" :placeholder="placeholder" :placeholderStyle="placeStyle" type="text"/>
			<slot name="right"></slot>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'search',
		props: {
			// 是否禁止输入
			disabled: {
				type: Boolean,
				default: false
			},
			// 是否自动聚焦
			focus: {
				type: Boolean,
				default: false
			},
			// 输入框值
			value: {
				type: [Number, String],
				default: ''
			},
			// 搜索栏Placeholder
			placeholder: {
				type: String,
				default: ''
			},
			// 搜索栏Placeholder样式
			placeStyle: {
				type: String,
				default: 'color:#999;font-size:24rpx;'
			},
			// 输入框背景颜色
			background: {
				type: String,
				default: ''
			},
			// 搜索栏圆角
			radius: {
				type: [Number, String],
			},
			
		},
		watch: {
			value: {
				immediate: true,
				handler(newVal) {
					this.keyword = newVal
				}
			},
		},
		data() {
			return {
				keyword: '',
			};
		},
		methods: {
			// input是否禁止输入时触发事件
			gosearch(){
				this.$emit('gosearch',this.keyword)
			},
			// input失去焦点时触发事件
			search(){
				this.$emit('search',this.keyword)
			},
		}
	}
</script>

<style lang="scss">
	/* 搜索框 */
	$searchbar-height: 60rpx;
	.dis-flex{
		display: flex;
	}
	.flex-y-center{
		align-items: center;
	}
	.col-9{color: #999;}
	.search-input-box {
		height: $searchbar-height;
		overflow: hidden;
	}
	.search-input {
		width: 100%;
		background: #F5F5F5;
		border-radius: 30rpx;
		padding: 0 26rpx;
		text-align: left;
		box-sizing: border-box;
		overflow: hidden;
		.icon{
			margin-right: 24rpx;
		}
	}
	.search-input input {
		flex: 1;
		font-size: 24rpx;
		height: $searchbar-height;
		line-height: $searchbar-height;
	}
</style>
