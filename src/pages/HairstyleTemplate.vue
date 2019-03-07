<template>
	<div>
		<div class="content">
			<div class="top_flex">
				<div class="top_item">
					<img :src="template.tempFileHairUrl" class="top_img"/>
					<span class="top_span">发型</span>
				</div>
				<div class="top_item">
					<img src="../assets/s.png" class="top_img"/>
				</div>
				<div class="top_item">
					<img :src="template.tempFileUrl" class="top_img" />
					<span class="top_span">发型模板</span>
				</div>
			</div>
			<div class="big_img">
				<img :src="template.resultFileUrl" />
			</div>
		</div>
		<div class="btn_flx">
			<div class="btn">
				<input type="file" accept="image/*" id="change" class="btn-file" style="opacity: 0;" @change="fileobj_change" > 
				<span class="btn-span">试戴</span>
			</div>
			<div class="btn" @click="share">
				<span class="btn-span">分享朋友圈</span>
			</div>
		</div>
		<div class="friend" v-show="friendShow" @click="closeFriend">
			<img src="../assets/pic1.png" />
		</div>
	</div>
</template>
<script>
	import {showShareResult,tryHairStyle} from '../api/api'
	import { mapGetters, mapState } from 'vuex'
	import {EXIF} from 'exif-js'
	import {weiXinShare} from '../assets/base.js'
	export default {
		name: "HairstyleTemplate",
		computed:{
			...mapState([
				'template'
			]),
		},
		data () {
		  return {
		   base64:'',
			 friendShow:false,
		  }
		},
		methods: {
			closeFriend(){
				this.friendShow = false;
			},
			share(){
				this.friendShow = true
			},
			getPhotoOrientation(img){
					var Orientation;
					EXIF.getData(img, function () {
						EXIF.getAllTags(img);
						Orientation =  EXIF.getTag(img,'Orientation');
						return Orientation;
					});
			},
			fileobj_change(e) {
				var canvas = document.createElement("canvas");
				var vue_this = this;
				vue_this.$store.dispatch('loadingShow', true)
				var file = e.target.files[0];
				var orientation;
				EXIF.getData(file, function () {
					EXIF.getAllTags(file);
					orientation =  EXIF.getTag(file,'Orientation');
					var reader = new FileReader();
					reader.onload = function(readerEvent) {
					var face_image = new Image();
						face_image.onload = function(imageEvent) {
							vue_this.drawPhotoImage(this, canvas, face_image, orientation);
							vue_this.base64 = canvas.toDataURL('image/jpeg');
							let para={
								path:vue_this.base64,
								w:canvas.width,
								h:canvas.height
							}
							vue_this.$store.dispatch('loadingShow', false);
							vue_this.$store.dispatch('canvasDataHair', para).then(()=>{
								vue_this.$router.push("EditHair");
							}); 
						};
						face_image.src = readerEvent.target.result;
					};
					reader.readAsDataURL(file);
				});
			},
			drawPhotoImage(image, canvas, face_image, orientation) {
				const _this = this;
				var max_size = 1024,
				width = face_image.width,
				height = face_image.height;
					if (width > height) {
						if (width > max_size) {
							 height *= max_size / width;
							 width = max_size;
						}
					} else {
						if (height > max_size) {
							width *= max_size / height;
							height = max_size;
						}
				}
				canvas.width = width;
				canvas.height = height;
				if (navigator.userAgent.match(/iphone/i)) {
					if (orientation != "" && orientation != 1) {
						switch (orientation) {
							case 6:
								_this.rotateImg(image, 'left', canvas, width, height);
									break;
							case 8:
								_this.rotateImg(image, 'right', canvas, width, height);
									break;
							case 3:
								/*
								//原资料中旋转180度方法为调用两遍90度 但是我这边不起作用 所以增加一种新的方式 => right2
								rotateImg(image, 'right', canvas, width, height);
								rotateImg(image, 'right', canvas, width, height);*/
								_this.rotateImg(image, 'right2', canvas, width, height);
								break;
							default:
								canvas.getContext('2d').drawImage(face_image, 0, 0, width, height);
								break;
						}
					} else {
						canvas.getContext('2d').drawImage(face_image, 0, 0, width, height);
					}
				}else if(_this.get_ua_info()){
					_this.rotateImg(image, 'left', canvas, width, height);
				}else if( _this.get_ua_infos() ){
					_this.rotateImg(image, 'right', canvas, width, height);
				}else {
					canvas.getContext('2d').drawImage(face_image, 0, 0, width, height);
				}
			},
			rotateImg(img, direction, canvas, width, height) {
				var min_step = 0;
				var max_step = 3;
				if (img == null) {
					return;
				}
				var step = 2;
				if (step == null) {
					step = min_step;
				}
				if (direction == 'right') {
					step++;
					step > max_step && (step = min_step);
				}else if(direction == 'right2'){
					step = 2;
				}else {
					step--;
					step < min_step && (step = max_step);
				}
				var degree = step * 90 * Math.PI / 180;
				var ctx = canvas.getContext('2d');
				switch (step) {
					case 0:
						canvas.width = width;
						canvas.height = height;
						ctx.drawImage(img, 0, 0, width, height);
						break;
					case 1:
						canvas.width = height;
						canvas.height = width;
						ctx.rotate(degree);
						ctx.drawImage(img, 0, -height, width, height);
						break;
					case 2:
						canvas.width = width;
						canvas.height = height;
						ctx.rotate(degree);
						ctx.drawImage(img, -width, -height, width, height);
						break;
					case 3:
						canvas.width = height;
						canvas.height = width;
						ctx.rotate(degree);
						ctx.drawImage(img, -width, 0, width, height);
						break;
					}
			},
//判断是否为三星手机
//注：此方法准确率欠佳 若有需求可参考https://github.com/fex-team/ua-device
			get_ua_info(){
				if(navigator.userAgent.indexOf(" SM-")!=-1  )
					return true;
				else 
					return false;
			},
			get_ua_infos(){
				if(navigator.userAgent.indexOf(" MI 8 SE")!=-1 )
					return true;
				else 
					return false;
			},
		},
		mounted(){
			document.title = '发型自动生成演示工具';

		},
		created() {
			// weiXinShare(window.location.href.replace('#',''));
			
			weiXinShare(location.href,this.$store.state.template.autoTemplateNo);
						const _this = this;
			if(_this.$route.query.templateNo != undefined){
				let para = {
					autoTemplateNo:_this.$route.query.templateNo,
				};
				showShareResult(para).then((res)=>{
					if( res.data.code == 0 ){
						_this.$store.dispatch('template', res.data.info);
					}else{
						
					}
				}).catch(error=>{
					
				})
			}
		}
	}
