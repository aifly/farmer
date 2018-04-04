<template>
	<div class="symbin-purview-ui">
		<div class="symbin-purview-title">
			<Row>
		        <Col span="6"><h5>权限管理</h5></Col>
		        <Col span="18">
		        	<div class="text-right"><Button type="primary" @click="modal1 = true">新增权限</Button></div>
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
		<Table :columns="columns1" :data="data1"></Table>

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
                        title: 'Name',
                        key: 'name'
                    },
                    {
                        title: 'Age',
                        key: 'age'
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
                                            this.show(params.index)
                                        }
                                    }
                                }, 'View'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                }, 'Delete')
                            ]);
                        }
                    }
                ],
                data1: [
                    {
                        name: 'John Brown',
                        age: 18,
                        date: '2016-10-01'
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        date: '2016-10-01'
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        date: '2016-10-02'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        date: '2016-10-04'
                    }
                ]
			}
		},
		components:{
		},

		beforeCreate(){
			this.validateData = sysbinVerification.validate(this);
			//symbinUtil.clearCookie('login');

		},
		methods:{
			getaddColumns(){//增加新栏目
				var s = this;
				symbinUtil.ajax({
					url:window.config.baseUrl+"/admin/adduserauthurl",
					validate:s.validateData,
					data:{
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
					},
					fn(data){
						if(data.getret === 0){
							s.$Message.success(data.getmsg);
							//s.bingAgain();//显示栏目列表
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
			ok () {
				this.getaddColumns();
                //this.$Message.info('Clicked ok');

            },
            cancel () {
                this.$Message.info('Clicked cancel');
            }
		},
		mounted(){//页面加载完成后显示

			
		},
	}
</script>
 