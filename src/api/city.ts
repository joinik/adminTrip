import { request } from "@/utils/axios"

/**
 * 获取所有省的景点数据
 * @returns 
 */
export const provincesGet = () =>{
    const url = '/get_all_sheng'
    return request<{sheng: string[]; count: string[]}>({url})
}

/**
 * 获取城市数据
 * @returns 
 */
export const hotCityAllGet = () =>{
    const url = '/get_top_city'
    return request<{top_city: string[],  comments : number[], jds: number[]}>({url})
}