import Vue from "vue";
import Obserable from './components/lib/obserable';

import Main from './components/main/index'
import Login from './components/login/index'
import Home from './components/home/index'
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
		Home
	},
	mounted() {

		this.$router.obserable = obserable;


	}
}).$mount('#app1')