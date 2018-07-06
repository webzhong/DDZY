<template>
<Row class="indexRow indexRowS" style="height: 29%;">
    <Col span="24">
    	<div class="lr-title">
    		风险等级
    		<div class="num-all">
	        	任务总数：<b @click="totalTable('总数')" style="cursor:pointer;position:relative;z-index: 1111;">{{total}}</b>
	        </div>
    	</div>
    	<div class="lr-box-box">
    		<Tabs class="lr-box lr-box-bot" value="name1" @on-click="totalTabs">
		        <TabPane label="日" name="name1">
		        	<ul>
		        		<li class="lr-li" @click="totalTable('日一级')" style="cursor:pointer;">
		        			<span class="num-title">一级</span>
							<i class="line">—</i>
		        			<i class="num-logo"></i>
		        			<Progress class="lr-percent" :percent="percentDay[0]" status="wrong" hide-info></Progress>
		        			<b>{{progressDay[0]}}</b>
		        		</li>
		        		<li class="lr-li" @click="totalTable('日二级')" style="cursor:pointer;">
		        			<span class="num-title">二级</span>
							<i class="line">—</i>
		        			<i class="num-logo"></i>
		        			<Progress class="lr-percent ivu-progress-error" :percent="percentDay[1]"  hide-info></Progress>
		        			<b>{{progressDay[1]}}</b>
		        		</li>
		        	</ul>
		        </TabPane>
		        <TabPane label="周" name="name2">
		        	<ul>
		        		<li class="lr-li"  @click="totalTable('周一级')" style="cursor:pointer;position:relative;z-index: 1111;">
		        			<span class="num-title">一级</span>
							<i class="line">—</i>
		        			<i class="num-logo"></i>
		        			<Progress class="lr-percent" :percent="percentWeek[0]" status="wrong" hide-info></Progress>
		        			<b>{{progressWeek[0]}}</b>
		        		</li>
		        		<li class="lr-li"  @click="totalTable('周二级')" style="cursor:pointer;position:relative;z-index: 1111;">
		        			<span class="num-title">二级</span>
							<i class="line">—</i>
		        			<i class="num-logo"></i>
		        			<Progress class="lr-percent ivu-progress-error" :percent="percentWeek[1]"  hide-info></Progress>
		        			<b>{{progressWeek[1]}}</b>
		        		</li>
		        	</ul>
		        </TabPane>
		    </Tabs>
			<template v-if="showCar">
				<!--<Carousel  v-model="value" :loop="loop"  :autoplay="autoplay" :autoplay-speed="autoplaySpeed" dots="outside">
					<CarouselItem v-for="item in fengxianLB1">
						<div class="demo-carousel" v-for="tmp in item" @mouseover="hoverStop" @mouseout="hoverStar">
							<ul class="lr-ul lr-ul-bot">
								<li class="lr-li">
									<span class="num-title region">{{tmp.label}}</span>
									<b>{{tmp.value}}</b>
								</li>
							</ul>
						</div>
					</CarouselItem>
				</Carousel>-->
				<!--<div id="srccol">
					<marquee id="marquee1" loop="infinite" onMouseOut="this.start()" onMouseOver="this.stop()">
						<div style="margin-left: 15px; display: inline-block; font-size: 16px;;" >
							<span>{{item.label}}</span>
							<b style="font-size: 12px; color: #57b8f0; text-align: center; ">{{item.value}}</b>
						</div>
					</marquee>
				</div>-->
				 <div class="swiper-container"  @mouseover="stopPlay()" @mouseout="Play()">
			     <div class="swiper-wrapper">
			            <div v-for="(item,index) in risklist" class="swiper-slide">
			            	<span>{{item.label}}</span>
							<b style="font-size: 12px; text-align: center; ">(<em style="font-style: normal; color: #ff0000;">{{item.value1}}</em>,<em style="font-style: normal; color: #ffb93f ;">{{item.value2}}</em>)</b>
			            </div>
			        </div>
			    </div>
			</template>
    	</div>
    </Col>
