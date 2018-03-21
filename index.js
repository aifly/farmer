import Vue from "vue";
import Obserable from './components/lib/obserable';

import Main from './components/main/index'
import Login from './components/login/index'
import FError from './components/ferror/index'
import KeenUI from 'keen-ui';
import 'keen-ui/dist/keen-ui.css';
import VueRouter from 'vue-router'
import './components/css/index.css';
import { UiAlert, UiButton } from 'keen-ui';
Vue.use(KeenUI);
Vue.use(VueRouter)


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
    </div>`,
	methods: {
	},
	components: {
		UiButton,
		Main,
		Login,
		FError
	},
	mounted() {

		this.$router.obserable = obserable;


	}
}).$mount('#app1')