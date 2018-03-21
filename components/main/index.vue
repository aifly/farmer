<template>
	<div class="zmiti-main-ui">
		<h1>Named Routes</h1>
	      <p>Current route name: {{ $route.name }}</p>
	      <ul>
	        <li><router-link :to="{ name: 'login',params: {obserable:{a:12,b:4}}}">登录</router-link></li>
	        <li><router-link :to="{ name: 'foo' }">foo</router-link></li>
	        <li><router-link :to="{ name: 'bar', params: { id: 123 }}">bar</router-link></li>
	      </ul>
	      <router-view class="view"></router-view>
	</div>
</template>

<script>
	import './index.css';
	import $ from 'jquery';

	export default {
		props:['obserable'],
		name:'zmitiindex',
		data(){
			return{
				
			}
		},
		components:{
		},
		
		methods:{
			
 

		}
	}
</script>
 