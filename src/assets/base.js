var wx_share = new Array(4);
	wx_share[0] = "https://faceshapetemplate.lianglianglive.com/file/fixed/autoTemplate/share/fengxiangsuolue.jpg"; 
// share_img 分享缩略图图片
wx_share[1] = window.location.href.split('#')[0]; 
// share_link  分享页面的url地址，如果地址无效，则分享失败;
wx_share[2] = "发型自动生成工具";
let share_desc = '';
wx_share[3] = "想试试看朋友的发型在你头上的效果吗？";// share_title
import {getSign} from '../api/api'
import wx from 'weixin-js-sdk'
export const weiXinShare = (shareUrl,template) => {
	let para={
		organizationNo:1,
		url:encodeURIComponent(window.location.href.split("#")[0])
	}
	getSign(para).then(res => {
		if (res.data.code == "0") {
			//配置微信信息  
				wx.config({
					debug : false, 
					// true:调试时候弹窗    
					appId : res.data.info.appId,
					// 微信appid    
					timestamp : res.data.info.timestamp, 
					// 时间戳    
					nonceStr : res.data.info.nonceStr, 
					// 随机字符串    
					signature : res.data.info.signature, 
					// 签名    
					jsApiList : ['updateTimelineShareData','updateAppMessageShareData','onMenuShareTimeline','onMenuShareAppMessage','hideMenuItems']
					// 所有要调用的 API 都要加到这个列表中    
						 // 分享到朋友圈接口    
						// 'onMenuShareAppMessage', //  分享到朋友接口    
						// 'onMenuShareQQ', // 分享到QQ接口    
						// 'onMenuShareQZone', // 分享到QQ空间    
						// 'onMenuShareWeibo' // 分享到微博接口    
					  
				}); 
				wx.ready(function() {
				// 微信分享的数据    
					var shareData = {
						"imgUrl" : wx_share[0], // 分享显示的缩略图地址      
						"link" : window.location.href + '?templateNo=' + template, 
						// 分享地址      
						"desc" : wx_share[2], // 分享描述
						"title" : wx_share[3], // 分享标题
						success : function() {
							
						},	
						cancel : function() {
							// alert("分享取消22");
						},
					};
					console.log(shareData);
					wx.onMenuShareTimeline(shareData); 
					wx.onMenuShareAppMessage(shareData);
					wx.updateAppMessageShareData(shareData);
					wx.updateTimelineShareData(shareData);  
					    
// 					wx.onMenuShareQQ(shareData);    
// 					wx.onMenuShareQZone(shareData);    
// 					wx.onMenuShareWeibo(shareData);  
				});  
				wx.hideMenuItems({
					menuList: ['menuItem:share:qq','menuItem:share:weiboApp','menuItem:share:facebook','menuItem:share:QZone','menuItem:readMode','menuItem:share:email'] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
				});
				wx.error(function(res){
				// config信息验证失败会执行error函数，如签名过期导致验证失败，    
				// 具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，    
				//对于SPA可以在这里更新签名。    
					console.log(res);
				});    
			}
		});
	}
