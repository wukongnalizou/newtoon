import {
RECORD_USERID,
GET_USERID,
RECORD_MYINFO,
RECORD_EPSALERT,
RECORD_CARTOON,
RECORD_CARTOONTYPE,
RECORD_FOLLOWCARTOON,
UPDATE_STATE,
RECORD_STATE,
GET_STATE,
UPDATE_SEARCH_STATE,
UPDATE_FIRSTLOAD,
GET_CARTOONID,
RECORD_CARTOONID,
RECORD_TS,
GET_TS,
RECORD_URL,
GET_URL,
RECORD_SHAREURL,
GET_SHAREURL,
RECORD_IOS9,
RECORD_CARTOONIDURL,
RECORD_PAGESTATE,
} from './mutation-types'
import {
  setStore,
  getStore,
  getsessionStorage,
  setsessionStorage
} from '../config/mUtils'
export default {
	[GET_USERID](state){
		let userid = getStore('userId')
		state.userId = JSON.parse(userid)
	},
	[RECORD_USERID](state,info){
		// setStore('userId',info)
		state.userId = info
	},
	[RECORD_MYINFO](state, info) {
		state.username = info.username,
		state.enddate = info.endDate,
		state.userimg = info.headimgurl,
		state.money = info.integral,
		state.vip = info.vipId
	},
	[RECORD_EPSALERT](state,info){
		state.epsalert = info
	},
	[RECORD_CARTOON](state,info){
		state.cartoon = info
	},
	[RECORD_CARTOONTYPE](state,info){
		state.cartoontype = info
	},
	[RECORD_FOLLOWCARTOON](state,info){
		state.followcartoon = info
	},
	[UPDATE_STATE](state,info){
		state.indexstate = info
	},
	[RECORD_STATE](state,info){
		setsessionStorage('indexstate',info)
	},
	[GET_STATE](state,info){
		let indexstate = getsessionStorage('indexstate')
		state.indexstate = JSON.parse(indexstate)
	},
	[UPDATE_SEARCH_STATE](state,info){
		state.search = info
	},
	[UPDATE_FIRSTLOAD](state,info){
		state.firstload = info
	},
	[GET_CARTOONID](state,info){
		let cartoonid = getsessionStorage('cartoonid')
		state.cartoonid = cartoonid
	},
	[RECORD_CARTOONID](state,info){
		setsessionStorage('cartoonid',info)
	},
	[RECORD_TS](state,info){
		setsessionStorage('ts',info)
	},
	[GET_TS](state,info){
		let ts = getsessionStorage('ts')
		state.ts = JSON.parse(ts)
	},
	[RECORD_URL](state,info){
		setsessionStorage('url',info)
	},
	[GET_URL](state,info){
		let url = getsessionStorage('url')
		state.url = url
	},
	[RECORD_SHAREURL](state,info){
		setsessionStorage('shareurl',info)
	},
	[GET_SHAREURL](state,info){
		let shareurl = getsessionStorage('shareurl')
		state.shareurl = shareurl
	},
	[RECORD_IOS9](state,info){
		state.ios9 = info
	},
	[RECORD_CARTOONIDURL](state,info){
		state.cartoonIdurl = info
	},
	[RECORD_PAGESTATE](state,info){
		state.pagestate = info
	}
}