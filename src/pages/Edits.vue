<template>
	<div>
		<img :src="base64" class="img"/>
		<div class="btn">
			<span class="btn_span" @click="upload">确定</span>
		</div>
	</div>
</template>

<script>
	import {createTemplate} from '../api/api'
	import { mapGetters, mapState } from 'vuex'
	export default {
		name: "Edits",
		computed:{
			...mapState([
				'uploadData'
			]),
			
		},
		data () {
		  return {
		   base64:'',
		  }
		},
		methods: {
			upload() {
				const _this = this;
				let baseStr = _this.base64;
				_this.$store.dispatch('loadingShow', true)
				baseStr = baseStr.replace("data:image/png;base64,", "");
				baseStr = baseStr.replace("data:image/jpeg;base64,", "");
				let para={
					base64:baseStr,
					faceId:_this.$store.state.uploadData.faceId,
				}
				createTemplate(para).then(res=>{
					console.log(res);
					if( res.data.code == 0 ){
						_this.$store.dispatch('template', res.data.info).then(()=>{
							_this.$router.push("HairstyleTemplate");
						});
					}else if( res.code == 200 ){
						
					}else{
						this.$router.push("HairstyleTemplate");
					}
					_this.$store.dispatch('loadingShow', false)
				}).catch(error=>{
					
				})
			},
// 			getBase64Image(img) {
// 				var canvas = document.createElement("canvas");
// 				canvas.width = img.width;
// 				canvas.height = img.height;
// 				var ctx = canvas.getContext("2d");
// 				ctx.drawImage(img, 0, 0, img.width, img.height);
// 				var dataURL = canvas.toDataURL("image/jpeg",1);  // 可选其他值 image/jpeg
// 				return dataURL;
// 			},
// 			main(src, cb) {
// 				const _this = this;
// 				var image = new Image();
// 				image.src = src + '?v=' + Math.random(); // 处理缓存
// 				 // image.crossOrigin= '*';
// 				image.setAttribute("crossOrigin",'Anonymous')
// 				image.onload = function(){
// 					var base64 = _this.getBase64Image(image);
// 					_this.base64 = base64;
// 				}
// 			},
		},
		mounted(){
			document.title = '发型自动生成演示工具';
			this.base64 = 'data:image/jpeg;base64,'+this.$store.state.uploadData.picBase64;
			// this.main(this.$store.state.uploadData.picBase64);
			 // this.main('http://panda.lianglianglive.com/hairstyle_template/0.3_AF95.jpg');
			  // this.main("http://faceswap-test.lianglianglive.com/file/faceswap/result/autocreate/20190219/7e41615a12999d3cb99f32f298603c2f.jpg");
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
