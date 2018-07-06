<style scoped>
	.searchButton button.ivu-btn, 
	.searchButton button.ivu-btn:active, 
	.searchButton button.ivu-btn:focus{
		margin: 2.5px 0;
	}
</style>

<template>
	<Row>
		<!--顶部查询-->
		<Col span="24" class="searchBox">
		<Row>
			<Col span="21" push="0">
				<div class="searchInput">
        			开始时间 :
        			<DatePicker type="datetime" format="yyyy-MM-dd HH:mm" placeholder="请选择开始时间" style="width: 140px"></DatePicker>
        		</div>
        		<div class="searchInput">
        			结束时间 :
        			<DatePicker type="datetime" format="yyyy-MM-dd HH:mm" placeholder="请选择结束时间" style="width: 140px"></DatePicker>
        		</div>
				<div class="searchInput">
					电压等级 :
					<Select v-model="model1" style="width:100px">
						<Option 
							v-for="item in cityList" 
							:value="item.value" 
							:key="item.value">{{ item.label }}</Option>
					</Select>
				</div>
				<div class="searchInput">
					人员姓名 :
					<Select v-model="model1" style="width:100px">
						<Option 
							v-for="item in cityList" 
							:value="item.value" 
							:key="item.value">{{ item.label }}</Option>
					</Select>
				</div>
			</Col>
			<Col span="3" pull="0">
				<div class="searchButton">
					<Button type="info" icon="ios-search" @click="searchCriteria">查询</Button>
					<Button type="warning" icon="refresh">重置</Button>
				</div>
			</Col>
		</Row>
		</Col>
		<!--顶部按钮-->
		<Col span="12" offset="12" class="buttonBox">
			<Button type="success" icon="plus-round" @click="newTableData">新建</Button>
			<Button type="warning" icon="edit">修改</Button>
			<Button type="error" icon="trash-a" @click="reviseTableData">删除</Button>
			<Button type="info" icon="compose">审批</Button>
			<Button type="primary" icon="ios-download-outline">导入</Button>
			<Button type="success" icon="ios-upload-outline">导出</Button>
		</Col>
		<!--表格盒子-->
		<Col span="24" class="tableBox">
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
		
		<div>
			<transition name="bounce">
				<div v-if="showSidebar" class="rightSidebar">
					<div class="sidebarBox">
						<!--头部展示-->
						<div class="sidebarHead">
							<span class="headTitleBox">
		            			<Icon class="headTitle" type="ios-information" size="27"></Icon>
		            			<span class="spanTitle">新建任务</span>
							</span>
							<span class="sidebarCloseBox" @click="sidebarClose">
		            			<Icon class="sidebarClose" size="27" type="ios-close-empty"></Icon>
		            		</span>
						</div>
						<!--填写部分-->
						<div class="sidebarBody">
							<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
								<FormItem label="Name" prop="name">
									<Input v-model="formValidate.name" placeholder="Enter your name"></Input>
								</FormItem>
								<FormItem label="E-mail" prop="mail">
									<Input v-model="formValidate.mail" placeholder="Enter your e-mail"></Input>
								</FormItem>
								<FormItem label="City" prop="city">
									<Select v-model="formValidate.city" placeholder="Select your city">
										<Option value="beijing">New York</Option>
										<Option value="shanghai">London</Option>
										<Option value="shenzhen">Sydney</Option>
									</Select>
								</FormItem>
								<FormItem label="Date">
									<Row>
										<Col span="11">
										<FormItem prop="date">
											<DatePicker type="date" placeholder="Select date" v-model="formValidate.date"></DatePicker>
										</FormItem>
										</Col>
										<Col span="2" style="text-align: center">-</Col>
										<Col span="11">
										<FormItem prop="time">
											<TimePicker type="time" placeholder="Select time" v-model="formValidate.time"></TimePicker>
										</FormItem>
										</Col>
									</Row>
								</FormItem>
								<FormItem label="Gender" prop="gender">
									<RadioGroup v-model="formValidate.gender">
										<Radio label="male">Male</Radio>
										<Radio label="female">Female</Radio>
									</RadioGroup>
								</FormItem>
								<FormItem label="Hobby" prop="interest">
									<CheckboxGroup v-model="formValidate.interest">
										<Checkbox label="Eat"></Checkbox>
										<Checkbox label="Sleep"></Checkbox>
										<Checkbox label="Run"></Checkbox>
										<Checkbox label="Movie"></Checkbox>
									</CheckboxGroup>
								</FormItem>
								<FormItem label="Desc" prop="desc">
									<Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
								</FormItem>
								<FormItem>
									
								</FormItem>
							</Form>
						</div>
						<!--按钮部分-->
						<Row class="sidebarFoot">
							<Button type="primary" icon="checkmark-round" @click="handleSubmit('formValidate')">确定</Button>
							<Button icon="refresh"  @click="handleReset('formValidate')">重置</Button>
							<Button type="warning" icon="edit">修改</Button>
							<Button type="error" icon="trash-a">删除</Button>
							<Button type="info" icon="compose">审批</Button>
						</Row>
					</div>
				</div>
			</transition>
			<!--删除弹出框-->
		</div>
		
		<Modal v-model="modalDel" width="360">
			<p slot="header" style="color:#f60;text-align:center">
				<Icon type="information-circled"></Icon>
				<span>删除确认</span>
			</p>
			<div style="text-align:center">
				<p>此任务删除后,将无法恢复！</p>
				<p>是否继续删除？</p>
			</div>
			<div slot="footer">
				<Button size="large" @click="tableDelClose">取消</Button>
				<Button type="error" size="large" :loading="modal_loading" @click="tableDel">删除</Button>
			</div>
		</Modal>
	</Row>
