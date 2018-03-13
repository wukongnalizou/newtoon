import App from '../App'
const test = r => require.ensure([], () => r(require('../components/test/test')), 'test')
const main = r => require.ensure([], () => r(require('../components/main/main')), 'main')
const index = r => require.ensure([], () => r(require('../components/index/index')), 'index')
const bookcase = r => require.ensure([], () => r(require('../components/bookcase/bookcase')), 'bookcase')
const circle = r => require.ensure([], () => r(require('../components/circle/circle')), 'circle')
const my = r => require.ensure([], () => r(require('../components/my/my')), 'my')
const find = r => require.ensure([], () => r(require('../components/find/find')), 'find')
const indexmain = r => require.ensure([], () => r(require('../components/indexmain/indexmain')), 'indexmain')
const cartoon = r => require.ensure([], () => r(require('../components/cartoon/cartoon')), 'cartoon')
const detail = r => require.ensure([], () => r(require('../components/detail/detail')), 'detail')
const episode = r => require.ensure([], () => r(require('../components/episode/episode')), 'episode')
const cartoonimg = r => require.ensure([], () => r(require('../components/cartoonimg/cartoonimg')), 'cartoonimg')
const hotmore = r => require.ensure([], () => r(require('../components/hotmore/hotmore')), 'hotmore')
const rankmore = r => require.ensure([], () => r(require('../components/rankmore/rankmore')), 'rankmore')
const search = r => require.ensure([], () => r(require('../components/search/search')), 'search')
const vip = r => require.ensure([], () => r(require('../components/vip/vip')), 'vip')
const money = r => require.ensure([], () => r(require('../components/money/money')), 'money')
const task = r => require.ensure([], () => r(require('../components/task/task')), 'task')
const history = r => require.ensure([], () => r(require('../components/history/history')), 'history')
const message = r => require.ensure([], () => r(require('../components/message/message')), 'message')
const feedback = r => require.ensure([], () => r(require('../components/feedback/feedback')), 'feedback')
const mycircle = r => require.ensure([], () => r(require('../components/mycircle/mycircle')), 'mycircle')
const moneyrecord = r => require.ensure([], () => r(require('../components/moneyrecord/moneyrecord')), 'moneyrecord')
const disdetail = r => require.ensure([], () => r(require('../components/disdetail/disdetail')), 'disdetail')
const discuss = r => require.ensure([], () => r(require('../components/discuss/discuss')), 'discuss')
const newdis = r => require.ensure([], () => r(require('../components/newdis/newdis')), 'newdis')
const hotdis = r => require.ensure([], () => r(require('../components/hotdis/hotdis')), 'hotdis')
const realmanh = r => require.ensure([], () => r(require('../components/realmanh/realmanh')), 'realmanh')
const manh = r => require.ensure([], () => r(require('../components/manh/manh')), 'manh')
const upcircle = r => require.ensure([], () => r(require('../components/upcircle/upcircle')), 'upcircle')
const freecartoon = r => require.ensure([], () => r(require('../components/freecartoon/freecartoon')), 'freecartoon')
const tel = r => require.ensure([], () => r(require('../components/tel/tel')), 'tel')
const cartoondisdetail = r => require.ensure([], () => r(require('../components/cartoondisdetail/cartoondisdetail')), 'cartoondisdetail')
const circledetail = r => require.ensure([], () => r(require('../components/circledetail/circledetail')), 'circledetail')
const cartoondiscuss = r => require.ensure([], () => r(require('../components/cartoondiscuss/cartoondiscuss')), 'cartoondiscuss')
const cartoonhotdis = r => require.ensure([], () => r(require('../components/cartoonhotdis/cartoonhotdis')), 'cartoonhotdis')
const cartoonnewdis = r => require.ensure([], () => r(require('../components/cartoonnewdis/cartoonnewdis')), 'cartoonnewdis')
const login = r => require.ensure([], () => r(require('../components/login/login')), 'login')
const servererror = r => require.ensure([], () => r(require('../components/servererror/servererror')), 'servererror')
const business = r => require.ensure([], () => r(require('../components/business/business')), 'business')
export default [
    {
      path: '/',
      name: 'App',
      component: App,
      children : [
      	// {
      	// 	// path: '/main',
      	// 	// redirect: '/main/indexmain/index'
       //            path: '',
       //            redirect: 'login'
      	// },
      	{
      		path: 'main',
      		component: main,
      		children: [
                        {
                              path: '/main/indexmain',
                              redirect: '/main/indexmain/index'
                        },
      			{
      				path: '/bookcase',
      				component: bookcase,
                              redirect:'/bookcase/realmanh',
                              children: [
                                    {
                                          path: 'realmanh',
                                          component: realmanh
                                    },
                                    {
                                          path:'manh',
                                          component: manh
                                    }
                              ]
      			},
      			{
      				path: '/circle',
      				component: circle
      			},
      			{
      				path: '/my',
      				component: my,
                              // children:[
                              //       {
                              //             path: 'vip',
                              //             component: vip    
                              //       }
                              // ]
      			},
                        {
                              path: 'indexmain',
                              component:indexmain,
                              children : [
                                   {
                                          path: 'index',
                                          component: index
                                    },
                                    {
                                          path: 'find',
                                          component: find
                                    }
                              ]
                        }
      		]
      	},
            {
                  path: 'cartoon',
                  component: cartoon,
                  redirect: '/cartoon/detail',
                  children:[
                        {
                              path: 'detail',
                              component: detail
                        },
                        {
                              path:'episode',
                              component:episode
                        }
                  ]
            },
            {
                  path: 'cartoonimg',
                  component: cartoonimg,
                  meta:{
                        keepAlive:false
                  }
            },
            {
                  path: 'hotmore',
                  component: hotmore
            },
            {
                  path: 'rankmore',
                  component: rankmore
            },
            {
                  path: 'search',
                  component: search
            },
            {
                  path: 'vip',
                  component: vip
            },
            {
                  path: 'money',
                  component: money
            },
            {
                  path: 'task',
                  component: task
            },
            {
                  path: 'history',
                  component:history
            },
            {
                  path: 'message',
                  component:message
            },
            {
                  path: 'feedback',
                  component: feedback
            },
            {
                  path: 'mycircle',
                  component: mycircle
            },
            {
                  path: 'moneyrecord',
                  component: moneyrecord
            },
            {
                  path: 'disdetail',
                  component: disdetail
            },
            {
                  path: 'discuss',
                  component: discuss,
                  redirect: '/discuss/newdis',
                  children:[
                        {
                              path: 'newdis',
                              component: newdis
                        },
                        {
                              path: 'hotdis',
                              component: hotdis
                        }
                  ]
            },
            {
                  path:'upcircle',
                  component: upcircle
            },
            {
                  path:'freecartoon',
                  component: freecartoon
            },
            {
                  path:'tel',
                  component: tel
            },
            {
                  path: 'cartoondisdetail',
                  component: cartoondisdetail
            },
            {
                  path: 'circledetail',
                  component: circledetail
            },
            {
                  path: 'cartoondiscuss',
                  component: cartoondiscuss,
                  redirect: '/cartoondiscuss/cartoonnewdis',
                  children:[
                        {
                              path: 'cartoonnewdis',
                              component: cartoonnewdis
                        },
                        {
                              path: 'cartoonhotdis',
                              component: cartoonhotdis
                        }
                  ]
            },
            {
                  path: 'test',
                  component:test
            },
            {
                  path:'login',
                  component:login
            },
            {
                  path: 'servererror',
                  component:servererror
            },
            {
                  path:'business',
                  component:business
            }
      ]
    }
  ]

