<template>
	<Row class="indexRow indexRowS" style="height: 33%;">
		<Col span="24">
		<div class="lr-title">
			工作进度
			<div class="num-all">
				任务总数：<b  @click="totalTable('总数')" style="cursor:pointer;position:relative;z-index: 1000;">{{tatoal}}</b>
			</div>
		</div>
		<Tabs class="lr-box" value="name1">
			<TabPane label="日" name="name1">
				<ul id="gongzuojindu">
					<li class="lr-li ttt" style="position:relative;z-index: 1111;cursor:pointer;"  @click="totalTable('未开工')">
						<span class="num-title">未开工</span>
						<i class="line">—</i>
						<i class="num-logo"></i>
						<Progress class="lr-percent" :percent="percentDay[0]" status="wrong"  hide-info></Progress>
						<b>{{progressDay[0]}}</b>
					</li>
					<li class="lr-li" style="position:relative;z-index: 1111;cursor:pointer;"  @click="totalTable('已开工')">
						<span class="num-title">已开工</span>
						<i class="line">—</i>
						<i class="num-logo"></i>
						<Progress class="lr-percent" :percent="percentDay[1]" status="wrong" hide-info></Progress>
						<b>{{progressDay[1]}}</b>
					</li>
					<li class="lr-li" style="position:relative;z-index: 1111;cursor:pointer;"  @click="totalTable('已完成')">
						<span class="num-title">已完成</span>
						<i class="line">—</i>
						<i class="num-logo"></i>
						<Progress class="lr-percent" :percent="percentDay[2]" status="wrong" hide-info></Progress>
						<b>{{progressDay[2]}}</b>
					</li>
					<li class="lr-li" style="position:relative;z-index: 1111;cursor:pointer;"  @click="totalTable('已取消')">
						<span class="num-title">已取消</span>
						<i class="line">—</i>
						<i class="num-logo"></i>
						<Progress class="lr-percent" :percent="percentDay[3]" status="wrong" hide-info></Progress>
						<b>{{progressDay[3]}}</b>
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
                isDMY:'',
                tatoal:19,
                progressDay:[2,10,7,0]
            }
        },
        methods: {
            totalTabs(e) {
                this.isDMY = e
            },
            totalTable(name){
                var option ={};
                option.tabsName= this.isDMY;
                if(name == "总数"){
                    option.tabName="jingdu";
                    option.showTongGuo=false;   //是否方案通过
                    option.showMenu =false;        //是否显示菜单
                    option.showDate = false; //是否有日期
                    option.showPlan = false; //是否有方案
                    option.showjingdu =true;
                    option.fengxian =false;
                    option.showTopBorder =true;
                    option.showZuoyexiaozu =false;
                    option.fontTest="进度查询列表",
                        this.$store.commit('getStateList', option);
                    bus.$emit('indexModelShow',{name:'jingdu',label:'工作进度-日',iconTabs:'person-stalker'})
                }else if(name == "未开工"){
                    option.tabName="weikai";
                    option.showTongGuo=false;   //是否方案通过
                    option.showMenu =false;        //是否显示菜单
                    option.showDate = false; //是否有日期
                    option.showPlan = false; //是否有方案
                    option.showjingdu =true;
                    option.fengxian =false;
                    option.showTopBorder =true;
                    option.showZuoyexiaozu =false;
                    option.fontTest="未开工列表",
                        this.$store.commit('getStateList', option);
                    bus.$emit('indexModelShow',{name:'weikai',label:'工作进度-日',iconTabs:'person-stalker'})
                }else if(name == "已开工"){
                    option.tabName="yikai";
                    option.showTongGuo=false;   //是否方案通过
                    option.showMenu =false;        //是否显示菜单
                    option.showDate = false; //是否有日期
                    option.showPlan = false; //是否有方案
                    option.showjingdu =true;
                    option.fengxian =false;
                    option.showTopBorder =true;
                    option.showZuoyexiaozu =false;
                    option.fontTest="已开工列表",
                        this.$store.commit('getStateList', option);
                    bus.$emit('indexModelShow',{name:'yikai',label:'工作进度-日',iconTabs:'person-stalker'})
                }else if(name == "已完成"){
                    option.tabName="yiwan";
                    option.showTongGuo=false;   //是否方案通过
                    option.showMenu =false;        //是否显示菜单
                    option.showDate = false; //是否有日期
                    option.showPlan = false; //是否有方案
                    option.showjingdu =true;
                    option.fengxian =false;
                    option.showTopBorder =true;
                    option.showZuoyexiaozu =false;
                    option.fontTest="已完成列表",
                    this.$store.commit('getStateList', option);
                    bus.$emit('indexModelShow',{name:'yiwan',label:'工作进度-日',iconTabs:'person-stalker'})
                }else{
                    option.tabName="yiqu";
                    option.showTongGuo=false;   //是否方案通过
                    option.showMenu =false;        //是否显示菜单
                    option.showDate = false; //是否有日期
                    option.showPlan = false; //是否有方案
                    option.showjingdu =true;
                    option.fengxian =false;
                    option.showTopBorder =true;
                    option.showZuoyexiaozu =false;
                    option.fontTest="已取消列表",
                    this.$store.commit('getStateList', option);
                    bus.$emit('indexModelShow',{name:'yiqu',label:'工作进度-日',iconTabs:'person-stalker'})
                }
                this.$emit('daidianri',{isShow:true});
//             this.$store.commit('setViews',{index:2,obj:null});
            }
        },
        mounted(){
            document.getElementById('gongzuojindu').getElementsByClassName('ivu-progress-bg')[0].style.backgroundColor="#1167c1"
            document.getElementById('gongzuojindu').getElementsByClassName('ivu-progress-bg')[1].style.backgroundColor="#ff0000"
            document.getElementById('gongzuojindu').getElementsByClassName('ivu-progress-bg')[2].style.backgroundColor="#00dd44"
            document.getElementById('gongzuojindu').getElementsByClassName('ivu-progress-bg')[3].style.backgroundColor="#978b31"
        },
        computed:{
            percentDay(){
                let percentDayList=[]
                percentDayList[0]=this.progressDay[0]/this.tatoal*100;
                percentDayList[1]=this.progressDay[1]/this.tatoal*100;
                percentDayList[2]=this.progressDay[2]/this.tatoal*100;
                percentDayList[3]=this.progressDay[3]/this.tatoal*100;
                return   percentDayList
            }

        }
    }