</template>

<script>
	// 表格公用组件
	import comTable from '@/views/comtemplate/table/comTable.vue';
	import { AXIOS } from '@/views/assets/js/axios.common.js';
	import { COMMON } from '@/views/assets/js/com.common.js';
	export default {
		name: 'commonTable',
		data() {
			return {
				search:{			// 表格本身的搜索条件
					startDate: "",	// 开始时间
					endDate: "",	// 结束时间
					DEPTID: '',     // 通道单位id
					page: 0,		// 当前第几页
				},
				formValidate: {
                    name: '',
                    mail: '',
                    city: '',
                    gender: '',
                    interest: [],
                    date: '',
                    time: '',
                    desc: ''
                },
                ruleValidate: {
                    name: [
                        { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                    ],
                    mail: [
                        { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
                        { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
                    ],
                    city: [
                        { required: true, message: 'Please select the city', trigger: 'change' }
                    ],
                    gender: [
                        { required: true, message: 'Please select gender', trigger: 'change' }
                    ],
                    interest: [
                        { required: true, type: 'array', min: 1, message: 'Choose at least one hobby', trigger: 'change' },
                        { type: 'array', max: 2, message: 'Choose two hobbies at best', trigger: 'change' }
                    ],
                    date: [
                        { required: true, type: 'date', message: 'Please select the date', trigger: 'change' }
                    ],
                    time: [
                        { required: true, type: 'date', message: 'Please select time', trigger: 'change' }
                    ],
                    desc: [
                        { required: true, message: 'Please enter a personal introduction', trigger: 'blur' },
                        { type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
                    ]
                },
				loading: true, // 表格加载数据时loading
				tableDataArr: [], // 表格加载过来的数据
				tableheight: 260, // 表格的最大高度
				pagelistArr: [], // 【必填】分页数字组[总条数,当前页【最小时1】,每页条数]
				pageSize: 0, // 表格每页显示的条数
				current: 0, // 当前是第几页
				showSidebar: false, // 侧栏的滑出、滑入
				modalDel: false, // 删除弹出框
				modal_loading: false, //	删除弹出框点击删除时loading状态
				selectData: null, // 选中的数据

				// 搜索条件下拉框的假数据
				cityList: [
					{
						value: 'New York',
						label: 'New York'
					},
					{
						value: 'London',
						label: 'London'
					}
				],
				model1: ''
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
				var columnsArr = [{
						type: 'selection',
						width: 60,
						align: 'center'
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
				return columnsArr;
			},
			tableData() { // 表格数据
				return this.tableDataArr;
			},
			tableHeight() { // 表格的高度，溢出滚动
				return this.tableheight;
			},
			pageArr() { // 分页
				return this.pagelistArr;
			}
		},
		methods: {
			searchCriteria(){
				console.log(9090);
				this.search={
					startDate: "2018.5.20.1314",
					endDate: "2018.5.20.1314",
					DEPTID: '13141314131413141314',
					page: 444
				};
			},
			sortFunction(e){
				console.log("排序规则:",e);
			},
			handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
			tabelParaShow() { // 这里拿到缓存的数据，进行权限判断
				console.log("表格11");
				var _this = this;
				COMMON.tablePara(264, 0, function(data) {
					_this.tableheight = data.height; // 计算拿到表格的高度
					_this.pageSize = data.size; // 拿到该表格默认请求的size(条数)
					console.log(data);
				})
			},
			tableDataArrShow() { // 这里拿到表格的数据、分页信息等
				var tableData = [{
						id: 12,
						name: '杨正炳',
						age: 18,
						address: '融智通1',
						date: '2016-10-03',
						kkk: "asdf"
					},
					{
						id: 13,
						name: '宁魏昃',
						age: 24,
						address: '融智通2',
						date: '2016-10-01',
						kkk: "asdf"
					},
					{
						id: 14,
						name: '石国栋',
						age: 30,
						address: '融智通4',
						date: '2016-10-02',
						kkk: "asdf"
					},
					{
						id: 15,
						name: '诗经三',
						age: 26,
						address: '融智通3',
						date: '2016-10-04',
						kkk: "asdf"
					}
				];
				this.pagelistArr = [200, 1, this.pageSize]; // 表格分页[总条数,当前页【最小是1】,每页条数]
				this.loading = false; // 获取数据后关闭loding
				this.tableDataArr = tableData; // 表格的数据
			},
			newTableData() { // 新建：打开侧边栏
				this.showSidebar = true;
			},
			sidebarClose() { // 关闭侧边栏
				this.showSidebar = false;
			},
			reviseTableData() { // 点击删除按钮
				this.modalDel = true;
			},
			tableDel() { // 点击删除弹出框：确定按钮
				this.modal_loading = true;
				setTimeout(() => {
					this.modal_loading = false;
					this.modalDel = false;
					this.$Message.success('删除成功！');
				}, 2000);
			},
			tableDelClose() { // 关闭删除弹出框：取消按钮
				this.modalDel = false;
			},

			// 以下是公共表格返回的参数
			updataTableData(e) { // 点击分页更新数据
				console.log(e);
				this.current = e;
				this.tableDataArrShow();
			},
			selectTableData(e) { // 单选、多选时返回的值
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
			searchPara(){
				this.search={
					startDate: "2018.5.20",
					endDate: "2018.5.20",
					DEPTID: '23456156165156',
					page: 444
				};
			}
		},
		mounted() {
			this.tabelParaShow();
			this.searchPara();
			this.tableDataArrShow();
		},
		created() {

		}
	}
</script>