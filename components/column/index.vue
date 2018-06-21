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
						<Button @click="bingAgain();"><Icon type="loop"></Icon>刷新</Button>
					</Col>
				</Row>
			</div>
			<div class="symbin-console-view">
				<div class="search-username top20">
					<Tabs type="card">
				        <TabPane label="左侧菜单">
				        	<div class="user-list top10">
								<Table :columns="leftListColums" :data="leftListdata"></Table>
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
				<Modal v-model="addColumn" title="新增栏目" @on-ok="ok" ok-text="确认" cancel-text="取消" @on-cancel="cancel" class-name="adduser-cls" :loading='isLoading'>
					<div class="addColumn-body">
					<Form ref="formColumn" :model="formColumn" :rules="ruleColumn" inline>
						<Row align="middle" justify="center">
							<Col span="3" offset="4" class-name="text-rig top7 rig8">
								<span class="text-danger">*</span><span>栏目名称:</span>
							</Col>
							<Col span="12"><FormItem prop="menuname"><Input v-model="formColumn.menuname" placeholder="请录入栏目名称"></Input></FormItem></Col>
						</Row>
						<Row align="middle" justify="center">
							<Col span="3" offset="4" class-name="text-rig top7 rig8">
								<span>英文名称:</span>
							</Col>
							<Col span="12"><FormItem prop="menuename"><Input v-model="formColumn.menuename" placeholder="请录入栏目英文名称"></Input></FormItem></Col>
						</Row>
						<Row align="middle" justify="center">
							<Col span="3" offset="4" class-name="text-rig top7 rig8">
								<span class="text-danger">*</span><span>连接地址:</span>
							</Col>
							<Col span="12"><FormItem prop="menuurl"><Input v-model="formColumn.menuurl" placeholder="请录入栏目连接地址"></Input></FormItem></Col>
						</Row>
						<Row align="middle" justify="center">
							<Col span="3" offset="4" class-name="text-rig top7 rig8">
								<span class="text-danger">*</span><span>显示位置:</span>
							</Col>
							<Col span="12">
							<FormItem prop="showwhere">
								<RadioGroup v-model="formColumn.showwhere" @on-change="getColumnsData()">
							        <Radio :label="2">
							            <span>左侧显示</span>
							        </Radio>
							        <Radio :label="1">
							            <span>顶部显示</span>
							        </Radio>
							    </RadioGroup>
							</FormItem>
							</Col>
						</Row>
						<Row align="middle" justify="center">
							<Col span="3" offset="4" class-name="text-rig top7 rig8">
								<span class="text-danger">*</span><span>所属父级:</span>
							</Col>
							<Col span="12">
							<FormItem prop="parentmenuid">
								<Cascader :data="ColumnsData" v-model="formColumn.parentmenuid"  change-on-select></Cascader>
							</FormItem>
							</Col>
						</Row>
					</Form>
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
	//import symbinTable from './symbintable.vue';


	import $ from 'jquery';


	function defaultColums(_this){
		 return [
			{
				title:"ID号",
				key:"menuid",
				width:120,
			},
			{
				title:"栏目名称/English",
				key:"menuname-en",
				render:(h,params)=>{
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
		]
	}

	


	export default {
		props:['obserable'],
		name:'zmitiindex',

		data(){
			return{
				addColumn:false,
				showHeader:false,
				isLoading:true,
				topListdate:[],
				leftListdata:[],
				subListdate:[],
				defaultdata:[],



				leftExpandColums1:[
					{
						type: 'expand',
						title:"",
						width:30,
						render:(h,params,i)=>{
							var sourceData = [];
							//this.lastData = this.lastData || this.leftListdata.concat([]);
							this.lastData.forEach((item,i)=>{
								//console.log(item.menuid , params.row)
								if(item.menuid === params.row.menuid){
									sourceData =  this.lastData[i].children || [];
								}
							})

							this.lastData1 = sourceData.concat([]);

							return h('Table',{
								props:{
									data:sourceData,
									columns:this.leftExpandColums2
								}
								
							})
						}
					},
					
				].concat(defaultColums(this)),
				leftExpandColums2:[
					{
						type: 'expand',
						title:"",
						width:30,
						render:(h,params)=>{
							var sourceData = [];
							//this.lastData = this.lastData || this.leftListdata.concat([]);
							
							this.lastData1.forEach((item,i)=>{
								if(item.menuid === params.row.menuid){
									sourceData =  this.lastData1[i].children || [];
								}
							})



							this.lastData2 = sourceData.concat([]);
							sourceData.forEach((item)=>{
								item._expanded = true;
							})
							return h('Table',{
								props:{
									data:sourceData,
									columns:this.leftExpandColums3
								}
								
							})
						}
					},
					
				].concat(defaultColums(this)),
				leftExpandColums3:[
					{
						type: 'expand',
						title:"",
						width:30,
						render:(h,params,i)=>{


							var sourceData = [];

							//this.lastData = this.lastData || this.leftListdata.concat([]);
							
							this.lastData2.forEach((item,i)=>{
								if(item.menuid === params.row.menuid){
									sourceData =  this.lastData2[i].children || [];
								}
							})

							return h('Table',{
								props:{
									data:sourceData,
									columns:this.leftExpandColums4
								}
								
							})
						}
					},
					
				].concat(defaultColums(this)),
				leftExpandColums4:[
				].concat(defaultColums(this)),
			
				leftListColums:[
					{
						type: 'expand',
						title:"",
						width:30,
						render:(h,params)=>{


							var sourceData = [];

							//this.lastData = this.lastData || this.leftListdata.concat([]);
							
							this.leftListdata.forEach((item,i)=>{
								if(item.menuid === params.row.menuid){
									sourceData =  this.leftListdata[i].children|| [];
								}
							})

							this.lastData = sourceData.concat([]);
						
							return h('Table',{
								props:{
									data:sourceData,
									columns:this.leftExpandColums1
								}
								
							})
						}
					}
				].concat(defaultColums(this)),
				topListColums:
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
									on:{
										click:()=>{
											this.edit(params.index,2)
										}
									}

								},'编辑'),
								h('Button',{
									props:{
									type:"text",
								},
								on:{
									click:()=>{
										this.remove(params.index,2)
									}
								}

								},'删除')]);
						}

					}
				],
				formColumn:{
					menuname:'',
					menuurl:'',
					parentmenuid:[],
					showwhere:2,
				},
				ruleColumn:{
                    menuname: [
                        { required: true, message: '栏目名称不能为空', trigger: 'blur' }
                    ],
                    menuurl:[
                    	{ required: true, message: '连接地址不能为空', trigger: 'blur' }
                    ],
                    parentmenuid:[
                    	{ required: true, message: '连接地址不能为空', trigger: 'blur' }
                    ],
                    showwhere:[
                    	{ required: true, message: '显示位置不能为空', trigger: 'blur' }
                    ]
                },
				ColumnsData:[
									
				],

				
			}
		},
		components:{
			//symbinTable:symbinTable
		},
		mounted(){//页面加载完成后显示
			this.getColumnslist("allList",data=>{

			});//显示栏目列表
		},
		beforeCreate(){
			this.validateData = sysbinVerification.validate(this);
			//symbinUtil.clearCookie('login');

		},
		methods:{
			getaddColumns(){//增加新栏目
				var s = this;
				console.log(s.formColumn.parentmenuid[s.formColumn.parentmenuid.length-1]);
					console.log(s.formColumn.parentmenuid);
				symbinUtil.ajax({
					url:window.config.baseUrl+"/admin/addmenu",
					validate:s.validateData,

					data:{
						menuname:s.menuname,
						parentmenuid:s.formColumn.parentmenuid[s.formColumn.parentmenuid.length-1],
						menuename:s.formColumn.menuename,
						menuurl:s.formColumn.menuurl,
						showwhere:s.formColumn.showwhere
					},
					fn(data){
						if(data.getret === 0){
							s.$Message.success(data.getmsg);
							s.bingAgain();//显示栏目列表
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
			getColumnslist(rak,fn){//获取栏目列表
				//rak参数：allList 为列出所有栏目列表；reList 为刷新本页面标志；其他为传入参数标记
				var s=this;
				var _menuid="";
				if(rak!="allList" && rak!="relist"){
					_menuid = rak;
				}				

				symbinUtil.ajax({
					url:window.config.baseUrl+"/admin/getmenulist",
					validate:s.validateData,
					data:{
						menuid:_menuid,
						status:1
					},
					fn(data){
						
						if(data.getret===0){
							s.leftListdata = data.list.filter((item,i)=>{
								return item.showwhere === 2;//左侧
							});
							s.topListdate = data.list.filter((item,i)=>{
								return item.showwhere === 1;//顶部
							});
							if(rak==="allList"){
								s.bindParentmenu(data);
							}
							if(rak==="relist"){
								s.$Message.success("页面刷新成功！");
							}
							if(rak!="allList" && rak!="relist"){
								fn && fn(data);
							}
						}
						else{

							 s.$Message.error({
							  	content:data.getmsg,
							  	duration: 10
							  });
							 if(data.getret === 1300){
							 	window.location.hash = '/login/'

							 }
						}
						
					}
				})
			},
			
			bindParentmenu(data){//将栏目绑定到新增栏目模块的下拉列表中


				var dt = JSON.parse(JSON.stringify(data.list).replace(/menuname/ig,'label').replace(/menuid/ig,'value'));
				dt.forEach((item,i)=>{
					this.ColumnsData.push(item);
					this.defaultdata.push(item);
				});
				this.ColumnsData = this.ColumnsData.concat([]).filter((item)=>{
					return item.showwhere === this.formColumn.showwhere
				});

				this.ColumnsData.unshift({
					label:'当前级',
					value:'',
				});				
			},
			loadData(item,callback){//新增栏目中的下拉选项
				//if(item.value!=""){
				item.loading=true;
				var arr = [];
				this.getColumnslist(item.value,(data)=>{
					data.list.forEach((dt,i)=>{

						arr.push({
							label:dt.menuname,
					 		value:dt.menuid,
					 		children:[],
					 		//loading:false
						})
						
					})
					item.children =  arr;
					callback();
					item.loading=false;
					
				})
			},

			ok(){

				this.isLoading = true;
				this.$refs['formColumn'].validate((valid)=>{

					if(valid){
						this.getaddColumns();
						this.isLoading = false;
					}
					else{
						this.isLoading = false;
					}
				})
				
			},
			cancel(){
				//console.log("cancel");
			},
			edit(index){
				//console.log(this.leftListdata);

			},
			remove(menuid,lig){//删除栏目数据
				//lig为列表标识，1表示左侧列表；2表示顶部列表
				var s=this;
				var listdata;
				if(lig===1){
					listdata=s.leftListdata;
				}
				if(lig===2){
					listdata=s.topListdate;
				}
				symbinUtil.ajax({
					url:window.config.baseUrl+"/admin/delmenu",
					validate:s.validateData,
					data:{
						menuids:menuid,
						deltype:1,//物理删除
					},
					fn(data){
						console.log(data)
						if(data.getret===0){
							s.$Message.success(data.getmsg);
							s.getColumnslist();
							//listdata.splice(index, 1);
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
			bingAgain(){//重新绑定列表数据
				this.getColumnslist("relist");
			},
			getColumnsData(){
				this.formColumn.parentmenuid = [];
				this.ColumnsData = this.defaultdata.filter((item)=>{
					return item.showwhere == this.formColumn.showwhere;
				})
				this.ColumnsData.unshift({
					label:'当前级',
					value:'',
				});	
			}
			//showSubline(index,lig){//显示下级栏目

			//}

		}
	}
</script>
 