</script>

<style>
	.ivu-progress-success .ivu-progress-bg{
		background:#12e36a
	}
	.ivu-progress-wrong .ivu-progress-bg{
		background-color:#ff0000
	}
	.ivu-progress-bg{
		background-color:#f1cd20;
	}
	.lr-percent.ivu-progress-center .ivu-progress-bg{
		background-color:#259aa1
	}
	div.progressContainer{
		height: 10px;
		border-radius: 10px;
		background-color: #f3f3f3;
		margin-left: 26%;
		margin-top: 2%;
		position: absolute;
		left:10px;width:56%
	}
	div.notStarted{
		background-color: rgb(28, 141, 224);
		height: 10px;
		line-height: 10px;
		border-radius: 10px;
	}
	div.started{
		background-color: #ff0000;
		height: 10px;
		line-height: 10px;
		border-radius: 10px;
	}
	div.alreadyComplete{
		background-color: #f1cd20;
		height: 10px;
		line-height: 10px;
		border-radius: 10px;
	}
	div.cancel{
		background-color: #259aa1;
		height: 10px;
		line-height: 10px;
		border-radius: 10px;
	}
	.jingdu{
		color:#fff;
		font-weight: 100;
		font-size: 12px;
		position:absolute;
		right: -9%;;
	}
</style>
