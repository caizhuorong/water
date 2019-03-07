<template>
	<div>
	
		<img :src="canvasData.base64" class="img"/>
		<div class="btn">
			<span class="btn_span" @click="upload">确定</span>
			
		</div>
	</div>
</template>

<script>
	import {uploadPic,createTemplate} from '../api/api'
	import { mapGetters, mapState } from 'vuex'
	export default {
		name: "Edit",
		computed:{
			...mapState([
				'canvasData'
			]),
		},
		data () {
		  return {
		  }
		},
		methods: {
			upload() {
				const _this = this;
				let baseStr = _this.$store.state.canvasData.base64;
				_this.$store.dispatch('loadingShow', true)
				console.log(_this.$store.state.canvasData)
				baseStr = baseStr.replace("data:image/png;base64,", "");
				baseStr =baseStr.replace("data:image/jpeg;base64,", "");
				let para={
					base64:baseStr,
					width:_this.$store.state.canvasData.width,
					height:_this.$store.state.canvasData.height,
				}
				uploadPic(para).then(res=>{
					console.log(res);
					if( res.data.code == 0 ){
						_this.$store.dispatch('uploadData', res.data.info).then(()=>{
							// _this.$router.push("Edits");
							let paras={
								base64:baseStr,
								faceId:_this.$store.state.uploadData.faceId,
							}
							createTemplate(paras).then(res=>{
								console.log(res);
								if( res.data.code == 0 ){
									_this.$store.dispatch('template', res.data.info).then(()=>{
										_this.$router.push("HairstyleTemplate");
									});
								}else if( res.code == 200 ){
									let para = {
										show:true,
										content:res.data.info.msgList,
										title:res.data.info.msgTitle,
									}
									this.$store.dispatch('tip', para);
								}else{
									
								}
								_this.$store.dispatch('loadingShow', false)
							}).catch(error=>{
								
							})
						});
					}else if( res.data.code == 200 ){
						let para = {
							show:true,
							content:res.data.info.msgList,
							title:res.data.info.msgTitle,
						}
						this.$store.dispatch('tip', para);
						_this.$store.dispatch('loadingShow', false)
					}
					
				}).catch(error=>{
					
				})
			}
		},
		mounted(){
			document.title = '发型自动生成演示工具';
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
