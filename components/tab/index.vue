<template>
	<div class="symbin-tab-ui lt-full">
		<div class="symbin-tab-bar">
			<div class="symbin-tab-title">{{title}}</div>
			 <slot  name='symbin-tab-menu'></slot>
		</div>
	</div>
</template>

<script>
	import './index.css';
	import sysbinVerification from '../lib/verification';
	import symbinUtil from '../lib/util';

	import $ from 'jquery';

	export default {
		props:['title','tabs','tabIndex'],
		name:'zmitiindex',
		data(){
			return{
				theme2:"light"
			}
		},
		components:{
		},

		beforeCreate(){
			var validate = sysbinVerification.validate(this);
			//symbinUtil.clearCookie('login');

		},
		
		methods:{
			setTab(index,tab){
				if(tab.children && tab.children.length){

				}else{

					this.$emit('sym-tab',index);
				}
			}
		}
	}
</script>
 