<template>
	<!--tab盒子-->
	<Row class="comTabBox">
        <Col>
            <comTab
				:tab-data="tabData"
				@tableShow="tableShow($event)"
			></comTab>
        </Col>
	</Row>
</template>

<script>
	import comTab from '@/views/comtemplate/comTab/comTab.vue';
	export default {
        data () {
            return {
            	// tab数据
				tabDataArr: [],		// tab的json数据
				currentTab: null,	// 一、二级tab默认跳转的组件【没有二级tab的时候】
			}
        },
        components:{
        	comTab
        },
		computed: {
			// tab的数据
        	tabData(){
        		return this.tabDataArr;
        	},
		},
        methods: {
        	// 这里拿到缓存的数据，进行权限判断
            MenuItemShow(){
            	// tab的json数据，可在此进行权限判断
            	var tabArr = [
            		{'id':1,'name':'tab1','title':'Tab切换1'},
            		{'id':2,'name':'tab2','title':'Tab切换2',
	            		'children': [
	            			{'id':21,'name':'tab21','title':'Tab切换21'},
							{'id':22,'name':'tab22','title':'Tab切换22'}
	            		]
            		},
            		{'id':3,'name':'tab2Table','title':'Tab切换3',
	            		'children': [
	            			{'id':31,'name':'tab31','title':'Tab切换31'},
							{'id':32,'name':'tab32','title':'Tab切换32'},
							{'id':33,'name':'tab33','title':'Tab切换33'}
	            		]
	            	},
            		{'id':4,'name':'tab3Table','title':'Tab切换4',
	            		'children': [
	            			{'id':41,'name':'tab41','title':'Tab切换41'},
	            			{'id':42,'name':'tab42','title':'Tab切换42'},
	            			{'id':43,'name':'tab43','title':'Tab切换43'},
	            			{'id':44,'name':'tab44','title':'Tab切换44'}
						]
	            	},
            		{'id':5,'name':'tab4Table','title':'Tab切换5',
	            		'children': [
	            			{'id':51,'name':'tab51','title':'Tab切换41'},
	            			{'id':52,'name':'tab52','title':'Tab切换42'},
	            			{'id':53,'name':'tab53','title':'Tab切换43'},
	            			{'id':54,'name':'tab54','title':'Tab切换44'},
	            			{'id':55,'name':'tab55','title':'Tab切换45'}
	            		]
	            	},
	            	{'id':6,'name':'tab6','title':'Tab切换6'}
            	];
            	localStorage.MenuItemArr = JSON.stringify(tabArr);
				var MenuItemArr = JSON.parse(localStorage.MenuItemArr);
            	this.tabDataArr = MenuItemArr;
			},
			// 点击返回name,选择要显示的组件
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