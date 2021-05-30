<script>
	import {
		wxRegister,
		hideAllMenuItems
	} from "@/common/api/weixin";
	export default {
		onLaunch: function() {
			console.log('App Launch')
			wxRegister(hideAllMenuItems, window.location.href.split("#")[0])
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";
</style>
