<template>
    <div class="layout">
        <Layout v-if='$route.name !== "login"'>
            <Header>
                <Row type='flex'>
                    <Col style="width: 200px;text-align: center" > 
                        <div class="layout-logo">
                            <img :src="imgs.logo"  />
                        </div>
                    </Col>
                    <Col>
                        <Menu mode="horizontal" theme="dark" active-name="1">
                            <div class="layout-nav">
                                <MenuItem name="1">
                                    控制台
                                </MenuItem>
                                <MenuItem name="2">
                                    权限面版
                                </MenuItem>
                            </div>
                        </Menu>
                    </Col>
                </Row>
               
                 
            </Header>
            <Layout>
                <Sider hide-trigger class='symbin-main-menu' :style='{height:(viewH - 64)+"px"}' >
                    <Menu active-name="1-2" theme="dark" width="auto" :open-names="['1']">
                        <Submenu name="1">
                            <template slot="title">
                               人员管理
                            </template>
                            <MenuItem name="1-1"><Icon type="ionic"></Icon>农夫管理</MenuItem>
                            <MenuItem name="1-2"><Icon type="ionic"></Icon>地主管理</MenuItem>
                        </Submenu>
                        <Submenu name="2">
                            <template slot="title">
                                农产品管理
                            </template>
                            <MenuItem name="2-1"><Icon type="ionic"></Icon>农夫管理</MenuItem>
                            <MenuItem name="2-2"><Icon type="ionic"></Icon>农夫管理</MenuItem>
                        </Submenu>
                        <Submenu name="3">
                            <template slot="title">
                                财务管理
                            </template>
                            <MenuItem name="3-1"><Icon type="ionic"></Icon>农夫管理</MenuItem>
                            <MenuItem name="3-2"><Icon type="ionic"></Icon>农夫管理</MenuItem>
                        </Submenu>
                    </Menu>
                </Sider>
                <Layout>
                   <router-view></router-view>
                </Layout>
            </Layout>
        </Layout>
        <div v-else>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
	import './index.css';
	import $ from 'jquery';

	export default {
		props:['obserable'],
		name:'zmitiindex',
		data(){
			return{
				imgs:window.imgs,
                viewH:document.documentElement.clientHeight
			}
		},
		components:{
		},
		
		methods:{
			
 

		}
	}
</script>
 

 <style >
     .ivu-layout-header{
        padding: 0 !important; 
     }
     .ivu-layout{
        position: relative;
     }
 </style>