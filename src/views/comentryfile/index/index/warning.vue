<template>
	<Row>
		<div class="warning">
			<Col span="24" class="model-bot">
				<Form :label-width="90" class='formStyle'>
					<template v-if="warnType">
						<FormItem label="所属单位:" style="display: inline-block;font-size:16px;">
							<Select placeholder="全部" class="selectStyle">
								<Option v-for="u in unit" :value="u.value" :key="u.value">{{u.name}}</Option>
							</Select>
						</FormItem>
						<FormItem label="库房类型:" style="display: inline-block;font-size:16px;">
							<Select placeholder="全部" class="selectStyle">
								<Option v-for="store in storeRoom" :value="store.value" :key="store.value">{{store.name}}</Option>
							</Select>
						</FormItem>
					</template>
					<template v-if="!warnType">
						<FormItem label="车辆所有人:" style="display: inline-block;font-size:16px;">
							<Input class="inputStyle" placeholder="请输入车辆所有人"></Input>
						</FormItem>
						<FormItem label="车辆号牌:" style="display: inline-block;font-size:16px;">
							<Input class="inputStyle"  placeholder="请输入车辆号牌"></Input>
						</FormItem>
						<FormItem label="告警类型:" style="display: inline-block;font-size:16px;">
							<Select placeholder="全部" class="selectStyle">
								<Option v-for="w in warn" :value="w.value" :key="w.value">{{w.name}}</Option>
							</Select>
						</FormItem>
					</template>
					<div class="btnDiv">
						<template>
							<Button type="primary" class="queryBtn">查询</Button>
							<Button type="primary" class="resetBtn">重置</Button>
						</template>
						<template v-if="!warnType">
							<Button type="primary" class="cancelBtn">取消告警</Button>
						</template>
					</div>
				</Form>
				<div class="table-title">
					<span class="blueLine"></span>
					<span>库房温湿度告警信息</span>
				</div>
				<div class="tableStyle" style="color:#000;margin-left: 18px;">
					<com-table 
						:loadend="loadend" 
						:table-title="tableTitle" 
						:table-data="tableData" 
						:table-height="tableHeight" 
						:page-arr="pageArr" 
						@updataTable="updataTableData($event)" 
						@selectTable="selectTableData($event)"
						@sortFunction="sortFunction($event)">
					</com-table>
				</div>
			</Col>
		</div>
	</Row>
</template>

