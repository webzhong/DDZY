// 公用、通用的方法
const COMMON = {
	// 根据表格获取数据
    tablePara(top,bottom,callback){
        var widowHeight = document.documentElement.clientHeight,
            tableHeight = widowHeight - (top + bottom + 25),
            tableSize = parseInt(tableHeight/40);
        var param = {height:tableHeight,size:tableSize};
        callback(param);
    }
};
// 时间方法
const FORMAT = {
	/**时间戳 转化成时间格式
	 * 例子： FORMAT.timeToDate(new Date(),"yyyy-MM-dd hh:mm:ss"或者"yyyy年MM月dd日 hh时mm分ss秒") ==> 2006-07-02 08:09:04、2006年07月02日 08时09分04秒
	**/
	timeToDate(time, fmt) {
		if (time == null || time == "") {return ;}
		var date = new Date();
		date.setTime(time);
		var o = {
			"M+": date.getMonth() + 1, 	//月份
			"d+": date.getDate(), 		//日
			"h+": date.getHours(),		//小时
			"m+": date.getMinutes(), 	//分
			"s+": date.getSeconds(), 	//秒
			"q+": Math.floor((date.getMonth() + 3) / 3), //季度
			"S": date.getMilliseconds() //毫秒
		};
		if(/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
	    for(var k in o)
			if(new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		return fmt;
	},
	
	/** 时间转化成时间戳 
	 * 例子：FORMAT.dateToTime("2014/07/10 10:21:12"或者"2014-07-10 10:21:12"或者"2014.07.10 10:21:12") ==> 167234234000
	**/
	dateToTime(time) {
		if (time == null || time == "") {return ;}
		var date= time,tim;
		date = new Date(Date.parse(date.replace(/-/g,"/",".")));
		tim = date.getTime();
		return tim;
	},
	// 获取当前的时间信息
	getDateMe(){
		var date = new Date(),
			para = {
		    	year: date.getFullYear(),
		    	month: date.getMonth()+1,
		    	dates: date.getDate(),
		    	hour: date.getHours(),
				minute: date.getMinutes(),
				second: date.getSeconds()
			},
			d = new Date(para.year, para.month, 0);
			para.day = d.getDate();
		return para;
	}
};

export {COMMON,FORMAT};