</Row>
</template>
<script>
import Swiper from './../../../../assets/js/swiper.min.js'
require('./../../../../assets/css/swiper.css')
import bus from  '@/views/assets/js/eventBus.js'
import axios from 'axios';
let mySwiper//声明一个swiper
export default{
	data(){
		return{
			value:0,
            total:20,
            isDMY:'name1',
            showCar:true,
			loop:true,
			mint:null,
            autoplay:true,
            totalList:[20,200],
            progressDay:[3,17],
            progressWeek:[40,160],
            risklist:[],
            risklistDay:[],
            risklistWek:[],
            autoplaySpeed:5000
		}
	},
    methods: {
    	//使用定时器启动一个swiper
    	swipers(){
		var init = setTimeout(function () {
	    		mySwiper = new Swiper('.swiper-container', {
		        autoplay:true,//自动滚动
		        loop:true,//循环
		        observer:true, //修改swiper自己或子元素时，自动初始化swiper
        		observeParents:true,//修改swiper的父元素时，自动初始化swiper
		        speed:3000,//滚动速度
		        slidesPerView : 4,//slide可见数量
		        shortSwipes:true,
		        spaceBetween : 5//slide之间的距离（单位px）
		    	});
		    }, 200)
    	},
    	//悬浮停止
    	stopPlay(){
			mySwiper.stopAutoplay();
    	},
    	//离开启动
    	Play(){
    		mySwiper.startAutoplay();
    	},
        totalTabs(e){
            this.isDMY =e
            if(e =='name1' ){
//              this.showCar =true;
		this.risklist = this.risklistDay
//              this.swipers()
                this.total =20
            }else if(e =='name2'){
//              this.showCar =false;
		this.risklist = this.risklistWek
//              this.swipers()
                this.total =200
            }
        },
        dataJsonData(){
			axios.get('./jsonServer/mapdata.json')
			.then((response) =>{
				this.risklist = response.data.district;
				this.risklistWek = response.data.district2;
				 this.risklistDay =this.risklist;
			})
			.catch((error) =>{
			    console.log(error);
			});

		},
        totalTable(name){
            if(this.isDMY =='name1') {
                var option = {};
                option.tabsName = this.isDMY;
                if (name == "总数") {
                    option.tabName="fengxianNameAll"
                    option.showTongGuo = false;
                    option.showMenu = false;
                    option.showDate = true;
                    option.showPlan = false;
                    option.showjingdu=false;
                    option.fengxian =true;
                    option.showTopBorder =true;
                    option.showZuoyexiaozu =false;
                    option.iconTabs ='alert-circled';
                    option.fontTest="风险等级列表",
                    this.$store.commit('getStateList', option);
                    bus.$emit('indexModelShow',{name:'fengxianNameAll',label:'风险等级-日',iconTabs:'alert-circled'})
                } else if (name == "日一级" || name == "日二级") {
                    option.tabName = (name == "日一级" ? 'name11-1' : 'name11-2'); //是否点击
                    option.showTongGuo = false;
                    option.showMenu = false;
                    option.showDate = false;
                    option.showPlan = false;
                    option.showjingdu=false;
                    option.fengxian =true;
                    option.showTopBorder =true;
                    option.showZuoyexiaozu =false;
                    option.iconTabs ='alert-circled';
                    option.fontTest=(name == "日一级" ? '一级风险列表' : '二级风险列表');
                    this.$store.commit('getStateList', option);
                    if(option.tabName =='name11-1'){
                        bus.$emit('indexModelShow',{name:'name11-1',label:'风险等级-日',iconTabs:'alert-circled',lev:'一级'})
                    }else{
                        bus.$emit('indexModelShow',{name:'name11-2',label:'风险等级-日',iconTabs:'alert-circled',lev:'二级'})
                    }
                }
            }else if(this.isDMY =='name2') {
                var option ={};
                option.tabsName=this.isDMY;
                if(name =="总数"){
                    option.tabName="fengxianweekNameAll"
                    option.showTongGuo=false;   //是否方案通过
                    option.showMenu =false;        //是否显示菜单
                    option.showDate = true; //是否有日期
                    option.showPlan = false; //是否有方案
                    option.showjingdu=false;
                    option.fengxian =true;
                    option.showTopBorder =true;
                    option.showZuoyexiaozu =false;
                    option.fontTest="风险查询列表";
                    option.iconTabs ='alert-circled';
                    this.$store.commit('getStateList', option);
                    bus.$emit('indexModelShow',{name:'weekNameAll',label:'风险等级-周',iconTabs:'alert-circled'})
                }else if(name =="周一级" || name =="周二级"){
                    option.tabName = (name == "周一级" ? 'name12-1' : 'name12-2');
                    option.showTongGuo=false;
                    option.showMenu =false;
                    option.showDate = false;
                    option.showPlan = false;
                    option.showjingdu=false;
                    option.fengxian =true;
                    option.showTopBorder =true;
                    option.showZuoyexiaozu =false;
                    option.iconTabs ='alert-circled';
                    option.fontTest=(name == "周一级" ? '一级风险列表' : '二级风险列表');
                    this.$store.commit('getStateList', option);
                    if(option.tabName =='name12-1'){
                        bus.$emit('indexModelShow',{name:'name12-1',label:'风险等级-周',iconTabs:'alert-circled',lev:'一级'})
                    }else{
                        bus.$emit('indexModelShow',{name:'name12-2',label:'风险等级-周',iconTabs:'alert-circled',lev:'二级'})
                    }
                }
            }
            this.$emit('daidianri',{isShow:true});
//          this.$store.commit('setViews',{index:1,obj:null});
        },
        hoverStop(){
			console.log("进")
			this.loop=false;
			this.autoplay =false;
		},
        hoverStar(){
            console.log("出")
            this.loop=true;
            this.autoplay =true;
		}
    },
    created(){
		this.swipers();
	},
	mounted(){
	    this.items = this.fengxianLB1
	    this.dataJsonData()
	},
    computed: {
        percentDay() {
            var percentDayList = [];
            percentDayList[0] = this.progressDay[0] / this.totalList[0] * 100;
            percentDayList[1] = this.progressDay[1] / this.totalList[0] * 100;
            return percentDayList
        },
        percentWeek() {
            let percentWeekList = []
            percentWeekList[0] = this.progressWeek[0] / this.totalList[1] * 100;
            percentWeekList[1] = this.progressWeek[1] / this.totalList[1] * 100;
            return percentWeekList
        },
    }
}
</script>

<style scoped>
	.lr-li .region{
		min-width:40px;
	}
	.lr-box-bot{
		margin-bottom: -20px;
	}
</style>
<style>
	.ivu-carousel-dots li{
		padding:6% 0 !important;
	}
	.ivu-carousel-dots-outside{
		margin-top:-3px;
	}
</style>
