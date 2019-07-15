import http from './interface'

/**
 * 将业务所有接口统一起来便于维护
 * 如果项目很大可以将 url 独立成文件，接口分成不同的模块
 * 
 */

// 单独导出(测试接口) import {test} from '@/common/vmeitime-http/'
export const taskList = () => {

	//设置请求结束后拦截器
	http.interceptor.response = (response) => {
		return response;
	}
    return http.request({
        url: 'mock/5ce266bc36fff24a477c4e6a/getNews/mock',
		dataType: 'json',
    })
}

// 轮播图
export const banner = (data) => {
    return http.request({
        url: '/banner/36kr',
        method: 'GET', 
        data,
		// handle:true
    })
}

// 默认全部导出  import api from '@/common/vmeitime-http/'
export default {
	taskList,
    banner
}