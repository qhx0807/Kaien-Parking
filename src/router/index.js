import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Hello = resolve => require(['@/components/Hello'], resolve)
const Main = resolve => require(['@/components/Main'], resolve)
const BindCar = resolve => require(['@/components/BindCar'], resolve)
const Payment = resolve => require(['@/components/Payment'], resolve)
const Getticket = resolve => require(['@/components/Getticket'], resolve)
const Myticket = resolve => require(['@/components/Myticket'], resolve)
const Carlist = resolve => require(['@/components/Carlist'], resolve)


const router = new Router({
	mode:'hash',
  	routes: [
	    {
	      	path: '/',
	      	name: 'main',
	      	component: Main
	    },
	    {
	      	path: '/bindcar',
	      	name: 'bindcar',
	      	component: BindCar
	    },
	    {
	      	path: '/payment',
	      	name: 'payment',
	      	component: Payment
	    },
	    {
	      	path: '/getticket',
	      	name: 'getticket',
	      	component: Getticket
	    },
	    {
	      	path: '/myticket',
	      	name: 'myticket',
	      	component: Myticket
	    },
	    {
	      	path: '/carlist',
	      	name: 'carlist',
	      	component: Carlist
	    },
  	]
})


export default router