<script>
import axios from 'axios';
import comTable from '@/views/comtemplate/table/comTable.vue';
import {COMMON} from '@/views/assets/js/com.common.js';
import { mapGetters } from 'vuex'
export default{
	name:'warning',
	data(){
		return{
			loading: true, 			// 表格加载数据时loading
			tableTitleArr: [],		// 表格表头的数据
			tableDataArr: [], 		// 表格加载过来的数据
			tableheight: 260,		// 表格的最大高度
			pagelistArr: [],		// 【必填】分页数字组[总条数,当前页【最小时1】,每页条数]
			pageSize: 10,			// 表格每页显示的条数
			current: 1,				// 当前是第几页
			showSidebar: false,		// 侧栏的滑出、滑入
			modalDel: false,		// 删除弹出框
			modal_loading: false,	// 删除弹出框点击删除时loading状态
			selectData: null, 		// 选中的数据
			warnType:true,			//库房温湿度、车辆入库告警[库房温湿度:true,车辆入库告警:false]
			unit:[],				//所属单位下拉列表
			storeRoom:[],			//库房类型下拉列表
			warn:[]					//告警类型下拉列表
		}
	},
	//组件注册
	components:{
		comTable
	},
	computed: {
		...mapGetters([
	      'getView',
	    ]),
        // loading加载中
		loadend() {
			return this.loading;
		},
		// 表头
		tableTitle() {
			return this.tableTitleArr;
		},
		// 表格数据
		tableData() {
			return this.tableDataArr;
		},
		// 表格的高度，溢出滚动
		tableHeight() {
			return this.tableheight;
		},
		// 分页
		pageArr() {
			return this.pagelistArr;
		}
   },
    methods: {
    	// 这里拿到缓存的数据，进行权限判断
		tabelParamShow() {
			var _this = this;
			COMMON.tablePara(220, 250, function(data) {
				_this.tableheight = data.height; // 计算拿到表格的高度
				_this.pageSize = data.size; // 拿到该表格默认请求的size(条数)
			})
		},
    	// 表格的表头
		tableTitleShow(){
    		this.warnType = (this.getView.obj == null || this.getView.obj)?true:false;
			if(this.warnType){
				this.tableTitleArr = [
					{title: '序号',  type:'index'},
	                {title: '所属单位',key: 'unit'},
	                {title: '库房编号',key: 'num'},
	                {title: '库房名称',key: 'name'},
	                {title: '库房类型',key: 'type'},
	                {title: '库房温度(℃)',key: 'temperature'},
	                {title: '库房温度(%)',key: 'humidity'}
				];
			}else{
				this.tableTitleArr = [
					{title: '序号', type:'index'},
	                {title: '车号',key: 'num'},
	                {title: '班组',key: 'teams'},
	                {title: '车辆所有人',key: 'group'},
	                {title: '车辆识别代码',key: 'idcode'},
	                {title: '车辆实验日期',key: 'time'},
	                {title: '车辆状态',key: 'status'},
	                {title: '出库时间',key: 'outtime'},
	                {title: '入库时间',key: 'jointime'}
				];
			}
		},
		tableDatasShow() {
			axios.get('./jsonServer/warning.json').then((response) =>{
				this.unit = response.data.unit;
				this.storeRoom = response.data.storeRoom;
				this.warn = response.data.warn;
				if(this.warnType){
					this.pagelistArr = [response.data.warnInfo.length, this.current, this.pageSize]; // 表格分页[总条数,当前页【最小是1】,每页条数]
					this.tableDataArr = response.data.warnInfo; // 表格的数据
				}else{
					this.pagelistArr = [response.data.carWarnInfo.length, this.current, this.pageSize]; // 表格分页[总条数,当前页【最小是1】,每页条数]
					this.tableDataArr = response.data.carWarnInfo; // 表格的数据
				}
				this.loading = false; 	
            });
			
		},
		updataTableData(e) { // 点击分页更新数据---表格返参
			this.current = e;
			this.tableDatasShow();
		},
		selectTableData(e) { // 单选、多选时返回的值---表格返参
			var eArr = [];
			e.forEach(item => {
				eArr.push(item.id);
			})
			this.selectData = eArr;
			if(this.selectData.length > 1) {
				this.$Message.success('此时不能进行修改操作！');
			}
			console.log(this.selectData)
		},
		sortFunction(e){ // 表格排序的规则---表格返参
			console.log("排序规则:",e);
		}
	},
	mounted(){
		this.tableTitleShow();	// 表头的渲染
		this.tabelParamShow();
		this.tableDatasShow();	// 表格的数据this.initTableData();
	}
}
</script>

<style scoped>
	.warning{
		margin:0;
		padding: 0;
		width: 100%;
		height: 100%;
	}
	.model-bot{
		height: calc(100% - 5px);
		background: url("../../../assets/images/index/erbg.png") no-repeat;
		position:relative;
		background-size: 100% 100%;
	}
	.formStyle{
		margin: 18px 18px;
	    font-size:16px;
	    color:#5ecde4;
	}
	.selectStyle{
		width: 120px;
	}
	.inputStyle{
		width: 120px;
	}
	.btnDiv{
		float: right;
	}
	.queryBtn{
	    border:0;
	    width:100px;
	    height:35px;
	    border-radius: 13px;
	    font-size:16px;
	    vertical-algin:middle;
	    background-color:rgb(26,124,109);
	}
	.resetBtn{
	    border:0;
	    margin-right: 5px;
	    width:100px;
	    height:35px;
	    font-size:16px;
	    border-radius: 13px;
	    background-color:rgb(33,80,150);
	}
	.cancelBtn{
	    border:0;
	    margin-right: 5px;
	    width:100px;
	    height:35px;
	    font-size:16px;
	    border-radius: 13px;
	    background-color:rgb(164,204,255);
	}
</style>
