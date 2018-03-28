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
                        <Submenu :key='menu.name' :name="i*1+1" v-for='(menu,i) in menus'>
                            <template slot="title">
                                <Icon type="ionic"></Icon>{{menu.name}}
                            </template>
                            <MenuItem  :key='sm.name' :name="i+'-'+(k+1)" v-for='(sm,k) in menu.subMenu'>
                                <Icon type="ionic"></Icon>
                                <router-link :to='sm.link'>{{sm.name}}</router-link>
                            </MenuItem>
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
                viewH:document.documentElement.clientHeight,
                openNames:['1'],
                defaultMenu:[
                    {
                        name:'管理员设置',
                        subMenu:[
                            {
                                name:'添加管理员',
                                link:'/adminuser/1'
                            },
                            {
                                name:'管理员管理',
                                link:'/admin/2'
                            }
                        ]
                    },{
                        name:'栏目设置',
                        subMenu:[
                            {
                                name:'添加栏目',
                                link:'/admin/3'
                            },
                            {
                                name:'栏目管理',
                                link:'/admin/4'
                            }
                        ]
                    },{
                        name:'权限设置',
                        subMenu:[
                            {
                                name:'添加权限',
                                link:'/admin/'
                            },
                            {
                                name:'管理权限',
                                link:'/admin/'
                            }
                        ]
                    }
                ],
                menus:[]
			}
		},
		components:{
		},
		mounted(){
            this.menus = this.defaultMenu.concat([]);

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