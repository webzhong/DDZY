<template>
    <div id="main" class="app-main">
        <router-view></router-view>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                theme: this.$store.state.app.themeColor
            };
        },
        mounted () {
        	
			document.body.style.minHeight =  document.documentElement.clientHeight+'px';
        	document.body.style.height =  '100%';

        },
        beforeDestroy () {

        },
        methods: {
			
        }
    };
</script>

<style>
/* 公共样式 */
@import "views/assets/css/style.css";
body{
webkit-transform: translateZ(0);
-moz-transform: translateZ(0);
-ms-transform: translateZ(0);
-o-transform: translateZ(0);
transform: translateZ(0);
}
@media only screen and (max-width:1920px) {
	html,body,#main{
		width: 100%;
		height: 100%;
		overflow:hidden;
	}
}

@media only screen and (max-width:1366px) {
	html,body,#main{
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
}
</style>
