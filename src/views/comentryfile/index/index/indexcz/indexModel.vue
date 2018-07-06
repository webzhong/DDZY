<style scoped>
	@import 'model.css';
</style>
<style>
	@import 'indexModel.css';
	.clear{
		clear:both;
	}
</style>
<template>
	<Row class="indexRow" style="height: 100%;">
		<Col span="24" class="model-box">
		<Tabs type="card"  closable :value="activeValue" @on-click="handleTabClick" @on-tab-remove="handleTabRemove" >
			<TabPane :icon="item.iconTabs"  v-for="(item,index) in tabsArr" :name="item.tabName" :key="index" :label="item.tabLabel" >
				<Row>
					<!--<Col span="24" class="model-top">
                    </Col>-->
					<Col span="24" class="model-bot">
					<div class="topBorder" v-show="showTopBorder">
						<div class="leftDiv">
							<Form :model="formLeft" label-position="left" :label-width="90" class='formStyle'>
								<template>
									<FormItem label="申请单位"  style="display: inline-block;font-size:16px;">
										<Select v-model="model1" class="shenQingSelect" placeholder="全部">
											<Option v-for="item in shenqingList" :value="item.value" :key="item.value">{{ item.label }}</Option>
										</Select>
									</FormItem>
								</template>
								<FormItem label="实施单位" style="display: inline-block">
									<Select v-model="model5" class="shiShiDanWei"  placeholder="全部">
										<Option v-for="item in shishiList" :value="item.value" :key="item.value">{{ item.label }}</Option>
									</Select>
								</FormItem>
								<template>
									<FormItem label="路名" style="display: inline-block">
										<Input v-model="model2" class="LuMing"></Input>
									</FormItem>
								</template>
								<template v-if="showjingdu" >
									<FormItem label="工作进度" style="display: inline-block">
										<Select v-model="model6" class="gongZuoJinDu"  placeholder="请选择">
											<Option v-for="item in jinduList" :value="item.value" :key="item.value">{{ item.label }}</Option>
										</Select>
									</FormItem>
								</template>
								<template v-if="fengxian">
									<FormItem label="风险等级" style="display: inline-block">
										<Select v-model="model7" class="fengXianDengJi">
											<Option v-for="item in fengxianList" :value="item.value" :key="item.value">{{ item.label }}</Option>
										</Select>
									</FormItem>
								</template>
								<template v-if="showTongGuo">
									<FormItem label="方案是否通过" class="fangAnTongGuo">
										<RadioGroup v-model="isFangantongguo">
											<Radio label="1" class="select">是</Radio>
											<Radio label="0" class="select">否</Radio>
										</RadioGroup>
									</FormItem>
								</template>
								<template v-if="showDate">
									<FormItem label="时间范围" style="display: inline-block" class="dateContent">
										<DatePicker type="date" v-model='dateArr[0]' placeholder="开始" class="shiJianFanWeiK" ></DatePicker>
										至
										<DatePicker type="date" v-model='dateArr[1]' placeholder="结束" class="shiJianFanWeiJ"></DatePicker>
									</FormItem>
								</template>
								<template v-if="showPlan">
									<FormItem label="是否有方案" class="shiFoufangAn" style=" width:200px;display: inline-block">
										<RadioGroup v-model="isfangan">
											<Radio label="1" class="select">是</Radio>
											<Radio label="0" class="select">否</Radio>
										</RadioGroup>
									</FormItem>
								</template>
							</Form>
							<div class="btnAll">
								<div class="btn1"></div>
								<Button type="primary" class="reset"><i class="resetIcon"></i>重置</Button>
								<div class="btn2"></div>
								<Button type="primary" class="chaxun"><i class="chaxunIcon"></i>查询</Button>
							</div>
						</div>
						<div class="middleDiv"></div>
						<div class="rightDiv">
							<header>任务分布</header>
							<div :class="'echartsMaps'+index" ref="echartsMapIndex" style="height:100%"></div>
						</div>
					</div>
					<div :class="showZuoyexiaozu ? 'bottomBorderOne':'bottomBorder'">
						<div>
							<Form :model="formLeft" label-position="left" :label-width="90" class='formStyle teamform'>
							<template v-if="showZuoyexiaozu" >
								<FormItem label="实施单位" style="display: inline-block">
									<Select v-model="model5" class="shiShiDanWei"  placeholder="全部">
										<Option v-for="item in shishiList" :value="item.value" :key="item.value">{{ item.label }}</Option>
									</Select>
								</FormItem>
								<FormItem label="所属班组" style="display: inline-block" >
									<Select v-model="model8" style="width:120px;margin-left: -17px;margin-right: 36px;" placeholder="带电一班">
										<Option v-for="item in shishiList" :value="item.value" :key="item.value">{{ item.label }}</Option>
									</Select>
								</FormItem>
								<FormItem label="作业小组" style="display: inline-block" >
									<Select v-model="model9" style="width:120px;margin-left: -17px;margin-right: 36px;" placeholder="一组">
										<Option v-for="item in shishiList" :value="item.value" :key="item.value">{{ item.label }}</Option>
									</Select>
								</FormItem>
								<FormItem style="display: inline-block" >
								<div class="btnAll">
									<div class="btn1"></div>
									<Button type="primary" class="reset"><i class="resetIcon"></i>重置</Button>
									<div class="btn2"></div>
									<Button type="primary" class="chaxun"><i class="chaxunIcon"></i>查询</Button>
								</div>
								</FormItem>
							</template>
							</Form>
						</div>
						<div class="table-title">
							<span class="blueLine"></span>
							<span>{{fontTest}}</span>
							<div class="button buttonBg" v-if="showMenu">
								<button  icon="ios-paper-outline" class="btnOne" ><i class="btnNew"></i><span class="newtext">新增</span></button>
								<button icon="compose" class="btnTwo" ><i class="btnEdit"></i><span class="edittext">修改</span></button>
								<button  icon="trash-a" class="btnThree" style="left:0px;"><i class="btnDel"></i><span class="deltext">删除</span></button>
							</div>
						</div>
						<div class="tableStyle" style="color:#000;margin-left: 18px;">
							<com-table
									size="small"
									:loadend="loadend"
									:table-title="tableTitle"
									:table-data="tableData"
									:page-arr="pageArr"
									highlight-row
									@updataTable="updataTableData($event)"
									@selectTable="selectTableData($event)"
									@sortFunction="sortFunction($event)"
							>
							</com-table>
						</div>
					</div>
					</Col>
				</Row>
			</TabPane>

		</Tabs>
		</Col>
	</Row>
