<template>
	<div class="sysbin-home-ui">
		<Tab @sym-tab='tab' title='两会' :tabs='tabs' :tabIndex='tabIndex'>
			<template slot='symbin-tab-menu'>
			 	<Menu :theme="theme2" width='180' :openNames='["1"]' class='symbin-tab-menu'>
	                <Submenu name="1">
	                    <template slot="title">
	                        内容管理
	                    </template>
	                    <MenuItem name="1-1">文章管理</MenuItem>
	                    <MenuItem name="1-2">评论管理</MenuItem>
	                    <MenuItem name="1-3">举报管理</MenuItem>
	                </Submenu>
	                <Submenu name="2">
	                    <template slot="title">
	                        用户管理
	                    </template>
	                    <MenuItem name="2-1">新增用户</MenuItem>
	                    <MenuItem name="2-2">活跃用户</MenuItem>
	                </Submenu>
	                <Submenu name="3">
	                    <template slot="title">
	                        统计分析
	                    </template>
	                    <MenuGroup title="使用">
	                        <MenuItem name="3-1">新增和启动</MenuItem>
	                        <MenuItem name="3-2">活跃分析</MenuItem>
	                        <MenuItem name="3-3">时段分析</MenuItem>
	                    </MenuGroup>
	                    <MenuGroup title="留存">
	                        <MenuItem name="3-4">用户留存</MenuItem>
	                        <MenuItem name="3-5">流失用户</MenuItem>
	                    </MenuGroup>
	                </Submenu>
	            </Menu>
			 </template>

		</Tab>
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
 