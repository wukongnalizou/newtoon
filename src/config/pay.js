import axios from './axios'
const pay = {
	payInfo:function(order){
		let payobj = {};
		payobj.out_trade_no = this.randomString(32)
		payobj.userId = order.userId
		payobj.describe = order.describe
		payobj.total_fee = order.money*100
		payobj.mch_create_ip = '127.0.0.1'
		payobj.body = order.body
		payobj.currency = order.currency
		// console.log(payobj.userId)
		this.paysend(payobj)
	},
	paysend:function(obj){
		// console.log(obj);
		axios({
			method: "post",
			data:obj,
			url:"/pay/payaction/playPoint.do"
		}).then((res)=>{
			var info = res.data
			var PayInfo = JSON.parse(info.pay_info)
			this.getPay(info,PayInfo)
			 // this.notice(info.out_trade_no)
		})
	},
	getPay:function(obj,PayInfo){
		var self = this
		WeixinJSBridge.invoke(
			'getBrandWCPayRequest',{
				"appId" : PayInfo.appId, //公众号名称，由商户传入
				"timeStamp": PayInfo.timeStamp, //戳，自1970 年以来的秒数
				"nonceStr" : PayInfo.nonceStr, //随机串
				"package" : PayInfo.package,
				"signType" : PayInfo.signType, //微信签名方式:
				"paySign" : PayInfo.paySign  //微信签名,
				
			},function(res){
				if(res.err_msg == "get_brand_wcpay_request:ok" ) {
					// 此处可以使用此方式判断前端返回,微信团队郑重提示：res.err_msg 将在用户支付成功后返回ok，但并不保证它绝对可靠。
					/*location.href = "pay_success.html";*/
					// alert("支付成功");
					// self.notice(obj.out_trade_no);
				}
			}
		);
	},
	notice:function(orderid){
		// console.log(orderid)
		axios({
			method:"post",
			data: {
				"orderNum":orderid
			},
			url:"/pay/callback/playPoint.do"
		}).then((res)=>{
			// alert('充值成功');
		})
	},
	randomString:function(len){
		len = len || 32;
		var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
		var maxPos = $chars.length;
		var pwd = '';
		for (let i = 0; i < len; i++) {
		pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
			}
		return pwd;
	}
}
export default pay