</template>

<script>
    import util from '@/libs/util.js'
    import bus from '@/views/assets/js/eventBus.js'
    import comTable from '@/views/comtemplate/table/comTable.vue';
    import axios from 'axios';
    // import axios from '@/views/assets/js/axios.common.js';
    const tabmap = {weekNameAll:"带电作业计划-周",mothNameAll:'带电作业计划-月',dayNameAll:'带电作业计划-日',fengxianweekNameAll:'风险等级-周',fengxianNameAll:'风险等级-日'};
    export default{
        props:{
            itemList:{}
        },
        data(){
            return{
                dateArr:[0,0],
                activeValue: '',
                tabindex: -1,
                tabsArr: [],
                tabsObj: {},
                model1:"", //申请单位
                model2:"请输入路名", //路名
                model3:"20", //分页下拉
                model5:"", //实施单位
                model6:"",//工作进度
                model7:"",//风险等级
                model8:"",//所属班组
                model9:"",//作业小组
                fontTest:"",
                isFangantongguo:'1',//方案是否通过
                isfangan:'1',//是否有方案
                fengxian:false,//风险等级
                showDate:false,//是否展示时间
                showTongGuo:false,//是否通过方案
                showPlan:false, //是否有方案
                showMenu:false,  //是否有菜单
                tmpStore:"", //存放状态管理
                showjingdu:false,//是否展示进度
                shenqing:true, //申请单位
                shishi:true, //实施单位
                luming:true, //路名
                banzu:false, //班组
                zuoye:false,//作业
                showTopBorder:false,
                showZuoyexiaozu:false,
                iconTabs:'',
                pageArrList:[{
                    label:"20",
                    value:"20"
                },
                    {
                        label:"50",
                        value:"50"
                    }
                ],
                loading: true, // 表格加载数据时loading
                tableDataArr: [], // 表格加载过来的数据
                tableheight: 460, // 表格的最大高度
                pagelistArr: [], // 【必填】分页数字组[总条数,当前页【最小时1】,每页条数]
                pageSize: 0, // 表格每页显示的条数
                current: 0, // 当前是第几页
                showSidebar: false, // 侧栏的滑出、滑入
                modalDel: false, // 删除弹出框
                modal_loading: false, //	删除弹出框点击删除时loading状态
                selectData: null, // 选中的数据
                indexList:'',//保存标签index
                classMing:'',
                tmpIndex:0,
                formLeft:{},
                radio: 'male',
                tableTitleArr: [],
                itemListArray:[],//保存数据
                shenqingList: [{
                    value: '全部',
                    label: '全部'
                 },
                 	{value: "朝阳",label:"朝阳"},
                 	{value: "海淀",label:"海淀"},
					{value: "丰台",label:"丰台"},
					{value: "石景山",label:"石景山"},
					{value: "亦庄",label:"亦庄"},
					{value: "门头沟",label:"门头沟"},
					{value: "房山",label:"房山"},
					{value: "通州",label:"通州"},
					{value: "顺义",label:"顺义"},
					{value: "昌平",label:"昌平"},
					{value: "大兴",label:"大兴"},
					{value: "怀柔",label:"怀柔"},
					{value: "平谷",label:"平谷"},
					{value: "密云",label:"密云"},
					{value: "延庆",label:"延庆"}
                ],
                shishiList:[{
                    value: '检分',
                    label: '检分'
                },
                 	{value: "门头沟",label:"门头沟"},
					{value: "房山",label:"房山"},
					{value: "通州",label:"通州"},
					{value: "顺义",label:"顺义"},
					{value: "昌平",label:"昌平"},
					{value: "大兴",label:"大兴"},
					{value: "怀柔",label:"怀柔"},
					{value: "平谷",label:"平谷"},
					{value: "密云",label:"密云"},
					{value: "延庆",label:"延庆"}
                ],
                fengxianList:[{value:'一级',label:'一级'},{value:'二级',label:'二级'}],
                jinduList:[{value:'未开工',label:'未开工'},{value:'已开工',label:'已开工'},{value:'已完成',label:'已完成'},{value:'已取消',label:'已取消'}]
            }
        },
        components: { // 组件
            comTable
        },
        computed: {
            loadend() { // loading加载中
                return this.loading;
            },
            tableTitle() { // 表头
                return this.tableTitleArr;
            },
            tableData() { // 表格数据
                return this.tableDataArr;
            },
            tableHeight(){ // 表格的高度，溢出滚动
                return this.tableheight;
            },
            pageArr() { // 分页
                return this.pagelistArr;
            }
        },
        methods: {
            // 加载相应的组件
            handleTabsShow(){
                var _this = this;
                bus.$on('indexModelShow',function(data){
                    _this.activeValue = data.name;
                    _this.model7=data.lev
                    _this.tabsObj= {
                        tabName: data.name,
                        tabLabel: data.label,
                        iconTabs:data.iconTabs
                    }
                    _this. getStore(_this.tabsObj)
                    _this.tableDataArrShow();
                    _this.getTableTitle();
                    _this.handleTabAdd();
                })
            },
            initDate(label){
                if("带电作业计划-周" === label || '风险等级-周' === label){
                    this.dateArr = util.getWeekStartAndEnd(0);
                }else if('带电作业计划-月' === label) {
                    this.dateArr = util.getMonthStartAndEnd(0);
                }else{
                    const td = util.getToday();
                    this.dateArr = [td, td];
                }
            },
            // 点击增加【判断是否存在】
            handleTabAdd(){
                this.tabindex++;
                this.tabsObj.tabIndex = this.tabindex;
                for(var i=0;i<this.tabsArr.length;i++){
                    if(this.tabsArr[i].tabName==this.tabsObj.tabName) return
                }
               
                this.tabsArr.push(this.tabsObj);
                this.tmpArr =this.tabsArr
                this.tableDataArrShow();
                this.getTableTitle();
                if(this.tabsObj.tabName=='banzu' || this.tabsObj.tabName=='zuoye' || this.tabsObj.tabName=='zaixian'){
				this.tableDataArrShow();
                this.getTableTitle();	                
                }else{
                    this.getYecharts()
                }
            },
            // 点击Tab时【取VUEX】
            handleTabClick(name){
                for(var i=0;i<this.tmpStore.length;i++){
                    if(name ==this.tmpStore[i].tabName){
                        this.classMing = this.tmpStore[i].tabName;
                        this.showDate =this.tmpStore[i].showDate;
                        this.showTongGuo =this.tmpStore[i].showTongGuo;
                        this.showPlan =this.tmpStore[i].showPlan;
                        this.showMenu=this.tmpStore[i].showMenu;
                        this.fontTest =this.tmpStore[i].fontTest;
                        this.fengxian=this.tmpStore[i].fengxian;
                        this.showjingdu=this.tmpStore[i].showjingdu;
                        this.showTopBorder   =this.tmpStore[i].showTopBorder
                        this.showZuoyexiaozu =this.tmpStore[i].showZuoyexiaozu
                    }
                }
                if(name=='banzu' || name=='zuoye' || name=='zaixian'){
					
				}else{
                    this.getYecharts()
				}
				this.tableDataArrShow();
                this.getTableTitle();
                this.initDate(tabmap[name]);
            },
            // 点击关闭Tab按钮【删除对应的】

            handleTabRemove(name){
                for(var i=0;i<this.tabsArr.length;i++){
                    if(this.tabsArr[i].tabName ==name){
                        this.tabsArr.splice(i,1)
                    }
                }
                //综合展示返回主页
                if(name==''){
                    this.tabsArr =[]
                }
                //如果是最后一个就返回首页
                if(this.tabsArr.length===0){
                    this.$emit('daidianri',{isShow:false});
                    return
                }
                this.getStore(this.tabsArr[this.tabsArr.length-1])
            },
            // 这里拿到表格的数据、分页信息等
            tableDataArrShow() {
                axios.get('./jsonServer/data.json').then((response) =>{
                  
                        var tableData=[];

                        if(this.classMing == 'name1-1' || this.classMing  == 'name1-2' || this.classMing == 'dayNameAll'){
                            tableData = response.data.daydata;
                        }else if(this.classMing == 'weekNameAll' || this.classMing == 'fengxianweekNameAll' || this.classMing  == 'name2-3' || this.classMing == 'name2-4' || this.classMing == 'name2-1' || this.classMing == 'name2-2'){
                            tableData = response.data.weekdata;
                        }else if(this.classMing == 'mothNameAll' || this.classMing  == 'name3-1' || this.classMing == 'name3-2' ){
                            tableData = response.data.monthdata;
                        }else if(this.classMing == 'jingdu' || this.classMing  == 'weikai' || this.classMing == 'yikai' || this.classMing  == 'yiwan' || this.classMing == 'yiqu'){
                            tableData = response.data.jindu;
                        }else if(this.classMing == 'fengxianNameAll' || this.classMing  == 'name11-1' || this.classMing == 'name11-2'){
                            tableData = response.data.daydata;
                        }else if(this.classMing=='banzu'){
                            tableData= response.data.data4;
                        }else if(this.classMing=='zuoye'){
                            tableData= response.data.data5
                        }else if(this.classMing=='zaixian'){
                            tableData= response.data.data6
                        }else{
                            tableData = response.data.fxdata;
                        }
                        var approved=[];
                        var inApproved=[];
                        var haveplan=[];
                        var noplan=[];
                        var yiji = [];
                        var erji = [];
                        var weikai = [];
                        var yikai = [];
                        var yiwan = [];
                        var yiqu = [];
                        for(var i=0;i< tableData.length; i++){
                            if(tableData[i].column4 == null){
                                noplan.push(tableData[i])
                            }else{
                                haveplan.push(tableData[i])
                                if(tableData[i].column5 === '是'){
                                approved.push(tableData[i])
	                            }else{
	                                inApproved.push(tableData[i])
	                            }
                            }
                            if(tableData[i].column15 === '一级'){
                                yiji.push(tableData[i])
                            }else{
                                erji.push(tableData[i])
                            }
                            if(tableData[i].column16 === '未开工'){
                                weikai.push(tableData[i])
                            }else if(tableData[i].column16 === '已开工'){
                                yikai.push(tableData[i])
                            }else if(tableData[i].column16 === '已完成'){
                                yiwan.push(tableData[i])
                            }else if(tableData[i].column16 === '已取消'){
                                yiqu.push(tableData[i])
                            }
                        }
//              if(this.classMing != 'dayNameAll'){
//              	if(this.fontTest == '审批通过列表' ){
//	                	tableData = approved;
//	                }else{
//	                	tableData = inApproved;
//	                }
//              }

                        if(this.classMing == 'name2-1' ||this.classMing == 'name1-1' ){
                            tableData = approved;
                        }else if(this.classMing == 'name2-2' ||this.classMing == 'name1-2'){
                            tableData = inApproved;
                        }else if(this.classMing == 'name2-3' ||this.classMing == 'name3-1'){
                            tableData = haveplan;
                        }else if(this.classMing == 'name2-4' ||this.classMing == 'name3-2'){
                            tableData = noplan;
                        }else if(this.classMing == 'name12-1' ||this.classMing == 'name11-1' ){
                            tableData = yiji;
                        }else if(this.classMing == 'name12-2' ||this.classMing == 'name11-2'){
                            tableData = erji;
                        }else if(this.classMing == 'weikai'){
                            tableData = weikai;
                        }else if(this.classMing == 'yikai'){
                            tableData = yikai;
                        }else if(this.classMing == 'yiwan'){
                            tableData = yiwan;
                        }else if(this.classMing == 'yiqu'){
                            tableData = yiqu;
                        }

                        this.itemListArray=tableData;
                        this.pagelistArr = [tableData.length, 1, this.pageSize]; // 表格分页[总条数,当前页【最小是1】,每页条数]
                        this.loading = false; // 获取数据后关闭loding
                        this.tableDataArr = tableData; // 表格的数据
                    })
                    .catch((error) =>{
                        console.log(error);
                    });

            },
            // 获取表格的表头
            getTableTitle(){
            	var index = 1;
                if(this.fengxian ==true || this.showjingdu==true){
                    this.tableTitleArr =  [
                        {
                            type: 'selection',width: 60,align: 'center',
                        },
                        {
                            title: '序号',width: 150,type:'index',
                        },
                        {
                            title: '申请单位',width: 150,key: 'column2',ellipsis:true
                        },
                        {
                            title: '实施单位',width: 150,key: 'exec',ellipsis:true
                        },
                        {
                            title: '站名',width: 150,key: 'column7',
                            render: (h, params) => {
                                return h('div', [
                                    h('span', {
                                        style: {
                                            display: 'inline-block',
                                            width: '100%',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap'
                                        },
                                        domProps: {
                                            title: params.row.column7
                                        }
                                    }, params.row.column7)
                                ]);

                            }
                        },
                        {
                            title: '开关号',width: 150,key: 'column8',ellipsis:true
                        },
                        {
                            title: '路号',width: 150,key: 'column9',ellipsis:true
                        },
                        {
                            title: '工作地点、范围',width: 150,key: 'column10',
                            render: (h, params) => {
                                return h('div', [
                                    h('span', {
                                        style: {
                                            display: 'inline-block',
                                            width: '100%',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap'
                                        },
                                        domProps: {
                                            title: params.row.column10
                                        }
                                    }, params.row.column10)
                                ]);

                            }
                        },
                        {
                            title: '作业内容',
                            width: 150,
                            key: 'column11',
                            render: (h, params) => {
                                return h('div', [
                                    h('span', {
                                        style: {
                                            display: 'inline-block',
                                            width: '100%',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap'
                                        },
                                        domProps: {
                                            title: params.row.column11
                                        }
                                    }, params.row.column11)
                                ]);

                            }
                        },
                        {
                            title: '任务状态',
                            width: 150,
                            key: 'column16',
                            render: (h, params) => {
                                return h('div', [
                                    h('span', {
                                        style: {
                                            display: 'inline-block',
                                            width: '100%',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap'
                                        },
                                        domProps: {
                                            title: params.row.column16
                                        }
                                    }, params.row.column16)
                                ]);

                            }
                        },
                        {
                            title: '任务取消原因',
                            width: 150,
                            key: 'column17',
                            render: (h, params) => {
                                return h('div', [
                                    h('span', {
                                        style: {
                                            display: 'inline-block',
                                            width: '100%',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap'
                                        },
                                        domProps: {
                                            title: params.row.column17
                                        }
                                    }, params.row.column17)
                                ]);

                            }
                        },
                        {
                            title: '风险等级',
                            width: 150,
                            key: 'column15',
                            render: (h, params) => {
                                return h('div', [
                                    h('span', {
                                        style: {
                                            display: 'inline-block',
                                            width: '100%',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap'
                                        },
                                        domProps: {
                                            title: params.row.column15
                                        }
                                    }, params.row.column15)
                                ]);

                            }
                        },
                        {
                            title: '方案编号',width: 150,key: 'column22',
                            render: (h, params) => {
                                return h('div', [
                                    h('span', {
                                        style: {
                                            display: 'inline-block',
                                            width: '100%',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap'
                                        },
                                        domProps: {
                                            title: params.row.column22
                                        }
                                    }, params.row.column22)
                                ]);

                            }
                        },
                        {
                            title: '方案是否通过',width: 150,key: 'column5'
                        },
                        { title:'方案审批意见',width: 150,key:'column6'},
                        {title:'任务来源',width: 150,key:'column12'},
                        {title:'计划实施时间',width: 150,key:'column30'},
                        {title:'工作负责人',width: 150,key:'column14'},
                        {title:'联系方式',width: 150,key:'column19'},
                        {title:'备注',width: 150,key:'column32'},
                    ];
                }else if(this.classMing=='banzu'){
                    this.tableTitleArr=[
                        {
                            title: '序号',width: (screen.width <=1366)?150:320,type:'index',
                        },
                        {
                            title: '实施单位',width: (screen.width <=1366)?300:525,key: 'column2',ellipsis:true
                        },
                        {
                            title: '所属班组',width: (screen.width <=1366)?500:525,key: 'column3',ellipsis:true
                        },
                    ]
                }else if(this.classMing=='zuoye' || this.classMing=='zaixian'){
                    this.tableTitleArr=[
                        {
                            title: '序号',width: (screen.width <=1366)?150:320,type:'index',
                        },
                        {
                            title: '实施单位',width:(screen.width <=1366)?200:350,key: 'column2',ellipsis:true
                        },
                        {
                            title: '所属班组',width:(screen.width <=1366)?300:350,key: 'column3',ellipsis:true
                        },
                        {
                            title: '作业小组',width:(screen.width <=1366)?300:350,key: 'column4',ellipsis:true
                        },
                    ]
                }else{
                    this.tableTitleArr = [
                        {
                            type: 'selection',width: 60,align: 'center',
                        },
                        {
                            title: '序号',width: 150,type:'index',
                        },
                        {
                            title: '申请单位',width: 150,key: 'column2',ellipsis:true
                        },
                        {
                            title: '实施单位',width: 150,key: 'exec',ellipsis:true
                        },
                        {
                            title: '站名',width: 150,key: 'column7',
                            render: (h, params) => {
                                return h('div', [
                                    h('span', {
                                        style: {
                                            display: 'inline-block',
                                            width: '100%',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap'
                                        },
                                        domProps: {
                                            title: params.row.column7
                                        }
                                    }, params.row.column7)
                                ]);

                            }
                        },
                        {
                            title: '开关号',width: 150,key: 'column8',ellipsis:true
                        },
                        {
                            title: '路号',width: 150,key: 'column9',ellipsis:true
                        },
                        {
                            title: '工作地点、范围',width: 150,key: 'column10',
                            render: (h, params) => {
                                return h('div', [
                                    h('span', {
                                        style: {
                                            display: 'inline-block',
                                            width: '100%',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap'
                                        },
                                        domProps: {
                                            title: params.row.column10
                                        }
                                    }, params.row.column10)
                                ]);

                            }
                        },
                        {
                            title: '作业内容',
                            width: 150,
                            key: 'column11',
                            render: (h, params) => {
                                return h('div', [
                                    h('span', {
                                        style: {
                                            display: 'inline-block',
                                            width: '100%',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap'
                                        },
                                        domProps: {
                                            title: params.row.column11
                                        }
                                    }, params.row.column11)
                                ]);

                            }
                        },
                        {
                            title: '风险等级',
                            width: 150,
                            key: 'column15',
                            render: (h, params) => {
                                return h('div', [
                                    h('span', {
                                        style: {
                                            display: 'inline-block',
                                            width: '100%',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap'
                                        },
                                        domProps: {
                                            title: params.row.column15
                                        }
                                    }, params.row.column15)
                                ]);

                            }
                        },
                        {
                            title: '方案编号',width: 150,key: 'column22',
                            render: (h, params) => {
                                return h('div', [
                                    h('span', {
                                        style: {
                                            display: 'inline-block',
                                            width: '100%',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap'
                                        },
                                        domProps: {
                                            title: params.row.column22
                                        }
                                    }, params.row.column22)
                                ]);

                            }
                        },
                        {
                            title: '方案是否通过',width: 150,key: 'column5'
                        },
                        { title:'方案审批意见',width: 150,key:'column6'},
                        {title:'任务来源',width: 150,key:'column12'},
                        {title:'计划实施时间',width: 150,key:'column30'},
                        {title:'工作负责人',width: 150,key:'column14'},
                        {title:'联系方式',width: 150,key:'column19'},
                        {title:'备注',width: 150,key:'column32'},
                    ];
                }
            },
            //获取从外面进入的信息
            getStore(test){
                this.tmpStore =this.$store.state.app.stateList;
                for(var i=0;i<this.tmpStore.length;i++){
                    if( this.tmpStore[i].tabName ==test.tabName){
                        this.classMing = this.tmpStore[i].tabName;
                        this.showDate =this.tmpStore[i].showDate;
                        this.showTongGuo =this.tmpStore[i].showTongGuo;
                        this.showPlan =this.tmpStore[i].showPlan;
                        this.showMenu=this.tmpStore[i].showMenu;
                        this.fengxian=this.tmpStore[i].fengxian;
                        this.showjingdu=this.tmpStore[i].showjingdu;
                        this.fontTest =this.tmpStore[i].fontTest;
                        //this.iconTabs =this.tmpStore[i].iconTabs;
                        this.showTopBorder   =this.tmpStore[i].showTopBorder
                        this.showZuoyexiaozu =this.tmpStore[i].showZuoyexiaozu
                    }
                }
            },
            // echarts图渲染
            getYecharts(){
                var _this =this;
             	axios.get('./jsonServer/echartsData.json').then((response) =>{
             		var data =[]
                	var xData = [],yData = [];
					switch (_this.classMing){
                        case 'name1-1':
                            data =response.data.day.yes;
                            var min = 0;
                            var max=20;
                            break;
                        case 'name1-2':
                            data =response.data.day.no;
                            var min = 0;
                            var max=1;
                            break;
                        case 'name2-1':
                            data =response.data.week.yesPlan
                            var min = 0;
                            var max=195;
                            break;
                        case 'name2-2':
                            data =response.data.week.noPlan
                            var min = 1;
                            var max=5;
                            break;
                        case 'name2-3':
                            data =response.data.week.yesApprove
                            var min = 0;
                            var max=195;
                            break;
                        case 'name2-4':
                            data =response.data.week.noApprove
                            var min = 0;
                            var max=0;
                            break;
                        case 'name3-1':
                            data =response.data.month.yes
                            var min = 0;
                            var max=195;
                            break;
                        case 'name3-2':
                            data =response.data.month.no
                            var min = 0;
                            var max=305;
                            break;
                        case 'dayNameAll':
                            data =response.data.day.all;
                            var min = 0;
                            var max=20;
                            break;
                        case 'weekNameAll':
                            data =response.data.week.all
                            var min = 0;
                            var max=200;
                            break;
                        case 'mothNameAll':
                            data =response.data.month.all
                            var min = 0;
                            var max=500;
                            break;
                        case 'jindu':
                            data =response.data.workProgress.all
                            var min = 0;
                            var max=19;
                            break;
                        case 'weikai':
                            data =response.data.workProgress.notStarted
                            var min = 0;
                            var max=2;
                            break;
                        case 'yikai':
                            data =response.data.workProgress.workStarted
                            var min = 0;
                            var max=10;
                            break;
                        case 'yiwan':
                            data =response.data.workProgress.offTheStocks
                            var min = 0;
                            var max=7;
                            break;
                        case 'yiqu':
                            data =response.data.workProgress.canceled
                            var min = 0;
                            var max=0;
                            break;
                        case 'fengxianNameAll':
                            data =response.data.riskGradeDay.all
                            var min = 0;
                            var max=20;
                            break;
                        case 'name11-1':
                            data =response.data.riskGradeDay.levelOne
                            var min = 0;
                            var max=3;
                            break;
                        case 'name11-2':
                            data =response.data.riskGradeDay.levelTwo
                            var min = 0;
                            var max=17;
                            break;
                        case 'name12-1':
                            data =response.data.riskGradeWeek.levelOne
                            var min = 0;
                            var max=40;
                            break;
                        case 'name12-2':
                            data =response.data.riskGradeWeek.levelTwo
                            var min = 0;
                            var max=160;
                            break;
                        case 'fengxianweekNameAll':
                            data =response.data.riskGradeWeek.all
                            var min = 0;
                            var max=200;
                            break;
                    };
	                data.map(function(a, b) {
	                    xData.push(a.name);
	                    if (a.value === 0) {
	                        yData.push(a.value + max);
	                    } else {
	                        yData.push(a.value);
	                    }
	                });
	                
	                _this.option = {
	                    color: ['#3398DB'],
	                    xAxis: [{
	                        type: 'category',
	                        gridIndex: 0,
	                        data: xData,
	                        axisTick: {
	                            alignWithLabel: true
	                        },
	                        axisLine: {
	                            lineStyle: {
	                                color: '#0c3b71'
	                            }
	                        },
	                        axisLabel: {
	                            show: true,
	                            color: 'rgb(170,170,170)',
	                            fontSize:14
	                        }
	                    }],
	                    yAxis: [
		                    {
		                        type: 'value',
		                        gridIndex: 0,
		                        min:min,
		                        max: max,
		                        splitLine: {
		                            show: false
		                        },
		                        axisTick: {
		                            show: false
		                        },
		                        axisLine: {
		                            lineStyle: {
		                                color: '#0c3b71'
		                            }
		                        },
		                        axisLabel: {
		                            color: 'rgb(170,170,170)',
		                            formatter: '{value}'
		                        }
		                    }
	                    ],
	                    series: [
		                    {
		                        name: '合格率',
		                        type: 'bar',
		                        barMaxWidth:'20px',
		                        barMinWidth:"10px",
		                        barWidth: '30%',
		                        xAxisIndex: 0,
		                        yAxisIndex: 0,
		                        label: {
		                            normal: {
		                                show: true,
		                                position: "top",
		                                textStyle: {
		                                    color: "#ffc72b",
		                                    fontSize: 14
		                                }
		                            }
		                        },
		                        itemStyle: {
		                            normal: {
		                                barBorderRadius: [30,30,0,0]
		                            }
		                        },
		                        data: yData,
		                        zlevel: 11
		
		                    }
	                    ]
	                };
	                
	                 _this.$nextTick(() => {
	                	var temIndex = -1; 
	                    for(var i=0;i<_this.tabsArr.length;i++){
	                        if(_this.classMing == _this.tabsArr[i].tabName){
	                            temIndex = i
	                        }
	                    }
	                    var echartsMapmyChart = _this.$echarts.init(_this.$refs['echartsMapIndex'][temIndex]);
	                    echartsMapmyChart.resize()
	                    echartsMapmyChart.setOption(_this.option);
	                    echartsMapmyChart.on('click',function(params){
	                        _this.model1=params.name
	                        var tmp=[]
	                        for(var i=0;i<_this.itemListArray.length;i++){
	                            if(params.name ==_this.itemListArray[i].shenqingdanwei){
	                                tmp.push(_this.itemListArray[i])
	                            }
	
	                        }
	                        _this.tableDataArr =tmp;
	                    })
	                })
         		}); 
         	}	
        },
        mounted(){
            this.handleTabsShow();
        }
       
    }
</script>
