import Vue from "vue";
import Obserable from './components/lib/obserable';

import Main from './components/main/index'
import Login from './components/login/index'
import Home from './components/home/index'
import Admin from './components/admin/index'
import Group from './components/group/index'
import User from './components/user/index'
import Order from './components/order/index'
import FError from './components/ferror/index'
import iView from 'iview';
import VueRouter from 'vue-router'
import './components/css/index.css';
import './components/css/theme.css';

Vue.use(VueRouter)
Vue.use(iView)


var obserable = new Obserable();

Vue.obserable = obserable;
const router = new VueRouter({
  
  routes: [
     {path: '*', name: 'error', component: FError },
     { path: '/login/', name: 'login', component: Login, props: true },
     { path: '/home/', name: 'home', component: Home, props: true },
    
     { path: '/group/', name: 'group', component: Group, props: true,children:[
     	{ path: '/user/', name: 'user', component: User},
     	{ path: '/order/', name: 'order', component: Order},
     	{ path: '/admin/:id', name: 'admin', component: Admin},
     ] }
  ]
});

new Vue({
	router,
	data: {
		obserable,
		imgs,
		viewH: document.documentElement.clientHeight,
	},
	el: '#app',
	template: `<div id="app1">
      <Main :obserable='obserable'></Main>
    </div>`,
	methods: {
	},
	components: {
		Main,
		Login,
		FError,
		Home,
		Group,
		User,
		Order,
		Admin
	},
	mounted() {

		this.$router.obserable = obserable;


	}
}).$mount('#app1')