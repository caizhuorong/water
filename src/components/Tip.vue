<template>
	<div class="loading_masks">
		<div class="tips">
			<div class="tips_content">
				<span v-for="arr in tip.content">
					{{arr}}
				</span>
			</div>
			<div class="tips_btn" @click="rest">去重拍</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters, mapState } from 'vuex'
	export default {
		name: "Tip",
		computed:{
			...mapState([
				'tip'
			])
		},
	  data () {
	    return {
				
	    }
	  },
		methods:{
			rest(){
				let para = {
					show:false,
					content:''
				};
				this.$store.dispatch('tip', para);
				this.$router.push("/");
			},
		}
	}
</script>

<style scoped lang="less">
	.loading_masks{
		width:100%;
		height:100%;
		position: fixed;
		left: 0px;
		top: 0px;
		z-index: 999;
		background-color: rgba(0,0,0,.6); 
	}
	.tips{
		width:13.125rem;
		height: auto;
		position: fixed;
		left:50%;
		top: 40%;
		margin-left:-6.5625rem;
		background-color: #fff;
		border-radius: 4px;
		z-index: 9999;
		.tips_content{
			width: 90%;
			padding: 1.125rem 5%;
			font-size: 1rem;
			color: #272727;
			text-align: center;
			span{
				display:block;
				padding-top: 0.625rem
			}
		}
		.tips_btn{
			border-top: 0.0625rem solid #e5e5e5;
			width: 100%;
			height:3.3125rem;
			text-align: center;
			line-height: 3.3125rem;
			font-size: 1.125rem;
			color: #272727;
		}
	}
</style>
