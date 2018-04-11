<template>
	<div class="symbin-article-ui">
		<div class="symbin-article-title">
			<Row>
		        <Col span="6"><h5>广告管理</h5></Col>
		        <Col span="18">
		        	<div class="text-right"><Button type="primary" @click="open">新增</Button></div>
		        </Col>
		    </Row>
		</div>
		<div class="top20"></div>
		<Table :columns="columns1" :data="listData"></Table>
		<Modal
	        v-model="modal1"
	        title="广告"
	        @on-ok="ok"
	        @on-cancel="cancel('formItem')">
	        <div class="symbin-article-addinfo">
	        	<Form ref="formItem" :model="formItem" :rules="ruleValidate" :label-width="80">
					<FormItem label="标题" prop="name">
			            <Input v-model="formItem.name" placeholder="标题"></Input>
			        </FormItem>
			        <FormItem label="图片">
			        	<Row>
			        		<Col span="15"><Input v-model="formItem.pics" placeholder="图片"></Input></Col>
			        		<Col span="1">&nbsp;</Col>
			        		<Col span="8">
			        			<Upload action="//jsonplaceholder.typicode.com/posts/">
							        <Button type="ghost" icon="ios-cloud-upload-outline">上传图片</Button>
							    </Upload>
			        		</Col>			            
			        	</Row>
			        </FormItem>			        
			        <FormItem label="类型">
			            <Input v-model="formItem.tid" placeholder="类型"></Input>
			        </FormItem>
			        <FormItem label="位置">
			            <Input v-model="formItem.position" placeholder="位置"></Input>
			        </FormItem>

			        <FormItem label="网址" prop="url">
                        <Input v-model="formItem.url" placeholder="网址"></Input>
			        </FormItem>
			        <FormItem label="状态">
			           <div>
			           	<RadioGroup v-model="formItem.status">					        
					        <Radio label="1"><span>开</span></Radio>
					        <Radio label="0"><span>关</span></Radio>
					    </RadioGroup>
			           </div>
			        </FormItem>
	        	</Form>
	        </div>
	    </Modal>	    
	</div>	
</template>
<script>
	import './index.css';
	import sysbinVerification from '../lib/verification';
	import symbinUtil from '../lib/util';
	import Vue from 'vue';
	export default {
		props:['obserable'],
		name:'zmitiindex',

		data(){
			return {
				modal1: false,		
				currentIndex:'',
                select1: 'http',
				formItem:{
					name:'',
					pics:'',
					tid:'',
					position:'',
					url:'',
					status:'1',
				},
				columns1: [
                    {
                        title: '标题',
                        key: 'name'
                    },
                    {
                        title: '图片',
                        key: 'pics',
                        render:(h,params)=>{
                        	return h('div',[                      		
                        		h('img',{                        			                  		
	                    			attrs:{
	                    				'src':params.row.pics
	                    			},
	                    			style:{
                        				width:'100px',
                        				height:'30px'
                        			}                       		
                        		})
                        	])
                        }
                    },
                    {
                        title: '类型',
                        key: 'tid'
                    },
                    {
                        title: '位置',
                        key: 'position'
                    },
                    
                    {
                        title: '网址',
                        key: 'url'
                    },                    
                    {
                        title: '状态',
                        key: 'status',
                        render:(h,params)=>{
                        	return h('div',params.row.status==1?'开':'关')
                        }
                    },
                    {
                        title: '时间',
                        key: 'date'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        align: 'left',
                        render: (h, params) => {
                        	return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'default',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                        	this.show(params.index);                                       
                                            console.log(params.index,'params.index');
                                        }
                                    }
                                }, '修改'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {                                            
                                            console.log(params.index,'params.index');
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                listData: [
                    {
                        name: 'Brown',
                        pics:'https://www.baidu.com/img/baidu_jgylogo3.gif',
                        tid: '横图',
                        position:'首页',                        
                        url:'/news',                        
                        status: '0',
                        date: '2016-10-03',
                    },
                    {
                        name: 'John',
                        pics:'https://www.baidu.com/img/baidu_jgylogo3.gif',
                        tid: '方图',
                        position:'首页',                        
                        url:'/news',                        
                        status: '1',
                        date: '2016-10-03'
                    }
                ],
                ruleValidate: {
                    name: [
                        { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                    ]
                }
			}
		},
		components:{
		},

		beforeCreate(){
			this.validateData = sysbinVerification.validate(this);
			//symbinUtil.clearCookie('login');

		},
		methods:{
			open(){
				var s = this;
				s.modal1=true;
				s.formItem.status='1';		
				s.currentIndex='';
			},
			ok () {
                //this.$Message.info('Clicked ok');
                this.handleSubmit('formItem');
            },
            cancel (name) {
                this.$refs[name].resetFields();
            },
            show(index){
            	var s = this;
            	s.modal1=true;
            	s.currentIndex=index;
            	s.formItem={
            		name:s.listData[index].name,
            		pics:s.listData[index].pics,
            		tid:s.listData[index].tid,
            		position:s.listData[index].position,
            		url:s.listData[index].url,
            		status:s.listData[index].status,
            		date:s.listData[index].date,
            	}
            },
            change (status) {
                this.$Message.info('开关状态：' + status);
            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('提交成功!');
                    } else {
                        this.$Message.error('提交失败!');
                    }
                })
            }
		},
		mounted(){//页面加载完成后显示

			
		},
	}
</script>
 