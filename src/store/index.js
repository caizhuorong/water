import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
//要设置的全局访问的state对象
const state={
	canvasData:{
		path:'',
		w:0,
		h:0,
	},
	tip:{
		show:false,
		content:'',
		title:'',
	},
	canvasDataHair:{},
	loadingShow:false,
	uploadData:{},
	template:{},
	templateHair:{},
	templateHairType:'',
};
//要设置的初始属性值
//实时监听state值的变化(最新状态)
const getters = {   
//方法名随意,主要是来承载变化的showFooter的值
	canvasData: (state) => {
      let cavasData = state.canvasData;
      return cavasData;
	},
	canvasDataHair: (state) => {
	    return state.canvasDataHair;
	},
	loadingShow:(state)=>{
		return state.loadingShow;
	},
	uploadData:(state)=>{
		return state.uploadData
	},
	template:(state)=>{
		return state.template
	},
	templateHair:(state)=>{
		return state.templateHair
	},
	templateHairType:(state)=>{
		return state.templateHairType
	},
	tip:(state)=>{
		return state.tip
	}
};
const mutations = {
	//自定义改变state初始值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象);
    canvasDataHair(state,payload) {   
        state.canvasDataHair = payload;
    },
		changeCanvasData(state,payload) {   
		    state.canvasData = payload;
		},
		loadingShow(state,payload){
			state.loadingShow = payload;
		},
		uploadData(state,payload){
			state.uploadData = payload;
		},
		template(state,payload){
			state.template = payload;
		},
		templateHair(state,payload){
			state.templateHair = payload;
		},
		templateHairType(state,payload){
			state.templateHairType = payload;
		},
		tip(state,payload){
			state.tip = payload;
		}
};
const actions = {
	  //自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性
    changeCanvasData( context, payload ) {
			context.commit( 'changeCanvasData', payload ); //context提交
    },
		canvasDataHair( context, payload ) {
			context.commit( 'canvasDataHair', payload ); //context提交
		},
		loadingShow(context,payload){
			context.commit( 'loadingShow', payload );
		},
		uploadData(context,payload){
			context.commit( 'uploadData', payload );
		},
		template(context,payload){
			context.commit( 'template', payload );
		},
		templateHair(context,payload){
			context.commit( 'templateHair', payload );
		},
		templateHairType(context,payload){
			context.commit( 'templateHairType', payload );
		},
		tip(context,payload){
			context.commit( 'tip', payload );
		}
};
 const store = new Vuex.Store({
    state,
		getters,
		mutations,
		actions
    });
export default store;