</script>
<style scoped lang="less">
	.friend{
		width: 100%;
		height:100%;
		position: fixed;
		left: 0rem;
		top: 0rem;
		z-index: 99;
		background-color: rgba(0,0,0,.6);
		img{
			width: 16.125rem;
			height: 11.4375rem;
			float: right;
			margin-top: 0.3125rem;
			margin-right: 1.75rem;
		}
	}
	.content{
		width:20.625rem;
		height: auto;
		margin: 0 auto;
		margin-top: 0.78125rem;
		.top_flex{
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			width: 100%;
			.top_item{
				.top_img{
					width: 7.8125rem;
					border-radius: 0.3125rem;
					display:block;
				}
				.top_span{
					font-size: 0.9375rem;
					color: #000;
					display: block;
					text-align: center;
					padding-top: 0.625rem;
				}
			}
			.top_item:nth-child(3){
				margin-right: 1.09375rem;
			}
			.top_item:nth-child(2){
				width: 1.04375rem;
				height:1.1875rem;
				.top_img{
					width:100%;
					height: 100%;
					display: block;
					margin-top: -1rem;
				}
			}
			.top_item:nth-child(1){
				margin-left: 1.09375rem;
			}
		}
	}
	.big_img{
		width: 20.625rem;
		height: 20.625rem;
		margin: 0 auto;
		margin-top: 1.125rem;
		img{
			width:100%;
			display:block;
			border-radius:0.3125rem;
		}
	}
	.btn_flx{
		display: flex;
		width: 100%;
		justify-content:space-around;
		align-items: center;
		flex-direction: row;
		position: fixed;
		bottom: 1.875rem;
		left: 0px;
		.btn{
			width: 7.5rem;
			height: 2.4375rem;
			background-color:#D75294;
			border-radius: 0.25rem;
			position: relative;
			.btn-span{
				color:#fff;
				font-size: 0.9375rem;
				text-align: center;
				line-height: 2.4375rem;
			}
			.btn-file{
				width: 100%;
				height: 100%;
				position: absolute;
				left: 0rem;
				top: 0rem;
			}
		}
	}
</style>
