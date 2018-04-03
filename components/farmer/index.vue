<template>
	<div class="symbin-farmer-ui">
		农夫页面
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

			getColumnByMenuId(_menuid){
				var s = this;
				var obserable = Vue.obserable;

				symbinUtil.ajax({
					url:window.config.baseUrl+"/admin/getmenulist",
					validate:s.validateData,
					data:{
						menuid:_menuid,
					},
					fnError(){
					},
					fn(data){
						
						if(data.getret === 0){
							var arr = [];
							data.list.forEach((menu,i)=>{
								var childArr = [];
								menu.children && menu.children.forEach((child,l)=>{
									childArr.push({
										name:child.menuname,
										link:child.menuurl
									})
								})
								arr.push({
									name:menu.menuname,
									link:menu.menuurl,
									children:childArr
								})
							});
							obserable.trigger({
								type:'fillTabs',
								data:arr
							})
						}
						
					}
				})
			}
			
		},
		mounted(){//页面加载完成后显示

			var obserable = Vue.obserable;
			var id = this.$route.params.id;


			this.getColumnByMenuId(id);
			
		},
	}
</script>
 