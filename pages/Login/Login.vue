<!-- Login.vue -->
<template>
	<view class="text-center main" :class="styleMode.mainColor">
		<view class="text-right margin">
		</view>
		<view class="margi-xl text-xxl text-bold" style="visibility: hidden;">123</view>
		<view class="margin-xl">
			<image src='../../static/earth.jpg' mode="widthFix" style="width: 100px;"></image>
		</view>
		<view class="margi-xl text-xxl text-bold">页岩气藏预测平台</view>
		<view class="nav flex margin-xl justify-around text-lg">
			<view @click="changeLogin('account')" class="cu-item"
				:class="loginMethod=='account'?styleMode.textColor+' cur':''">账号密码登录</view>
			<view @click="changeLogin('phone')" class="cu-item"
				:class="loginMethod=='phone'?styleMode.textColor+' cur':''">手机号登录</view>
		</view>
		<view class="margin">
			<swiper :current-item-id='loginMethod' @change="swiperChange">
				<swiper-item item-id='account'>
					<view class="margin-left margin-right solid">
						<view class="cu-form-group text-left">
							<text class='cuIcon-people text-gray margin-right'></text>
							<input v-model="user.username" placeholder="请输入账号" name="input"></input>
						</view>
						<view class="cu-form-group text-left">
							<text class='cuIcon-lock text-gray margin-right'></text>
							<input v-model="user.password" placeholder="请输入密码" name="input" password="true"></input>
						</view>
					</view>
				</swiper-item>
				<swiper-item item-id='phone'>
					<view class="margin-left margin-right solid">
						<view class="cu-form-group text-left">
							<text class='cuIcon-mobile text-gray margin-right'></text>
							<input v-model="userPhone" placeholder="请输入手机号" name="input"></input>
						</view>
						<view class="cu-form-group text-left">
							<text class='cuIcon-mail text-gray margin-right'></text>
							<input placeholder="请输入验证码" name="input"></input>
							<button v-if="showText" @click="sendSMS" class='cu-btn'
								:class="styleMode.bgColor">获取验证码</button>
							<button v-if="!showText" disabled="true" class='cu-btn'>{{second}}s重新发送</button>
						</view>
					</view>
				</swiper-item>
			</swiper>
			<view class="flex margin justify-between">
				<view class="flex align-center">
					<view class="text-lg margin-right">记住密码</view>
					<view>
						<switch class='radius' @change="switchLogin"
							:class="autoLogin?styleMode.otherColor+' checked':''" :checked="autoLogin?true:false">
						</switch>
					</view>
				</view>
				<view :class="styleMode.textColor" class="text-lg">忘记密码</view>
			</view>
			<view class="margin">
				<button :class="styleMode.bgColor" @click='login()'>立即登录</button>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	import {
		login
	} from "../../api/userlogin"
	export default {
		data() {
			return {
				styleMode: {
					mainColor: 'bg-white',
					textColor: 'text-blue',
					bgColor: 'bg-blue',
					otherColor: 'blue',
				},
				loginMethod: 'account',
				autoLogin: true,
				showText: true,
				second: 60,
				userPhone: '',
				useraccount: '',
				userkeyword: '',
				user: {}
			}
		},
		methods: {

			switchLogin(e) {
				this.autoLogin = e.detail.value
			},
			swiperChange(e) {
				this.loginMethod = e.detail.currentItemId
			},
			changeLogin(method) {
				this.loginMethod = method;
			},
			sendSMS() {
				if (this.userPhone.length < 11) {
					uni.showToast({
						icon: 'none',
						title: '请输入有效手机号'
					})
					return
				}
				this.showText = false
				var interval = setInterval(() => {
					let times = --this.second
					this.second = times < 10 ? '0' + times : times //小于10秒补 0
				}, 1000)
				setTimeout(() => {
					clearInterval(interval)
					this.second = 60
					this.showText = true
				}, 60000)
			},

			login() {
				login(this.user).then(res => {
					console.log("成功")
					console.log(res)
					if (!res.data) {
						uni.showToast({
							title: '用户名或者密码错误',
							icon:"none"
						})
					} else {
						uni.navigateTo({
							url:'../datacenter/datacenter'
						})
					}
				})
			}

			//账号，密码
			// sendResult(){
			// 	// if(this.useraccount != 'admin' || this.userkeyword.length>6){
			// 	// 	uni.showToast({
			// 	// 		icon:'none',
			// 	// 		title:'账号或密码错误，请重新输入'

			// 	// 	})
			// 	// 	return					
			// 	// }
			// 	// else{
			// 	// 	uni.switchTab({
			// 	// 		url:"../index/index"
			// 	// 	})
			// 	// }


			// 	this.request.post("/user/login",this.user).then(res => {
			// 		if(!res){
			// 			this.$message.error("用户名或者密码错误")
			// 		}else{
			// 			this.$router.push("/pages/index/index")
			// 		}


			// 	})

			// }
		},
	}
</script>

<style lang="scss" scoped>
	.main {
		height: 100vh;
		padding: 1px;
	}
</style>
