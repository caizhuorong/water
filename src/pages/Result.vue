<template>
	<div id="demo">
		<div class="container" v-show="panel">
			<vueCropper
				ref="cropper"
				:img="url"
				:outputSize="option.size"
				:outputType="option.outputType"
				:info="true"
				:canMove="option.canMove"
				:canMoveBox="option.canMoveBox"
				:fixedBox="option.fixedBox"
				:original="option.original"
				:autoCrop="option.autoCrop"
				:centerBox="option.centerBox"
				:high="option.high"
				:infoTrue="option.infoTrue"
				:enlarge="option.enlarge"
			></vueCropper>
		  <!-- <div>
		    <img id="image" :src="url" alt="Picture">
		  </div>-->
			<button type="button" id="buttons" @click="cancel">取消</button>
		  <button type="button" id="button" @click="crop">确定</button>
		</div>
		<div class="big_img">
			<img :src="templateHair.resultFileUrl" />
		</div>
		<div class="btn_flx">
			<div class="btn">
				<input type="file" accept="image/*" id="change" class="btn-file" style="opacity: 0;" @change="change" > 
				<span class="btn-span">再次制作发型</span>
			</div>
			<div class="btn">
				<input type="file" accept="image/*" id="change" class="btn-file" style="opacity: 0;" @change="fileobj_change"> 
				<span class="btn-span">再次试戴</span>
			</div>
		</div>
	</div>
</template>
<script>
		import {createTemplate} from '../api/api'
	import { mapGetters, mapState } from 'vuex'
	import EXIF from 'exif-js'
	import { VueCropper }  from 'vue-cropper'
	export default {
		name: "Result",
		components: {
			VueCropper,
		},
		computed:{
			...mapState([
				'templateHair',
				'template'
			]),
		},
		data () {
		  return {
				headerImage:'',
				picValue:'',
				cropper:'',
				croppable:false,
				panel:false,
				url:'',
				canvas:false,
				option:{
					size:1,
					outputType:'jpeg',
					autoCrop:true,
					fixedBox:true,
					canMoveBox:false,
					original:false,
					centerBox:true,
					maxImgSize:4000,
					infoTrue:true,
					enlarge:2,
					mode:'contain',
				}
		  }
		},
		methods: {
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
				if(navigator.userAgent.indexOf(" SM-")!=-1)
					return true;
				else 
					return false;
			},
			cancel(){
				this.url = '';
				this.panel = false;
			},
			change (e) {
				this.$store.dispatch('loadingShow', true)
				let files = e.target.files || e.dataTransfer.files;
				if (!files.length) return;
				this.panel = true;
				this.picValue = files[0];
				this.url = this.getObjectURL(this.picValue);
				//每次替换图片要重新得到新的url
				if(this.cropper){
					this.cropper.replace(this.url);
					this.$store.dispatch('loadingShow', false)
				}
				this.panel = true;
				this.$store.dispatch('loadingShow', false)
			},
			getObjectURL (file) {
			  var url = null ; 
			  if (window.createObjectURL!=undefined) { // basic
			    url = window.createObjectURL(file);
			  } else if (window.URL!=undefined) { // mozilla(firefox)
			    url = window.URL.createObjectURL(file) ;
			  } else if (window.webkitURL!=undefined) { // webkit or chrome
			    url = window.webkitURL.createObjectURL(file) ;
			  }
			  return url;
			},
			crop () {
				this.$store.dispatch('loadingShow', true)
				// this.$refs.cropper.startCrop();
				this.$refs.cropper.getCropData((data) => {
					// do something
					this.postImg(data,this.$refs.cropper.cropInfo.width,this.$refs.cropper.cropInfo.height)
				})
			},
			postImg (baseStr,w,h) {
				let para={
					base64:baseStr,
					width:w,
					height:h,
				}
				const _this = this;
				_this.$store.dispatch('loadingShow', false);
				_this.$store.dispatch('changeCanvasData', para).then(()=>{
					_this.$router.push("Edit");
				}); //分发actions中的minusPriceAsync这个异步函数
				// 这边写图片的上传
			}
		},
		mounted(){
			document.title = '发型自动生成演示工具';
		},
	}
