export function signature(url) {
	return new Promise((resolve,reject)=>{
		uni.request({
			url: '/wx/mp/jsapi/getJsapiTicket', //仅为示例，并非真实接口地址。
			data: {
				url: window.location.href.split("#")[0]
			},
			success: (res) => {
				resolve(res)
			}
		});
	})
}