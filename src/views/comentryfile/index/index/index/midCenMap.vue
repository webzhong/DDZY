<style>
	.modal-line-box{
		
	}
	.charts-all{
    	position:absolute;
    	top:25px;
    	right:0px;
    	font-size: 16px;
    	cursor: pointer;
    	width: 100px;
    	height: 32px;
    	padding-left: 0px;
    	line-height: 32px;
    	background:url("../../../../assets/images/index/chart-all.png") no-repeat;
    	background-size: 100% 100%;
		background-position: center;
    }
	.charts-all-img{
		vertical-align: middle;
		width: 20px;
		height: 20px;
		margin-left: 5px;
	}
   	@media only screen and (min-width: 100px) and (max-width: 1366px) {
   		.charts-all{
	    	position:absolute;
	    	top:35px;
	    	right:0px;
	    	font-size: 12px;
	    	cursor: pointer;
	    	width: 80px;
	    	height: 20px;
	    	padding-left: 5px;
	    	line-height: 20px;
	    	background:url("../../../../assets/images/index/chart-all.png") no-repeat;
	    	background-size: 100% 100%;
			background-position: center;
	    }
	    .charts-all-img{
			vertical-align: middle;
			width: 10px;
			height: 10px;
		}
   	}
</style>
<template>
<div style="height: 100%;">
	<div class="md-box md-box-none">
		<div class="echartsBox echarts-top">
			<div class="charts-all" @click="gradeClick(3)">
				<img src="../../../../assets/images/index/all.png" alt="" class="charts-all-img">
				<span>全部</span>
			</div>
		</div>
		<div class="echartsMap" ref="echartsMap">
		</div>
		<div class="echartsBox echarts-bot">
			<ul :style="{height:ulHeight}" class="peopleUl" style="overflow: inherit;">
    			<li style="position: relative;" v-for="(item,index) in peopleList" v-if="index<(flags)"  class="people hoverhand" @mouseenter.stop="popupOver(item,index)" @mouseleave.stop="popupOut(item,index)">
    				<po-Pup :options="options" v-if="currentI == index"></po-Pup>
    				<span>{{item.name}}</span>
    				<img src="../../../../assets/images/index/people.png"/>
    			</li>
			</ul>
			<!--<ul class="jibieUl hoverhand">
    			<li class="jibie">
    				<span 
    					@click="gradeClick(1)"
    					:class="{active:grade1Clk == false}">
    					一级风险
    				</span>
    			</li>
    			<li class="jibie jibie2 hoverhand">
    				<span 
    					@click="gradeClick(2)"
    					:class="{active:grade2Clk == false}">二级风险
    				</span>
    			</li>
			</ul>-->
			<ul class="fen-list">
				<li class="jibie">
					<span class="fow1" 
    					@click="gradeClick(1)"
    					:class="{active:grade1Clk == false}">
    					一级风险
    				</span>
				</li>
				<li class="jibie jibie2">
    				<span class="fow2" 
    					@click="gradeClick(2)"
    					:class="{active:grade2Clk == false}">二级风险
    				</span>
    			</li>
			</ul>
		</div>
		<!--<div class="borderLine"></div>-->
		<span class="xiaojiaotou hoverhand" v-if="peopleLength >flags2" :class="{xiaojiaotouDown:peopleClk == true}" @click="showMorePeople"></span>
	</div>
	<toolTipModal :modal="rwxqModal" :rwxqObj="rwxq" @modalclose="modalclose" ></toolTipModal>
</div>
</template>