</script>
<style scoped lang="less">
	
	.big_img{
		width:100%;
		margin: 0 auto;
		img{
			width:100%;
			display:block;
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
	*{
	  margin: 0;
	  padding: 0;
	}
	#demo #button {
	  position: absolute;
	  right: 10px;
	  top: 10px;
	  width: 80px;
	  height: 40px;
	  border:none;
	  border-radius: 5px;
	  background:white;
	}
	#demo #buttons {
	  position: absolute;
	  left: 10px;
	  top: 10px;
	  width: 80px;
	  height: 40px;
	  border:none;
	  border-radius: 5px;
	  background:white;
	}
	#demo .show {
	  width: 100px;
	  height: 100px;
	  overflow: hidden;
	  position: relative;
	  border: 1px solid #d5d5d5;
	}
	#demo .picture {
	  width: 100%;
	  height: 100%;
	  overflow: hidden;
	  background-position: center center;
	  background-repeat: no-repeat;
	  background-size: cover; 
	}
	#demo .container {
	    z-index: 99;
	    position: fixed;
	    padding-top: 60px;
	    left: 0;
	    top: 0;
	    right: 0;
	    bottom: 0;
	    background:rgba(0,0,0,1);
	}
	 
	#demo #image {
	  max-width: 100%;
	}
	 
	.cropper-view-box,.cropper-face {
	}
	/*!
	 * Cropper.js v1.0.0-rc
	 * https://github.com/fengyuanchen/cropperjs
	 *
	 * Copyright (c) 2017 Fengyuan Chen
	 * Released under the MIT license
	 *
	 * Date: 2017-03-25T12:02:21.062Z
	 */
	 
	.cropper-container {
	  font-size: 0;
	  line-height: 0;
	 
	  position: relative;
	 
	  -webkit-user-select: none;
	 
	     -moz-user-select: none;
	 
	      -ms-user-select: none;
	 
	          user-select: none;
	 
	  direction: ltr;
	  -ms-touch-action: none;
	      touch-action: none
	}
	 
	.cropper-container img {
	  /* Avoid margin top issue (Occur only when margin-top <= -height) */
	  display: block;
	  min-width: 0 !important;
	  max-width: none !important;
	  min-height: 0 !important;
	  max-height: none !important;
	  width: 100%;
	  height: 100%;
	  image-orientation: 0deg
	}
	 
	.cropper-wrap-box,
	.cropper-canvas,
	.cropper-drag-box,
	.cropper-crop-box,
	.cropper-modal {
	  position: absolute;
	  top: 0;
	  right: 0;
	  bottom: 0;
	  left: 0;
	}
	 
	.cropper-wrap-box {
	  overflow: hidden;
	}
	 
	.cropper-drag-box {
	  opacity: 0;
	  background-color: #fff;
	}
	 
	.cropper-modal {
	  opacity: .5;
	  background-color: #000;
	}
	 
	.cropper-view-box {
	  display: block;
	  overflow: hidden;
	 
	  width: 100%;
	  height: 100%;
	 
	  outline: 1px solid #39f;
	  outline-color: rgba(51, 153, 255, 0.75);
	}
	 
	.cropper-dashed {
	  position: absolute;
	 
	  display: block;
	 
	  opacity: .5;
	  border: 0 dashed #eee
	}
	 
	.cropper-dashed.dashed-h {
	  top: 33.33333%;
	  left: 0;
	  width: 100%;
	  height: 33.33333%;
	  border-top-width: 1px;
	  border-bottom-width: 1px
	}
	 
	.cropper-dashed.dashed-v {
	  top: 0;
	  left: 33.33333%;
	  width: 33.33333%;
	  height: 100%;
	  border-right-width: 1px;
	  border-left-width: 1px
	}
	 
	.cropper-center {
	  position: absolute;
	  top: 50%;
	  left: 50%;
	 
	  display: block;
	 
	  width: 0;
	  height: 0;
	 
	  opacity: .75
	}
	 
	.cropper-center:before,
	  .cropper-center:after {
	  position: absolute;
	  display: block;
	  content: ' ';
	  background-color: #eee
	}
	 
	.cropper-center:before {
	  top: 0;
	  left: -3px;
	  width: 7px;
	  height: 1px
	}
	 
	.cropper-center:after {
	  top: -3px;
	  left: 0;
	  width: 1px;
	  height: 7px
	}
	 
	.cropper-face,
	.cropper-line,
	.cropper-point {
	  position: absolute;
	 
	  display: block;
	 
	  width: 100%;
	  height: 100%;
	 
	  opacity: .1;
	}
	 
	.cropper-face {
	  top: 0;
	  left: 0;
	 
	  background-color: #fff;
	}
	 
	.cropper-line {
	  background-color: #39f
	}
	 
	.cropper-line.line-e {
	  top: 0;
	  right: -3px;
	  width: 5px;
	  cursor: e-resize
	}
	 
	.cropper-line.line-n {
	  top: -3px;
	  left: 0;
	  height: 5px;
	  cursor: n-resize
	}
	 
	.cropper-line.line-w {
	  top: 0;
	  left: -3px;
	  width: 5px;
	  cursor: w-resize
	}
	 
	.cropper-line.line-s {
	  bottom: -3px;
	  left: 0;
	  height: 5px;
	  cursor: s-resize
	}
	 
	.cropper-point {
	  width: 5px;
	  height: 5px;
	 
	  opacity: .75;
	  background-color: #39f
	}
	 
	.cropper-point.point-e {
	  top: 50%;
	  right: -3px;
	  margin-top: -3px;
	  cursor: e-resize
	}
	 
	.cropper-point.point-n {
	  top: -3px;
	  left: 50%;
	  margin-left: -3px;
	  cursor: n-resize
	}
	 
	.cropper-point.point-w {
	  top: 50%;
	  left: -3px;
	  margin-top: -3px;
	  cursor: w-resize
	}
	 
	.cropper-point.point-s {
	  bottom: -3px;
	  left: 50%;
	  margin-left: -3px;
	  cursor: s-resize
	}
	 
	.cropper-point.point-ne {
	  top: -3px;
	  right: -3px;
	  cursor: ne-resize
	}
	 
	.cropper-point.point-nw {
	  top: -3px;
	  left: -3px;
	  cursor: nw-resize
	}
	 
	.cropper-point.point-sw {
	  bottom: -3px;
	  left: -3px;
	  cursor: sw-resize
	}
	 
	.cropper-point.point-se {
	  right: -3px;
	  bottom: -3px;
	  width: 20px;
	  height: 20px;
	  cursor: se-resize;
	  opacity: 1
	}
	 
	@media (min-width: 768px) {
	 
	  .cropper-point.point-se {
	    width: 15px;
	    height: 15px
	  }
	}
	 
	@media (min-width: 992px) {
	 
	  .cropper-point.point-se {
	    width: 10px;
	    height: 10px
	  }
	}
	 
	@media (min-width: 1200px) {
	 
	  .cropper-point.point-se {
	    width: 5px;
	    height: 5px;
	    opacity: .75
	  }
	}
	 
	.cropper-point.point-se:before {
	  position: absolute;
	  right: -50%;
	  bottom: -50%;
	  display: block;
	  width: 200%;
	  height: 200%;
	  content: ' ';
	  opacity: 0;
	  background-color: #39f
	}
	 
	.cropper-invisible {
	  opacity: 0;
	}
	 
	.cropper-bg {
	  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC');
	}
	 
	.cropper-hide {
	  position: absolute;
	 
	  display: block;
	 
	  width: 0;
	  height: 0;
	}
	 
	.cropper-hidden {
	  display: none !important;
	}
	 
	.cropper-move {
	  cursor: move;
	}
	 
	.cropper-crop {
	  cursor: crosshair;
	}
	 
	.cropper-disabled .cropper-drag-box,
	.cropper-disabled .cropper-face,
	.cropper-disabled .cropper-line,
	.cropper-disabled .cropper-point {
	  cursor: not-allowed;
	}
</style>
