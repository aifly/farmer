<template>
	<div class="symbin-role-ui">
		<div class="symbin-admin-count">
			<div class="symbin-console-title">
				<Row>
					<Col span="6">
						<h5>角色管理</h5>
					</Col>
					<Col span="12" offset="6" class-name="text-rig">
						<Button type="primary" @click="addRole=true">创建新角色</Button>
						<Button @click="bingAgain();"><Icon type="loop"></Icon>刷新</Button>
					</Col>
				</Row>
			</div>
			<div class="symbin-console-view">
				<div class="search-username top20">
					<Table :columns="roleListColums" :data="roleListdata"></Table>
				</div>
			</div>
			<!--弹窗样式-->
				<Modal v-model="addRole" title="新增角色" @on-ok="ok" ok-text="确认" cancel-text="取消" @on-cancel="cancel">
					<div class="addColumn-body">
						<Row align="middle" justify="center">
							<Col span="3" offset="4" class-name="text-rig top7 rig8">
								<span class="text-danger">*</span><span>栏目名称:</span>
							</Col>
							<Col span="12"></Col>
						</Row>
						<br>
						<Row align="middle" justify="center">
							<Col span="3" offset="4" class-name="text-rig top7 rig8">
								<span>英文名称:</span>
							</Col>
							<Col span="12"></Col>
						</Row>
						<br>
						<Row align="middle" justify="center">
							<Col span="3" offset="4" class-name="text-rig top7 rig8">
								<span class="text-danger">*</span><span>连接地址:</span>
							</Col>
							<Col span="12"></Col>
						</Row>
						<br>
						<Row align="middle" justify="center">
							<Col span="3" offset="4" class-name="text-rig rig8">
								<span class="text-danger">*</span><span>显示位置:</span>
							</Col>
							<Col span="12">
								
							</Col>
						</Row>
						<br>
						<Row align="middle" justify="center">
							<Col span="3" offset="4" class-name="text-rig top7 rig8">
								<span class="text-danger">*</span><span>所属父级:</span>
							</Col>
							<Col span="12">
								
							</Col>
						</Row>
					</div>
				</Modal>
				<!--弹窗样式结束-->
		</div>
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
				addRole:false,
				roleListColums:[
					{
                        title: '序号',
                        key: 'index',
                        width:80,
                    },
                    {
                        title: '角色名称',
                        key: 'rolename'
                    },
                    {
                        title: '默认',
                        key: 'isdefault',
                        width:80
                    },
                    {
                        title: '状态',
                        key: 'status',
                        width:80
                    },
                    {
                    	title:'说明',
                    	key:'comment'
                    },
                    {
                    	title:'操作',
                    	key:"action",
                    	width:130,
						render:(h,params)=>{
							return h('div',[
								h('Button',{
									props: {
                        				type: 'text',
                      				},
									on:{
										click:()=>{
										this.edit(params.index,1)
									}
								}

							},'编辑'),
							h('Button',{
								props:{
								type:"text",
							},
							on:{
								click:()=>{
									//console.log(params.row.menuid);
									_this.remove(params.row.menuid,1)
								}
							}

							},'删除')]);
						}
                    }
				],
				roleListdata:[],


			}
		},
		components:{
		},

		beforeCreate(){
			this.validateData = sysbinVerification.validate(this);

		},
		methods:{
			ok(){
			
			},
			cancel(){
			
			},
			bingAgain(){
			
			}
			
		},
		mounted(){//页面加载完成后显示

			var obserable = Vue.obserable;
			
		},
	}
</script>
 