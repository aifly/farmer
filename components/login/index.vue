<template>
	<div class="symbin-login-ui">
		<Input v-model="username" placeholder="请输入用户名"></Input>	
		<Input type='password' v-model="password" placeholder="请输入用密码" :clearable='true'></Input>
		<Button type="primary" @click='login'>登录</Button>
	</div>
</template>

<script>
	import './index.css';
	import $ from 'jquery';
	import symbinUtil from '../lib/util';
	import Vue from "vue";

	export default {
		props:['obserable'],
		name:'zmitiindex',
		data(){
			return{
				username:'',
				password:''
			}
		},
		components:{
		},
		
		methods:{
			login(){
				var _this = this;
				symbinUtil.ajax({
					url:window.config.baseUrl+'/admin/adminlogin',
					data:{
						adminusername:_this.username,
						adminpwd:_this.password
					},
					fn(data){
						console.log(data);
					}
				})
			}

		},
		mounted(){
 			setTimeout(()=>{
 				//console.log( Vue.obserable )
 			},1000)
		}
	}
</script>
 