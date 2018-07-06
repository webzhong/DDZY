<style scoped>
    
</style>

<template>
    <Row>
    	<Col span="24" style="height: 120px;color: red;font-size: 24px;">
    		<Row>
	        	<Col span="5" push="19">搜索按钮     搜索按钮</Col>
	        	<Col span="19" pull="5">搜索框</Col>
	        </Row>
		</Col>
		<Col span="24">
        	<com-table
        		:loadend="loadend"
        		:table-title="tableTitle"
        		:table-data="tableData"
        		:table-height="tableHeight"
        		:page-arr="pageArr"
        		@updataTable="updataTableData($event)"
        	></com-table>
		</Col>
	</Row>
</template>

<script>
	// 表格公用组件
	import comTable from '@/views/comtemplate/table/comTable.vue';
	import { AXIOS } from '@/views/assets/js/axios.common.js';
	export default {
		name: 'commonTable',
        data () {
            return{
           		loading: true,
           		tableDataArr: [],
           		tableheight: 260,
           		pagelistArr: [],
           		current: 0
			}
        },
        components:{
            comTable
        },
        computed:{
        	loadend(){ // loading加载中
        		return this.loading;
        	},
        	tableTitle(){ // 表头
        		var columnsArr = [
        			{type: 'selection',width: 60,align: 'center'},
        			{title: '姓名', key: 'name'},
        			{title: '年龄',key: 'age'},
        			{title: '公司',key: 'address'},
        			{title: '入职时间',key: 'date'}
        		];
        		return columnsArr;
        	},
        	tableData(){ // 表格数据
        		return this.tableDataArr;
        	},
        	tableHeight(){// 表格的高度，溢出滚动
        		return this.tableheight;
        	},
        	pageArr(){ // 分页
        		return this.pagelistArr;
        	}
        },
        methods: {
            MenuItemShow(){// 这里拿到缓存的数据，进行权限判断
            	console.log("表格111");
            },
            tableDataArrShow(){// 这里拿到表格的数据
            	var tableData = [
                    {id:12,name: '杨正炳',age: 18,address: '融智通',date: '2016-10-03',kkk:"asdf"},
                    {id:13,name: '宁魏昃',age: 24,address: '融智通',date: '2016-10-01',kkk:"asdf"},
                    {id:14,name: '石国栋',age: 30,address: '融智通',date: '2016-10-02',kkk:"asdf"},
                    {id:15,name: '诗经三',age: 26,address: '融智通',date: '2016-10-04',kkk:"asdf"}
                ];
                this.pagelistArr = [200,2,20]; // 表格分页[总条数,当前页,每页条数]
                this.tableheight = 400; // 表格高度
                this.loading = false; // 获取数据后关闭loding
                this.tableDataArr = tableData; // 表格的数据
            },
            updataTableData(e){ // 点击分页更新数据
            	this.current = e;
            	this.tableDataArrShow();
            }
		},
		mounted(){
			this.MenuItemShow();
			this.tableDataArrShow();
		},
		created(){
			
		}
	}
</script>