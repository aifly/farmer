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
    import Vue from 'vue';
    import symbinUtil from '../lib/util';
    import sysbinVerification from '../lib/verification';

	export default {
		props:[],
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
                                name:'系统管理员管理',
                                link:'/adminuser/'
                            }
                        ]
                    },{
                        name:'栏目设置',
                        subMenu:[
                            {
                                name:'后台栏目管理',
                                link:'/column/list'
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
        beforeCreate(){
            this.validateData = sysbinVerification.validate(this);

        },
		mounted(){
           ///this.menus = this.defaultMenu.concat([]);
            var obserable = Vue.obserable;
            obserable.on('fillMenu',(data)=>{
                
                this.menus = data|| [];

            })


            var obserable = Vue.obserable;
            this.loadMenu({
                status:1,
                showwhere:2
            },(data)=>{
                
                var arr = []
                data.list.forEach((menu,i)=>{
                    var children = menu.children;
                    var childArr = []
                    children.forEach(child=>{
                        childArr.push({
                            name:child.menuname,
                            link:child.menuurl+''+(child.children?child.menuid:'')
                        })
                    })
                    arr.push({
                        name:menu.menuname,
                        subMenu:childArr
                    })
                })

                obserable.trigger({
                    type:'fillMenu',
                    data:arr
                })

                
            }); 



        },
       
		methods:{
			
 
            loadMenu(option,fn){
                var s = this;
                symbinUtil.ajax({
                    url:window.config.baseUrl+"/admin/getmenulist",
                    validate:s.validateData,
                    data:{
                        status:option.status,
                        showwhere:option.showwhere
                    },
                    fn(data){
                        
                        if(data.getret===0){

                            fn && fn(data);
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
            }
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