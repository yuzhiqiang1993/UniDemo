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
		url: 'api/ScanCodeRepair/GettingBlueprintDataSources',
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
		url: 'api/ScanCodeRepair/GetDistrictsAndCounties',
		method: "POST",
		dataType: 'json',

	})
}



/* 街鎮 */
export const streetTownList = (data) => {
	//设置请求结束后拦截器
	http.interceptor.response = (response) => {
		return response;
	}
	return http.request({
		url: 'api/ScanCodeRepair/GetStreetData',
		method: "POST",
		dataType: 'json',
		data: data
	})
}


/* 设施类型 */
export const facilityTypeList = (data) => {
	//设置请求结束后拦截器
	http.interceptor.response = (response) => {
		return response;
	}
	return http.request({
		url: 'api/ScanCodeRepair/GetFacilityType',
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
		url: 'api/ScanCodeRepair/AccessToParkAndEquipmentInformation',
		method: "POST",
		dataType: 'json',
		data: data
	})
}


/* 根据编号获取器材 */
export const getInfoByNumber = (data) => {
	//设置请求结束后拦截器
	http.interceptor.response = (response) => {
		return response;
	}
	return http.request({
		url: 'api/ScanCodeRepair/GetInformationByNumber',
		method: "POST",
		dataType: 'json',
		data: data
	})

}


/* 提交极速报修器材数据 */
export const submitRepairs = (data) => {
	//设置请求结束后拦截器
	http.interceptor.response = (response) => {
		return response;
	}
	return http.request({
		url: 'api/ScanCodeRepair/EmergencyRepairSubmission',
		method: "POST",
		dataType: 'json',
		data: data
	})
}

/* 提交极速报修器材数据 */
export const submitFacilityRepairs = (data) => {
	//设置请求结束后拦截器
	http.interceptor.response = (response) => {
		return response;
	}
	return http.request({
		url: 'api/ScanCodeRepair/RegularRepairSubmission',
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
	taskDetails,
	getInfoByNumber,
	submitRepairs,
	facilityTypeList,
	submitFacilityRepairs

}
