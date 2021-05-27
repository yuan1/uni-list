<template>
	<view>
		{{data}}
		<u-button class="u-m-t-20" @click="back">返回</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data: {}
			};
		},
		onLoad(option) {
			this.loadData(option.id);
		},
		methods: {
			loadData(id) {
				this.$u.get('/api/subjects/' + id).then(res => {
					this.data = res;
				})
			},
			back() {
				uni.navigateTo({
					url: '/pages/list/list'
				});
			}
		}
	}
</script>

<style lang="scss">

</style>
