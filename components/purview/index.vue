<template>
	<div class="symbin-purview-ui">
		<div class="symbin-purview-title">
			<Row>
		        <Col span="6"><h5>权限管理</h5></Col>
		        <Col span="18">
		        	<div class="text-right"><Button type="primary" @click="open">新增权限</Button></div>
		        </Col>
		    </Row>
		</div>
		<Modal
	        v-model="modal1"
	        title="新增权限"
	        @on-ok="ok"
	        @on-cancel="cancel"
	        width="800">
	        
			<div class="symbin-purview-addinfo">
				<Form ref="formItem" :model="formItem" :label-width="80">
					<Row>
						<Col span="8">
							<FormItem label="中文名称">
					            <Input v-model="formItem.actionname" placeholder="中文名称"></Input>
					        </FormItem>
						</Col>
						<Col span="8">
							<FormItem label="英文名称">
					            <Input v-model="formItem.englishname" placeholder="英文名称"></Input>
					        </FormItem>
						</Col>
						<Col span="8">
							<FormItem label="上一级">
					            <Select v-model="formItem.parentactionid" placeholder="请选择父级">
							        <Option v-for="item in parentList" :value="item.value" :key="item.value">{{ item.label }}</Option>
							    </Select>
					        </FormItem>
						</Col>
					</Row>
			        <FormItem label="URL地址">
			            <Input v-model="formItem.actionurl" placeholder="权限url地址"></Input>
			        </FormItem>
			        <Row>
			        	<Col span="11">
					        <FormItem label="编号">
					            <Input v-model="formItem.actionnumber" placeholder="权限编号"></Input>
					        </FormItem>
			        	</Col>
			        	<Col span="11">
					        <FormItem label="权限级别">
					            <RadioGroup v-model="formItem.urllevel">
					                <Radio label="0">第一层</Radio>
					                <Radio label="1">第二层【注：用于树型结构】</Radio>
					            </RadioGroup>					            
					        </FormItem>
			        	</Col>
			        </Row>

			        <Row>
			        	<Col span="11">
					        <FormItem label="排序">
					            <Input v-model="formItem.sort" placeholder="序号越大位置越靠前"></Input>
					        </FormItem>
			        	</Col>
			        	<Col span="11">
					        <FormItem label="接口权限">
					            <RadioGroup v-model="formItem.isparent">
					                <Radio label="1">是（接口）</Radio>
					                <Radio label="0">否（接口分类名）</Radio>
					            </RadioGroup>
					        </FormItem>
			        	</Col>
			        </Row>

			        <Row>
			        	<Col span="11">					        
					        <FormItem label="关键词">
					            <Input v-model="formItem.keyword" placeholder="关键词"></Input>
					        </FormItem>
			        	</Col>
			        	<Col span="11">
					        <FormItem label="默认权限">
					            <RadioGroup v-model="formItem.isdefaultauth">
					                <Radio label="1">是</Radio>
					                <Radio label="0">否</Radio>
					            </RadioGroup>
					        </FormItem>
			        	</Col>
			        </Row>

			        <Row>
			        	<Col span="11">					        
					        <FormItem label="栏目编号">
					            <Input v-model="formItem.menuid" placeholder="栏目编号"></Input>
					        </FormItem>
			        	</Col>
			        	<Col span="11">
					        <FormItem label="显示位置">
					            <RadioGroup v-model="formItem.showwhere">
					                <Radio label="1">顶部导航</Radio>
					                <Radio label="2">左侧菜单</Radio>
					            </RadioGroup>
					        </FormItem>
			        	</Col>
			        </Row>

			        <FormItem label="备注">
			            <Input v-model="formItem.comment" placeholder="备注"></Input>
			        </FormItem>
		    	</Form>
	    	</div>
	    </Modal>
		<div class="top20"></div>
		<Table :columns="columns1" :data="listData"></Table>

	</div>
</template>

