<template>
	<Row class="indexRow indexRowS" style="height: 23%;">
		<Col span="24">
		<div class="lr-title">
			带电作业计划
			<div class="num-all">
				任务总数：<b @click="totalTable('总数')" style="cursor:pointer;position:relative;z-index: 1111;">{{total}}</b>
			</div>
		</div>
		<Tabs class="lr-box" value="name1" @on-click="totalTabs">
			<TabPane label="日" name="name1">
				<ul>
					<li class="lr-li" @click="totalTable('日通过')" style="cursor:pointer;position:relative;z-index: 1111;">
						<span class="num-title">审批通过</span>
						<i class="line">—</i>
						<i class="num-logo"></i>
						<Progress class="lr-percent" :percent="percentDay[0]" status="success" hide-info></Progress>
						<b>19</b>
					</li>
					<li class="lr-li" @click="totalTable('日未过')" style="cursor:pointer;position:relative;z-index: 1111;">
						<span class="num-title">审批未通过</span>
						<i class="line">—</i>
						<i class="num-logo"></i>
						<Progress class="lr-percent" :percent="percentDay[1]" status="wrong" hide-info></Progress>
						<b>1</b>
					</li>
				</ul>
			</TabPane>
			<TabPane label="周" name="name2">
				<ul style="overflow: auto">
					<li class="lr-li" @click="totalTable('有方案')" style="cursor:pointer;position:relative;z-index: 1111;">
						<span class="num-title">有方案</span>
						<i class="line">—</i>
						<i class="num-logo"></i>
						<Progress class="lr-percent" :percent="percentWeek[0]" status="success" hide-info ></Progress>
						<b>195</b>
					</li>
					<li class="lr-li" @click="totalTable('无方案')" style="cursor:pointer;position:relative;z-index: 1111;">
						<span class="num-title">无方案</span>
						<i class="line">—</i>
						<i class="num-logo"></i>
						<Progress class="lr-percent" :percent="percentWeek[1]" status="wrong" hide-info></Progress>
						<b>5</b>
					</li>
					<li class="lr-li" @click="totalTable('周通过')" style="cursor:pointer;position:relative;z-index: 1111;">
						<span class="num-title">审批通过</span>
						<i class="line">—</i>
						<i class="num-logo"></i>
						<Progress class="lr-percent" :percent="percentWeek[2]" status="success" hide-info></Progress>
						<b>195</b>
					</li>
					<li class="lr-li" @click="totalTable('周未过')" style="position:relative;z-index: 1111;">
						<span class="num-title">审批未通过</span>
						<i class="line">—</i>
						<i class="num-logo"></i>
						<Progress class="lr-percent" :percent="percentWeek[3]" status="wrong" hide-info></Progress>
						<b>0</b>
					</li>
				</ul></TabPane>
			<TabPane label="月" name="name3">
				<ul>
					<li class="lr-li" @click="totalTable('月通过')" style="cursor:pointer;position:relative;z-index: 1111;">
						<span class="num-title">有方案</span>
						<i class="line">—</i>
						<i class="num-logo"></i>
						<Progress class="lr-percent" :percent="percentMonth[0]" status="success" hide-info></Progress>
						<b>195</b>
					</li>
					<li class="lr-li" @click="totalTable('月未过')" style="cursor:pointer;position:relative;z-index: 1111;">
						<span class="num-title">无方案</span>
						<i class="line">—</i>
						<i class="num-logo"></i>
						<Progress class="lr-percent" :percent="percentMonth[1]" status="wrong" hide-info></Progress>
						<b>305</b>
					</li>
				</ul>
			</TabPane>
		</Tabs>
		</Col>
	</Row>
</template>

