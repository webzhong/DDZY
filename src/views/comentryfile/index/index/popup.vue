<style>
	.popup-tag{ 
    	width:500px; 
    	border:1px solid #4B83B2; 
    	border-radius: 10px;
    	position:absolute; 
    	background-color:#4B83B2;
    	z-index: 20000;
    	transition: 0.3s;
    	box-shadow: 0px 0px 10px 8px rgba(6,0,50,0.5);
    }
	.popup-tag em{
		display:block; 
		border-width:20px; 
		position:absolute; 
		bottom:-40px; 
		left:100px;
		border-style:solid dashed dashed; 
		border-color:#4B83B2 transparent transparent;
		font-size:0; 
		line-height:0;
	}
	.popup-tag .popup-content{
		width: 100%;
		height: 100%;
	}
	.content-title{
		width: 100%;
		margin-top: 20px;
	}
	.content-title-img{
		display: inline-block;
		width: 190px;
		height: 32px;
		color: #fff;
		font-size: 16px;
		line-height: 32px;
		text-align: center;
	}
	.img-left{
		background: url("../../../assets/images/index/group-title-left.png") no-repeat;
		background-size: 100% 100%;
		background-position: center;
	}
	.img-right{
		background: url("../../../assets/images/index/group-title-right.png") no-repeat;
		background-size: 100% 100%;
		background-position: center;
	}
	.popup-tag .popup-content table{
		margin: 10px 0px;
		width: 100%;
	}
	.popup-tag .popup-content table thead tr{
		width: 100%;
		font-size: 14px;
		height: 32px;
		line-height: 32px;
	}
	.popup-tag .popup-content table thead tr td{
		font-size: 14px;
		height: 32px;
		line-height: 32px;
		overflow: hidden;
	}
	.popup-tag .popup-content table tbody{
		max-height: 60px;
		max-height: 426px;
		overflow: scroll;
	}
	.popup-tag .popup-content table tbody tr{
		width: 100%;
		font-size: 12px;
		height: 32px;
		line-height: 32px;
	}
	.popup-tag .popup-content table tbody tr td{
		font-size: 12px;
		height: 32px;
		line-height: 32px;
	}
	
	@media only screen and (min-width: 100px) and (max-width: 1366px) {
    	.popup-tag{ 
	    	width:426px; 
	    	border:1px solid #4B83B2; 
	    	border-radius: 10px;
	    	position:absolute; 
	    	background-color:#4B83B2;
	    	z-index: 20000;
	    	transition: 0.3s;
	    	box-shadow: 0px 0px 10px 8px rgba(6,0,50,0.5);
	    }
	    
	    .popup-tag em{
			display:block; 
			border-width:20px; 
			position:absolute; 
			bottom:-100; 
			left:100px;
			border-style:solid dashed dashed; 
			border-color:#4B83B2 transparent transparent;
			font-size:0; 
			line-height:0;
		}
		
		.content-title{
			width: 100%;
			margin-top: 10px;
		}
		
		.content-title-img{
			display: inline-block;
			width: 150px;
			height: 28px;
			color: #fff;
			font-size: 14px;
			line-height: 28px;
			text-align: center;
		}
		
		.popup-tag .popup-content table{
			margin: 8px 0px;
			width: 100%;
		}
		
		.popup-tag .popup-content table thead tr{
			width: 100%;
			font-size: 12px;
			height: 28px;
			line-height: 28px;
		}
		
		.popup-tag .popup-content table thead tr td{
			font-size: 12px;
			height: 28px;
			line-height: 28px;
			overflow: hidden;
		}
		
		.popup-tag .popup-content table tbody tr{
			width: 100%;
			font-size: 10px;
			height: 28px;
			line-height: 28px;
		}
		.popup-tag .popup-content table tbody tr td{
			font-size: 10px;
			height: 28px;
			line-height: 28px;
		}
    }
    
    .class-a{
		background-color: #235FB1;
		border-bottom: 1px;
		border-bottom-style: solid;
		border-bottom-color: #5998CA;
	}
	.class-b{
		background-color: #5998CA;
		border-bottom: 1px;
		border-bottom-style: solid;
		border-bottom-color: #235FB1;
	}
	
</style>
<template>
	<div class="popup-tag" v-if="options.popup" :style="{'margin-top': top + 'px','margin-left' : left + 'px'}">
      	<em></em>
      	<div class="popup-content">
      		<div class="content-title">
      			<div class="content-title-img img-left">已完成（{{options.ywc}}）</div>
      			<div class="content-title-img img-right">已取消（{{options.yqx}}）</div>
      		</div>
      		<table cellpadding="0" cellspacing="0" border="0">
      			<thead>
      				<tr>
      					<td>序号</td>
	  					<td>站名</td>
	  					<td>开关号</td>
		  				<td>路名</td>
		  				<td>工作地点、范围<td>
		  				<td>作业内容</td>
		  				<td>取消原因</td>
      				</tr>
      			</thead>
      			<tbody>
      				<tr v-for="(item,index) in options.data">
      					<td :class="{'class-a':(item.type == 1),'class-b':(item.type == 2)}">{{index+1}}</td>
	  					<td :class="{'class-a':(item.type == 1),'class-b':(item.type == 2)}">{{item.stationname}}</td>
	  					<td :class="{'class-a':(item.type == 1),'class-b':(item.type == 2)}">{{item.onOff}}</td>
		  				<td :class="{'class-a':(item.type == 1),'class-b':(item.type == 2)}">{{item.road}}</td>
		  				<td :class="{'class-a':(item.type == 1),'class-b':(item.type == 2)}">{{item.address}}<td>
		  				<td :class="{'class-a':(item.type == 1),'class-b':(item.type == 2)}">{{item.work.substr(0,5)}}</td>
		  				<td :class="{'class-a':(item.type == 1),'class-b':(item.type == 2)}">{{item.reason}}</td>
      				</tr>
      			</tbody>
      		</table>
      	</div>
	</div>
</template>

<script>
	export default {
		name : "poPup",
		props :{
			options :{
				type:Object
			} 
		},
		data(){
			return{
				top:(screen.width <=1366)?-130:-160,
				left:-100
			}
		},
		watch:{
           	options:{
      			immediate:true,
     			handler:function(){
     				var step =  (screen.width <=1366)?-28:-32;
                	this.top = this.top + (this.options.data.length-1) * step;
     			}
    		}
        }
	}
</script>

