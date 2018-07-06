<template>
<Row class="indexRow" style="height: 23.5%;">
    <Col span="24">
    	<div class="lr-title">
    		停电作业计划
    	</div>
	    <div class="powerBg1" ></div>
	    <div class="powerBg2" ></div>
    	<Tabs class="lr-box" value="name1">
	        <TabPane class="border-box" label="日" name="name1">
					<div class="border-box-bgday">
						<p>
							<em>5</em>
							<span>发电车</span>
						</p>
						<p>
							<em>100</em>
							<span>停电任务</span>
						</p>
						<p>
							<em>95</em>
							<span>其他任务</span>
						</p>
					</div>
	        </TabPane>
	        <TabPane class="border-box" label="周" name="name2">
	        	<div class="border-box-bgday">
						<p>
							<em>25</em>
							<span>发电车</span>
						</p>
						<p>
							<em>500</em>
							<span>停电任务</span>
						</p>
						<p>
							<em>475</em>
							<span>其他任务</span>
						</p>
				</div>
	        </TabPane>
	        <TabPane class="border-box" label="月" name="name3">
	        	<div class="border-box-bgday">
						<p>
							<em>100</em>
							<span>发电车</span>
						</p>
						<p>
							<em>2000</em>
							<span>停电任务</span>
						</p>
						<p>
							<em>1900</em>
							<span>其他任务</span>
						</p>
				</div>
	       </TabPane>
	    </Tabs>
    </Col>
</Row>
</template>

<script>
export default{
	data(){
		return{

		}
	},
    methods: {

    }
}
</script>

<style scoped>
	.powerBg1{
		width:360px;
		height:127px;
		position:absolute;
		top: 25%;
		left: 10%;
	}
	.powerBg2{
		width:205px;
		height:71px;
		position:absolute;
		top: 63px;
		left: 130px;
	}
	.border-all{
		width:90px;
		height:90px;
		line-height:70px;
		position:absolute;
		top: -45px;
		left:40%;
	}
	@media only screen and (min-width: 100px) and (max-width: 1366px) {
		.border-all{
			width:80px;
			height:80px;
			line-height:70px;
			position:absolute;
			top: -30px;
			left:38%;
		}
	}
	.border-li .border-all b{
		color:#c64d39
	}
</style>
