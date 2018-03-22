import Vue from "vue";
import Obserable from './components/lib/obserable';

import Main from './components/main/index'
import Login from './components/login/index'
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
  ]
});

new Vue({
	router,
	mode: 'history',
	data: {
		obserable,
		imgs,
		viewH: document.documentElement.clientHeight,
	},
	el: '#app',
	template: `<div id="app1">
      <Main :obserable='obserable'></Main>
       <Button type="primary">Default</Button>
       
    </div>`,
	methods: {
	},
	components: {
		Main,
		Login,
		FError
	},
	mounted() {

		this.$router.obserable = obserable;


	}
}).$mount('#app1')