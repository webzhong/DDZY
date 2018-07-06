<template>
<!--<div class="enterxt">-->
	<!--<Button @click="enterxtIndex" type="primary" long>home1进入系统页面</Button>-->
<!--</div>-->
<div class="layout layoutIndex" style="height: 100%;">
    <Layout style="height: 100%;">
    	<!--头部-->
        <Header :style="{padding: '0 10px'}">
            <div class="layout-title">
				<span>配电不停电作业管控平台</span>
            </div>
			<div class="center">
				<p class="userName">用户名: <span>李涛</span> </p>
				<p class="unit">单位:XX</p>
				<p class="cancel">注销</p>
				<full-screen v-model="isFullScreen" @on-change="fullscreenChange"></full-screen>
			</div>
            <ul class="layout-nav">
            	<li v-for="(tab, index) in tabs" class="hoverhand" @click="toggle(index,tab.currentView)" :class="{'active':index==active}">{{tab.tabName}}</li>
            </ul>
        </Header>
        <Content :style="{padding: '10px',height: '-webkit-calc(100% - 113px)'}">
             <transition name="fade" mode="out-in">
        		<component :is="currentView"></component>
        	</transition>
       </Content>
    </Layout>
</div>
</template>

<script>
import syntHesize from './synthesize.vue';//综合展示
import manaGement from './management.vue';//任务管理
import Process from './process.vue';//过程监控
import Video from './video.vue';//视频监控
import Personnel from './personnel.vue';//人员管理
import equiPment from './equipment.vue';//装备管理
import wareHouse from './warehouse.vue';//库房管理
import Warning from './warning.vue';//信息警告
import Technical from './technical.vue';//技术支持
import fullScreen from './fullscreen.vue';
import { mapGetters } from 'vuex'

export default{
	components:{
		syntHesize,
		fullScreen
	},
	computed:{
		...mapGetters([
	      'getView',
	    ])
	},
	data(){
		return{
			tabs:[
			 	{tabName:'综合展示',currentView:syntHesize},
			 	{tabName:'任务管理',currentView:manaGement},
			 	{tabName:'过程管控',currentView:Process},
			 	{tabName:'视频监控',currentView:Video},
			 	{tabName:'人员管理',currentView:Personnel},
			 	{tabName:'装备管理',currentView:equiPment},
			 	{tabName:'库房管理',currentView:wareHouse},
			 	{tabName:'信息告警',currentView:Warning},
			 	{tabName:'技术支持',currentView:Technical}
			],
			active:0,
			currentView:syntHesize,
            isFullScreen: false //全屏
		}
	},
    methods: {
    	toggle(i,c){
    		//根据vuex状态改变当前index
    		this.$store.commit('setViews',{index:i,obj:null});
			this.currentView = c
      	},
       	Gohome(){
            this.$refs.one.handleTabRemove(name);
		},
       	fullscreenChange (isFullScreen) {
            // console.log(isFullScreen);
        }
            
    },
  	mounted(){
		
  	},
  	watch:{
  		//监听getView状态控制nav导航切换
  		 getView: function () {
  		 	this.active = this.getView.index
	     	switch(this.getView.index){
	     		case 1:
	     		this.currentView =manaGement
	     		break;
	     		case 2:
	     		this.currentView =Process
	     		break;
	     		case 3:
	     		this.currentView =Video
	     		break;
	     		case 4:
	     		this.currentView =Personnel
	     		break;
	     		case 5:
	     		this.currentView =equiPment
	     		break;
	     		case 6:
	     		this.currentView =wareHouse
	     		break;
	     		case 7:
	     		this.currentView =Warning
	     		break;
	     		case 8:
	     		this.currentView =Technical
	     		break;
	     	}
	    }
	 
  	}

}
</script>
<style scoped>
	.component-fade-enter-active, .component-fade-leave-active {
 	 	transition: opacity .3s ease;
	}
	.component-fade-enter, .component-fade-leave-to{
  		opacity: 0;
	}
	.full-screen-btn-con{
		display: inline-block;
		margin-left: 8%;
		vertical-align: middle;
	}
	.center{
		width:23%;
		position:absolute;
		top:0;
		right:0;
		font-size:22px;
		color:#fff;
	}
	.userName{
		float:left;
		font-size: 18px;
		color: #7bd7ff;
		margin-right:50px;
	}
	.userName span{
		color: #7bd7ff;
		/*float:left*/
	}
	.unit{
		float:left;
		font-size: 18px;
		color: #7bd7ff;
		margin-right:55px;
	}
	.cancel{
		float:left;
		color: #68fae4;
	}
	.topBottom1{
		width:165px;
	}
	.topBottom2{
		width:165px;
	}
	li.topBottom1:before,
	li.topBottom1:after{
		content: "";
		display: -webkit-box !important;
		position: absolute  !important;
		width: 100%  !important;
		height: 6px  !important;
		margin: 0 -20px  !important;
		background-size: 240px 6px !important;
		background: none;
		/*background:  url('../../../assets/images/index/t-top-bottom.png') no-repeat  !important;*/
	}
	li.topBottom2:before,
	li.topBottom2:after{
		content: "";
		display: -webkit-box !important;
		position: absolute  !important;
		width: 100%  !important;
		height: 6px  !important;
		margin: 0 -20px  !important;
		background-size:210px 6px !important;
		background: none;
		/*background:  url('../../../assets/images/index/top-bottom-210.png') no-repeat  !important;*/
	}
	@media only screen and (min-width: 100px) and (max-width: 1366px) {
		.userName{
			float:left;
			font-size: 16px;
			color: #7bd7ff;
			margin-right:50px;
		}
		.userName span{
			color: #7bd7ff;
			/*float:left*/
		}
		.unit{
			float:left;
			font-size: 16px;
			color: #7bd7ff;
			margin-right:55px;
		}

	}
	@media only screen and (min-width: 100px) and (max-width: 1600px) {
		.center{
			font-size: 16px;
			width: 27%;
			top: -9px;
		}
	}
</style>
