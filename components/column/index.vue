<template>
	<div class="symbin-column-ui">
		<div class="symbin-admin-count">
			<div class="symbin-console-title">
				<Row>
					<Col span="6">
						<h5>系统栏目管理</h5>
					</Col>
					<Col span="12" offset="6" class-name="text-rig">
						<Button type="primary" @click="addColumn=true">创建新栏目</Button>
						<Button><Icon type="loop"></Icon>刷新</Button>
					</Col>
				</Row>
			</div>
			<div class="symbin-console-view">
				<div class="search-username top20">
					<Tabs type="card">
				        <TabPane label="左侧菜单">
				        	<div class="user-list top10">
								<Table :columns="leftListColums" :data="leftListdate"></Table>
							</div>
							<div class="top10">
								<Page :total="100" show-sizer></Page>
							</div>
				        </TabPane>
				        <TabPane label="顶部菜单">
				        	<div class="user-list top10">
								<Table :columns="topListColums" :data="topListdate"></Table>
							</div>
							<div class="top10">
								<Page :total="100" show-sizer></Page>
							</div>
				        </TabPane>
				    </Tabs>
				</div>
			</div>
			<!--弹窗样式-->
				<Modal v-model="addColumn" title="新增栏目" @on-ok="ok" ok-text="确认" cancel-text="取消" @on-cancel="cancel" class-name="adduser-cls">
					<div class="addColumn-body">
						<Row align="middle" justify="center">
							<Col span="3" offset="4" class-name="text-rig top7 rig8">
								<span class="text-danger">*</span><span>栏目名称:</span>
							</Col>
							<Col span="12"><Input v-model="menuname" placeholder="请录入栏目名称"></Input></Col>
						</Row>
						<br>
						<Row align="middle" justify="center">
							<Col span="3" offset="4" class-name="text-rig top7 rig8">
								<span>英文名称:</span>
							</Col>
							<Col span="12"><Input v-model="menuename" placeholder="请录入栏目英文名称"></Input></Col>
						</Row>
						<br>
						<Row align="middle" justify="center">
							<Col span="3" offset="4" class-name="text-rig top7 rig8">
								<span class="text-danger">*</span><span>连接地址:</span>
							</Col>
							<Col span="12"><Input v-model="menuurl" placeholder="请录入栏目连接地址"></Input></Col>
						</Row>
						<br>
						<Row align="middle" justify="center">
							<Col span="3" offset="4" class-name="text-rig rig8">
								<span class="text-danger">*</span><span>显示位置:</span>
							</Col>
							<Col span="12">
								<RadioGroup v-model="showwhere">
							        <Radio label="2">
							            <span>左侧显示</span>
							        </Radio>
							        <Radio label="1">
							            <span>顶部显示</span>
							        </Radio>
							    </RadioGroup>
							</Col>
						</Row>
						<br>
						<Row align="middle" justify="center">
							<Col span="3" offset="4" class-name="text-rig top7 rig8">
								<span class="text-danger">*</span><span>所属父级:</span>
							</Col>
							<Col span="12">
								<Cascader :data="ColumnsData" v-model="parentmenuid"></Cascader>
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

	import $ from 'jquery';

	export default {
		props:['obserable'],
		name:'zmitiindex',

		data(){
			return{
				addColumn:false,
				menuname:'',
				showwhere:'',
				menuename:'',
				menuurl:'',
				leftListColums:
				[
					{
						type: 'expand',
						title:"",
						width:30,
					},
					{
						title:"ID号",
						key:"menuid",
						width:120,
					},
					{
						title:"栏目名称/English",
						key:"menuname-en",
						render:(h,params)=>{
							//console.log(params);
							return h('div',[
								h('span',{
									style:{
										color:"red"
									}
								},params.row.menuname ),
								h('span',{
									style:{
										color:'#000'
									}
								},' / ' + params.row.menuename)
							])
						}
					},
					{
						title:"链接地址",
						key:"menuurl"
					},
					{
						title:"操作",
						key:"showwhere",
						width:130,
						render:(h,params)=>{
							return h('div',[
								h('Button',{
									props: {
                                        type: 'text',
                                    },
									style:{
										//marginRight:'8px',
									},
									on:{
										click:()=>{
											this.edit(params.index)
										}
									}

								},'编辑'),
								h('Button',{
									props:{
									type:"text",
								},
								on:{
									click:()=>{
										this.remove(params.index)
									}
								}

								},'删除')]);
						}

					}
					],
					topListColums:[
					{
						title:"ID号",
						key:"id",
						width:10
					},
					{
						title:"栏目名称/English",
						key:"menuname-en"
					},
					{
						title:"链接地址",
						key:"menuurl"
					}
				],
				topListdate:[],
				leftListdate:[],
				parentmenuid: [],
				ColumnsData:[
					{
						label:'当前级',
						value:'',
					}					
				]

				
			}
		},
		components:{

		},
		mounted(){
			//页面加载完成后显示
			this.getColumnslist()//显示栏目列表
			

		},
		beforeCreate(){
			this.validateData = sysbinVerification.validate(this);
			//symbinUtil.clearCookie('login');

		},
		methods:{
			getaddColumns(){//增加新栏目
				var s = this;
				symbinUtil.ajax({
					url:window.config.baseUrl+"/admin/addmenu",
					data:{
						adminusername:s.validateData.adminusername,
						admintoken:s.validateData.admintoken,
						menuname:s.menuname,
						parentmenuid:s.parentmenuid[0],
						menuename:s.menuename,
						menuurl:s.menuurl,
						showwhere:s.showwhere
					},
					fn(data){
						if(data.getret === 0){
							s.$Message.success(data.getmsg);
						}
						else{
							  s.$Message.error({
							  	content:data.getmsg,
							  	duration: 10
							  });
						}
					}
				})				

			},
			getColumnslist(){//获取栏目列表
				var s=this;
				symbinUtil.ajax({
					url:window.config.baseUrl+"/admin/getmenulist",
					data:{
						adminusername:s.validateData.adminusername,
						admintoken:s.validateData.admintoken,

					},
					fn(data){
						if(data.getret===0){
							//console.log(data.list.length);
							s.leftListdate = data.list;
							s.bindParentmenu(data);
						}
						else{
							 s.$Message.error({
							  	content:data.getmsg,
							  	duration: 10
							  });
						}
						
					}
				})
			},
			bindParentmenu(data){//将栏目绑定到新增栏目模块的下拉列表中
				 ///this.ColumnsData=data.list;
				// ColumnsData.value:data.list.menuid;

				 data.list.forEach((dt,i)=>{
				 	this.ColumnsData.push({
				 		label:dt.menuname,
				 		value:dt.menuid
				 	})
				 })
				// console.log(this.ColumnsData)
				// this.ColumnsData

			},
			ok(){
				this.getaddColumns()
			},
			cancel(){
				console.log("cancel");
			},
			edit(index){
				console.log(this.leftListdate);

			},
			remove(index){
				var s=this;
				symbinUtil.ajax({
					url:window.config.baseUrl+"/admin/delmenu",
					data:{
						adminusername:s.validateData.adminusername,
						admintoken:s.validateData.admintoken,
						menuids:s.leftListdate[index].menuid,
					},
					fn(data){
						if(data.getret===0){
							s.$Message.success(data.getmsg);
							s.leftListdate.splice(index, 1);
						}
						else{
							  s.$Message.error({
							  	content:data.getmsg,
							  	duration: 10
							  });
						}
						
					}
				})
			}

		}
	}
</script>
 