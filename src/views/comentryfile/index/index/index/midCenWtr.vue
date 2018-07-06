<style>
	{
		
	}
</style>
<template>
<div style="height: 100%;">
	<div class="md-box md-box-none">
		<div class="echartsBox echarts-top"></div>
		<div class="echartsMap" ref="echartsMapWtr"></div>
		<div class="echartsBox echarts-bot"></div>
	</div>
</div>
</template>

<script>
import axios from 'axios';
export default{
	data(){
		return{
            mapJson: false,
            dataJson: false,
            beijing: [],
            wtrArr: [],
            wtr1Arr: [],    //适宜带电作业
            wtr2Arr: [],    //不宜带电作业
            wtr3Arr: [],    //禁止带电作业
            beijing: [],
            dataJsonObj: {},
		}
	},
    methods: {
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
			axios.get('./jsonServer/wtrdata.json')
			.then((response) =>{
				var dataArr = response.data;
				this.wtrArr = dataArr;
				this.beijing = dataArr.beijing;
				this.wtr1Arr =  dataArr.wtr1;
				this.wtr2Arr =  dataArr.wtr2;
				this.wtr3Arr =  dataArr.wtr3;
				this.dataJson = true;
				this.getJsonAll();
			})
			.catch((error) =>{
			    console.log(error);
			});
		},
		// 判断两个json是否全部加载完成
		getJsonAll(){
			if(this.mapJson&&this.dataJson){
				this.echartsMapWtr();
			}
		},
		// 北京地图echarts地图加载
		echartsMapWtr(){
			var _this = this;
			this.$echarts.registerMap('beijing',this.beijingData);
		    // 每个地区的坐标
            var geoPhotoMap = {
                "1": "image://static/img/wtr11.png",   //晴天
                "2": "image://static/img/wtr22.png",   //多云
                "3": "image://static/img/wtr33.png",   //中雨
                "4": "image://static/img/wtr44.png"    //雷雨
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
			                weather: datas[i].weather,
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
		            alwaysShowContent: true,
		            triggerOn: 'click',
			        textStyle: {
			            color: '#ff6700',
			            zIndex: 999
			        },
		            padding: 0,
		            formatter: function (params) {
		            	var html = '';
		            	if(params.seriesIndex != 0){
		            		html  = '<div id="bgOne" style="display: block;width: 320px;height: 160px;background: #0D206E;">'+
						                '<div style="display: inline-block;width: 60px;height:140px; margin:10px 10px;border-right:2px solid #4A6394;">'+
						                	'<span style="margin-left:40px;">℃</span>'+
						                	'<img style="display: block;" src="./static/img/wtrwd1.png"/>'+
						                	'<span style="display:block; margin-top:10px;">' + params.data.weather[0] + '℃</span>'+
						                '</div>'+
						                '<div style="width: calc(100% - 100px);position: absolute;left: 85px;top: 15px;">'+
						                	'<p>'+
						                		'<span>农历四月十九</span>'+
						                		'<span style="cursor: pointer;float: right;" onclick="wtrTooltipClick(9);">6月20号<img src="./static/img/wtrMove.png"/></span>'+
						                	'</p>'+
						                	'<p style="text-align: center;">'+
						                		'<img style="display: inline-block;" src="./static/img/wtr.png"/>'+
						                		'<span style="display: block;">' + params.data.weather[1] + '℃ '+params.data.weather[2]+'(实时)</span>'+
						                	'</p>'+
						                	'<p>'+
						                		'<span><img src="./static/img/wtrshidu.png"/>湿度<em style="font-style: normal;color: #ffd200;">'+ params.data.weather[3]+'</em></span>'+
						                		'<span style="cursor: pointer;float: right;"><img src="./static/img/wtrfeng.png"/>'+ params.data.weather[4]+'<em style="font-style: normal;color: #ffd200;">'+ params.data.weather[5]+'</em>级</span>'+
						                	'</p>'+
						                	'<p style="text-align: center;">'+
						                		'<span style="display: inline-block; margin-top:5px;"><img src="./static/img/wtr-left.png"/></span>'+
						                		'<span style="display: inline-block; margin-top:5px;">'+ params.data.weather[6]+'</span>'+
						                		'<span style="display: inline-block; margin-top:5px;"><img src="./static/img/wtr-right.png"/></span>'+
						                	'</p>'+
						                '</div>'+
					            	'</div>'+
					            	'<div id="bgTwo" onclick="wtrTooltipClick(9);" style="display: none;width: 500px;height: 200px;background: url(./static/img/wtrweek1.png) no-repeat;background-size: 100% 100%;"></div>';
					        window.wtrTooltipClick =  function (num) {
					        	var bgOne = document.getElementById('bgOne').style,
					        		bgTwo = document.getElementById('bgTwo').style;
					        	if(bgOne.display == "block"){
					        		bgOne.display="none";
					        		bgTwo.display="block";
					        	}else{
					        		bgOne.display="block";
					        		bgTwo.display="none";
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
						{name:'适宜带电作业',icon:'image://static/img/wtrDo.png'},
						{name:'不宜带电作业',icon:'image://static/img/wtrTo.png'},
						{name:'禁止带电作业',icon:'image://static/img/wtrNo.png'}
					],
		            textStyle: {
		                color: '#fff',
		                fontSize: (screen.width <=1366)?'12':'16',
		            },
		           	selectedMode:false
		        },
		        visualMap: {
			        type: 'piecewise',
			        show: false,
			        text: ['', ''],
			        showLabel: true,
			        seriesIndex: [0],
			        splitNumber: 3,
			        min: 0,
			        max: 3,
			        inRange: {
			            color: ['#1DA0F2','#DE9B32','#EE5655']
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
			            name: '适宜带电作业',
			            type: 'scatter',
			            coordinateSystem: 'geo',
			            data: convertData(_this.wtr1Arr),
                        symbolSize: (screen.width <=1366)?["32","32"]:["48","48"],
			            label: {
			                normal: {
			                    formatter: function (params) {
			                        return params.data.name;
			                    },
			                    position: 'bottom',
			                    show: false,
			                    textStyle: {
			                        color: '#1167c1',
			                        fontSize: (screen.width <=1366)?"12":"16",
			                        fontWeight: '600'
			                    },
			                    backgroundColor: '#FFFFFF',
			                    borderColor: '#1167c1',
			                    borderWidth: 1,
			                    borderRadius: 5,
			                    padding: (screen.width <=1366)?1:5,
			                },
			                emphasis: {
			                    show: false,
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
                        name: '不宜带电作业',
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        data: convertData(_this.wtr2Arr),
                        symbolSize: (screen.width <=1366)?["32","32"]:["48","48"],
                        label: {
                            normal: {
			                    formatter: function (params) {
			                        return params.data.name;
			                    },
			                    position: 'bottom',
			                    show: false,
			                    textStyle: {
			                        color: '#1167c1',
			                        fontSize: (screen.width <=1366)?"12":"16",
			                        fontWeight: '600'
			                    },
			                    backgroundColor: '#FFFFFF',
			                    borderColor: '#1167c1',
			                    borderWidth: 1,
			                    borderRadius: 5,
			                    padding: (screen.width <=1366)?1:5,
			                },
                            emphasis: {
                                show: false,
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
                        name: '禁止带电作业',
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        data: convertData(_this.wtr3Arr),
                        symbolSize: (screen.width <=1366)?["32","32"]:["48","48"],
                        label: {
                            normal: {
			                    formatter: function (params) {
			                        return params.data.name;
			                    },
			                    position: 'bottom',
			                    show: false,
			                    textStyle: {
			                        color: '#1167c1',
			                        fontSize: (screen.width <=1366)?"12":"16",
			                        fontWeight: '600'
			                    },
			                    backgroundColor: '#FFFFFF',
			                    borderColor: '#1167c1',
			                    borderWidth: 1,
			                    borderRadius: 5,
			                    padding: (screen.width <=1366)?1:5,
			                },
                            emphasis: {
                                show: false,
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
			let echartsMapmyChart = this.$echarts.init(this.$refs['echartsMapWtr']);
			echartsMapmyChart.setOption(this.option);
		}
    },
	mounted(){
		this.mapJsonData();
		this.dataJsonData();
	}
}
</script>
