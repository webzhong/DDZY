<template>
<Row class="indexRow" style="height: 20%;">
    <Col span="24">
    	<div class="lr-title">
    		信息告警
    	</div>
    	<div class="lr-box">
    		<table class="alarm-info">
    			<tr class="alarm-info-top">
    				<td>
    					<span class="num-title">库房温度湿度超限告警：
							<b @click="changes(true)" :class="isActive ? 'active-white' : 'active-red' ">1</b>
						</span>
    				</td>
    				<td>
						<span class="num-title">车辆入库告警：
							<b :class="isActive ? 'active-white' : 'active-red' " @click="changes(false)">2</b>
						</span>   					
    				</td>
    			</tr>
    			<tr class="alarm-info-bottom">
    				<td>
    					<span class="num-title">装备实验提醒：
							<b>0</b>
						</span>
    				</td>
    				<td>
    					<span class="num-title">人员证件复审提示：
							<b>0</b>
						</span>
    				</td>
    			</tr>
    		</table>
    	</div>
    </Col>
</Row>
</template>

<script>
import { mapGetters } from 'vuex'
export default{
	data(){
		return{
            isActive:true
		}
	},
	methods: {
        changeColor(){
            var _this =this
			setInterval(function(){
                 _this.isActive =!_this.isActive
			},200)
		},
		changes(flag){
			this.$store.commit('setViews',{index:7,obj:flag});
		}
    },
	mounted(){
        this.changeColor();
	},
}
</script>

<style scoped>
	.active-white{
		color:#FFFFFF;
		cursor:pointer;
	}
	
	.active-red{
		color:#FF0000;
		cursor:pointer;
	}
	
	.alarm-info{
		width: 100%;
		height: 100%;
		padding-left:16px;
	}
	
	.alarm-info-top{
		padding-top:22px;
	}
	.alarm-info-bottom{
		padding-top:14px;
	}
	
	@media only screen and (min-width: 100px) and (max-width: 1920px) {
		.lr-box .alarm-info span{
			font-size: 16px;
		}
	}
	@media only screen and (min-width: 100px) and (max-width: 1366px) {
		.lr-box .alarm-info span{
			font-size: 12px;
		}
	}
</style>
