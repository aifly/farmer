<template>
	<div class="symbin-admin-ui">
		d
	</div>
</template>

<script>
	import './index.css';
	import sysbinVerification from '../lib/verification';
	import symbinUtil from '../lib/util';
	import Tab from '../tab/index';
	import $ from 'jquery';

	export default {
		props:['obserable'],
		data(){
			return{
				tabIndex:0,
				theme2:"light",
				tabs:[
					{
						name:'全部'
					},{
						name:'已审核',
						children:[
							{name:"审核通过"},
							{name:"审核未通过"}
						]
					},{
						name:'未审核'
					}
				]
			}
		},
		components:{
			Tab
		},

		beforeCreate(){
			var validate = sysbinVerification.validate(this);
			//symbinUtil.clearCookie('login');

		},
		methods:{
			tab(index){
				this.tabIndex = index;
			}
		}
	}
</script>
 