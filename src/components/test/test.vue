<template>
	<div>
	<li  v-for="(item,index) in list">
	<img class="preview-img" :src="item.src" height="100" @click="$preview.open(index,list)">
	</li>
	</div>
</template>
<script>
export default {
	data() {
		return {
			list:[
			{
				src: "http://p0oqd5s9w.bkt.clouddn.com/1514365596617@qinruida-zsrYGhq8.jpg",
				w:600,
				h:400,
				x:'11'
			},
			{
				src: "http://p0oqd5s9w.bkt.clouddn.com/1514365596617@qinruida-zsrYGhq8.jpg",
				w:600,
				h:400,
				x:'12'
			}
			]
		}
	}
}
</script>
<style lang="stylus">
	
</style>