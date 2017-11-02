import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const IndexPage = resolve => require(['@/components/Index'], resolve)
const Main = resolve => require(['@/components/Main'], resolve)
const BindCar = resolve => require(['@/components/BindCar'], resolve)
const Payment = resolve => require(['@/components/Payment'], resolve)
const MonPayment = resolve => require(['@/components/MonPayment'], resolve)
const Getticket = resolve => require(['@/components/Getticket'], resolve)
const Myticket = resolve => require(['@/components/Myticket'], resolve)
const Carlist = resolve => require(['@/components/Carlist'], resolve)
const Discount = resolve => require(['@/components/Discount'], resolve)

const Home = resolve => require(['@/components/Home'], resolve)

const router = new Router({
	mode:'hash',
  	routes: [
	    {
	      	path: '/',
	      	name: 'IndexPage',
	      	component: IndexPage
		},
		{
			path: '/getticket',
			name: 'discount',
			component: Discount
		},
		{
			path: '/home',
			component: Home,
			children: [
				{
					path: '/main',
					name: 'main',
					component: Main,
				},
				{
					path: '/bindcar',
					name: 'bindcar',
					component: BindCar
				},
				{
					path: '/payment/:car',
					name: 'payment',
					component: Payment
				},
				{
					path: '/monpayment/:car',
					name: 'monpayment',
					component: MonPayment
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
		},



	    
  	]
})


export default router