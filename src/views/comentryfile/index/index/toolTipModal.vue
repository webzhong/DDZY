<style>
	.modalOverlay{
	    position: fixed;
	    top: 0%;
	    left: 0%;
	    width: 100%;
	    height: 100%;
	    z-index:2000;
	    background-color: rgba(0,0,0,0.6);
	}
	.modalOverlay .modalContent{
        position: fixed;
        top: 50%;
        left: 50%;
        width: 826px;
        margin-left:-413px;
        height: 402px;
        margin-top:-201px;
        padding: 0;
        background:url("../../../assets/images/modal/background.png") no-repeat;
        background-size: 100% 100%;
		background-position: center;
        z-index:1011;
        overflow: hidden;
	}
	
	@media only screen and (min-width: 100px) and (max-width: 1366px) {
		.modalOverlay .modalContent{
	        position: fixed;
	        top: 50%;
	        left: 50%;
	        width: 590px;
	        margin-left:-295px;
	        height: 288px;
	        margin-top:-144px;
	        padding: 0;
	        background:url("../../../assets/images/modal/background.png") no-repeat;
	        background-size: 100% 100%;
			background-position: center;
	        z-index:1011;
	        overflow: hidden;
		}
	}
	
	.modalOverlay .rwxq .title{
		width: 384px;
		height: 52px;
		color: #DEA239;
		text-align: center;
		font-size: 20px;
		line-height: 52px;
		margin-left: 221px;
		margin-top: 40px;
		background:url("../../../assets/images/modal/title.png") no-repeat;
        background-size: 100% 100%;
		background-position: center;
	}
	
	@media only screen and (min-width: 100px) and (max-width: 1366px) {
		.modalOverlay .rwxq .title{
			width: 274px;
			height: 38px;
			color: #DEA239;
			text-align: center;
			font-size: 18px;
			line-height: 38px;
			margin-left: 158px;
			margin-top: 30px;
			background:url("../../../assets/images/modal/title.png") no-repeat;
	        background-size: 100% 100%;
			background-position: center;
		}
	}
	
	.modalOverlay .line{
		width: 724px;
		margin-left: 51px;
		margin-top: 38px;
		border-bottom: 1px;
		border-bottom-color: #5474CB;
		border-bottom-style: dashed;
	}
	
	@media only screen and (min-width: 100px) and (max-width: 1366px) {
		.modalOverlay .line{
			width: 500px;
			margin-left: 48px;
			margin-top: 26px;
			border-bottom: 1px;
			border-bottom-color: #5474CB;
			border-bottom-style: dashed;
		}
	}
	
	.modalOverlay .mocontent{
		width: 724px;
		margin-left: 51px;
		margin-top: 38px;
		font-size: 20px;
		overflow: auto;
	}
	
	@media only screen and (min-width: 100px) and (max-width: 1366px) {
		.modalOverlay .mocontent{
			width: 500px;
			margin-left: 48px;
			margin-top: 24px;
			font-size: 16px;
			overflow: auto;
		}
	}
	
	.modalOverlay .divlist{
		width: 100%;
		margin-top: 20px;
	}
	
	@media only screen and (min-width: 100px) and (max-width: 1366px) {
		.modalOverlay .divlist{
			width: 100%;
			margin-top: 20px;
		}
	}
	
	.modalOverlay .mocontent span{
		display: inline-block;
		width: 23%;
		height: 30px;
		line-height: 30px;
	}
	
	@media only screen and (min-width: 100px) and (max-width: 1366px) {
		.modalOverlay .mocontent span{
			display: inline-block;
			width: 23%;
			height: 25px;
			line-height: 25px;
		}
	}
	
	.modalOverlay .spanbgColor{
		text-align: center;
		background-color: #3E62C6;
	}
	
	.modalOverlay .spanMargin{
		margin-left:34px ;
	}
	
	@media only screen and (min-width: 100px) and (max-width: 1366px) {
		.modalOverlay .spanMargin{
			margin-left:10px ;
		}
	}
</style>

<template>
	<div v-if="modal" class="modalOverlay" @click="modalclose">
		<div class="modalContent">
			<div class="rwxq">
				<div class="title">
					任务详情
				</div>
				<div class="line"></div>
				<div class="mocontent">
					<div>
						<span>站名</span>
						<span class="spanbgColor">{{rwxqObj.stationname}}</span>
						<span class="spanMargin">开关号</span>
						<span class="spanbgColor">{{rwxqObj.onOff}}</span>
					</div>
					<div class="divlist">
						<span>路名</span>
						<span class="spanbgColor">{{rwxqObj.road}}</span>
						<span class="spanMargin">工作地点、范围</span>
						<span class="spanbgColor">{{rwxqObj.address}}</span>
					</div>
					<div class="divlist">
						<span>作业内容</span>
						<span class="spanbgColor">{{rwxqObj.work.substr(0,5)}}</span>
					</div>	
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		props : {
			modal : {
				type : Boolean
			},
			rwxqObj : {
				type : Object
			}
		},
		methods : {
			modalclose:function(){
				this.$emit("modalclose",!this.modal);
			}
		}
	}
</script>
