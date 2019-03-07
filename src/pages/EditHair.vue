<template>
	<div>
	
		<img :src="canvasDataHair.path" class="img"/>
		<div class="btn">
			<span class="btn_span" @click="upload">确定</span>
		</div>
	</div>
</template>

<script>
	import {uploadPic,tryHairStyle} from '../api/api'
	import { mapGetters, mapState } from 'vuex'
	export default {
		name: "EditHair",
		computed:{
			...mapState([
				'canvasDataHair'
			]),
		},
		data () {
		  return {
		  }
		},
		methods: {
			upload() {
				const _this = this;
				let baseStr = _this.$store.state.canvasDataHair.path;
				_this.$store.dispatch('loadingShow', true)
				console.log(_this.$store.state.canvasDataHair)
				baseStr = baseStr.replace("data:image/png;base64,", "");
				baseStr =baseStr.replace("data:image/jpeg;base64,", "");
				let para={
					base64:baseStr,
					width:_this.$store.state.canvasDataHair.w,
					height:_this.$store.state.canvasDataHair.h,
					autoTemplateNo:_this.$store.state.templateHairType == '1' ? _this.$store.state.templateHair.autoTemplateNo: _this.$store.state.template.autoTemplateNo
				}
				tryHairStyle(para).then(res=>{
					console.log(res);
					if( res.data.code == 0 ){
						_this.$store.dispatch('templateHair', res.data.info).then(()=>{
							_this.$router.push("Result");
						});
					}else if( res.data.code == 200 ){
						
					}
					_this.$store.dispatch('loadingShow', false)
				}).catch(error=>{
					
				})
			}
		},
		mounted(){
			document.title = '发型自动生成演示工具';
		},
		beforeDestroy() {
      this.$store.dispatch('templateHairType','');
    },
	}
	
</script>

<style scoped lang="less">
	@import '../assets/base.less';
	.img{
		display: block;
		width: 100%;
		height: 100%;
	}
	.btn{
		width: 4.25rem;
		height: 4.25rem;
		
		position: fixed;
		left: 50%;
		bottom:2rem;
		margin-left: -2.125rem;
		color: #292929;
		text-align: center;
		line-height: 4.25rem;
		background-color:transparent;
		background-image:url('https://faceshapetemplate.lianglianglive.com/file/fixed/hair2/img/img46.png');
		background-size: 100% 100%;
		.btn_span{
			font-size: 1rem;
			color:#292929;
		}
	}
</style>
