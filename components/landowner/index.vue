<template>
	<div class="symbin-landowner-ui">
		地主页面
	</div>

</template>

<script>
	import './index.css';
	import sysbinVerification from '../lib/verification';
	import symbinUtil from '../lib/util';
	import Vue from 'vue';
	//import symbinTable from './symbintable.vue';
	export default {
		props:[],
		name:'zmitiindex',

		data(){
			return {

			}
		},
		components:{
		},

		beforeCreate(){
			this.validateData = sysbinVerification.validate(this);

		},
		methods:{
			
		},
		mounted(){//页面加载完成后显示

			var obserable = Vue.obserable;
			
		},
	}
</script>
 