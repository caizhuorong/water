<template>
  <div id="app">
    <router-view/>
		<loading v-show='loadingShow'/>
		<Tip v-show="tip.show" :content = "tip.content" :title= "tip.title" />
  </div>
</template>

<script>
	import { mapState } from 'vuex'
	import Loading from './components/Loading';
	import Tip from './components/Tip';
export default {
  name: 'App',
	computed:{
		...mapState([
			'loadingShow',
			'tip'
		])
	},
	components:{
		Loading,
		Tip
	}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
