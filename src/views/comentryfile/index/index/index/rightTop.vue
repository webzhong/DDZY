<style scoped>
	#container{
		height: 200px;
		padding-top: 50px;
		padding-left: 9px;
	}
	.rightEchartsTop{
		height: 55%;
		margin:8px 0 0 6px;
	}
	
	.yibiaodai img{
		width: 39.4%;
		height: 19%;
		position: absolute;
		top: 15%;
		left: 32%;
	}
	@media only screen and (min-width: 100px) and (max-width: 1920px) {
		.yibiaodai img{
			width: 40%;
    		height: 19%;
    		position: absolute;
    		top: 17%;
    		left: 30.5%;
		}
	}
	@media only screen and (min-height: 1080px) and (max-width: 1920px) {
		.yibiaodai img{
			width: 40%;
    		height: 19%;
    		position: absolute;
    		top: 14%;
    		left: 30.5%;
		}
	}
	.leftYiBaoIcon{
		width:68px;
		height:79px;
		background:url("../../../../assets/images/index/leftYiBao.png") no-repeat;
		position: absolute;
		top: 120px;
		left: 89px;
	}
	.rightYiBaoIcon{
		width:68px;
		height:79px;
		background:url("../../../../assets/images/index/rightYiBao.png") no-repeat;
		position: absolute;
		top: 120px;
		left: 313px;
	}
	.textStyle{
		width:172px;
		height:32px;
		color:#fff;
		position:absolute;
		top: 175px;
		left: 150px;
		line-height:32px;
		text-align:center;
		background:url("../../../../assets/images/index/textBg.png") no-repeat;
	}

	@media only screen and (min-width: 100px) and (max-width: 1366px) {
		#container{
			height: 110px;
			padding-top: 15%;
			padding-left: 5.5%;
		}
		.yibiaodai img{
			  width: 25.6%;
			  height: 15%;
			  position: absolute;
			  top: 68px;
			  left: 40%;

		}
		.leftYiBaoIcon{
			width:50px;
			height:58px;
			background:url("../../../../assets/images/index/leftYiBao1366.png") no-repeat;
			position: absolute;
			top: 67px;
			left: 59px;
		}
		.rightYiBaoIcon{
			width:50px;
			height:58px;
			background:url("../../../../assets/images/index/rightYiBao1366.png") no-repeat;
			position: absolute;
			top: 67px;
			left: 221px;
		}
		.textStyle{
			width:117px;
			height:20px;
			color:#fff;
			position:absolute;
			top: 115px;
			left: 108px;
			line-height:20px;
			text-align:center;
			background:url("../../../../assets/images/index/textBg1366.png") no-repeat;
		}
	}
	@media only screen and (min-height: 768px) and (max-width: 1366px) {
		.yibiaodai img{
			width: 25.6%;
		    height: 12%;
		    position: absolute;
		    top: 18.5%;
		    left: 40%;
		}
	}
