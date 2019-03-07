import Vue from 'vue'
import VueAxios from 'vue-axios'
import axios from 'axios';
import Qs from 'qs';
//#创建一个axios实例
var axios_instance = axios.create({
    transformRequest: [function (data) {
        data = Qs.stringify(data);
        return data;
    }],
});
axios_instance.interceptors.response.use(function (response) {
	if( response.data.code == 1009 ){
		window.location.href = response.data.info.loginUrl;
	}else{
		return response;
	}
}, function (error) {
// 对响应错误做点什么
return Promise.reject(error);
});
Vue.use(VueAxios, axios);
Vue.use(VueAxios, axios_instance);

let env = 2;
let baseLocal = '';
let hairBaseLocal = '';
if( env == 1 ){
	//测试环境
	baseLocal = 'https://panda.lianglianglive.com';
	// hairBaseLocal = 'https://panda.lianglianglive.com';
}else if( env == 2 ){
	//生产环境
	baseLocal = 'https://service.lianglianglive.com';
	// hairBaseLocal = 'https://service.lianglianglive.com';
}
export const base = baseLocal;
// export const hairBase = hairBaseLocal;
//上传图片
export const uploadPic = params => { return axios_instance.post(`${base}/hairstyle/hairStyleCreate/uploadPic`, params);};
//发型自动生成-生成模板
export const createTemplate = params => { return axios_instance.post(`${base}/hairstyle/hairStyleCreate/createTemplate`, params);};
//发型自动生成-试戴发型
export const tryHairStyle = params => { return axios_instance.post(`${base}/hairstyle/hairStyleCreate/tryHairStyle`, params);};
//发型自动生成-显示分享结果
export const showShareResult = params => { return axios_instance.get(`${base}/hairstyle/hairStyleCreate/showShareResult`, { params: params });};


export const getSign = params => { return axios_instance.post(`${base}/hairstyle/wechat/getSigns`, params);};
// export const getSign = params => { return axios_instance.get(`${base}/hairstyle/wechat/getSigns`, { params: params });};


