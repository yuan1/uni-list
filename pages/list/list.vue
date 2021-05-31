<template>
	<view class="content">
		<u-button class="u-m-20" @click="showIndex">回首页</u-button>
		<text @click="title=title+'1'"> {{title}}</text>
		<u-cell-group>
			<u-cell-item v-for="(d,index) in listData.data" icon="photo-fill" :arrow="false" :key="index"
				:title="d.title" :value="d.episodes_info" @click="showDetailModal(d.id)"></u-cell-item>
		</u-cell-group>
		<u-loadmore :status="listData.status" />
		<u-popup v-model="showDetail" mode="center" width="100%" height="100%" :zoom="false" duration="0">
			<view @click="closeDetail">
				<Detail ref="detail"></Detail>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import Detail from "../detail/detail"
	export default {
		components: {
			Detail
		},
		data() {
			return {
				listData: {
					status: 'loadmore',
					page: 1,
					size: 20,
					data: [],
				},
				title: "huahua",
				showDetail: false
			}
		},
		onLoad() {
			this.loadList();
		},
		onPullDownRefresh() {
			this.listData.page = 1;
			this.listData.data = [];
			this.loadList();
		},
		onReachBottom() {
			this.listData.page++;
			this.loadList();
		},
		methods: {
			//禁用浏览器返回
			fobiddenBack() {
				//防止页面后退
				window.history.pushState(null, null, document.URL);
				window.addEventListener('popstate', this.backCommon)
			},
			//启用浏览器返回
			enableBack() {
				window.history.go(-1);
				window.removeEventListener('popstate', this.backCommon)
			},
			backCommon() {
				if (this.showDetail) {
					window.history.pushState(null, null, document.URL);
					this.closeDetail();
				}
			},
			loadList() {
				this.listData.status = 'loading';
				this.$u.get('/api/subjects', {
					_page: this.listData.page,
					_limit: this.listData.size
				}).then(res => {
					this.listData.data = this.listData.data.concat(res);
					this.listData.status = 'loadmore';
					if (res.length < this.listData.size) {
						this.listData.status = 'nomore';
					}
				}).finally(() => {
					uni.stopPullDownRefresh();
				})
			},
			showDetailModal(id) {
				this.showDetail = true;
				this.fobiddenBack()
				this.$nextTick(() => {
					this.$refs.detail.id = id;
					this.$refs.detail.loadData(id);
					this.$refs.detail.back = this.closeDetail;
				})
			},
			closeDetail() {
				this.$refs.detail.close();
				this.showDetail = false
				this.enableBack();
			},
			showIndex() {
				uni.navigateTo({
					url: '/pages/index/index'
				});
			}
		}
	}
</script>

<style>
	.content {
		width: 100%;
		height: 100%;
	}
</style>
