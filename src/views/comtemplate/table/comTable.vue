<style scoped>
.ivu-select-selection{
	float: left;
}
</style>
<template>
    <Row>
    	<Col span="24" class="comTableBox">
	    	<!--loding-->
	    	<Spin v-if="loadend" fix>
	            <Icon type="load-c" size=24 class="demo-spin-icon-load"></Icon>
	            <div>表格数据加载中,请稍等...</div>
	        </Spin>
	    	<!--表格-->
	        <Table
	        	ref="selection"
	        	size="small"
	        	highlight-row
	        	:columns="tableTitle"
	        	:stripe="showStripe"
	        	:data="tableData"
	        	:height="tableHeight"
	        ></Table>
        	<!--分页-->
	       <div class="comTable" v-if="nopage">
		        <div style="width: 800px; margin: 0 auto;">
		            <Page
		            	show-total
		            	:total='pageArr[0]'
		            	:current="pageArr[1]"
		            	:page-size='this.pageSize'
		            	:page-size-opts="pageArr[3]"
		            	show-sizer
		            	@on-change="changePage"
		            	@on-page-size-change = "changePage"
		            ></Page>
		        </div>
		    </div>
		</Col>
    </Row>
</template>
<script>
import iView from 'iview';
export default {
	name: 'comTable',
    data () {
        return {
        	showStripe: true,
        	total: 1,
        	pageSize:10,
        	table:[],
        	current: 1
        }
    },
    props: {
    	nopage:{
    		type:Boolean,
    		default:true
    	},
    	loadend: Boolean,
    	tableTitle: Array,
    	tableData: Array,
    	tableHeight: {
    		type: Number
    	},
    	pageArr: {
    		type: Array
    	}
    },

//	computed: {
//		tableShowData() {
//			var _this = this,tableArr = [];
//			try {
//				for(let i in this.tableTitle) {
//					let obj = this.tableTitle[i],newObj = {};
//					for(let j in obj) {
//						newObj[j] = obj[j]
//					}
//					// 表格的hover事件显示title
//					if(obj.hover){
//						newObj.render = (h, params) => {
//							return h('a', {
//	                            attrs: {title: params.row[obj.key]},
//	                        }, params.row[obj.key]);
//						}
//					}
//					// 判断是远程排序还是前端排序【都有和有sortable：前端排序、sorthis：远程排序】
//					if(!obj.sortable && obj.sorthis) {
//						newObj.sortable = 'custom';
//					}
//					// 表格的td点击跳转
//					if(obj.router){
//						newObj.render = (h, params) => {
//							return h('Button', {
//	                            props: {type: 'text',size: 'small'},
//	                            attrs: obj.hover? {title: params.row[obj.key]}:null,
//	                            style: {color: '#FF6700'},
//	                            on: {
//	                                click: () => {
//	                                	// 判断值为0、null...不进行跳转
//	                                	if(params.row[obj.key]==0){
//	                                		return;
//	                                	};
//	                                	let routerStr = window.origin+obj.router;
//	                                	// 判断是否在同窗口打开，默认打开新窗口
//	                                	if(!obj.target){
//	                                		obj.target == '_blank';		// 使用自己写的案例[不传默认打开新窗口]
//	                                		//obj.target == '_self';	// 使用官方案例[不传默认在同窗口打开]
//	                                	}
//	                                	if(obj.routerKey){
//	                                		// 官方案例修改
//	                                		let query = obj.routerKey;
//	                                		if(!obj.target || obj.target == '_self'){	// 官方案例，默认在同窗口打开
//	                                			this.$router.push({
//			                                        name: obj.router,
//			                                        query: query
//			                                    });
//	                                		}else{	// 官方案例修改，判断是否需要打开新窗口
//	                                			let routeData = this.$router.resolve({
//			                                    	name: obj.router,
//			                                        query: query
//			                                    });
//			                                   	window.open(routeData.href, obj.target);
//	                                		}
//
//											// 自己写的案例
//	                                		/*let Key = obj.routerKey.constructor,data = obj.routerKey;
//	                                		if(Key==Object){
//	                                			let str = '',i=0;
//	                                			for(var k in data){
//	                                				if(i==0){str += '?'+k+'='+data[k];}
//	                                				else{str += '&'+k+'='+data[k];}
//	                                				i++;
//												}
//	                                			window.open(routerStr+str,obj.target);
//	                                		}else{
//	                                			iView.Modal.warning({
//										            title: '温馨提示',
//										            content: '<p>目前传参暂不支持 String、Number、Array、Boolean类型传参;<br/>传参接受类型只有有:Object;<br/>请查看你的routerKey是否为支持的数据类型</p>'
//										        });
//										        return;
//	                                		}*/
//	                                	}else{
//	                                		window.open(routerStr,obj.target);
//	                                	}
//	                                }
//	                            }
//	                        }, params.row[obj.key]);
//						}
//					}
//					tableArr.push(newObj);
//				}
//			} catch(e) {
//				console.log(e);
//			}
//			return tableArr;
//		}
//	},
    methods: {
//		// 单击某一行时触发
//  	tableClick(e){
//  		this.$emit('tableRowClick',e)
//  	},
//  	// 双击某一行时触发
//  	tableDblclick(e){
//  		this.$emit('dbClick',e)
//  	},
//  	// 点击表格排序
//  	tableSort(e){
//  		if(e.column.sortable == 'custom'){
//  			if(e.order == "normal"){
//					this.$emit('sortFunction', null);
//				}else{
//					this.$emit('sortFunction', e.key + ' '+e.order);
//				}
//  		}
//		},
//		// 只要选中项发生变化时就会触发[多选模式下有效]
//  	tableSelection(e){
//  		this.$emit('selectTable',e)
//  	},
    	// 点击分页
    	changePage(index){
           var _start = ( index - 1 ) * this.pageSize;
           console.log(this.pageSize)
           var _end = index * this.pageSize;
           console.log(this.tableData)
           this.tableData = this.tableData.slice(_start,_end);
    	}
    },
    mounted(){

	}
}
</script>
