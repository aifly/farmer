<template>
	<div class="sysbin-group-ui">
		<Tab  title='栏目管理' :tabs='tabs' :tabIndex='tabIndex'>
			<div slot='symbin-tab-menu'>
				<ul class="symbin-tab-menu">
					<li @click.stop.prevent='tab1(i,tab.children)' v-for='(tab,i) in tabs' :class='{"active":tabIndex[0] ===i && !tab.children,"level1":tab.children && !tab.status,"open":tab.status }'>
						<div v-if='tab.link'><router-link :to="tab.link">{{tab.name}}</router-link></div>
						<div v-if='!tab.link'>{{tab.name}}</div>
						<ol :style='{height:(tab.status?tab.children.length*30:0)+"px"}' v-if='tab.children' >
							<li @click.stop.prevent='tab2(i,k)' :class="{'active':tabIndex[1]===k}" v-for='(child,k) in tab.children'>
								<div v-if='child.link'><router-link :to="child.link">{{child.name}}</router-link></div>
								<div v-if='!child.link'>{{child.name}}</div>
							</li>
						</ol>
					</li>
				</ul>
			</div>

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
				tabIndex:[0,-1],
				theme2:"light",
				tabs:[
					{
						name:'新增栏目',
						link:'/column/add'
					},
					{
						name:'栏目列表',
						link:'/column/list'
					}
				]
			}
		},
		components:{
			Tab
		},

		mounted(){

		},

		watch:{
			$route(to){
				console.log(to)
			}
		},

		beforeCreate(){
			var validate = sysbinVerification.validate(this);
			//symbinUtil.clearCookie('login');

		},
		methods:{
			tab1(index,level){
				if(level && level.length){
					this.tabs[index].status = !this.tabs[index].status;
				}else{
					this.tabIndex = [index,-1]
				}
			},
			tab2(i,k){
				this.tabIndex = [i,k];
			}
		}
	}
</script>
 