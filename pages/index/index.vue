<template>
	<view class="content">
		<u-button class="u-m-t-20" @click="showList">去列表</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		onLoad() {

		},
		methods: {
			showList() {
				uni.navigateTo({
					url: '/pages/list/list'
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
