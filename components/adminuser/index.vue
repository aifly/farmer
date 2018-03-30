<template>
	<div class="symbin-adminuser-ui">
		<div class="symbin-admin-count">
			<div class="symbin-console-title">
				<Row>
					<Col span="6">
						<h5>系统管理员管理</h5>
					</Col>
					<Col span="12" offset="6" class-name="text-rig">
						<Button type="primary" @click="addUser=true">创建管理员</Button>
						<Button><Icon type="loop"></Icon>刷新</Button>
					</Col>
				</Row>
			</div>
			<div class="symbin-console-view">
				<div class="search-username top20">
					<Row>
						<Col span="3">
							<Select v-model="selectUser">
								 <Option :key='item.value' v-for="item in userSelect" :value="item.value">{{item.label}}</Option>
							</Select>
						</Col>
						<Col span="8">
							<Input v-model="mark" placeholder="请录入相关信息" style="margin-left:8px;"></Input>
						</Col>
						<Col span="4">
							 <Button type="primary" icon="ios-search" style="margin-left:16px;">Search</Button>
						</Col>
					</Row>
				</div>
				<div class="user-list top10">
					<Table :Columns="userListColums" :data="userListdate"></Table>
				</div>
				<div class="top10">
					<Page :total="100" show-sizer></Page>
				</div>
			</div>
		</div>
		<Modal v-model="addUser" title="新增管理员" @on-ok="ok" ok-text="确认" cancel-text="取消" @on-cancel="cancel" class-name="adduser-cls">
		<div class="addUser-body">
			<Row align="middle" justify="center">
				<Col span="3" offset="4" class-name="text-rig top7 rig8">
					<span class="text-danger">*</span><span>登录名:</span>
				</Col>
				<Col span="12"><Input v-model="inUsername" placeholder="请录入用户名"></Input></Col>
			</Row>
			<br>
			<Row align="middle" justify="center">
				<Col span="3" offset="4" class-name="text-rig top7 rig8">
					<span class="text-danger">*</span><span>昵称:</span>
				</Col>
				<Col span="12"><Input v-model="inNickname" placeholder="您期望的显示名"></Input></Col>
			</Row>
			<br>
			<Row align="middle" justify="center">
				<Col span="3" offset="4" class-name="text-rig top7 rig8">
					<span class="text-danger">*</span><span>登录密码:</span>
				</Col>
				<Col span="12"><Input v-model="inUserpwd" placeholder="您的登录密码" type="password"></Input></Col>
			</Row>
			<br>
			<Row align="middle" justify="center">
				<Col span="3" offset="4" class-name="text-rig top7 rig8">
					<span class="text-danger">*</span><span>手机号:</span>
				</Col>
				<Col span="12"><Input v-model="inAdminmobile" placeholder="您的手机号"></Input></Col>
			</Row>
			<br>
			<Row align="middle" justify="center">
				<Col span="3" offset="4" class-name="text-rig top7 rig8">
					<span>真实姓名:</span>
				</Col>
				<Col span="12"><Input v-model="inRealname" placeholder="真实姓名"></Input></Col>
			</Row>
			<br>
			<Row align="middle" justify="center">
				<Col span="3" offset="4" class-name="text-rig rig8">
					<span>性别:</span>
				</Col>
				<Col span="12">
					<RadioGroup v-model="inSex">
				        <Radio label="">
				            <span>男</span>
				        </Radio>
				        <Radio label="android">
				            <span>女</span>
				        </Radio>
				    </RadioGroup>
				</Col>
			</Row>
			<br>
			<Row align="middle" justify="center">
				<Col span="3" offset="4" class-name="text-rig top8 rig8">
					<span>邮箱:</span>
				</Col>
				<Col span="12"><Input v-model="inAdminemail" placeholder="邮箱"></Input></Col>
			</Row>
			<br>
			<Row align="middle" justify="center">
				<Col span="3" offset="4" class-name="text-rig top8 rig8">
					<span>备注:</span>
				</Col>
				<Col span="12"><Input v-model="inPostil" placeholder="备注信息" type="textarea"></Input></Col>
			</Row>
		</div>
	</Modal>
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
				userSelect:[
					{
						value:'username',
						label:"用户名"

					},
					{
						value:'realname',
						label:'真实姓名'
					},
					{
						value:'nickname',
						label:'昵称'
					},
					{
						value:'adminmobile',
						label:'手机号'
					}
				],
				mark:'',
				selectUser:'',
				addUser:false,
				inUsername:'',
				inNickname:'',
				inUserpwd:'',
				inAdminmobile:'',
				inRealname:'',
				inSex:'',
				inAdminemail:'',
				inPostil:'',
				userListColums:[
					{
						title:"ID号",
						key:"id",
						width:10
					},
					{
						title:"用户名",
						key:"username"
					},
					{
						title:"昵称/姓名",
						key:"nick-realname"
					},
					{
						title:"性别",
						key:"sex",
					},
					{
						title:"手机号",
						key:"adminmobile"
					},
					{
						title:"邮箱",
						key:"adminemail"
					},
					{
						title:"操作",
						key:"getedit"
					},

				],
				userListdate:[],

			}
		},
		components:{
		},

		beforeCreate(){
			this.validateData = sysbinVerification.validate(this);
			//symbinUtil.clearCookie('login');

		},
		
		methods:{

			getaddUser(){
				var s = this;
				symbinUtil.ajax({
					url:window.config.baseUrl+"/",
					data:{
						adminusername:s.validateData.adminusername,
						admintoken:s.validateData.admintoken,
					},
					fn(data){
						console.log(data);
						if(data.getret === 0){
							//s.userListdate = data.list;
						}
					}
				})				

			},
			ok(){
				console.log("ok");
			},
			cancel(){
				console.log("cancel");
			},

		},
		mounted(){

		}
	}
</script>
 