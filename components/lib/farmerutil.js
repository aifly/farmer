import symbinUtil from './util';
import Vue from 'vue';
var farmerUtil = {
	getColumnByMenuId(_menuid,s){

		var obserable = Vue.obserable;
		symbinUtil.ajax({
			url:window.config.baseUrl+"/admin/getmenulist",
			validate:s.validateData,
			data:{
				isformat:0
			},
			fnError(){
			},
			fn(data){


				if(data.getret === 0){
					
					var arr = [];
					data.list.forEach((menu,i)=>{
						console.log('menu.parentmenuid => ',menu.parentmenuid == _menuid )
						if(menu.parentmenuid === _menuid){
							var childrenArr = [];
							data.list.forEach((dt,k)=>{
								if(dt.parentmenuid === menu.menuid){
									childrenArr.push({
										name:dt.menuname,
										link:dt.menuurl
									})
								}
							})
							var menuObj = {
								name:menu.menuname,
								status:false,
								link:menu.menuurl+(menu.children?'':_menuid)
							};
							if(childrenArr.length){
								menuObj.children =  childrenArr;
							}
							arr.push(menuObj)
						}
						/**/
					});



					obserable.trigger({
						type:'fillTabs',
						data:arr
					})
				}
				
			}
		})
	}
}

export default farmerUtil;