<script>
    import bus from  '@/views/assets/js/eventBus.js'
    export default{
        data(){
            return{
                total:20,
                totalList:[20,200,500],
                tmpArray:[],
                daidianrizongshu:[],//带电日总数
                isDMY:'name1',
                isShowTongGuo:false,
                isShowDate:false,
                progressDay:[19,1],
                progressWeek:[195,5,195,0],
                progressMonth:[195,305]

            }
        },
        methods: {
            totalTabs(e){
                this.isDMY =e
                if(e =='name1' ){
                    this.total =20
                }else if(e =='name2'){
                    this.total =200
                }else{
                    this.total =500
                }

            },
            totalTable(name){
                if(this.isDMY =='name1') {
                    var option = {};
                    option.tabsName = this.isDMY;
                    if (name == "总数") {
                        option.tabName="dayNameAll"
                        option.showTongGuo = true;
                        option.showMenu = true;
                        option.showDate = true;
                        option.showPlan = false;
                        option.showjingdu=false;
                        option.fengxian =false;
                        option.showTopBorder =true;
                        option.showZuoyexiaozu =false;
                        option.fontTest="任务查询列表";
                        this.$store.commit('getStateList', option);
                        bus.$emit('indexModelShow',{name:'dayNameAll',label:'带电作业计划-日',iconTabs:'clipboard'})
                    } else if (name == "日通过" || name == "日未过") {
                        option.tabName = (name == "日通过" ? 'name1-1' : 'name1-2'); //是否点击日通过
                        option.showTongGuo = false;
                        option.showMenu = false;
                        option.showDate = false;
                        option.showPlan = false;
                        option.showjingdu=false;
                        option.fengxian =false;
                        option.showTopBorder =true;
                        option.showZuoyexiaozu =false;
                        option.fontTest=(name == "日通过" ? '审批通过列表' : '审批未通过列表');
                        this.$store.commit('getStateList', option);
                        if(option.tabName =='name1-1'){
                            bus.$emit('indexModelShow',{name:'name1-1',label:'带电作业计划-日',iconTabs:'clipboard'})
                        }else{
                            bus.$emit('indexModelShow',{name:'name1-2',label:'带电作业计划-日',iconTabs:'clipboard'})
                        }
                    }
                }else if(this.isDMY =='name2') {
                    var option ={};
                    option.tabsName=this.isDMY;
                    if(name =="总数"){
                        option.tabName="weekNameAll"
                        option.showTongGuo=true;   //是否方案通过
                        option.showMenu =true;        //是否显示菜单
                        option.showDate = true; //是否有日期
                        option.showPlan = true; //是否有方案
                        option.showjingdu=false;
                        option.fengxian =false;
                        option.showTopBorder =true;
                        option.showZuoyexiaozu =false;
                        option.iconTabs ='clipboard';
                        option.fontTest="任务查询列表";
                        this.$store.commit('getStateList', option);
                        bus.$emit('indexModelShow',{name:'weekNameAll',label:'带电作业计划-周',iconTabs:'clipboard'})
                    }else if(name =="周通过" || name =="周未过"){
                        option.tabName = (name == "周通过" ? 'name2-1' : 'name2-2');
                        option.showTongGuo=true;
                        option.showMenu =true;
                        option.showDate = true;
                        option.showPlan = false;
                        option.showjingdu=false;
                        option.fengxian =false;
                        option.showTopBorder =true;
                        option.showZuoyexiaozu =false;
                        option.iconTabs ='clipboard';
                        option.fontTest=(name == "周通过" ? '审批通过列表' : '审批未通过列表');
                        this.$store.commit('getStateList', option);
                        if(option.tabName =='name2-1'){
                            bus.$emit('indexModelShow',{name:'name2-1',label:'带电作业计划-周',iconTabs:'clipboard'})
                        }else{
                            bus.$emit('indexModelShow',{name:'name2-2',label:'带电作业计划-周',iconTabs:'clipboard'})
                        }
                    }else if(name =="有方案" || name =="无方案"){
                        option.tabName = (name == "有方案" ? 'name2-3' : 'name2-4');
                        option.isPlan = (name == "有方案" ? true : false);
                        option.showTongGuo=false;
                        option.showMenu =true;
                        option.showDate = true;
                        option.showPlan = true;
                        option.showjingdu=false;
                        option.fengxian =false;
                        option.showTopBorder =true;
                        option.showZuoyexiaozu =false;
                        option.iconTabs ='clipboard';
                        option.fontTest=(name == "有方案" ? '有方案列表' : '无方案列表');
                        this.$store.commit('getStateList', option);
                        if(option.tabName =='name2-3'){
                            bus.$emit('indexModelShow',{name:'name2-3',label:'带电作业计划-周',iconTabs:'clipboard'})
                        }else{
                            bus.$emit('indexModelShow',{name:'name2-4',label:'带电作业计划-周',iconTabs:'clipboard'})
                        }
                    }
                }else  if(this.isDMY =='name3') {
                    var option ={};
                    option.tabsName=this.isDMY;
                    if(name =="总数"){
                        option.tabName="mothNameAll";
                        option.showTongGuo=false;
                        option.showMenu =true;
                        option.showDate = true;
                        option.showPlan = true;
                        option.showjingdu=false;
                        option.fengxian =false;
                        option.showTopBorder =true;
                        option.showZuoyexiaozu =false;
                        option.iconTabs ='clipboard';
                        option.fontTest="任务查询列表";
                        this.$store.commit('getStateList', option);
                        bus.$emit('indexModelShow',{name:'mothNameAll',label:'带电作业计划-月',iconTabs:'clipboard'})
                    }else if(name =="月通过" || name =="月未过"){
                        option.tabName = (name == "月通过" ? 'name3-1' : 'name3-2');
                        option.isPlan = (name == "月通过" ? true : false);
                        option.showTongGuo=false;
                        option.showMenu =true;
                        option.showDate = true;
                        option.showPlan = false;
                        option.showjingdu=false;
                        option.fengxian =false;
                        option.showTopBorder =true;
                        option.showZuoyexiaozu =false;
                        option.iconTabs ='clipboard';
                        option.fontTest=(name == "月通过" ? '审批通过列表' : '审批未通过列表');
                        this.$store.commit('getStateList', option);
                        if(option.tabName =='name3-1'){
                            bus.$emit('indexModelShow',{name:'name3-1',label:'带电作业计划-月',iconTabs:'clipboard'})
                        }else{
                            bus.$emit('indexModelShow',{name:'name3-2',label:'带电作业计划-月',iconTabs:'clipboard'})
                        }
                    }
                }
                this.$emit('daidianri',{isShow:true});
//              this.$store.commit('setViews',{index:1,obj:null});
            }
        },
        mounted(){
        },
        computed: {
            percentDay(){
                var percentDayList=[];
                percentDayList[0]=this.progressDay[0]/this.totalList[0]*100;
                percentDayList[1]=this.progressDay[1]/this.totalList[0]*100;
                return  percentDayList
            },
            percentWeek(){
                let percentWeekList=[]
                percentWeekList[0]=this.progressWeek[0]/this.totalList[1]*100;
                percentWeekList[1]=this.progressWeek[1]/this.totalList[1]*100;
                percentWeekList[2]=this.progressWeek[2]/this.totalList[1]*100;
                percentWeekList[3]=this.progressWeek[3]/this.totalList[1]*100;
                return   percentWeekList
            },
            percentMonth(){
                let percentMonthList=[]
                percentMonthList[0]=this.progressMonth[0]/this.totalList[2]*100;
                percentMonthList[1]=this.progressMonth[1]/this.totalList[2]*100;
                return percentMonthList
            }
        }
    }
</script>

<style>
	ul{
		list-style-type: none;
	}
	.lr-box{

	}
	.lr-box::-webkit-scrollbar {/*滚动条整体样式*/
		width: 7px;     /*高宽分别对应横竖滚动条的尺寸*/
		height: 1px;
	}
	.lr-box::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
		border-radius: 10px;
		-webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
		background: #042979;
	}
	.lr-box::-webkit-scrollbar-track {/*滚动条里面轨道*/
		-webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
		border-radius: 10px;
		background: #EDEDED;
	}
</style>
