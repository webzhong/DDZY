<template>
<Row class="indexRow indexRowS" style="height: 12.5%;">
    <Col span="24">
    	<div class="lr-title">
    		作业小组
    	</div>
    	<div class="lr-box le-box">
    		<ul class="lr-ul">
        		<li class="lr-li le-li-1" @click="totalTable('banzu')" style="cursor:pointer">
        			<span class="num-title">班组总数</span>
        			<b>20</b>
        		</li>
        		<li class="lr-li  le-li-2" @click="totalTable('zuoye')" style="cursor:pointer">
        			<span class="num-title">作业小组总数</span>
        			<b style="padding-right:10px;">30</b>
        		</li>
				<li class="lr-li  le-li-3" @click="totalTable('zaixian')" style="cursor:pointer">
					<span class="num-title">在线小组</span>
					<b>12</b>
				</li>
        	</ul>
    	</div>
    </Col>
</Row>
</template>

<script>
	import bus from '@/views/assets/js/eventBus.js'
	import axios from 'axios';
export default{
	data(){
		return{
			team:'',
			task:'',
			online:''
		}
	},
    methods: {
        totalTable(name){
            console.log(name);
            var option ={};
            option.tabsName=name;
            option.tabName=name;
            option.showTongGuo = false;
            option.showMenu = false;
            option.showDate = false;
            option.showPlan = false;
            option.showjingdu=false;
            option.fengxian =false;
            option.iconTabs ='alert-circled';
			option.showTopBorder =false;
			option.showZuoyexiaozu=true;
            if(name=='banzu'){
                option.fontTest="班组信息";
                this.$store.commit('getStateList', option);
                bus.$emit('indexModelShow',{name:'banzu',label:'作业小组-班组总数',iconTabs:'person-stalker'})
			}else if(name=='zuoye'){
                option.fontTest="作业小组总数";
                this.$store.commit('getStateList', option);
                bus.$emit('indexModelShow',{name:'zuoye',label:'作业小组总数',iconTabs:'person-stalker'})
			}else{
                option.fontTest="在线小组";
                this.$store.commit('getStateList', option);
                bus.$emit('indexModelShow',{name:'zaixian',label:'作业小组-在线小组',iconTabs:'person-stalker'})
			}
            	this.$emit('daidianri',{isShow:true});
//          	this.$store.commit('setViews',{index:1,obj:null});
		},
		getData(){
			axios.get('./jsonServer/data.json').then(res=>{
				this.team=res.data.data4.length
				this.task=res.data.data5.length
				this.online=res.data.data6.length
			})
		}
	},
	mounted(){
		this.getData()
	}
}
</script>

<style scoped>
	.lr-li{
		width:32%;
	}
	@media only screen and (min-width: 100px) and (max-width: 1600px) {
    	.le-box{
			/*height:75px;*/
		}
		.le-li-1{
			width:calc(30% - 4px);
		}
       span.num-title{
		   min-width:56px;
	   }
		.le-li-1 b{
			padding-left:2px;
		}
		.le-li-2{
			width:calc(40% - 4px);
		}
		.le-li-3{
			width:calc(30% - 4px)
		}
	}
</style>
