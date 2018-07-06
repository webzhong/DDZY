<template>
	<div class="enterxt">
		<Button @click="enterxtIndex" type="primary" long>home3进入系统页面</Button>
	</div>
</template>

<script>
export default{
	data(){
		return{
			
		}
	},
    methods: {
        enterxtIndex () {
            this.$router.push({
	            name: 'home'
	        });
        }
    }
}
</script>

<style>
</style>