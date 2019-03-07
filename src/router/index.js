import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import TakePhoto from '@/pages/TakePhoto';
import Edit from '@/pages/Edit';
import EditHair from '@/pages/EditHair';
import Edits from '@/pages/Edits';
import HairstyleTemplate from '@/pages/HairstyleTemplate';
import Result from '@/pages/Result';
import vueCropper from 'vue-cropper';
Vue.use(Router)

export default new Router({
  routes: [
//     {
//       path: '/',
//       name: 'HelloWorld',
//       component: HelloWorld
//     },
		{
		  path: '/',
		  name: 'TakePhoto',
		  component: TakePhoto,
		},
		{
			path:'/edit',
			name:'Edit',
			component:Edit
		},
		{
			path:'/edits',
			name:'Edits',
			component:Edits
		},
		{
			path:'/hairstyletemplate',
			name:'HairstyleTemplate',
			component:HairstyleTemplate
		},
		{
			path:'/edithair',
			name:'EditHair',
			component:EditHair
		},
		{
			path:'/result',
			name:'Result',
			component:Result
		}
  ]
})
