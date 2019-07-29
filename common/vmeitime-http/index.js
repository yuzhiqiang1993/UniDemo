import http from './interface'

/**
 * 将业务所有接口统一起来便于维护
 * 如果项目很大可以将 url 独立成文件，接口分成不同的模块
 * 
 */

/* 任务列表 */
export const taskList = (data) => {

	//设置请求结束后拦截器
	http.interceptor.response = (response) => {
		return response;
	}
	return http.request({
		url: 'api/AndroidMain/WeChatHaveFacilities',
		method: "POST",
		dataType: 'json',
		data: data
	})
}


/* 区县列表 */
export const countyList = () => {

	//设置请求结束后拦截器
	http.interceptor.response = (response) => {
		return response;
	}
	return http.request({
		url: 'api/AndroidMain/WeChatHaveDistrictsCounties',
		method: "GET",
		dataType: 'json',

	})
}



export const streetTownList = (data) => {
	//设置请求结束后拦截器
	http.interceptor.response = (response) => {
		return response;
	}
	return http.request({
		url: 'api/AndroidMain/WeChatHaveStreetTown',
		method: "POST",
		dataType: 'json',
		data: data
	})
}

/*设施点详情 */

export const taskDetails = (data) => {
	//设置请求结束后拦截器
	http.interceptor.response = (response) => {
		return response;
	}
	return http.request({
		url: 'api/AndroidMain/WeChatFacilitieInfo',
		method: "POST",
		dataType: 'json',
		data: data
	})
}

// 默认全部导出  import api from '@/common/vmeitime-http/'
export default {
	taskList,
	countyList,
	streetTownList,
	taskDetails

}
