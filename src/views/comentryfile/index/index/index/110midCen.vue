<style scoped>
	.echartsMap{
		width: 100%;
		/*height: 100%;*/
		height: calc(100% - 100px);
	}
	.echartsBox{
		height: 40px;
		background: transparent;
		border: 1px solid transparent;
	}
	.echarts-bot{
		position: relative;
		height: 60px;
	}
	.echarts-bot ul{
		display: inline-block;
	}
	.echarts-bot ul.jibieUl{
	    clear: both;
	    position: absolute;
	    top: -43px;
	    right: 20px;
	    height: 40px;
	    line-height: 40px;
	}
	li.people,li.jibie{
		position: relative;
	    clear: both;
	    padding: 0 5px;
	    width: 50px;
	    text-align: center;
	    display: inline-block;
	}
	li.people span{
		position: absolute;
	    top: -25px;
	    left: 6px;
	    width: 40px;
	    padding: 2px;
	    background: #fff;
	    color: #000;
	    font-size: 10px;
	}
	li.jibie{
		width: 90px;
	}
	li.jibie span{
		position: absolute;
	    top: -25px;
	    right: 6px;
	    width: 60px;
	    padding: 2px;
	    background: transparent;
	    color: #FFF;
	    font-size: 10px;
	}
	li.jibie span:before{
		content: '';
	    width: 15px;
	    height: 15px;
	    position: absolute;
	    top: 14px;
	    left: -21px;
	    background: red;
	    border-radius: 50%;
	}
	li.jibie2 span::before{
		background: #FF9900;
	}
</style>
<template>
<Row class="indexRow" style="height: 100%;">
    <Col span="24">
    	<div class="lr-title"></div>
    	<div class="md-box">
    		<div class="echartsBox echarts-top"></div>
    		<div class="echartsMap" ref="echartsMap"></div>
    		<div class="echartsBox echarts-bot">
    			<ul>
	    			<li class="people">
	    				<span>杨正炳</span>
	    				<img src="../../../../assets/images/index/people.png"/>
	    			</li>
	    			<li class="people">
	    				<span>杨正炳</span>
	    				<img src="../../../../assets/images/index/people.png"/>
	    			</li>
	    			<li class="people">
	    				<span>杨正炳</span>
	    				<img src="../../../../assets/images/index/people.png"/>
	    			</li>
	    			<li class="people">
	    				<span>杨正炳</span>
	    				<img src="../../../../assets/images/index/people.png"/>
	    			</li>
    			</ul>
    			<ul class="jibieUl">
	    			<li class="jibie">
	    				<span>一级风险</span>
	    			</li>
	    			<li class="jibie jibie2">
	    				<span>二级风险</span>
	    			</li>
    			</ul>
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
		    var max = 480, min = 9;
    		var maxSize4Pin = 100, minSize4Pin = 20;
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
			this.option = {
				backgroundColor: 'transparent',
		        tooltip: {
		            trigger: 'item',
		            show: false,
		            formatter: function (params) {
		              if(typeof(params.value)[2] == "undefined"){
		              	return params.name + ' : ' + params.value;
		              }else{
		              	return params.name + ' : ' + params.value[2];
		              }
		            }
		        },
		        legend: {
		            orient: 'vertical',
		            y: 'top',
		            x: 'right',
		            data: ['未开工','已开工','已完成','已取消'],
		            fontSize: '20',
		            textStyle: {
		                color: '#fff',
		                fontSize: '20'
		            }
		        },
		        visualMap: {
		            show: false,
		            min: 0,
		            max: 500,
		            seriesIndex: [1],
		            inRange: {
		               color: ['#0F4DA2', '#006bae', '#006bae'] // 黑紫黑
		            }
		        },
		        geo: {
		            show: true,
		            map: '北京',
		            top: '0px',
                    bottom: '0px',
                    zoom: 0,
		            label: {
		                normal: {
		                    show: false
		                },
		                emphasis: {
		                    show: false,
		                }
		            },
		            roam: true,
		            itemStyle: {
		                normal: {
		                	show: false,
                            borderColor: 'rgba(0,252,255,1)',
                            areaColor: 'rgba(0,132,255,.15)',
                            color:'#fff'
                        },
                        emphasis: {
                        	show: false,
                            borderColor: 'rgba(0,252,255,1)',
                            areaColor: 'rgba(0,132,255,.15)',
                            color:'#fff'
                        }
		            }
		        },
		        series : [{
		            name: '未开工',
		            type: 'scatter',
		            coordinateSystem: 'geo',
		            data: convertData(data),
		            symbol: 'image://static/img/wks-map.png',
		           	symbolSize: "32",
		            label: {
		                normal: {
		                    formatter: '{b}',
		                    position: 'right',
		                    show: true,
		                    textStyle: {
		                        color: '#FFF',
		                        fontSize: '13'
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
		        },
		        {
		            type: 'map',
		            map: '北京',
		            top: '0px',
		            bottom: '0px',
		            geoIndex: 0,
		            aspectScale: 0.75, //长宽比
		            showLegendSymbol: false, // 存在legend时显示
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
		            itemStyle: {
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
		            animation: false,
		            data: data
		        }]
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