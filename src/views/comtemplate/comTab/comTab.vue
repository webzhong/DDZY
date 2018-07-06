<style scoped>

</style>
<template>
	<Row>
		<Col span="24" :style="{height:headerBoxHeight ? '44px':'88px'}">
			<Row class="layout">
				<template v-for='(item,index) in tabData'>
					<!--无二级tab-->
					<span 
						v-if="!item.children" 
						class="item"
						:class="{tabItemActive:activeIndex == index}"
						:tab="tabItemShow()"
						@click="tabItemActive(item.name,index,false)"
						>
	                    {{item.title}}
					</span>
					<!--有二级tab-->
					<span 
						v-if="item.children" 
						class="item"
						:class="{tabItemActive:activeIndex == index}"
						:tab="tabItemShow()"
						@click="tabItemActive(item.children[0].name,index,true,item.children.length)">
	                    {{item.title}}
					</span>
					<Row 
						v-if="item.children" 
						class="layoutchild childHide" 
						:class="{childShow:activeIndex == index}">
						<template v-for='(child,index2) in item.children'>
							<span 
								:class="{tabItemActive:activeIndexChild == index2,oneSpanItem:oneSpanNum == 1}" 
								@click="tabItemActiveChild(child.name,index2)">
				                {{child.title}}
							</span>
						</template>
					</Row>
				</template>
			</Row>
		</Col>
	</Row>
</template>
<script>
	export default {
		name: 'singeTab',
		components: {
			
		},
		data() {
			return {
                activeIndex: 0,         // 一级tab选中样式
                activeIndexChild: 0,    // 二级tab选中样式
                itemChildShow: 0,       // 二级菜单显示
                currentTab: null,       // 一、二级tab默认跳转的组件【没有二级tab的时候】
                oneSpanNum: 0,          // 二级只有一个的样式
                headerBoxHeight: false  // 头部的高度
			}
		},
		props: {
			tabData: {
				type: Array,
				required: true
				//default: []
			}
		},
		methods: {
			// 这里拿到缓存的数据，进行权限判断【一级】
            tabItemShow(){
            	var MenuItemArr = this.tabData,index = null,indexc = null;
            	if(this.$route.query.c){
            		index = this.$route.query.t;
            		indexc = this.$route.query.c;
            	}else{
            		if(this.$route.query.t){
	            		index = this.$route.query.t;
            		}else{
            			index = 0;
            		}
            		indexc = 0;
            	}
            	if(MenuItemArr[index].children){
            		this.currentTab = MenuItemArr[index].children[indexc].name;
            		this.tabItemActive(this.currentTab,this.activeIndex,true,MenuItemArr[index].children.length);
            	}else{
            		this.headerBoxHeight = true;
            		if(JSON.stringify(this.$route.query) != "{}"){
            			var router = '?',num = 0;
            			for(var i in this.$route.query){
            				if(!this.$route.query.t && num==0){
            					num++;
			            		router += '&t='+index+'&'+i+'='+this.$route.query[i];
		            		}else{
		            			router += '&'+i+'='+this.$route.query[i];
		            		}
	            		}
            			this.$router.push(router);
            		}else if(JSON.stringify(this.$route.query) == "{}"){
            			this.$router.push('?t='+index);
            		}
            		this.itemChildShow = index;
	            	this.activeIndex = index;
            		this.currentTab = MenuItemArr[index].name;
            		this.tabTableShow(MenuItemArr[index].name);
            	}
            },
            // 一级tab点选的时候
            tabItemActive(t,index,jest,len){
            	this.headerBoxHeight = false;
            	if(len==1){
            		this.oneSpanNum = 1;// 二级菜单只有一个，控制样式用的
            	}else{
            		this.oneSpanNum = 0;
            	}
            	if(JSON.stringify(this.$route.query) != "{}"){
            		var router = '?';
        			for(var i in this.$route.query){
        				router += '&'+i+'='+this.$route.query[i];
            		}
        			this.$router.push(router);
        		}
            	if(this.$route.query.c&&(index==this.activeIndex)){
					this.itemChildShow = this.$route.query.t;
	            	this.activeIndex = this.$route.query.t;
	            	this.activeIndexChild = this.$route.query.c;
				}else{
        			if(len){
						this.$router.push('?t='+index+'&c=0');
					}else{
						this.$router.push('?t='+index);
					}
					this.itemChildShow = index;
	            	this.activeIndex = index;
	            	this.activeIndexChild = 0;
        		}
				this.currentTab = t;
				this.tabTableShow(t);
            },
            // 二级tab点选的时候
            tabItemActiveChild(t,index){
            	this.$router.push('?t='+this.$route.query.t+'&c='+index);
            	this.currentTab = t;
            	this.tabTableShow(t);
            	this.activeIndexChild = index;
            },
            // 传参到父
            tabTableShow(e) {
				this.$emit('tableShow',e);
			}
            
		},
		mounted() {
			
		}
	}
</script>