<style scoped>
	@import 'midCen.css';
</style>
<style>
	.ivu-modal-mask{
    	z-index: 999999999;
    }
	.my-modal.vertical-center-modal{
	    display: flex;
	    align-items: center;
	    justify-content: center;
	}
	.my-modal.vertical-center-modal .ivu-modal{
        top: 0;
    }
    .my-modal.vertical-center-modal.ivu-modal-wrap{
    	z-index: 999999999;
    }
    .my-modal.vertical-center-modal .ivu-modal-footer{
    	display: none;
    }
    .my-modal.vertical-center-modal .ivu-modal-content{
    	background-color: #01046B;
    	color: #fff;
    }
    .wtrBox{
    	width: 100%;
    	height: 40px;
    	color: #fff;
    	margin-left: 270px;
    	display: inline-block;
    	position:absolute;
    	top:5px;
    	left:10px;
    	font-size: 16px;
    	cursor: pointer;
    }
    
    .wtrBox-img{
    	vertical-align: middle;
    	width: 59px;
    	height: 59px;
    }
 
    @media only screen and (min-width: 100px) and (max-width: 1366px) {
    	.wtrBox{
	    	width: 100%;
	    	height: 40px;
	    	color: #fff;
	    	margin-left: 270px;
	    	display: inline-block;
	    	position:absolute;
	    	top:5px;
	    	left:10px;
	    	font-size: 12px;
	    	cursor: pointer;
	    }
	    .wtrBox-img{
	    	vertical-align: middle;
	    	width: 39px;
	    	height: 39px;
	    }
    }

	.black_overlay{
        position: absolute;
        width: 500px;
        height: 200px;
        top: 50px;
        left: 300px;
        z-index:1001;
        background: url('../../../../assets/img/wtrweek1.png') no-repeat;
        background-size: 100% 100%;
        box-shadow: 4px 4px 10px rgba(0,21,55,0.6);

    }
	.scale{
		width:38px;
		height:179px;
		background:url("../../../../assets/images/index/scale.png") no-repeat;
		position:absolute;
		right:0;
		bottom:18px;
		background-size: 100% 100%;
		background-position: center;
	}
	@media only screen and (min-width: 100px) and (max-width: 1366px) {
		.scale{
			width:28px;
			height:120px;
			background:url("../../../../assets/images/index/scale.png") no-repeat;
			position:absolute;
			right:0;
			bottom:18px;
			background-size: 100% 100%;
			background-position: center;
		}
	}
</style>
<template>
<Row class="indexRow" style="height: 100%;">
    <Col span="24">
    	<div class="lr-title middel_title"></div>
    	<div class="md-box" style="position:relative;">
			<div id="fourJiao" class="hoverhand" @click="playVoide" style="z-index:1000;">
				<span class="jiao jiao1"></span>
				<span class="jiao jiao2"></span>
				<template>
					<Carousel autoplay v-model="value2" loop>
						<CarouselItem>
							<div class="demo-carousel">
								<a href="./static/video.html?name=1.mov" target="_blank">
									<div class="demo-box">
										<img src="../../../../assets/images/index/photo1.png" alt="" class="imgPhoto">、
										<span class="imgUptext">
											2018-06-20 10:15:25 <br>
											朝阳 检修公司:带电加装断流器<br>
											尹青竹:1847981678
										</span>
									</div>
								</a>
							</div>
						</CarouselItem>
						<CarouselItem>
							<div class="demo-carousel">
								<a href="./static/video.html?name=2.mov" target="_blank">
									<div class="demo-box">
										<img src="../../../../assets/images/index/photo2.png" alt="" class="imgPhoto">
										<span class="imgUptext">
											2018-06-20 10:15:25 <br>
											丰台 检修公司:带电接引流线 <br>
											胡爱国:13562266678
										</span>
									</div>
								</a>
							</div>
						</CarouselItem>
						<CarouselItem>
							<div class="demo-carousel">
								<a href="./static/video.html?name=1.mov" target="_blank">
									<div  class="demo-box">
										<img src="../../../../assets/images/index/photo1.png" alt="" class="imgPhoto">
										<span class="imgUptext">
											2018-06-20 10:15:25 <br>
											昌平 检修公司:带电加装断流器<br>
											张晓辉:13562266678
										</span>
									</div>
								</a>
							</div>
						</CarouselItem>
						<CarouselItem>
							<div class="demo-carousel">
								<a href="./static/video.html?name=2.mov" target="_blank">
									<div  class="demo-box">
										<img src="../../../../assets/images/index/photo2.png" alt="" class="imgPhoto">
										<span class="imgUptext">
											2018-06-20 10:15:25 <br>
											海淀 检修公司:带点接引流线 <br>
											李欣:13562266678
										</span>
									</div>
								</a>
							</div>
						</CarouselItem>
					</Carousel>
				</template>
				<div class="clear"></div>
				<span class="jiao jiao3"></span>
				<span class="jiao jiao4"></span>
			</div>
			<div class="wtrBox" >
				<img src="../../../../assets/img/wtr.png" alt="" class="wtrBox-img">
				<span @click="wtrClick">晴   温度16.6℃   温度50%   风速<3级   (适宜带电作业)</span>&nbsp;&nbsp;
				<img id="wtrBoxDetailed" width="14" height="14" src="../../../../assets/img/right.png" alt="" style="vertical-align: middle" v-if="wtrShow" @click="wtrClickDetailed">
			</div>
			<midCenMap v-if="!wtrShow"></midCenMap>
    		<midCenWtr v-if="wtrShow"></midCenWtr>
    		<div class="black_overlay" v-if="detailed"></div>
			<div class="scale"></div>
    	</div>
   </Col>
</Row>
</template>

<script>
import midCenMap from './midCenMap';
import midCenWtr from './midCenWtr';
export default{
	data(){
		return{
			value2: 0,
			wtrShow: false,
			detailed:false,
			show:true,
		}
	},
	components: {
		midCenMap,
		midCenWtr
	},
    methods: {
    	playVoide(){
    	},
    	wtrClick(){
    		if(this.wtrShow){
    			this.wtrShow = false;
    		}else{
    			this.wtrShow = true;
    		}
    	},
    	wtrClickDetailed(){
    		this.detailed = !this.detailed;
    		if(this.show){
    			document.getElementById("wtrBoxDetailed").src = "../../../../assets/img/down.png";
    			this.show = false;
    		}else{
    			document.getElementById("wtrBoxDetailed").src = "../../../../assets/img/right.png";
    			this.show = true;
    		}
    	}
    },
	mounted(){
	}
}
</script>
