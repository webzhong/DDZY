<template>
		    <Row>
		        <Col span="6">
		        	<!--带点作业计划-->
		        	<leftTop @daidianri="daidianri($event)"></leftTop>
		        	<!--工作进度-->
		        	<leftCenTop @daidianri="daidianri($event)"></leftCenTop>
		        	<!--风险等级-->
		        	<leftCenBot @daidianri="daidianri($event)"></leftCenBot>
		        	<!--作业小组-->
		        	<leftBot @daidianri="daidianri($event)"></leftBot>
		        </Col>
		        <Col span="18" v-show="modelShow">
		        	<indexModel ref="one"
						:itemList="itemList"
						@daidianri="daidianri($event)">
					</indexModel>
		        </Col>
		        <Col span="12" v-show="!modelShow" style="padding-left: 11px;">
		        	<midCen></midCen>
		        </Col>
		        <Col span="6" v-if="!modelShow">
		        	<rightTop></rightTop>
		        	<rightCen></rightCen>
		        	<rightBot></rightBot>
		        </Col>
		    </Row>
</template>

<script>
import bus from '@/views/assets/js/eventBus.js'
import axios from 'axios';
//左侧四栏
import leftTop from './index/leftTop';//带点作业计划
import leftCenTop from './index/leftCenTop';//工作进度
import leftCenBot from './index/leftCenBot';//风险等级
import leftBot from './index/leftBot';//作业小组
//左侧三栏
import rightTop from './index/rightTop';//人员承载力
import rightCen from './index/rightCen';//信息警告
import rightBot from './index/rightBot';//停电作业计划
//中间部分
import midCen from './index/midCen';//地图及天气等
import fullScreen from './fullscreen.vue';//全屏展示
//二级页
import indexModel from './indexcz/indexModel'


export default{
	name:'synthesize',
	data(){
		return{
			poPupOption:{},
			item:null,
			modelShow:false,
			itemList:{}
		}
	},
	//组件注册
	components:{
		leftTop,
		leftCenTop,
		leftCenBot,
		leftBot,
		midCen,
		rightTop,
		rightCen,
		indexModel,
		rightBot,
	},
    methods: {
        enterxtIndex () {
            this.$router.push({
	            name: 'home'
	        });
        },
		daidianri(e){
            this.modelShow = e.isShow;
            this.itemList = e
		},
		
	},
	mounted(){
		
	}
}
</script>

<style scoped>
	
</style>