<script>
import poPup from '../popup.vue'
import toolTipModal from '../toolTipModal.vue'
import axios from 'axios';
export default{
	data(){
		return{
            mapJson: false,
            dataJson: false,
            beijing: [],
            wksArr: [],
            yksArr: [],
            ywcArr: [],
            yqxArr: [],
            dataJsonObj: {},
            grade1Obj: {},
            grade2Obj: {},
            peopleList: [],
            peopleClk: false,
            grade1Clk: false,
            grade2Clk: false,
            ulHeight: '100px',
            // 模态框
            rwxqModal: false,
            popup:false,
            options:{},
            rwxq : {},
            flags:(screen.width <=1366)?'8':'13',//已完成和取消人员显示（小黄人）
            flags2:(screen.width <=1366)?'8':'13',//因改变上面值复制一份判断在不同分辨率下显示数量
            currentI:null,//人员悬浮框index
            peopleLength:0//人员length
		}
	},
	components:{
		poPup,
		toolTipModal
	},
	computed:{
	},
    methods: {
    	modalclose(flag){
    		this.rwxqModal = flag;
    	},
    	//根据悬浮人员显示相应数据
    	popupOver(event,index){
    		var ywcCount = 0;
            var yqxCount = 0;
    		this.popup = true;
    		this.currentI = index;
    		this.options.popup = this.popup;
    		this.options.data =  this.peopleList[index].info;
    		this.peopleList[index].info.forEach(function(value,index){
				if(value.type == 1){
					ywcCount++;
				}else if(value.type == 2){
					yqxCount++;
				}
			});
			this.options.ywc = ywcCount;
			this.options.yqx = yqxCount;
    	},
    	//离开取消显示
    	popupOut(event,index){
    		this.currentI = null;
    	},
    	// 点击一二级
    	gradeClick(num){
    		if(num == 1){
    			if(this.grade1Clk){
    				this.grade1Clk = false;
    			}else{
    				this.grade1Clk = true;
    				if (this.grade2Clk) {
    					this.grade2Clk = false;
    				}
    			}
    		}else if(num == 2){
    			if(this.grade2Clk){
    				this.grade2Clk = false;
    			}else{
    				this.grade2Clk = true;
    				if (this.grade1Clk) {
    					this.grade1Clk = false;
    				}
    			}
    		}
    		this.gradeDataShow(num);
    	},
    	// 一、二级加载数据集
    	gradeDataShow(num){
    		if(num == 1){
    			/*if(this.grade1Clk){
    				var data = this.grade1Obj;
    				this.getMapData(data);
    			}else{
    				var data = this.dataJsonObj;
    				this.getMapData(data);
    			}*/
    			var data = this.grade1Obj;
    			this.getMapData(data);
    		}else if(num == 2){
    			/*if(this.grade2Clk){
    				var data = this.grade2Obj;
    				this.getMapData(data);
    			}else{
    				var data = this.dataJsonObj;
    				this.getMapData(data);
    			}*/
    			var data = this.grade2Obj;
    			this.getMapData(data);
    		}else{
    			this.dataJsonData();
    		}
    	},
    	// 处理一、二级的数据
    	getMapData(data,num){
    		this.wksArr = data.wks;
			this.yksArr = data.yks;
			this.ywcArr = data.ywc;
			this.yqxArr = data.yqx;
			this.echartsMap();
    	},
    	// 点击展示更多的人
    	showMorePeople(){
    		var len = this.peopleList.length;
    		console.log(len);
    		if(this.peopleClk){
    			this.peopleClk = false;
    			this.ulHeight = '100px';
    			this.flags =(screen.width <=1366)?'8':'13';
    			return;
    		}
    		this.peopleClk = true;
    		if(len<=4){return;}
    		var num = Math.ceil((len*1)/8);
    		this.flags = len;
    		this.ulHeight = 100*num + 'px';
    	},
    	// 北京地图的数据
    	mapJsonData(){
			axios.get('./jsonServer/beijing.json')
			.then((response) =>{
				this.beijingData = response.data;
				this.mapJson = true;
				this.getJsonAll();
			})
			.catch((error) =>{
			    console.log(error);
			});
		},
		// 北京地图加载出来的加数据
		dataJsonData(){
			axios.get('./jsonServer/mapdata.json')
			.then((response) =>{
				var dataArr = response.data;
				this.dataJsonObj = dataArr;
				this.beijing = dataArr.beijing;
				this.wksArr = dataArr.wks;
				this.yksArr = dataArr.yks;
				this.ywcArr = dataArr.ywc;
				this.yqxArr = dataArr.yqx;
				this.peopleList = dataArr.people;
				this.peopleLength = dataArr.people.length;
				this.grade1Obj = dataArr.grade1;
				this.grade2Obj = dataArr.grade2;
				this.dataJson = true;
				this.getJsonAll();
//				console.log(this.peopleLength);
			})
			.catch((error) =>{
			    console.log(error);
			});
			
		},
		// 判断两个json是否全部加载完成
		getJsonAll(){
			if(this.mapJson&&this.dataJson){
				this.echartsMap();
			}
		},
		// 弹出框点击事件
		mapTooltipClick(num,params){
			if(num==1){
				this.rwxqModal = true;
				this.rwxq = params.data.info;
			}
		},
		// 北京地图echarts地图加载
		echartsMap(){
			var _this = this;
			this.$echarts.registerMap('beijing',this.beijingData);
		    // 每个地区的坐标
            var geoPhotoMap = {
                "11": "image://static/img/11.png",
                "12": "image://static/img/12.png",
                "21": "image://static/img/21.png",
                "22": "image://static/img/22.png",
                "31": "image://static/img/31.png",
                "32": "image://static/img/32.png",
                "41": "image://static/img/41.png",
                "42": "image://static/img/42.png"
            };
		    var convertData = function(datas) {
		    	if(!datas){return;}
			    var res = [];
			    for (var i = 0; i < datas.length; i++) {
			        var geoPhoto = geoPhotoMap[datas[i].type];
			        if (geoPhoto) {
			            res.push({
			                name: datas[i].name,
			                value: datas[i].value,
			                type:  datas[i].type,
			                info: datas[i].info,
			                symbol: geoPhoto
			            });
			        }
			    }
			    return res;
			};
			this.option = {
				backgroundColor: 'transparent',
		        tooltip: {
		            trigger: 'item',
		            enterable: true,
		            transitionDuration: 1,
		            showDelay: 2,
		            backgroundColor: '#01156E',
		            borderWidth: 1,
		            borderColor:"#50A1EF",
		            triggerOn: 'click',
			        textStyle: {
			            color: '#ff6700',
			            zIndex: 999
			        },
		            padding: 0,
		            formatter: function (params) {
		            	var html = '';
		            	if(params.seriesIndex != 0){
					       	if(screen.width <=1366){
					       		html  = '<div id="bgOne" style="background:#01156E; border-width: 116px;text-align: center;padding: 10px; border-radius: 70px;">'+
						                '<p onclick="mapTooltipClick(1);" slot="title" style="cursor: pointer;height: 32px;line-height: 32px;text-align: left;margin-left：10px;border-bottom: 1px dotted #999;">'+
						                	'<img align="absmiddle" src="./static/img/rwxq.png" style="height: 18px;width: 18px;margin-right: 8px;"/>'+
						                	'任务详情'+
						                '</p>'+
						                '<p onclick="mapTooltipClick(2);" slot="title" style="cursor: pointer;height: 32px;line-height: 32px;text-align: left;margin-left：10px;border-bottom: 1px dotted #999;">'+
						                	'<img align="absmiddle" src="./static/img/clgj.png" style="height: 18px;width: 18px;margin-right: 8px;"/>'+
						                	'车辆轨迹'+
						                '</p>'+
						                '<p onclick="mapTooltipClick(3);" slot="title" style="cursor: pointer;height: 32px;line-height: 32px;text-align: left;margin-left：10px;border-bottom: 1px dotted #999;">'+
						                	'<img align="absmiddle" src="./static/img/gjqxx.png" style="height: 18px;width: 18px;margin-right: 8px;"/>'+
						                	'工器具信息'+
						                '</p>'+
					            	'</div>';
					       	}else{
					       		html  = '<div id="bgOne" style="background:#01156E; border-width: 140px;text-align: center;padding: 10px;">'+
						                '<p onclick="mapTooltipClick(1);" slot="title" style="cursor: pointer;height: 40px;line-height: 40px;text-align: left;margin-left：10px;border-bottom: 1px dotted#999;">'+
						                	'<img align="absmiddle" src="./static/img/rwxq.png" style="height: 25px;width: 25px;margin-right: 10px;"/>'+
						                	'任务详情'+
						                '</p>'+
						                '<p onclick="mapTooltipClick(2);" slot="title" style="cursor: pointer;height: 40px;line-height: 40px;text-align: left;margin-left：10px;border-bottom: 1px dotted #999;">'+
						                	'<img align="absmiddle" src="./static/img/clgj.png" style="height: 25px;width: 25px;margin-right: 10px;"/>'+
						                	'车辆轨迹'+
						                '</p>'+
						                '<p onclick="mapTooltipClick(3);" slot="title" style="cursor: pointer;height: 40px;line-height: 40px;text-align: left;margin-left：10px;border-bottom: 1px dotted #999;">'+
						                	'<img align="absmiddle" src="./static/img/gjqxx.png" style="height: 25px;width: 25px;margin-right: 10px;"/>'+
						                	'工器具信息'+
						                '</p>'+
					            	'</div>';					       		
					       	}

					        window.mapTooltipClick =  function (num) {
					        	if(num==1){
					        		_this.rwxqModal = false;
					        		var bgOne = document.getElementById('bgOne').style;
						        	if(bgOne.display == "block" || bgOne.display==""){
						        		bgOne.display="none";
						        	}else{
						        		bgOne.display="block";
						        	}
						        	_this.mapTooltipClick(num,params);
						        	
					        	}
							};
		            	}
		            	return html;
		            },
		            extraCssText: 'box-shadow: 4px 4px 10px rgba(0,21,55,0.6)'
		        },
		        legend: {
		        	show: true,
		            type: 'scroll',
			        orient: 'vertical',
					top: '20',
					right: '20',
					data: [
						{name:'未开工',icon:'image://static/img/wks-map.png'},
						{name:'已开工',icon:'image://static/img/yks-map.png'},
						{name:'已完成',icon:'image://static/img/ywc-map.png'},
						{name:'已取消',icon:'image://static/img/yqx-map.png'}
					],
		            textStyle: {
		                color: '#fff',
		                fontSize: (screen.width <=1366)?'12':'16',
		            },
		            selected:{
		            	"未开工" : true,
		            	"已开工" : true,
		            	"已完成" : true,
		            	"已取消" : true
		            }
		        },
		        visualMap: {
			        type: 'piecewise',
			        show: false,
			        text: ['', ''],
			        showLabel: true,
			        seriesIndex: [0],
			        splitNumber: 4,
			        min: 0,
			        max: 4,
			        inRange: {
			            color: ['#067ECA', '#0BB4CD', '#90B7D6','#9BD5B7']
			        },
			        textStyle: {
			            color: '#000'
			        },
			        bottom: 60,
			        left: 'left',
			    },
		        geo: {
		            roam: true,
		            map: 'beijing',
		            top: '0px',
                    bottom: '0px',
		            label: {
		                normal: {
		                    show: true,
		                    textStyle: {
                                fontSize: (screen.width <=1366)?'12':'16',
                                color: '#FFFFFF'
                            }
		                },
		                emphasis: {
		                	show: false,
		                    textStyle: {
		                        color: '#FFFFFF',
		                        fontSize: (screen.width <=1366)?'12':'16',
		                    },
		                }
		            },
		            data: _this.beijing
		        },
		        series : [
				   {
			            name: 'mapSer',
			            type: 'map',
			            roam: true,
			            geoIndex: 0,
			            label: {
			                show: false,
			            },
			            data: _this.beijing
			        },
			        {
			            name: '未开工',
			            type: 'scatter',
			            coordinateSystem: 'geo',
			            data: convertData(_this.wksArr),
                        symbolSize: (screen.width <=1366)?["24","14"]:["48","28"],
			            label: {
			                normal: {
			                    formatter: function (params) {
			                        return params.data.name;
			                    },
			                    position: 'bottom',
			                    show: true,
			                    textStyle: {
			                        color: '#1167c1',
			                        fontSize: (screen.width <=1366)?'10':'14',
			                        fontWeight: '600'
			                    },
			                    backgroundColor: '#FFFFFF',
			                    borderColor: '#1167c1',
			                    borderWidth: 1,
			                    borderRadius: 5,
			                    padding: (screen.width <=1366)?1:5,
			                },
			                emphasis: {
			                    show: true
			                }
			            },
			            itemStyle: {
			                emphasis: {
				                borderColor: '#ff6700',
				                borderWidth: 1
				            }
			            }
			        },
                    {
                        name: '已开工',
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        data: convertData(_this.yksArr),
                        symbolSize: (screen.width <=1366)?["24","14"]:["48","28"],
                        label: {
                            normal: {
			                    formatter: function (params) {
			                        return params.data.name;
			                    },
			                    position: 'bottom',
			                    show: true,
			                    textStyle: {
			                        color: '#1167c1',
			                        fontSize: (screen.width <=1366)?'10':'14',
			                        fontWeight: '600'
			                    },
			                    backgroundColor: '#FFFFFF',
			                    borderColor: '#1167c1',
			                    borderWidth: 1,
			                    borderRadius: 5,
			                    padding: (screen.width <=1366)?1:5,
			                },
                            emphasis: {
                                show: true
                            }
                        },
                        itemStyle: {
                            emphasis: {
                                borderColor: '#ff6700',
                                borderWidth: 1
                            }
                        }
                    },
                    {
                        name: '已完成',
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        data: convertData(_this.ywcArr),
                        symbolSize: (screen.width <=1366)?["24","14"]:["48","28"],
                        label: {
                            normal: {
			                    formatter: function (params) {
			                        return params.data.name;
			                    },
			                    position: 'bottom',
			                    show: true,
			                    textStyle: {
			                        color: '#1167c1',
			                        fontSize: (screen.width <=1366)?'10':'14',
			                        fontWeight: '600'
			                    },
			                    backgroundColor: '#FFFFFF',
			                    borderColor: '#1167c1',
			                    borderWidth: 1,
			                    borderRadius: 5,
			                    padding: (screen.width <=1366)?1:5,
			                },
                            emphasis: {
                                show: true
                            }
                        },
                        itemStyle: {
                            emphasis: {
                                borderColor: '#ff6700',
                                borderWidth: 1
                            }
                        }
                    },
                    {
                        name: '已取消',
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        data: convertData(_this.yqxArr),
                        symbolSize: (screen.width <=1366)?["24","14"]:["48","28"],
                        label: {
                            normal: {
			                    formatter: function (params) {
			                        return params.data.name;
			                    },
			                    position: 'bottom',
			                    show: true,
			                    textStyle: {
			                        color: '#1167c1',
			                        fontSize: (screen.width <=1366)?'10':'14',
			                        fontWeight: '600'
			                    },
			                    backgroundColor: '#FFFFFF',
			                    borderColor: '#1167c1',
			                    borderWidth: 1,
			                    borderRadius: 5,
			                    padding: (screen.width <=1366)?1:5,
			                },
                            emphasis: {
                                show: true
                            }
                        },
                        itemStyle: {
                            emphasis: {
                                borderColor: '#ff6700',
                                borderWidth: 1
                            }
                        }
                    },
                    {
                        name: '一级风险',
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        data: convertData(_this.grade1Obj),
                        symbolSize: (screen.width <=1366)?["24","14"]:["48","28"],
                        label: {
                            normal: {
			                    formatter: function (params) {
			                        return params.data.name;
			                    },
			                    position: 'bottom',
			                    show: true,
			                    textStyle: {
			                        color: '#1167c1',
			                        fontSize: '14',
			                        fontWeight: '600'
			                    },
			                    backgroundColor: '#FFFFFF',
			                    borderColor: '#1167c1',
			                    borderWidth: 1,
			                    borderRadius: 5,
			                    padding: (screen.width <=1366)?1:5,
			                },
                            emphasis: {
                                show: true
                            }
                        },
                        itemStyle: {
                            emphasis: {
                                borderColor: '#ff6700',
                                borderWidth: 1
                            }
                        }
                    },
                    {
                        name: '二级风险',
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        data: convertData(_this.grade2Obj),
                        symbolSize: (screen.width <=1366)?["24","14"]:["48","28"],
                        label: {
                            normal: {
			                    formatter: function (params) {
			                        return params.data.name;
			                    },
			                    position: 'bottom',
			                    show: true,
			                    textStyle: {
			                        color: '#1167c1',
			                        fontSize: '14',
			                        fontWeight: '600'
			                    },
			                    backgroundColor: '#FFFFFF',
			                    borderColor: '#1167c1',
			                    borderWidth: 1,
			                    borderRadius: 5,
			                    padding: (screen.width <=1366)?1:5,
			                },
                            emphasis: {
                                show: true
                            }
                        },
                        itemStyle: {
                            emphasis: {
                                borderColor: '#ff6700',
                                borderWidth: 1
                            }
                        }
                    }
				]
		    }
			var echartsMapmyChart = this.$echarts.init(this.$refs['echartsMap']);
			echartsMapmyChart.setOption(this.option);
			var selectOptions = this.option;
			//监听图例点击事件
			echartsMapmyChart.on("legendselectchanged",function(params){
				var legendName = params.name;
				if(legendName == "已开工"){
					selectOptions.legend.selected["未开工"] = false;
					selectOptions.legend.selected["已完成"] = false;
					selectOptions.legend.selected["已取消"] = false;
					selectOptions.legend.selected["已开工"] = true;
				}else if(legendName == "未开工"){
					selectOptions.legend.selected["已开工"] = false;
					selectOptions.legend.selected["已完成"] = false;
					selectOptions.legend.selected["已取消"] = false;
					selectOptions.legend.selected["未开工"] = true;
				}else if(legendName == "已完成"){
					selectOptions.legend.selected["已开工"] = false;
					selectOptions.legend.selected["未开工"] = false;
					selectOptions.legend.selected["已取消"] = false;
					selectOptions.legend.selected["已完成"] = true;
				}else if(legendName == "已取消"){
					selectOptions.legend.selected["已开工"] = false;
					selectOptions.legend.selected["未开工"] = false;
					selectOptions.legend.selected["已完成"] = false;
					selectOptions.legend.selected["已取消"] = true;
				}
				echartsMapmyChart.setOption(selectOptions);
			});
			
			//监听双击事件
			echartsMapmyChart.on("dblclick",function(params){
				if(params.seriesName === "已开工" && params.name ==="张晓辉"){
					window.open("/static/video.html?name=1.mov");
				}
			});
			
		}
    },
	mounted(){
		this.mapJsonData();
		this.dataJsonData();
	}
}
</script>
