import wx from 'weixin-js-sdk'
const wxpintai = function(sd) {

	let links= window.location.href;
	let title="咔咔漫画";
	let desc="一个真人漫画平台";
	let imgurl = "http://ox143yv1l.bkt.clouddn.com/tubiao.png";
	wx.config({
		debug: true,
		appId: sd.appid,
		timestamp: sd.timestamp,
		nonceStr: sd.nonceStr,
		signature: sd.signature,
		jsApiList: [
			'checkJsApi','onMenuShareTimeline','onMenuShareAppMessage'
		]
	})
	alert(links);
	wx.ready(function(){
		wx.checkJsApi({
			jsApiList : [ 'getNetworkType',
					'previewImage' ],
			success : function(res) {
				/* alert(JSON.stringify(res)); */
			}
		});
		wx.onMenuShareAppMessage({
			title: title,
			link: links,
			desc: desc,
			imgUrl : imgurl,
			success: function(){
				alert('分享朋友成功')
			},
			cancel: function(){
				alert('取消分享')
			}
		})
		wx.onMenuShareTimeline({
			title: title,
			link: links,
			desc: desc,
			imgUrl : imgurl,
			success: function(){
				alert('分享到朋友圈成功')
			},
			cancel: function(){
				alert('取消朋友分享')
			}
		})
	})
	wx.error(function(res){
		alert('分享失败');
	})
}
const test = function(){
	console.log(1112212121)
}
export {
	wxpintai,
	test
}