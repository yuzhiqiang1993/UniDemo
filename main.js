import Vue from 'vue'
import App from './App'
import api from '@/common/vmeitime-http/'
import mock from '@/pages/task/mock.js'


Vue.config.productionTip = false
Vue.prototype.$api = api
Vue.prototype.$mock=mock

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
