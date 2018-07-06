<style>
	@import './index.css';
</style>
<template>
    <div class="entryFileBox">
    	<adminIndex :is="entryFile"></adminIndex>
    </div>
</template>
<script>
import index1 from './index/index1.vue';	// 一级运检部（账号：admin1）
import index2 from './index/index2.vue';	// 一级反外力（账号：admin2）
import index3 from './index/index3.vue';	// 二级运检部（账号：admin3）
import index4 from './index/index4.vue';	// 二级反外力（账号：admin4）
export default{
	data(){
		return {
			screenWidth: document.documentElement.clientWidth,
			screenHeight: document.documentElement.clientHeight,
			entryFile: null
		}
	},
	components:{
		index1,index2,index3,index4
	},
	methods: {
		indexShow(){
			var user = sessionStorage.user;
        	if(user == 'admin'){		// 一级运检部（账号：admin）
        		this.entryFile = index1;
        	}/*else if(user == 'admin2'){	// 一级反外力（账号：admin2）
        		this.entryFile = index2;
        	}else if(user == 'admin3'){	// 二级运检部（账号：admin3）
        		this.entryFile = index3;
        	}else if(user == 'admin4'){	// 二级反外力（账号：admin4）
        		this.entryFile = index4;
        	}*/else{
        		this.$Notice.error({
                    title: '操作出错提醒',
                    desc: '对不起，操作出错，请重新登录！'
				});
        		this.$store.commit('logout', this);
                this.$store.commit('clearOpenedSubmenu');
                this.$router.push({
                    name: 'login'
                });
        	}
		}
	},
	mounted() {
		this.indexShow();
	}
}


</script>
