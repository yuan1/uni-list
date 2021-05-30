<template>
	<view>
		{{data}}
		<u-button class="u-m-t-20" @click="back">返回</u-button>
	</view>
</template>

<script>
	import {
		wxRegister,
		wxShareTimeline,
		wxShareAppMessage,
		openShareMenuItems,
		hideAllMenuItems
	} from "@/common/api/weixin";
	export default {
		name: "Detail",
		data() {
			return {
				data: {},
				id: null,
			};
		},
		onLoad(option) {
			this.id = option.id;
			if (this.id) {
				this.loadData(this.id);
			}
		},
		onUnload() {
			this.close();
		},
		methods: {
			loadData(id) {
				this.$u.get('/api/subjects/' + id).then(res => {
					this.data = res;
					wxRegister(this.wxRegCallback, window.location.href.split("#")[0])
				})
			},
			back() {
				window.location.replace('/#/pages/list/list')
			},
			wxRegCallback() {
				openShareMenuItems();
				const link = window.location.href.split("#")[0] + "#/pages/detail/detail?id=" + this.id
				const config = {
					title: this.data.title,
					desc: "哈哈哈",
					link: link,
					imgUrl: 'https://img0.baidu.com/it/u=233301930,3031623456&fm=11&fmt=auto&gp=0.jpg', // 分享图标

				}
				console.log(config);
				wxShareTimeline(config);
				wxShareAppMessage(config);
			},
			close() {
				hideAllMenuItems();
			}
		}
	}
</script>

<style lang="scss">

</style>
