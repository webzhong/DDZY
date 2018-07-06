<template>
	<Row>
		<!--一级tab-->
        <Col>
            <comTab
				:tab-data="tabData"
				@tableShow="tableShow($event)"
			></comTab>
        </Col>
        <Col span="24" class="tableBox">
			<tab11Table :is="currentTab"></tab11Table>
        </Col>
	</Row>
</template>

<script>
	import comTab from '@/views/comtemplate/comTab/comTab.vue';
	// 一级tab组件【用第一个假数据】
	import tab1Table from './tabTable/tab1-table.vue';
	import tab2Table from './tabTable/tab2-table.vue';
	import tab3Table from './tabTable/tab3-table.vue';
	import tab4Table from './tabTable/tab4-table.vue';
	
	// 二级tab组件【用第二个假数据】
	// tab2-1
	import tab11Table from './tab1Table/tab11-table.vue';
	import tab12Table from './tab1Table/tab12-table.vue';
	import tab13Table from './tab1Table/tab13-table.vue';
	import tab14Table from './tab1Table/tab14-table.vue';
	
	// tab2-2
	import tab21Table from './tab2Table/tab21-table.vue';
	import tab22Table from './tab2Table/tab22-table.vue';
	import tab23Table from './tab2Table/tab23-table.vue';
	import tab24Table from './tab2Table/tab24-table.vue';
	
	// tab2-3
	import tab31Table from './tab3Table/tab31-table.vue';
	import tab32Table from './tab3Table/tab32-table.vue';
	import tab33Table from './tab3Table/tab33-table.vue';
	import tab34Table from './tab3Table/tab34-table.vue';
	
	// tab2-4
	import tab41Table from './tab4Table/tab41-table.vue';
	import tab42Table from './tab4Table/tab42-table.vue';
	import tab43Table from './tab4Table/tab43-table.vue';
	import tab44Table from './tab4Table/tab44-table.vue';
	
	export default {
        data () {
            return {
				tabDataArr: [],	// tab的json数据
				currentTab: null, // 一、二级tab默认跳转的组件【没有二级tab的时候】
			}
        },
        components:{
        	comTab,
        	// 一级tab组件【用第一个假数据】
            tab1Table,
            tab2Table,
            tab3Table,
            tab4Table,
            // 二级tab组件【用第二个假数据】
            tab11Table,
            tab12Table,
            tab13Table,
            tab14Table,
            
            tab21Table,
            tab22Table,
            tab23Table,
            tab24Table,
            
            tab31Table,
            tab32Table,
            tab33Table,
            tab34Table,
            
            tab41Table,
            tab42Table,
            tab43Table,
            tab44Table
        },
		computed: {
			// tab的数据
        	tabData(){
        		return this.tabDataArr;
        	},
		},
        methods: {
            MenuItemShow(){// 这里拿到缓存的数据，进行权限判断【一级】
            	// 第一个假数据
            	/*var tabArr = [
            		{'id':1,'name':'tab1Table','title':'表格1'},
            		{'id':2,'name':'tab2Table','title':'表格2'},
            		{'id':3,'name':'tab3Table','title':'表格3'},
            		{'id':4,'name':'tab4Table','title':'表格4'}
            	];*/
            	
            	// 第二个假数据
            	var tabArr = [
            		{'id':1,'name':'tab1Table','title':'表格1',
	            		'children': [
	            			{'id':11,'name':'tab11Table','title':'表格11'},
							{'id':12,'name':'tab12Table','title':'表格12'},
							{'id':13,'name':'tab13Table','title':'表格13'},
							{'id':14,'name':'tab14Table','title':'表格14'}
	            		]
            		},
            		{'id':2,'name':'tab2Table','title':'表格2',
	            		'children': [
	            			{'id':21,'name':'tab21Table','title':'表格21'},
							{'id':22,'name':'tab22Table','title':'表格22'},
							{'id':23,'name':'tab23Table','title':'表格23'}
	            		]
	            	},
            		{'id':3,'name':'tab3Table','title':'表格3',
	            		'children': [
	            			{'id':31,'name':'tab31Table','title':'表格31'},
							{'id':32,'name':'tab32Table','title':'表格32'}
						]
	            	},
            		{'id':4,'name':'tab4Table','title':'表格4',
	            		'children': [
	            			{'id':41,'name':'tab41Table','title':'表格41'},
	            			{'id':42,'name':'tab42Table','title':'表格42'}
	            		]
	            	}
            	];
            	localStorage.MenuItemArr = JSON.stringify(tabArr);
				var MenuItemArr = JSON.parse(localStorage.MenuItemArr);
            	this.tabDataArr = MenuItemArr;
			},
            tableShow(e){
                this.currentTab = e;
			}
		},
		mounted(){
			this.MenuItemShow();
		},
		created(){
			
		}
	}
</script>