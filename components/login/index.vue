<template>
	<div class="zmiti-login-ui">
		login
	</div>
</template>

<script>
	import './index.css';
	import $ from 'jquery';
	import Vue from "vue";

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
			

		},
		mounted(){
 			setTimeout(()=>{
 				//console.log( Vue.obserable )
 			},1000)
		}
	}
</script>
 