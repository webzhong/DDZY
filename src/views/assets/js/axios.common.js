import axios from 'axios';
import qs from 'qs';
import env from '../../../../build/env';

if(env==='production'){ // 阿里云、线上环境打包：npm run build
	window.ip= '39.106.206.129:8097';
	window.wsIp= '39.106.206.129:7987';
}else if(env==='measurement'){	// 测试、开发打包：npm run outbuild
	window.ip= "168.130.1.31:8097";
	window.wsIp= "168.130.1.31:7987";
}else if(env==='development'){	// 自己联调:npm run dev
//	window.ip= "168.130.1.31:8097";
//	window.wsIp= "168.130.1.31:7987";

	window.ip= '39.106.206.129:8097';
	window.wsIp= '39.106.206.129:7987';
	
//	window.ip= "168.130.6.46:7899";
//	window.wsIp= '168.130.6.46:7987';
}

const AXIOS = {
	// 纯属调取接口
    apiMethod(action,method,param,success,error){
        param = param==null?{ }:param;
        var baseUrl= 'http://' + window.ip + '/';
        if(method == 'post' || method == 'put' || method == 'patch'){
	        let config = {
	            headers: {
	                'Content-Type': 'application/x-www-form-urlencoded'
	            }
	        };
	        axios[method](baseUrl + action,qs.stringify(param),config)
			.then(function(response) {
			    if(success) {
			        success(response.data);
			    }
			})
			.catch(function(response) {
			    if(error) {
			        error(response.data);
			    }
			});
        }else{
            axios[method](baseUrl + action,{params: param})
			.then(function(response) {
			    if(success) {
			        success(response.data);
			    }
			})
			.catch(function(response) {
			    if(error) {
			        error(response.data);
			    }
			});
        }
    },
    // 给后台传的参数为array
    arrMethod(action,method,param,success,error){
        param = param==null? []:param;
        var baseUrl= 'http://' + window.ip + '/';
        if(method == 'post' || method == 'put' || method == 'patch'){
	        let config = {
	            headers: {
					'Content-Type': 'application/json'
				}
	        };
	        axios[method](baseUrl + action,param,config)
			.then(function(response) {
			    if(success) {
			        success(response.data);
			    }
			})
			.catch(function(response) {
			    if(error) {
			        error(response.data);
			    }
			});
        }else{
            axios[method](baseUrl + action,param)
			.then(function(response) {
			    if(success) {
			        success(response.data);
			    }
			})
			.catch(function(response) {
			    if(error) {
			        error(response.data);
			    }
			});
        }
    },
	// 涉及到文件上传
    fileMethod(action,method,param,success,error){
        param = param==null?{ }:param;
        var baseUrl= 'http://' + window.ip + '/';
        let config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };
        if(method == 'post' || method == 'put' || method == 'patch'){
            axios[method](baseUrl + action,param,config)
			.then(function(response) {
			    if(success) {
			        success(response.data);
			    }
			})
			.catch(function(response) {
			    if(error) {
			        error(response.data);
			    }
			});
        }else{
            axios[method](baseUrl + action,{params: param},config)
			.then(function(response) {
			    if(success) {
			        success(response.data);
			    }
			})
			.catch(function(response) {
			    if(error) {
			        error(response.data);
			    }
			});
        }
    }
};

export {AXIOS};