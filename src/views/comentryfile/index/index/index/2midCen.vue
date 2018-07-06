<style scoped>
	.echartsMap{
		width: 100%;
		/*height: 100%;*/
		height: calc(100% - 80px);
	}
	.echartsBox{
		height: 40px;
		border: 1px solid red;
	}
	.echarts-bot{

	}
</style>
<template>
<Row class="indexRow" style="height: 100%;margin-bottom:36px;">
    <Col span="24">
    	<div class="lr-title"></div>
    	<div class="md-box">
    		<div class="echartsBox echarts-top"></div>
    		<div class="echartsMap" ref="echartsMap"></div>
    		<div class="echartsBox echarts-bot">

    		</div>
    	</div>
    </Col>
</Row>
</template>

<script>
import axios from 'axios';
export default{
	data(){
		return{

		}
	},
    methods: {
    	mapJsonData(){
			axios.get('/beijing.json')
			.then((response) =>{
				this.beijingData = response.data;
				this.echartsMap();
			})
			.catch((error) =>{
			    console.log(error);
			});
		},
		echartsMap(){
			console.log(this.beijingData);
			this.$echarts.registerMap('北京',this.beijingData);
		    // 每个地区的坐标
            var geoCoordMap = {
                '怀柔': [116.607122, 40.624272],
                '密云': [117.006650, 40.558750],
                '延庆': [116.143950, 40.560550],
                '昌平': [116.184350, 40.306650],
                '顺义': [116.705450, 40.192750],
                '平谷': [117.149950, 40.256350],
                '门头沟': [115.654450, 40.054050],
                '海淀': [116.251650, 40.090250],
                '朝阳': [116.481950, 40.022450],
                '通州': [116.724250, 39.888750],
                '石景山': [116.127150, 40.010000],
                '丰台': [116.108750, 39.888650],
                '房山': [115.828650, 39.736850],
                '大兴': [116.356550, 39.709550]
            };

            // 每个地区的设备数量值
		    var data = [
			    {name: '怀柔',value: 23},
			    {name: '密云',value: 11},
			    {name: '延庆',value: 32},
			    {name: '昌平',value: 22},
			    {name: '顺义',value: 15},
			    {name: '平谷',value: 11},
			    {name: '门头沟',value: 31},
			    {name: '海淀',value: 18},
			    {name: '朝阳',value: 15},
			    {name: '通州',value: 27},
			    {name: '石景山',value: 25},
			    {name: '丰台',value: 23},
			    {name: '房山',value: 17},
			    {name: '大兴',value: 13}
		    ];

		    var convertData = function(datas) {
			    var res = [];
			    for (var i = 0; i < datas.length; i++) {
			        var geoCoord = geoCoordMap[datas[i].name];
			        if (geoCoord) {
			            res.push({
			                name: datas[i].name,
			                value: geoCoord.concat(datas[i].value)
			            });
			        }
			    }
			    return res;
			};
		    // 设定series是一个空的数组
		    var series = [
		    	{
		            type: 'map',
		            map: '北京',
//		            top: '0px',
//                  bottom: '0px',
//                  right:  '20px',
//                  left:  '20px',
                    //animation: true,
		            label: {
		                normal: {
		                    show: false,
		                    textStyle: {
                                fontSize: this.fontTypeSizes,
                                color: '#FFFFFF'
                            }
		                },
		                emphasis: {
		                	show: false,
		                    textStyle: {
		                        color: '#FFFFFF', // 区域字体hover颜色
		                        fontSize: this.fontTypeSizes
		                    },
		                }
		            },
		            roam: true,
		            itemStyle:{
	                	normal: {
		                    borderColor: '#008de3', // 区域边框线
		                    borderWidth: 1,
		                    areaColor: '#0F4DA2', // 地图背景颜色
		                    color: "#ff6700"	// 地图背景颜色
		                },
		                emphasis: {
		                    borderColor: '#00bee7',
		                    areaColor: '#006bae',
		                    shadowColor: 'rgba(8,38,55,0.75)',
		                    shadowOffsetX: 0,
		                    shadowOffsetY: 28,
		                    borderWidth: 0
		                }
	                },
		            data: data
		       }, {
		            name: '未开始',
		            type: 'scatter',
    				coordinateSystem: 'geo',
		            data: convertData(data),
		            //symbol: 'rect',
		            symbol: 'image://static/img/yks-map.png',
		            symbolSize: "26",
		            label: {
		                normal: {
		                    show: true,
		                    position: 'right',
		                    textStyle: {
		                        color: '#f2e87d',
		                        fontSize: this.fontSizes,
		                    }
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
		    ];

			this.option = {
			    backgroundColor: 'transparent',
		        title: {
		            text: '',
		            subtext: '',
		            sublink: '',
    				x: 'center',
		            textStyle: {
		                color: '#000'
		            }
		        },
		        tooltip: {
			        trigger: 'item',
			        show: false,
			        formatter: function(params) {
			            return params.name + ' 323: ' + params.value[2];
			        }
			    },
			    legend: {
			        orient: 'vertical',
			        y: 'bottom',
            		x: 'right',
			        data: ['未开始', '已开始', '已完成'],
			        fontSize: '20',
			        textStyle: {
			            color: '#fff',
			            fontSize: '20',
			        }
			    },
		        geo: {
		        	show: true,
		            map: '北京',
		            top: '0px',
                    bottom: '0px',
//                  left: '20px',
//                  right: '20px',
                    zoom: 0,
                    roam: true,
                    label: {
			            normal: {
			                show: false
			            },
			            emphasis: {
			                show: false
			            }
			        },
		            itemStyle: {
		                normal: {
                            borderColor: 'rgba(0,252,255,1)',
                            areaColor: 'rgba(0,132,255,.15)',
                            color:'#fff'
                        },
                        emphasis: {
                            borderColor: 'rgba(0,252,255,1)',
                            areaColor: 'rgba(0,132,255,.15)',
                            color:'#fff'
                        }
		            }
		        },
		        series: series
			}
			let echartsMapmyChart = this.$echarts.init(this.$refs['echartsMap']);
			echartsMapmyChart.setOption(this.option);
		}
    },
	mounted(){
		this.mapJsonData();
	}
}
</script>
