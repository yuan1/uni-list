import {
	signature
} from "@/common/api/index";
/**
 * [wxRegister 微信Api初始化]
 * @param  {Function} callback [ready回调函数]
 */
export function wxRegister(callback, url) {
	signature({
		url
	}).then(res => {
		jWeixin.config({
			...res.data,
			debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
			jsApiList: ["hideMenuItems", "showMenuItems", "updateAppMessageShareData",
				"updateTimelineShareData"
			] // 必填，需要使用的JS接口列表
		});
	})
	jWeixin.ready((res) => {
		// 如果需要定制ready回调方法
		if (callback) {
			callback()
		}
	})
}
/**
 * [ShareTimeline 自定义微信分享到朋友圈]
 * @param {[type]} option [分享信息]
 */
export function wxShareTimeline(option) {
	jWeixin.updateTimelineShareData({
		title: option.title, // 分享标题
		link: option.link, // 分享链接
		imgUrl: option.imgUrl, // 分享图标
		success() {
			// 设置成功
		},
		cancel() {
			// 设置失败
		}
	})
}
/**
 * [ShareAppMessage 自定义微信分享到朋友]
 * @param {[type]} option [分享信息]
 */
export function wxShareAppMessage(option) {
	jWeixin.updateAppMessageShareData({
		title: option.title, // 分享标题
		desc: option.desc, // 分享描述
		link: option.link, // 分享链接
		imgUrl: option.imgUrl, // 分享图标
		success() {
			// 设置成功
		},
		cancel() {
			// 设置失败
		}
	})
}
// 隐藏全部菜单
export function hideAllMenuItems() {
	jWeixin.hideMenuItems({
		menuList: ["menuItem:share:appMessage", "menuItem:share:timeline", "menuItem:share:qq",
			"menuItem:share:weiboApp", "menuItem:favorite", "menuItem:share:facebook",
			"menuItem:share:QZone"
		] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
	})
}
// 打开分享菜单
export function openShareMenuItems() {
	jWeixin.showMenuItems({
		menuList: ["menuItem:share:appMessage",
			"menuItem:share:timeline", "menuItem:share:qq",
			"menuItem:share:weiboApp", "menuItem:favorite", "menuItem:share:facebook",
			"menuItem:share:QZone"
		] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
	})
}
