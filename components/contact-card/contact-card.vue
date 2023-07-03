<template>
	<view class="contact-card1">
		<template v-if="isAdd || isAdd=='true'">
			<view class="contact-card_list" @click="addContact">
				<view class="card-icon card-icon-add contact-card_add-icon"></view>
				<view class="contact-card_info">
					<text>添加联系人</text>
				</view>
				<view class="card-icon card-icon-right"></view>
			</view>
		</template>
		<template v-else>
			<view class="contact-card_list" v-for="(item, index) in list" :key="item.id">
				<template v-if="isHead || isHead=='true'">
					<view class="card-icon card-icon-contact contact-card_list-icon"></view>
				</template>
				<view class="contact-card_info">
					<view class="row head_block">
						<view class="flex_1">
						<text>学号：{{item.number}}</text>
						</view>
						<view class="flex_1">
						 <text>姓名：{{item.name}}</text>   
						</view>
						</view>	
						
					<view class="row head_block">
						<view class="flex_1">
						<text>年级：{{item.class}}</text>
						</view>
						 <text>学院：{{item.college}}</text>   
						</view>
					
					<view class="row head_block">
						<view class="flex_1">
						<text>是否达标：{{item.access}}</text>
						</view>
						<view class="flex_1">
						 <text>预警情况：{{item.warning}}</text>   
						</view>
						</view>
						<view class="row head_block datasize">
						<view class="flex_1">
						<button type="primary" size="mini" @click='goto(item)'>详情</button>
						</view>
						<view class="flex_1">
						<button type="primary" size="mini"@click='goto1' >关注</button>
						</view>
						<view class="flex_1">
						<button type="warn" size="mini"@click='goto2' >提醒</button>
						</view>
						</view>
						<view>
						</view>
				</view>
				<template v-if="isEdit || isEdit=='true'">
					<view class="card-icon card-icon-right"></view>
				</template>
			</view>
		</template>
	</view>
