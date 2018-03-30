<template>
	<div  class="symbin-login-ui lt-full" :style="{background: 'url('+imgs.loginBg+') no-repeat right top',backgroundSize:'cover' }">
		<Row type='flex'>
			<Col span='16'>
				<div @mousemove='mousemove($event)' @mouseout='isMove = false' class="symbin-login-scene" ref='scene' :style='{height:viewH+"px"}'>
					<div class="symbin-login-title">
						<img :src="imgs.loginTitle">
					</div>
				</div>
			</Col>
			<Col span='8'>
				<div class="symbin-login-C"  :style='{height:viewH+"px"}'>
					<div class="symbin-login-form">
						<h1>
							<img :src="imgs.loginLogo">
						</h1>
						<div class="symbin-form-item">
							<Row type='flex'>
								<Col span='3'>
									<img :src="imgs.loginPerson">
								</Col>
								<Col span='18'>
									<input v-model='username' placeholder="请输入账号" type="text" name="">
								</Col>
							</Row>
							
						</div>
						<div class="symbin-form-item">
							<Row type='flex'>
								<Col span='3'>
									<img :src="imgs.loginLock">
								</Col>
								<Col span='18'>
									<input @keydown.13='login' v-model='password' placeholder="请输入密码" type="password" name="">
								</Col>
							</Row>
							
							
						</div>
						<Row type='flex' class='symbin-login-operator'>
							<Col span='12'>注册</Col>
							<Col span='12'>忘记密码</Col>
						</Row>
						<div class="symbin-login-btn" @click='login'>
							登录	
						</div>

						<transition name='error'>
							<div class="symbin-login-msg" v-if='showError'>
								{{errorMsg}}
							</div>
						</transition>
					</div>
				</div>
			</Col>
		</Row>

		<div class="symbin-login-cloud">
			<img :src="imgs.cloud">
		</div>

		<div class="symbin-login-cloud symbin-login-cloud1">
			<img :src="imgs.cloud1">
		</div>

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
				isLogined:false,
				isMove:false,
				showError:false,
				errorMsg:'',
				viewH:document.documentElement.clientHeight
			}
		},
		components:{
		},
		
		methods:{
			toastError(msg =  '用户名不能为空'){
				this.errorMsg = msg;
 				this.showError = true;
 				setTimeout(()=>{
 					this.errorMsg = '';
 					this.showError = false;
 				},2000)
			},
			login(){
				var _this = this;

				if(!this.username){
					this.toastError();
 					return;
				}
				if(!this.password){
					this.toastError('密码不能为空');
 					return;
				}
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
							_this.isLogined = true;
						}else{
							_this.toastError('用户名或密码错误');
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

		        camera.position.set(0, 40,250);

		        camera.lookAt(scene.position);

		        this.scene = scene;
		        this.camera = camera;


		        this.$refs['scene'].appendChild(renderer.domElement)

		        var manager = new THREE.LoadingManager();
				var loader = new THREE.OBJLoader(manager);


				var ambientLight = new THREE.AmbientLight( 0xcccccc, .5);
					scene.add( ambientLight );
					//scene.add( ambientLight );

					var pointLight = new THREE.PointLight( 0xffffff, 0.8 );
					pointLight.position.x = 100;
					pointLight.position.z = -100;
					pointLight.position.y = 200;

					/*var pointLight1 = new THREE.PointLight( 0xff0000, 0.8 );
					pointLight1.position.x = 100;
					pointLight1.position.z = 0;
					pointLight1.position.y = -100;

					scene.add(pointLight1);*/

					camera.add( pointLight );
					
					scene.add( camera );

				var textureLoader = new THREE.TextureLoader(manager);

		        var object = null;

		        var self = this;

		        var sphereList = [];

		        for(var k = 0;k<10;k++){
		        	console.log(1)
		        	var geometry = new THREE.IcosahedronGeometry(Math.random()*3+2, 0 );
					for ( var i = 0, j = geometry.faces.length; i < j; i ++ ) {
						geometry.faces[ i ].color.setHex(  0x7f4216 );
					}
					var material = new THREE.MeshPhongMaterial( {
						vertexColors: THREE.FaceColors,
						side: THREE.DoubleSide
					} );
					var sphere = new THREE.Mesh( geometry, material );
					sphere.position.y = -40 *Math.random()-10;
					sphere.position.z = Math.random()*20+10;
					scene.add( sphere );

					sphereList.push({sphere,ang:Math.random()*360|0 ,speed:Math.random()*2|0+1});

		        }





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
			           	//obj.scale.set(1.5, 1.5, 1.5)
			            object = obj;
			            scene.add(obj);
			            obj.position.y = 20;
			            self.object = obj;
			            object.rotation.y +=2;
			             

			            //console.log(obj)
			        });
		        })



		        this.renderer = renderer;
		        

		       
		        var ang = 0;
		        var render = function(){

		        	ang+=.5;

		        	sphereList.forEach((item)=>{
	        			var sphere = item.sphere;
	        			item.ang += item.speed;
	        		})

		        	!self.isLogined && requestAnimationFrame(render);
		        	if( !self.isMove ){
			        	renderer.render(scene,camera);
			        	if(object){
			        		object.rotation.y +=.003;

			        		sphereList.forEach((item)=>{
			        			var sphere = item.sphere;

			        			sphere.rotation.y +=.01*Math.random()*3;
				        		sphere.position.x = Math.sin(Math.PI/180*item.ang)*60;
				        		sphere.position.z = Math.cos(Math.PI/180*item.ang)*60;	
			        		})
			        		
			        		//pointLight.rotation.y +=.021;
			        	}
		        	}
		        }

		        render();
			},
			mousemove(e){	

				this.isMove = true;

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
 			},1000)

 			
		}
	}
</script>
 