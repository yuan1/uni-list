<template>
	<view class="content">
		<u-button class="u-m-20" @click="showIndex">回首页</u-button>
		<u-cell-group>
			<u-cell-item v-for="(d,index) in listData.data" icon="photo-fill" :arrow="false" :key="index"
				:title="d.title" :value="d.episodes_info" @click="showDetail(d.id)"></u-cell-item>
		</u-cell-group>
		<u-loadmore :status="listData.status" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				listData: {
					status: 'loadmore',
					page: 1,
					size: 20,
					data: [],
				}
			}
		},
		onLoad() {
			const listData = uni.getStorageSync('subjectsData');
			if (listData) {
				this.listData = listData;
			} else {
				this.loadList();
			}
			// 如果存储了 滚动条位置 则进行滚动
			const scrollTop = uni.getStorageSync('subjectsTop');
			if (scrollTop) {
				this.$nextTick(() => {
					uni.pageScrollTo({
						scrollTop: scrollTop, //距离页面顶部的距离
						duration: 0
					});
				})
			}
		},
		onBackPress(e) {
			if (e.from == "backbutton") {
				uni.removeStorage({
					key: "subjectsTop"
				})
				uni.removeStorage({
					key: "subjectsData"
				})
				uni.navigateBack();
				return true;
			}
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
		onPageScroll(e) {
			uni.setStorage({
				key: "subjectsTop",
				data: e.scrollTop
			})
		},
		methods: {
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
			showDetail(id) {
				uni.setStorage({
					key: "subjectsData",
					data: this.listData
				})
				window.location.href = "/pages/detail/detail?id=" + id;
			},
			showIndex(){
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