</template>
<script>
	/**
	 * @property {Boolean} isAdd=[true|false] 是否是新增，默认否(默认是列表)
	 * @property {Array} list 联系人列表
	 * @property {Boolean} isRemarks=[true|false] 是否显示备注，默认是
	 * @property {Boolean} isEdit=[true|false] 是否可编辑，默认是
	 * @property {Boolean} isHead=[true|false] 是否可编辑，默认是
	 */
	export default {
		name: 'ContactCard',
		props: {
			isAdd: {
				type: [Boolean, String],
				default: false
			},
			list: {
				type: Array,
				default: () => [0]
			},
			isRemarks: {
				type: [Boolean, String],
				default: true
			},
			isEdit: {
				type: [Boolean, String],
				default: true
			},
			isHead: {
				type: [Boolean, String],
				default: true
			},
		},
		methods: {
			addContact() {
				this.$emit('addContact');
			},
			clickCard(e) {
				if (JSON.parse(this.isEdit)) {
					this.$emit('clickCard', e);
				}
			},
			goto(item) {
			       uni.navigateTo({
			     url:"../../pages/student-information/student-information"+'?number='+item.number
			    })
			 },
			 goto1() {
				 uni.showToast({
				 	icon:'none',
				 	title:'已成功关注'
			 })
		},
		    goto2() {
				 uni.showToast({
				 	icon:'none',
				 	title:'已成功提醒'
			 })
		}
		},
}
</script>
<style lang="scss">
	.contact-card1 {
		background-color: #ffffff;
	}

	.contact-card_list {
		position: relative;
		padding: 10rpx;
		margin: 10rpx 0;
		background-color: #FFF;
		display: flex;
		align-items: center;
		justify-content: center;

		.contact-card_info {
			flex: 1;
			
			.card-list-information{
				font-size: 100%;
				
				display: flex;
				flex-direction: row;
			}
			.contact-card_info-remarks {
				color: #909399;
				font-size: 80%;
			}
		}

		.contact-card_list-icon {
			width: 40rpx;
			height: 40rpx;
			margin-right: 20rpx;
		}

		.contact-card_add-icon {
			width: 70rpx;
			height: 70rpx;
			margin-right: 20rpx;
		}
	}

	.contact-card_list::before {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		height: 2px;
		background: -webkit-repeating-linear-gradient(135deg, #ff6c6c 0, #ff6c6c 20%, transparent 0, transparent 25%, #1989fa 0, #1989fa 45%, transparent 0, transparent 50%);
		background: repeating-linear-gradient(-45deg, #ff6c6c 0, #ff6c6c 20%, transparent 0, transparent 25%, #1989fa 0, #1989fa 45%, transparent 0, transparent 50%);
		background-size: 80px;
		content: '';
	}

	.card-icon {
		display: inline-block;
		width: 16px;
		height: 16px;
		background-repeat: no-repeat;
		background-position: center;
		background-size: 100%;
	}

	.card-icon-right {
		background: url(data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22utf-8%22%3F%3E%3Csvg%20version%3D%221.1%22%20width%3D%27100%25%27%20height%3D%27100%25%27%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20id%3D%22t-icon-you%22%20viewBox%3D%220%200%201024%201024%22%3E%3Cpath%20d%3D%22M731.7%20475.1L370.6%2080.8c-19.7-21.5-53-22.9-74.4-3.3-21.5%2019.7-22.9%2053-3.3%2074.4l328.6%20358.8-328.3%20359.8c-19.6%2021.5-18.1%2054.8%203.4%2074.4%2021.5%2019.6%2054.8%2018.1%2074.4-3.4l360.5-394.9c0.7-0.8%201.5-1.7%202.1-2.5%2016.4-19.9%2016.1-49.4-1.9-69z%22%20fill%3D%22%23999999%22%20%3E%3C%2Fpath%3E%3C%2Fsvg%3E);
	}

	.card-icon-contact {
		background: url(data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22utf-8%22%3F%3E%3Csvg%20version%3D%221.1%22%20width%3D%27100%25%27%20height%3D%27100%25%27%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20id%3D%22t-icon-lianxiren%22%20viewBox%3D%220%200%201024%201024%22%3E%3Cpath%20d%3D%22M994.304%20949.76c-15.872-197.12-187.392-227.84-260.608-241.152-6.144-1.024-11.264-2.048-15.872-3.072-31.232-6.656-54.272-19.456-65.024-36.352-7.168-11.264-8.704-23.552-5.632-37.888%2010.24-43.008%2041.472-73.216%2071.168-102.4%2024.064-23.552%2047.104-46.08%2057.856-74.24%2018.432-48.128%2017.92-74.752-3.072-94.72-6.144-6.144-9.216-14.848-7.168-23.04%2018.432-78.336%207.68-143.36-32.256-194.048C655.36%2044.544%20493.568%2036.864%20445.952%2036.864c-41.984%200-81.408%204.608-108.544%2013.312-9.216%203.072-16.384%209.216-20.48%2017.408-4.096%208.192-5.12%2017.92-2.048%2026.624v0.512c3.584%209.728%200%2020.992-8.704%2027.136-57.344%2043.008-72.192%20111.104-48.128%20215.04%202.048%208.704-0.512%2017.408-7.168%2023.552-20.48%2019.968-21.504%2046.592-2.56%2094.72%2010.752%2028.16%2033.792%2050.176%2057.856%2074.24%2029.696%2029.184%2060.416%2059.392%2071.168%20102.4%203.584%2013.824%201.536%2026.624-5.632%2037.888-10.752%2016.896-33.792%2029.696-65.024%2036.352-4.608%201.024-9.728%202.048-15.872%203.072-73.728%2012.8-245.248%2043.52-261.12%20240.64-1.024%209.728%202.56%2019.456%209.216%2026.624%206.656%207.168%2015.872%2011.264%2025.6%2011.264h895.488c9.728%200%2018.944-4.096%2025.6-11.264%206.144-7.168%209.728-16.896%208.704-26.624zM81.92%20936.96c8.704-59.904%2036.352-103.936%2083.968-134.144%2045.568-28.672%20100.864-38.4%20134.144-44.544%206.144-1.024%2011.776-2.048%2016.384-3.072%2045.568-9.216%2079.36-29.696%2097.792-58.88%2014.336-22.528%2018.432-49.152%2011.776-76.8-13.824-56.832-51.712-94.208-84.48-126.464-19.968-19.968-39.424-38.4-46.08-56.32-8.704-23.04-10.24-33.28-9.728-37.888v-1.536c0-0.512%200.512-0.512%201.024-1.024%2019.456-18.944%2027.136-45.568%2020.992-71.68-25.088-106.496%202.56-142.848%2029.184-163.328%2021.504-15.872%2032.256-41.472%2029.696-67.584%2021.504-4.608%2050.176-7.168%2079.872-7.168%2086.528%200%20197.12%2023.04%20248.32%2087.552%2029.696%2037.888%2037.376%2088.576%2022.528%20151.04-6.144%2025.6%202.048%2052.736%2020.992%2071.168%200.512%200.512%200.512%200.512%201.024%200.512v1.536c0%204.096-1.024%2014.848-9.728%2037.888-6.656%2017.92-26.112%2036.352-46.08%2056.32-33.28%2032.768-70.656%2069.632-84.48%20126.464-6.656%2027.648-2.56%2053.76%2011.776%2076.8%2018.432%2029.184%2052.224%2049.152%2097.792%2058.88%205.12%201.024%2010.24%202.048%2016.896%203.072%2032.768%206.144%2087.552%2015.872%20133.632%2044.544%2048.128%2030.208%2075.264%2073.728%2083.968%20134.144H81.92z%22%20fill%3D%22%22%20%3E%3C%2Fpath%3E%3C%2Fsvg%3E);
	}

	.card-icon-add {
		background: url(data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22utf-8%22%3F%3E%3Csvg%20version%3D%221.1%22%20width%3D%27100%25%27%20height%3D%27100%25%27%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20id%3D%22t-icon-xinzeng%22%20viewBox%3D%220%200%201024%201024%22%3E%3Cpath%20d%3D%22M512%2042.666667c259.157333%200%20469.333333%20210.133333%20469.333333%20469.333333s-210.176%20469.333333-469.333333%20469.333333S42.666667%20771.2%2042.666667%20512%20252.842667%2042.666667%20512%2042.666667z%20m4.266667%20234.666666h-8.533334a42.666667%2042.666667%200%200%200-42.666666%2042.666667l-0.042667%20145.066667H320a42.666667%2042.666667%200%200%200-42.666667%2042.666666v8.533334a42.666667%2042.666667%200%200%200%2042.666667%2042.666666h145.024l0.042667%20145.066667a42.666667%2042.666667%200%200%200%2042.666666%2042.666667h8.533334a42.666667%2042.666667%200%200%200%2042.666666-42.666667l-0.042666-145.066667H704a42.666667%2042.666667%200%200%200%2042.666667-42.666666v-8.533334a42.666667%2042.666667%200%200%200-42.666667-42.666666h-145.109333l0.042666-145.066667a42.666667%2042.666667%200%200%200-42.666666-42.666667z%22%20fill%3D%22%231989FA%22%20%3E%3C%2Fpath%3E%3C%2Fsvg%3E);
	}
	.flex_1 {
		flex: 1;
	}
	.row{
	display: flex;
	flex-direction: row;	
	}
	.head_block {
		margin-top: 5rpx;}
		
		
</style>
