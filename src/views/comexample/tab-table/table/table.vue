<style scoped>
	
</style>

<template>
	<!--表格盒子-->
	<Row class="comTableBox">
		<Col span="24">
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
		</Col>
	</Row>
</template>

<script>
	// 表格公用组件
	import comTable from '@/views/comtemplate/table/comTable.vue';
	import {COMMON} from '@/views/assets/js/com.common.js';
	export default {
		name: 'commonTable',
		data() {
			return {
				// 表格数据
				loading: true, 			// 表格加载数据时loading
				tableTitleArr: [],		// 表格表头的数据
				tableDataArr: [], 		// 表格加载过来的数据
				tableheight: 260,		// 表格的最大高度
				pagelistArr: [],		// 【必填】分页数字组[总条数,当前页【最小时1】,每页条数]
				pageSize: 0,			// 表格每页显示的条数
				current: 0,				// 当前是第几页
				showSidebar: false,		// 侧栏的滑出、滑入
				modalDel: false,		// 删除弹出框
				modal_loading: false,	// 删除弹出框点击删除时loading状态
				selectData: null, 		// 选中的数据
			}
		},
		components: { // 组件
			comTable
		},
		computed: {
			// 表格传参到comTable组件
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
			},
		},
		methods: {
			// 这里拿到缓存的数据，进行权限判断
			tabelParamShow() {
				var _this = this;
				COMMON.tablePara(264, 0, function(data) {
					_this.tableheight = data.height; // 计算拿到表格的高度
					_this.pageSize = data.size; // 拿到该表格默认请求的size(条数)
					console.log(data);
				})
			},
			// 表格的表头
			tableTitleShow(){
				this.tableTitleArr = [
					{
						type: 'selection',width: 60,align: 'center'
					},
					{
						title: '姓名',key: 'name'
					},
					{
						title: '年龄aaaa',key: 'age',sortable:true
					},
					{
						title: '公司',key: 'address',sorthis:true,
						router: 'mutative-router',routerKey: this.search,target:'_blank',hover:true
					},
					{
						title: '入职时间',key: 'date'
					}
				];
			},
			// 这里拿到表格的数据、分页信息等
			tableDatasShow() {
				var tableData = [
					{
						id: 12,name: '杨正炳',age: 18,address: '融智通1',date: '2016-10-03',kkk: "asdf"
					},
					{
						id: 13,name: '宁魏昃',age: 24,address: '融智通2',date: '2016-10-01',kkk: "asdf"
					},
					{
						id: 14,name: '石国栋',age: 30,address: '融智通4',date: '2016-10-02',kkk: "asdf"
					},
					{
						id: 15,name: '诗经三',age: 26,address: '融智通3',date: '2016-10-04',kkk: "asdf"
					}
				];
				this.pagelistArr = [100, 100, this.pageSize]; // 表格分页[总条数,当前页【最小是1】,每页条数]
				this.loading = false; 						// 获取数据后关闭loding
				this.tableDataArr = tableData; 				// 表格的数据
			},
			// 点击分页更新数据---表格返参
			updataTableData(e) { 
				console.log(e);
				this.current = e;
				this.tableDatasShow();
			},
			// 单选、多选时返回的值---表格返参
			selectTableData(e) {
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
			// 表格排序的规则---表格返参
			sortFunction(e){
				console.log("排序规则:",e);
			}
		},
		mounted() {
			// 表格默认调取的方法
			this.tableTitleShow();	// 表头的渲染
			this.tabelParamShow();	// 表格的高度
			this.tableDatasShow();	// 表格的数据
		},
		created() {

		}
	}
</script>