<script>
	import './index.css';
	import sysbinVerification from '../lib/verification';
	import symbinUtil from '../lib/util';
	import Vue from 'vue';
	//import symbinTable from './symbintable.vue';
	export default {
		props:['obserable'],
		name:'zmitiindex',

		data(){
			return {
				modal1: false,
				currentIndex:'',
				parentList: [
                    {
                        value: '1',
                        label: 'New York'
                    },
                    {
                        value: '2',
                        label: 'London'
                    },
                    {
                        value: '3',
                        label: 'Sydney'
                    },
                    {
                        value: '4',
                        label: 'Ottawa'
                    },
                    {
                        value: '5',
                        label: 'Paris'
                    },
                    {
                        value: '6',
                        label: 'Canberra'
                    }
                ],
				formItem: {
                    actionname: '',
                    englishname:'',
                    parentactionid:'',
                    actionurl:'',
                    actionnumber:'',
                    urllevel: '0',
                    sort:'',
                    isparent:'1',
                    isdefaultauth:'1',
                    keyword:'',
                    showwhere:'1',
                    menuid:'',
                    comment:'',
                },
				columns1: [
					{
                        title: '权限ID',
                        key: 'actionid'
                    },
                    {
                        title: '父级权限ID',
                        key: 'parentactionid'
                    },
                    {
                        title: '中文名称',
                        key: 'actionname'
                    },
                    {
                        title: '英文名称',
                        key: 'englishname'
                    },
                    {
                        title: '权限编号',
                        key: 'actionnumber'
                    },
                    {
                        title: '权限级别',
                        key: 'urllevel'
                    },
                    {
                        title: '权限地址',
                        key: 'actionurl'
                    },
                    {
                    	title:'创建时间',
                    	key:'createtime',
                    },
                    {
                        title: '状态',
                        key: 'status'
                    },
                    {
                        title: 'Action',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index);
                                            console.log(params,'params');
                                        }
                                    }
                                }, '修改'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.row.actionid);
                                            
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                listData: []
			}
		},
		components:{
		},

		beforeCreate(){
			this.validateData = sysbinVerification.validate(this);
			//symbinUtil.clearCookie('login');

		},
		methods:{
			add(currentIndex){//增加新权限
				var s = this;
				var formparams={
					actionname: s.formItem.actionname,
                    englishname:s.formItem.englishname,
                    parentactionid:s.formItem.parentactionid,
                    actionurl:s.formItem.actionurl,
                    actionnumber:s.formItem.actionnumber,
                    urllevel:s.formItem.urllevel,
                    sort:s.formItem.sort,
                    isparent:s.formItem.isparent,
                    isdefaultauth:s.formItem.isdefaultauth,
                    keyword:s.formItem.keyword,
                    showwhere:s.formItem.showwhere,
                    menuid:s.formItem.menuid,
                    comment:s.formItem.comment,
				}
				symbinUtil.ajax({
					url:window.config.baseUrl+"/admin/adduserauthurl",
					validate:s.validateData,
					data:formparams,
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
			open(){
				var s = this;
				s.modal1 = true;
                s.formItem.actionname='';
                s.formItem.englishname='';
                s.formItem.parentactionid='';
                s.formItem.actionurl='';
                s.formItem.actionnumber='';
                s.formItem.urllevel='';
                s.formItem.sort='';
                s.formItem.isparent='';
                s.formItem.isdefaultauth='';
                s.formItem.keyword='';
                s.formItem.showwhere='';
                s.formItem.menuid='';
                s.formItem.comment='';
			},
			ok () {
				var s = this;
				//this.add();
                //this.$Message.info('Clicked ok');
                if(s.currentIndex!=''){

                }else{
                	this.add();
                }

            },
            cancel () {
                this.$Message.info('Clicked cancel');
            },
            custom () {
                this.$Modal.confirm({
                    title: '删除权限',
                    content: '<p>Content of dialog</p><p>Content of dialog</p>',
                    okText: '确定',
                    cancelText: '取消'
                });
            },
            getColumnslist(rak,fn){//获取数据
				var s=this;
				symbinUtil.ajax({
					url:window.config.baseUrl+"/admin/getauthllist",
					type:'post',
					validate:s.validateData,
					data:{
						actionid:s.actionid,
						parentactionid:s.parentactionid,
						actionname:s.actionname,
						englishname:s.englishname,
						actionnumber:s.actionnumber,
						urllevel:s.urllevel,
						actionurl:s.actionurl,
						createuserid:s.createuserid,
						createtime:s.createtime,
						updatauserid:s.updatauserid,
						updatatime:s.updatatime,
						sort:s.sort,
						isparent:s.isparent,
						isdefaultauth:s.isdefaultauth,
						showwhere:s.showwhere,
						menuid:s.menuid,
						status:s.status,
					},
					fn(data){
						
						if(data.getret===0){
							console.log(data,'data');
							s.listData=data.list;
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
			show(index){//查看
				var s = this;
				s.modal1=true;
				s.currentIndex=this.listData[index].actionid;
				console.log(s.currentIndex,'s.currentIndex');
				s.formItem.actionname=s.listData[index].actionname;
				s.formItem.englishname=s.listData[index].englishname;
				s.formItem.parentactionid=s.listData[index].parentactionid;
				s.formItem.actionurl=s.listData[index].actionurl;
				s.formItem.actionnumber=s.listData[index].actionnumber;
				s.formItem.urllevel=s.listData[index].urllevel;
				s.formItem.sort=s.listData[index].sort;
				s.formItem.isparent=s.listData[index].isparent;
				s.formItem.isdefaultauth=s.listData[index].isdefaultauth;
				s.formItem.keyword=s.listData[index].keyword;
				s.formItem.showwhere=s.listData[index].showwhere;
				s.formItem.menuid=s.listData[index].menuid;
				s.formItem.comment=s.listData[index].comment;
				/*var html='';
				html+="<div class=symbin-purview-det>";
				html+=`权限id：${this.listData[index].actionid}`;
				html+=`<br>中文名称：${this.listData[index].actionname}`;
				html+=`<br>英文名称：${this.listData[index].englishname}`;
				html+=`<br>父级id${this.listData[index].parentactionid}`;
				html+=`<br>url地址：${this.listData[index].actionurl}`;
				html+=`<br>所属作品：${this.listData[index].worksid}`;
				html+=`<br>权限编号：${this.listData[index].actionnumber}`;
				html+=`<br>权限等级：${this.listData[index].urllevel}`;
				html+=`<br>排序：${this.listData[index].sort}`;
				html+=`<br>是否一级权限：${this.listData[index].isparent}`;
				html+=`<br>关键词：${this.listData[index].keyword}`;
				html+=`<br>栏目编号：${this.listData[index].menuid}`;
				html+=`<br>备注：${this.listData[index].comment}`;
				html+="</div>";*/
				/*
				this.$Modal.info({
                    title: '查看权限',
                    content: html
                })*/
			},
			edit(actionid){
				var s = this;
				var formparams={
					actionid:actionid,
					actionname: s.formItem.actionname,
                    englishname:s.formItem.englishname,
                    parentactionid:s.formItem.parentactionid,
                    actionurl:s.formItem.actionurl,
                    actionnumber:s.formItem.actionnumber,
                    urllevel:s.formItem.urllevel,
                    sort:s.formItem.sort,
                    isparent:s.formItem.isparent,
                    isdefaultauth:s.formItem.isdefaultauth,
                    keyword:s.formItem.keyword,
                    showwhere:s.formItem.showwhere,
                    menuid:s.formItem.menuid,
                    comment:s.formItem.comment,
				}
				symbinUtil.ajax({
					url:window.config.baseUrl+"/admin/edituserauthurl",
					validate:s.validateData,
					data:formparams,
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
			remove(actionids,deltype){//删除
				var s = this;
				symbinUtil.ajax({
					url:window.config.baseUrl+"/admin/deluserauthurl",
					type:'post',
					validate:s.validateData,
					data:{
						actionids:actionids,
						deltype:1,
					},
					fn(data){						
						if(data.getret===0){
							console.log(data,'data');
							s.listData=data.list;
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
		},
		mounted(){//页面加载完成后显示
			this.getColumnslist();//获取列表
			
		},
	}
</script>
 