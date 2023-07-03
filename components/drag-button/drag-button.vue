<template>
	<view v-show="isShow">
		<view
			id="_drag_button"
			class="drag"
			:style="'left: ' + left + 'px; top:' + top + 'px;'"
			@touchstart="touchstart"
			@touchmove.stop.prevent="touchmove"
			@touchend="touchend"
			@click.stop.prevent="click"
			:class="{transition: isDock && !isMove }"
		>
			<view class="container font">
				<text>返回</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'drag-button',
		props: {
			isDock:{
				type: Boolean,
				default: true
			},
			existTabBar:{
				type: Boolean,
				default: false
			},
			isShow:{
				type: Boolean,
				default: false
			},
			scrollHeight:{
				type:Number,
				default:600
			}
		},
		data() {
			return {
				top:0,
				left:-100,
				width: 0,
				height: 0,
				offsetWidth: 0,
				offsetHeight: 0,
				windowWidth: 0,
				windowHeight: 0,
				isMove: true,
				edge: 10,
			}
		},
		watch:{
			isShow(newVal,oldVal){
				const query = uni.createSelectorQuery().in(this);
				query.select('#_drag_button').boundingClientRect(data => {
					this.width = data.width;
					this.height = data.height;
					this.left = this.windowWidth - 54
					this.top = this.scrollHeight - 50;
					this.offsetWidth = data.width / 2;
					this.offsetHeight = data.height / 2;
				}).exec();
			}
		},
		mounted() {
			const sys = uni.getSystemInfoSync();
			
			this.windowWidth = sys.windowWidth;
			this.windowHeight = sys.windowHeight;
			
			// #ifdef APP-PLUS
				this.existTabBar && (this.windowHeight -= 50);
			// #endif
			if (sys.windowTop) {
				this.windowHeight += sys.windowTop;
			}
		},
		methods: {
			click() {
				this.$emit('btnClick');
			},
			touchstart(e) {
				//this.$emit('btnTouchstart');
			},
			touchmove(e) {
				// 单指触摸
				if (e.touches.length !== 1) {
					return false;
				}
				this.isMove = true;
				this.left = e.touches[0].clientX - this.offsetWidth;
				let clientY = e.touches[0].clientY - this.offsetHeight;
				// #ifdef H5
					clientY += this.height;
				// #endif
				let edgeBottom = this.windowHeight - this.height - this.edge-10;
				// 上下触及边界
				if (clientY < this.edge) {
					this.top = this.edge;
				} else if (clientY > edgeBottom) {
					this.top = edgeBottom - 146;
				} else {
					this.top = clientY - 140
				}
				this.top = this.top < 0 ? 0 : this.top
			},
			touchend(e) {
				if (this.isDock) {
					let edgeRigth = this.windowWidth - this.width - this.edge;
					
					if (this.left < this.windowWidth / 2 - this.offsetWidth) {
						this.left = this.edge;
					} else {
						this.left = edgeRigth;
					}
					
				}
				
				this.isMove = false;
			},
		}}
</script>

<style lang="scss">
	.drag {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: rgba(64,162,237,1);
		box-shadow: 0 0 6upx rgba(64,162,237, 0.5);
		color: $uni-text-color-inverse;
		width: 80upx;
		height: 80upx;
		border-radius: 50%;
		font-size: $uni-font-size-sm;
		position: fixed;
		z-index: 9;
		
		&.transition {
			transition: left .3s ease,top .3s ease;
		}
	}
	.font{
		font-size: 26rpx;
	}
</style>
