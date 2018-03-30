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
								<Cascader :data="ColumnsData" v-model="parentmenuid" :load-data="loadData" change-on-select></Cascader>
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
									on:{
										click:()=>{
											this.edit(params.index,1)
										}
									}

								},'编辑'),
								h('Poptip',{
									props:{
										confirm:true,
										title:'确定要删除吗？????'
									},
									on:{
										ok(){
											alert(1)
										},
										cancel(){
											alert(2)
										}
									}
								},[
									h("Button",{
										props:{
											type:'text'
										}
									},'删除')
								]),
								]);
						}

					}
				],
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
				topListdate:[],
				leftListdata:[],
				parentmenuid: [],
				//loadData:'',
				ColumnsData:[
					{
						label:'当前级',
						value:'',

					}					
				],

				
			}
		},
		components:{

		},
		mounted(){//页面加载完成后显示
			this.getColumnslist("allList");//显示栏目列表
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
						parentmenuid:s.parentmenuid[s.parentmenuid.length-1],
						menuename:s.menuename,
						menuurl:s.menuurl,
						showwhere:s.showwhere
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
					data:{
						adminusername:s.validateData.adminusername,
						admintoken:s.validateData.admintoken,
						menuid:_menuid,
					},
					fn(data){
						if(data.getret===0){
							s.leftListdata = data.list.filter((item,i)=>{
								return item.showwhere === 2;//左侧
							});
							s.topListdate = data.list.filter((item,i)=>{
								return item.showwhere === 1;//左侧
							});
							console.log(data.list[0])
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
							 console.log(data.getret)
							 if(data.getret === 1300){
							 	window.location.hash = '/login/'

							 }
						}
						
					}
				})
			},
			bindParentmenu(data){//将栏目绑定到新增栏目模块的下拉列表中
				data.list.forEach((dt,i)=>{
				 	this.ColumnsData.push({
				 		label:dt.menuname,
				 		value:dt.menuid,
				 		children:[],
				 		loading:false,
				 	})
				 })

			},
			loadData(item,callback){
				//if(item.value!=""){
				item.loading=true;
				var arr = [];
				this.getColumnslist(item.value,(data)=>{
					///console.log(data.list.length)
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



				 

				//}
			},

			ok(){
				this.getaddColumns()
			},
			cancel(){
				console.log("cancel");
			},
			edit(index){
				console.log(this.leftListdata);

			},
			remove(index,lig){//删除栏目数据
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
					data:{
						adminusername:s.validateData.adminusername,
						admintoken:s.validateData.admintoken,
						menuids:listdata[index].menuid,
					},
					fn(data){
						if(data.getret===0){
							s.$Message.success(data.getmsg);
							listdata.splice(index, 1);
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
			}

		}
	}
</script>
 