<template>
	<view>
			
			<view @click="xueshi()">
				<uni-list>
				   <uni-list-item title="学时导入申请表" thumb="../../static/download.png"></uni-list-item>
				</uni-list>
			</view>
			
			<view @click="mingbai()">
				<uni-list>
				   <uni-list-item title="第二课堂活动发起明白纸" thumb="../../static/download.png"></uni-list-item>
				</uni-list>
			</view>
	
	
			<view @click="shouce()">
				<uni-list>
				   <uni-list-item title="石光学生版使用手册" thumb="../../static/download.png"></uni-list-item>
				</uni-list>
			</view>
			
			<view @click="guifan()">
				<uni-list>
				   <uni-list-item title="学时导入业务规范" thumb="../../static/download.png"></uni-list-item>
				</uni-list>
			</view>
	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			xueshi() {
				uni.downloadFile({
					url:'.static/2019xueshi.xls',//file:///D:/下载文档/2019级学时数据.xls
					success: (data) => {
						if (data.statusCode === 200) {
							uni.showToast({
								icon: 'none',
								mask: true,
								title: '下载完成',
							});

							console.log("下载完成");
							
						}
					},
					fail: (err) => {
						console.log(err);
						uni.showToast({
							icon: 'none',
							mask: true,
							title: '失败请重新下载',
						});
					},
				});
			},
			
			mingbai() {
				uni.downloadFile({
					url:'.static/mingbaizhi.pdf',//file:///D:/下载文档/2019级学时数据.xls
					success: (data) => {
						if (data.statusCode === 200) {
							uni.showToast({
								icon: 'none',
								mask: true,
								title: '下载完成',
							});
			
							console.log("下载完成");
							
						}
					},
					fail: (err) => {
						console.log(err);
						uni.showToast({
							icon: 'none',
							mask: true,
							title: '失败请重新下载',
						});
					},
				});
			},
			
			
			shouce() {
				uni.downloadFile({
					url:'.static/shiyong.docx',//file:///D:/下载文档/2019级学时数据.xls
					success: (data) => {
						if (data.statusCode === 200) {
							uni.showToast({
								icon: 'none',
								mask: true,
								title: '下载完成',
							});
			
							console.log("下载完成");
							
						}
					},
					fail: (err) => {
						console.log(err);
						uni.showToast({
							icon: 'none',
							mask: true,
							title: '失败请重新下载',
						});
					},
				});
			},
			
			guifan() {
				uni.downloadFile({
					url:'.static/guifan.docx',//file:///D:/下载文档/2019级学时数据.xls
					success: (data) => {
						if (data.statusCode === 200) {
							uni.showToast({
								icon: 'none',
								mask: true,
								title: '下载完成',
							});
			
							console.log("下载完成");
							
						}
					},
					fail: (err) => {
						console.log(err);
						uni.showToast({
							icon: 'none',
							mask: true,
							title: '失败请重新下载',
						});
					},
				});
			}
			
			
		}
	}
</script>

<style>

</style>
