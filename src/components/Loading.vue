<template>
	<div class="loading_masks">
		<div class="loading_mask">
			<div class="load-container load5">
				<div class="loader">Loading...</div>
			</div>
			<div class="loading_text">加载中...</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "Loading",
	  data () {
	    return {
	    }
	  },
	}
</script>

<style scoped lang="less">
	.loading_masks{
		width:100%;
		height:100%;
		position: fixed;
		left: 0px;
		top: 0px;
		z-index: 999
	}
	.loading_mask{
		width:11.25rem;
		height:9.375rem;
		position: fixed;
		left:50%;
		top: 50%;
		margin-left:-5.625rem;
		margin-top: -4.6875rem;
		background-color: rgba(0,0,0,.3); 
		border-radius: 4px;
		z-index: 9999;
	}
	.load-container{
		width:3.3125rem;
		height:3.3125rem;
		margin: 0 auto;
		margin-top: 3.6rem;
		position:relative;
		-moz-box-sizing:border-box;
		box-sizing:border-box;
	}
	.loading_text{
		color:#fff;
		font-size:1.125rem;
	}
.load5 .loader{
	font-size:10px;
	width:.8em;
	height:.8em;
	margin:0 auto;
	margin-top: 1rem;
	border-radius:50%;
	position:relative;
	text-indent:-9999em;
	-webkit-animation:load5 1.1s infinite ease;
	animation:load5 1.1s infinite ease
	}
	@-webkit-keyframes load5{
		0%,100%{
			box-shadow:0 -2.6em 0 0 #fff,
			1.8em -1.8em 0 0 rgba(255,255,255,.2),
			2.5em 0 0 0 rgba(255,255,255,.2),
			1.75em 1.75em 0 0 rgba(255,255,255,.2),
			0 2.5em 0 0 rgba(255,255,255,.2),
			-1.8em 1.8em 0 0 rgba(255,255,255,.2),
			-2.6em 0 0 0 rgba(255,255,255,.5),
			-1.8em -1.8em 0 0 rgba(255,255,255,.7)
			}
			12.5%{
				box-shadow:0 -2.6em 0 0 rgba(255,255,255,.7),
				1.8em -1.8em 0 0 #fff,
				2.5em 0 0 0 rgba(255,255,255,.2),
				1.75em 1.75em 0 0 rgba(255,255,255,.2),
				0 2.5em 0 0 rgba(255,255,255,.2),
				-1.8em 1.8em 0 0 rgba(255,255,255,.2),
				-2.6em 0 0 0 rgba(255,255,255,.2),
				-1.8em -1.8em 0 0 rgba(255,255,255,.5)
			}
			25%{
				box-shadow:0 -2.6em 0 0 rgba(255,255,255,.5),
				1.8em -1.8em 0 0 rgba(255,255,255,.7),
				2.5em 0 0 0 #fff,
				1.75em 1.75em 0 0 rgba(255,255,255,.2),
				0 2.5em 0 0 rgba(255,255,255,.2),
				-1.8em 1.8em 0 0 rgba(255,255,255,.2),
				-2.6em 0 0 0 rgba(255,255,255,.2),
				-1.8em -1.8em 0 0 rgba(255,255,255,.2)
			}
			37.5%{
				box-shadow:0 -2.6em 0 0 rgba(255,255,255,.2),
				1.8em -1.8em 0 0 rgba(255,255,255,.5),
				2.5em 0 0 0 rgba(255,255,255,.7),
				1.75em 1.75em 0 0 rgba(255,255,255,.2),
				0 2.5em 0 0 rgba(255,255,255,.2),
				-1.8em 1.8em 0 0 rgba(255,255,255,.2),
				-2.6em 0 0 0 rgba(255,255,255,.2),
				-1.8em -1.8em 0 0 rgba(255,255,255,.2)
			}
			50%{
				box-shadow:0 -2.6em 0 0 rgba(255,255,255,.2),
				1.8em -1.8em 0 0 rgba(255,255,255,.2),
				2.5em 0 0 0 rgba(255,255,255,.5),
				1.75em 1.75em 0 0 rgba(255,255,255,.7),
				0 2.5em 0 0 #fff,
				-1.8em 1.8em 0 0 rgba(255,255,255,.2),
				-2.6em 0 0 0 rgba(255,255,255,.2),
				-1.8em -1.8em 0 0 rgba(255,255,255,.2)
			}
			62.5%{
				box-shadow:0 -2.6em 0 0 rgba(255,255,255,.2),
				1.8em -1.8em 0 0 rgba(255,255,255,.2),
				2.5em 0 0 0 rgba(255,255,255,.2),
				1.75em 1.75em 0 0 rgba(255,255,255,.5),
				0 2.5em 0 0 rgba(255,255,255,.7),
				-1.8em 1.8em 0 0 #fff,
				-2.6em 0 0 0 rgba(255,255,255,.2),
				-1.8em -1.8em 0 0 rgba(255,255,255,.2)
			}
			75%{
				box-shadow:0 -2.6em 0 0 rgba(255,255,255,.2),
				1.8em -1.8em 0 0 rgba(255,255,255,.2),
				2.5em 0 0 0 rgba(255,255,255,.2),
				1.75em 1.75em 0 0 rgba(255,255,255,.2),
				0 2.5em 0 0 rgba(255,255,255,.5),
				-1.8em 1.8em 0 0 rgba(255,255,255,.7),
				-2.6em 0 0 0 #fff,
				-1.8em -1.8em 0 0 rgba(255,255,255,.2)
			}
			87.5%{
				box-shadow:0 -2.6em 0 0 rgba(255,255,255,.2),
				1.8em -1.8em 0 0 rgba(255,255,255,.2),
				2.5em 0 0 0 rgba(255,255,255,.2),
				1.75em 1.75em 0 0 rgba(255,255,255,.2),
				0 2.5em 0 0 rgba(255,255,255,.2),
				-1.8em 1.8em 0 0 rgba(255,255,255,.5),
				-2.6em 0 0 0 rgba(255,255,255,.7),
				-1.8em -1.8em 0 0 #fff
			}
		}
		@keyframes load5{
			0%,
			100%{
				box-shadow:0 -2.6em 0 0 #fff,
				1.8em -1.8em 0 0 rgba(255,255,255,.2),
				2.5em 0 0 0 rgba(255,255,255,.2),
				1.75em 1.75em 0 0 rgba(255,255,255,.2),
				0 2.5em 0 0 rgba(255,255,255,.2),
				-1.8em 1.8em 0 0 rgba(255,255,255,.2),
				-2.6em 0 0 0 rgba(255,255,255,.5),
				-1.8em -1.8em 0 0 rgba(255,255,255,.7)
			}
			12.5%{
				box-shadow:0 -2.6em 0 0 rgba(255,255,255,.7),
				1.8em -1.8em 0 0 #fff,
				2.5em 0 0 0 rgba(255,255,255,.2),
				1.75em 1.75em 0 0 rgba(255,255,255,.2),
				0 2.5em 0 0 rgba(255,255,255,.2),
				-1.8em 1.8em 0 0 rgba(255,255,255,.2),
				-2.6em 0 0 0 rgba(255,255,255,.2),
				-1.8em -1.8em 0 0 rgba(255,255,255,.5)
			}
			25%{
				box-shadow:0 -2.6em 0 0 rgba(255,255,255,.5),
				1.8em -1.8em 0 0 rgba(255,255,255,.7),
				2.5em 0 0 0 #fff,
				1.75em 1.75em 0 0 rgba(255,255,255,.2),
				0 2.5em 0 0 rgba(255,255,255,.2),
				-1.8em 1.8em 0 0 rgba(255,255,255,.2),
				-2.6em 0 0 0 rgba(255,255,255,.2),
				-1.8em -1.8em 0 0 rgba(255,255,255,.2)
			}
			37.5%{
				box-shadow:0 -2.6em 0 0 rgba(255,255,255,.2),
				1.8em -1.8em 0 0 rgba(255,255,255,.5),
				2.5em 0 0 0 rgba(255,255,255,.7),
				1.75em 1.75em 0 0 rgba(255,255,255,.2),
				0 2.5em 0 0 rgba(255,255,255,.2),
				-1.8em 1.8em 0 0 rgba(255,255,255,.2),
				-2.6em 0 0 0 rgba(255,255,255,.2),
				-1.8em -1.8em 0 0 rgba(255,255,255,.2)
			}
			50%{
				box-shadow:0 -2.6em 0 0 rgba(255,255,255,.2),
				1.8em -1.8em 0 0 rgba(255,255,255,.2),
				2.5em 0 0 0 rgba(255,255,255,.5),
				1.75em 1.75em 0 0 rgba(255,255,255,.7),
				0 2.5em 0 0 #fff,
				-1.8em 1.8em 0 0 rgba(255,255,255,.2),
				-2.6em 0 0 0 rgba(255,255,255,.2),
				-1.8em -1.8em 0 0 rgba(255,255,255,.2)
			}
			62.5%{
				box-shadow:0 -2.6em 0 0 rgba(255,255,255,.2),
				1.8em -1.8em 0 0 rgba(255,255,255,.2),
				2.5em 0 0 0 rgba(255,255,255,.2),
				1.75em 1.75em 0 0 rgba(255,255,255,.5),
				0 2.5em 0 0 rgba(255,255,255,.7),
				-1.8em 1.8em 0 0 #fff,
				-2.6em 0 0 0 rgba(255,255,255,.2),
				-1.8em -1.8em 0 0 rgba(255,255,255,.2)
			}
			75%{
				box-shadow:0 -2.6em 0 0 rgba(255,255,255,.2),
				1.8em -1.8em 0 0 rgba(255,255,255,.2),
				2.5em 0 0 0 rgba(255,255,255,.2),
				1.75em 1.75em 0 0 rgba(255,255,255,.2),
				0 2.5em 0 0 rgba(255,255,255,.5),
				-1.8em 1.8em 0 0 rgba(255,255,255,.7),
				-2.6em 0 0 0 #fff,
				-1.8em -1.8em 0 0 rgba(255,255,255,.2)
			}
			87.5%{
				box-shadow:0 -2.6em 0 0 rgba(255,255,255,.2),
				1.8em -1.8em 0 0 rgba(255,255,255,.2),
				2.5em 0 0 0 rgba(255,255,255,.2),
				1.75em 1.75em 0 0 rgba(255,255,255,.2),
				0 2.5em 0 0 rgba(255,255,255,.2),
				-1.8em 1.8em 0 0 rgba(255,255,255,.5),
				-2.6em 0 0 0 rgba(255,255,255,.7),
				-1.8em -1.8em 0 0 #fff
			}
		}
		.loader:after {
				content: '';
				position: absolute;
				top: 0;
		}
</style>