</style>
<style scoped>
	/*柱状图样式*/
	.histogram-container{position:relative;margin-left:60px;margin-top:15px;}
	.histogram-bg-line{border:#2594d4 solid;border-width:0 1px 1px 1px;border-right-color:transparent;overflow:hidden;width:90%;height:130px}
	.histogram-bg-line ul{overflow:hidden;border:transparent;border-width:0px 0 0 0;}
	.histogram-bg-line li{float:left;width:20%;/*根据.histogram-bg-line下的ul里面li标签的个数来控制比例*/overflow:hidden;}
	.histogram-bg-line li div{}
	.histogram-content{position:absolute;left:0px;top:0;width:99%;height:100%;}
	.histogram-content ul{height:100%;width:200%}
	.histogram-content li{float:left;height:100%;width:8.1%;/*根据直方图的个数来控制这个width比例*/text-align:center;position:relative;}
	.histogram-box{position:relative;display:inline-block;height:100%;width:26px;}
	.histogram-content li a{position:absolute;bottom:0;right:0;display:block;width:30px;}
	.histogram-content li .name{position:absolute;bottom:-37px;left:0px;white-space:nowrap;display:inline-block;width:100%;font-size:12px;}
	.histogram-y{position:absolute;left: -20px;top: 5px;font:12px/1.8 verdana,arial;}
	.histogram-y li{text-align:right;width:55px;padding-right:5px;color:#333;}
	.histogram-bg-line li div,.histogram-y li{height:20px;line-height: 20px;; /*控制单元格的高度及百分比的高度，使百分数与线条对齐*/}
	.histogram-box .aOne{background:#00ae49;}
	.histogram-box .aOneYellow{background:#ffc100;}
	.histogram-box .aOneRed{background:#ff1a0f;}
	.histogram-box .aOne1{FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#fea9a5,endColorStr=#d75d54); /*IE 6 7 8*/background: -ms-linear-gradient(top, #fea9a5,  #d75d54);        /* IE 10 */background:-moz-linear-gradient(top,#fea9a5,#d75d54);/*火狐*/ background:-webkit-gradient(linear, 0% 0%, 0% 100%,from(#fea9a5), to(#d75d54));/*谷歌*/ background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#fea9a5), to(#d75d54));      /* Safari 4-5, Chrome 1-9*/background: -webkit-linear-gradient(top, #fea9a5, #d75d54);   /*Safari5.1 Chrome 10+*/
		background: -o-linear-gradient(top, #fea9a5, #d75d54);  /*Opera 11.10+*/}
	.histogram-box .aOne2{FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#ddf8aa,endColorStr=#b0d067); /*IE 6 7 8*/background: -ms-linear-gradient(top, #ddf8aa,  #b0d067);        /* IE 10 */background:-moz-linear-gradient(top,#ddf8aa,#b0d067);/*火狐*/ background:-webkit-gradient(linear, 0% 0%, 0% 100%,from(#ddf8aa), to(#b0d067));/*谷歌*/ background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#ddf8aa), to(#b0d067));      /* Safari 4-5, Chrome 1-9*/background: -webkit-linear-gradient(top, #ddf8aa, #b0d067);   /*Safari5.1 Chrome 10+*/
		background: -o-linear-gradient(top, #ddf8aa, #b0d067);  /*Opera 11.10+*/}
	.histogram-bg-line div{ line-height:30px}
	.histogram-bg-line div img{ position:relative; top:3px; padding-left:10px}
	.histogram-content{ width:94%;overflow-x: auto;overflow-y: hidden;left:12px;

		top: 55px;
		height: 100%;
		padding-bottom: 51px;
	}

	.jiantou{
		width:9px;
		height:9px;
		background:url("../../../../assets/images/index/jian.png");
		position: absolute;
		top: -8px;
		left: -4px;
	}
	.aa {

	}
	.qu{
		width:16px;
		font-size: 16px;
		font-weight: bold;
	}
	.redqu{
		color:#ff1a0f;
		border-top:2px solid red;
	}
	.yellowqu{
		color:#ffc100;
		border-top:2px solid yellow;
	}
	.greenqu{
		color:#00ae49;
		border-top:2px solid green;
	}
	.border-box{
		overflow-x:auto;
	}
	.border-box::-webkit-scrollbar {/*滚动条整体样式*/
		width: 7px;     /*高宽分别对应横竖滚动条的尺寸*/
		height: 5px;
	}
	.border-box::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
		border-radius: 10px;
		-webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
		background: #09579e;
	}
	.border-box::-webkit-scrollbar-track {/*滚动条里面轨道*/
		-webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
		border-radius: 10px;
		background: #EDEDED;
	}

</style>
<template>
	<Row class="indexRow" style="height: 54.8%;">
		<Col span="24">
		<div class="lr-title">
			人员承载力
		</div>
		<div class="lr-box">
			<div class="yibiaodai">
				<div class="leftYiBaoIcon"></div>
				<img src="../../../../assets/images/index/yibiaodai.png" alt="" >
				<div class="rightYiBaoIcon"></div>
				<div class="textStyle">北京市电力公司</div>
			</div>
			<div class="rightYiBao"></div>
			<div id="container"></div>
			<!--<p style="border:1px solid blue;left: 201px; position: absolute;top: 186px;">北京电力公司</p>-->
			<div style="border-top: 1px solid #2babe6;transform: scaleY(0.5);width:100%;"></div>
			<div class="rightEchartsTop" ref="rightEchartsTop">


			</div>
		</div>
		</Col>
	</Row>
</template>

<script>
    export default{
        data(){
            return{
                optionRightEcharts:'',	// 柱状图
                data1: [70,50,50,50,50,50,50,50,50,50,50]
            }
        },
        methods: {
            rightEchartsTop(){
                var _this = this;
                this.optionRightEcharts = {
                	grid:{
                		left: (screen.width <=1366)?'35px':'45px',
	                	right: '20px',
	                	bottom: (screen.width <=1366)?'60px':'100px',
	                	top:(screen.width <=1366)?'10px':'20px',
                	},
                    backgroundColor: 'transparent',
                    // tooltip: {
                    //     trigger: 'axis',
                    //     axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    //         type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    //     }
                    // },
					dataZoom: [{
						show: true,
						realtime: true,
						y: (screen.width <=1366)?130:180,
						height: 5,
						start: 0,
						end: 50,
						textStyle:false,
						fillerColor:"rgba(27,80,182,.7)",
						borderColor:'rgba(0,0,0,0)'
					}],
                    xAxis: [
                        {
                            type: 'category',
                            // name: '日期',
                            data: ['检\n分','通\n州','昌\n平','门\n头\n沟','房\n山','大\n兴','平\n谷','怀\n柔','密\n云','顺\n义','延\n庆'],
                            axisPointer: {//自定义弹框
                                show:false, 
                                type: 'shadow'
                            },
							axisTick: {
								alignWithLabel: true
							},
                            splitLine: {show: false},
                            axisLine: {
                                lineStyle: {
                                    color: '#82caec'
                                },
                            },
                            axisLabel: {
                                formatter: '{value} ',
                                color: '#FFF',
                                show: true,
                                fontSize:(screen.width <=1366)?'12':'16',
                                interval: 'auto', 
                                inside: false,  
                                formatter: null, 
                                showMinLabel: null, 
                                showMaxLabel: null
                            },
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            min: 0,
                            max: 100,
                            interval:20,
                            // splitNumber:3,
                            x: 50,
            				y: 100,
                            axisLabel: {
                                formatter: function (value, index) {
								   	var texts = [];
									if(value >=40 && value <= 60){
										texts.push("绿色");
									}else if(value>60 && value <= 80){
										texts.push("黄色");
									}else if(value>80 && value <=100){
										texts.push("红色");
									}else{
										texts.push("");
									}
									return texts;
								},
								textStyle: {
									fontSize:(screen.width <=1366)?'12':'18',
									align:"right",
									verticalAlign:"center",
									color: function (value,index) {
										var texts = [];
										if(value>40 && value <= 60){
											return 'green';
										}else if(value>60 && value <= 80){
											return 'yellow';
										}else if(value>80 && value <=100){
											return 'red';
										}else{
											return '';
										}
									}
								},
                                show: true, 
                                inside: false,  
                                showMinLabel: null, 
                                showMaxLabel: null
                            },
                            splitLine: {show: false},
                            axisLine: {
                                lineStyle: {
                                    color: '#82caec'
                                }
                            }
                        }
                    ],
                    series: [
                        {
                            name:'人员承载力',
                            type:'bar',
                            barWidth:"60%",
							label: { //显示柱状图上数字
								normal: {
									show: true,
									position: 'top'
								}
							},
                            itemStyle:{
                                normal:{
                                    color:function(item){
                                        if(item.data>=80){
                                            return 'red';
                                        }else if(item.data>=60&&item.data<80){
                                            return 'yellow';
                                        }else{
                                            return 'green';
                                        }
                                    }
                                }
                            },
                            data:_this.data1
                        }
                    ]
                }
            },
            rightEchartsTopShow(){
                let _this = this;
                _this.rightEchartsTop();
                let rightEcharts = this.$echarts.init(_this.$refs['rightEchartsTop']);
                _this.rightEcharts = rightEcharts;
                rightEcharts.setOption(_this.optionRightEcharts);
            },
            getYBP(){
                var dom = document.getElementById("container");
                var myChart = this.$echarts.init(dom);
                var app = {};
                this.option = null;
                this.option = {
                    tooltip : {
						trigger: 'item',
                        formatter: "{a} <br/>{b} : {c}%"
                    },
                    toolbox: {
                        feature: {
                        }
                    },
                    axisLabel: {
                        show:false,// 坐标轴文本标签，详见axis.axisLabel
                        formatter: function(v){
                            switch (v+''){
                                case '10': return '低';
                                case '50': return '中';
                                case '90': return '高';
                                default: return '';
                            }
                        },
                        textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                            color: '#fff',
                            fontSize: 15,
                            fontWeight: 'bolder'
                        }
                    },
                    series: [
                        {
                            name: '',
                            type: 'gauge',
                            max: 100,
                            splitNumber:9,
                            startAngle:180,
                            endAngle:0,
                            radius: '100%',
                            axisLine: {            // 坐标轴线
                                lineStyle: {       // 属性lineStyle控制线条样式
                                    width: 8,
                                    color: [[0.6, '#00ae49'], [0.8, '#ffc100'], [1, '#f71c1c']]
                                }
                            },
                            axisTick: {            // 坐标轴小标记
                                length:0,        // 属性length控制线长
                                lineStyle: {       // 属性lineStyle控制线条样式
                                    color: 'auto'
                                }
                            },
                            splitLine: {           // 分隔线
                                length:0,         // 属性length控制线长
                                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                                    color: 'auto'
                                }
                            },
                            pointer: {
                                width:2,
                                length: '90%',
                                color: 'rgba(255, 255, 255, 0.8)'
                            },
                            title : {
                                show : false,
                                top:-10,
                                offsetCenter: [0, '60%'],       // x, y，单位px
                                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                    color: 'red',
                                    fontSize: 15
                                },
                                background:"red"
                            },
                            detail : {
                                show : false,
                                backgroundColor: 'rgba(0,0,0,0)',
                                borderWidth: 0,
                                borderColor: '#ccc',
                                width: 100,
                                height: 40,
                                offsetCenter: [0, -40],       // x, y，单位px
                                formatter:'{value}%',
                                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                    fontSize : 14
                                }
                            },
                            // data:[{value: 4}]
                            // detail: {formatter:'{value}%'},
                            data: [{
								value: 40,
							 	name: '北京电力公司',
							 	
							}]
                        }
                    ]
                };
                myChart.setOption(this.option, true);
            },
        },
        mounted(){
            this.rightEchartsTopShow()
            this.getYBP()
        }
    }
</script>
