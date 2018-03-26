<template>
	<div  class="symbin-login-ui lt-full" :style="{background: 'url('+imgs.loginBg+') no-repeat right top',backgroundSize:'cover' }">
		<Row type='flex'>
			<Col span='16'>
				<div @mousemove='mousemove($event)' class="symbin-login-scene" ref='scene' :style='{height:viewH+"px"}'>1</div>
			</Col>
			<Col span='8'>
				<div class="symbin-login-C"  :style='{height:viewH+"px"}'>
					2
				</div>
			</Col>
		</Row>

		<!-- <Input v-model="username" placeholder="请输入用户名"></Input>	
		<Input type='password' v-model="password" placeholder="请输入用密码" :clearable='true'></Input>
		<Button type="primary" @click='login'>登录</Button> -->
	</div>
</template>

<script>
	import './index.css';
	import $ from 'jquery';
	import symbinUtil from '../lib/util';



	import Vue from "vue";

	export default {
		props:['obserable'],
		name:'zmitiindex',
		data(){
			return{
				imgs:window.imgs,
				username:'',
				password:'',
				viewH:document.documentElement.clientHeight
			}
		},
		components:{
		},
		
		methods:{
			login(){
				var _this = this;
				symbinUtil.ajax({
					url:window.config.baseUrl+'/admin/adminlogin',
					data:{
						adminusername:_this.username,
						adminpwd:_this.password
					},
					fn(data){
						if(data.getret === 0){
							var param = data;
							delete param.getret;
							delete param.getmsg;
							symbinUtil.clearCookie('login');
							symbinUtil.setCookie('login',JSON.stringify(param),1);
							window.location.hash = '/home/';
							_this.$Message.success('登录成功~')
						}
					}
				})
			},
			initWebgl(){
				var viewW = window.innerWidth*16/24,

					viewH = window.innerHeight;

				this.centerX = viewW / 2;
				this.centerY = viewH / 2;
				 var scene = new THREE.Scene();

		        var renderer = new THREE.WebGLRenderer({
		            alpha: true,
		            antialias: true
		        });

		        renderer.setSize(viewW, viewH);
		        //renderer.setClearAlpha(0);

		        var camera = new THREE.PerspectiveCamera(45, viewW / viewH, 1,1000);

		        camera.position.set(0, 40,400);

		        camera.lookAt(scene.position);

		        this.scene = scene;
		        this.camera = camera;


		        this.$refs['scene'].appendChild(renderer.domElement)

		        var manager = new THREE.LoadingManager();
				var loader = new THREE.OBJLoader(manager);


				var ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
					scene.add( ambientLight );

					var pointLight = new THREE.PointLight( 0xffffff, 0.8 );
					camera.add( pointLight );
					
					scene.add( camera );

				var textureLoader = new THREE.TextureLoader(manager);

		        var object = null;

		        var self = this;


		        var mtlLoader = new THREE.MTLLoader();
		        mtlLoader.load('./assets/obj/1.mtl',function(materials){
		        	materials.preload();
		        	loader.setMaterials( materials )
		        	loader.load('./assets/obj/1.obj', function(obj) {
			            obj.traverse(function(child) {
			                if ( child instanceof THREE.Mesh ) {
			                 // child.material.map = texture;
			                  child.material.transparent = true;
			                }
			            });
			           	////obj.position.y = -60;
			           	obj.scale.set(1.5, 1.5, 1.5)
			            object = obj;
			            scene.add(obj);
			            self.object = obj;
			            object.rotation.y +=2;
			             renderer.render(scene,camera);

			            //console.log(obj)
			        });
		        })



		        this.renderer = renderer;
		        

		       

		        var render = function(){


		        	requestAnimationFrame(render);
		        	renderer.render(scene,camera);
		        	if(object){
		        		object.rotation.y +=.01;
		        		//pointLight.rotation.y +=.021;
		        	}
		        }

		       // render();
			},
			mousemove(e){

				if(this.object){
					this.object.rotation.y = (e.pageX - this.centerX)/this.centerX/10+2;
					this.object.rotation.x = (e.pageY - this.centerY)/this.centerY/10;
					this.renderer.render(this.scene,this.camera);
				}

			}

		},
		mounted(){
 			setTimeout(()=>{
 				//console.log( Vue.obserable )
 				this.initWebgl();
 			},100)
		}
	}
</script>
 