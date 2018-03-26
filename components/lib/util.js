import $ from 'jquery'
var symbinUtil = {
	
	getQueryString: function(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return (r[2]);
		return null;
	},
	changeURLPar: function(url, arg, val) {
		var pattern = arg + '=([^&]*)';
		var replaceText = arg + '=' + val;
		return url.match(pattern) ? url.replace(eval('/(' + arg + '=)([^&]*)/gi'), replaceText) : (url.match('[\?]') ? url + '&' + replaceText : url + '?' + replaceText);
	},
	ajax(option){
		$.ajax({
			url:option.url,
			type:option.type || 'post',
			data:option.data,
			error(){
				option.fnError && option.fnError();
			}
		}).done((dt)=>{
			option.fn && option.fn(dt);
		})
	}



}
export default symbinUtil;